"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "react-feather";
import { motion, useMotionValue } from "framer-motion";
import { Scrollama, Step, type ScrollamaEvent } from "react-scrollama";

import type { PdfDocumentSection } from "@/data/types";

interface PdfViewerModalProps {
  pdfUrl: string;
  heading: string;
  subheading: string;
  sections?: readonly PdfDocumentSection[];
  onClose: () => void;
}

interface PdfViewport {
  width: number;
  height: number;
}

interface PdfRenderTask {
  promise: Promise<void>;
  cancel: () => void;
}

interface PdfPage {
  getViewport: ({ scale }: { scale: number }) => PdfViewport;
  render: (options: {
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    viewport: PdfViewport;
    transform?: number[];
  }) => PdfRenderTask;
  cleanup: () => void;
}

interface PdfDocument {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPage>;
  destroy: () => Promise<void>;
}

interface PdfLoadingTask {
  promise: Promise<PdfDocument>;
  destroy: () => Promise<void>;
}

interface PdfJsModule {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (url: string) => PdfLoadingTask;
}

interface PdfCanvasProps {
  pdfDocument: PdfDocument;
  pageNumber: number;
  width: number;
  height: number;
  qualityScale?: number;
}

const PDF_ZOOM_SCALE = 2;

function getPageSize() {
  const availableWidth = window.innerWidth - 64;
  const availableHeight = window.innerHeight - 216;
  const width = Math.max(280, Math.floor(Math.min(1050, availableWidth, availableHeight / 0.5625)));

  return { width, height: Math.floor(width * 0.5625) };
}

function PdfCanvas({ pdfDocument, pageNumber, width, height, qualityScale = 1 }: PdfCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let renderTask: PdfRenderTask | null = null;
    let pdfPage: PdfPage | null = null;
    let isCancelled = false;

    void pdfDocument.getPage(pageNumber).then(page => {
      if (isCancelled || !canvasRef.current) return;

      pdfPage = page;
      const baseViewport = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: width / baseViewport.width });
      const pixelRatio = Math.min(
        4,
        Math.max(window.devicePixelRatio || 1, 2) * qualityScale,
      );
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) return;

      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      renderTask = page.render({
        canvas,
        canvasContext: context,
        viewport,
        transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
      });

      void renderTask.promise.catch(error => {
        if (error instanceof Error && error.name !== "RenderingCancelledException") {
          console.error("PDF page rendering failed:", error);
        }
      });
    });

    return () => {
      isCancelled = true;
      renderTask?.cancel();
      pdfPage?.cleanup();
    };
  }, [height, pageNumber, pdfDocument, qualityScale, width]);

  return <canvas ref={canvasRef} className="block h-full w-full bg-white" />;
}

export default function PdfViewerModal({
  pdfUrl,
  heading,
  subheading,
  sections = [],
  onClose,
}: PdfViewerModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const zoomAreaRef = useRef<HTMLElement>(null);
  const programmaticPageRef = useRef<number | null>(null);
  const navigationUnlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [pdfDocument, setPdfDocument] = useState<PdfDocument | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const [pageSize, setPageSize] = useState({ width: 1200, height: 675 });
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const updateDimensions = () => setPageSize(getPageSize());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    updateDimensions();
    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.documentElement.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overscrollBehavior = previousOverscrollBehavior;
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("keydown", handleKeyDown);
      if (navigationUnlockTimerRef.current) {
        clearTimeout(navigationUnlockTimerRef.current);
      }
    };
  }, [onClose]);

  useEffect(() => {
    let loadingTask: PdfLoadingTask | null = null;
    let loadedDocument: PdfDocument | null = null;
    let isCancelled = false;

    setPdfDocument(null);
    setNumPages(0);
    setLoadError(false);

    void (async () => {
      try {
        const pdfJsPath = "/pdf.min.mjs";
        const pdfjs = await import(/* webpackIgnore: true */ pdfJsPath) as PdfJsModule;
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        loadingTask = pdfjs.getDocument(pdfUrl);
        loadedDocument = await loadingTask.promise;

        if (isCancelled) {
          await loadedDocument.destroy();
          return;
        }

        setPdfDocument(loadedDocument);
        setNumPages(loadedDocument.numPages);
        setCurrentPage(0);
      } catch (error) {
        if (!isCancelled) {
          console.error("PDF loading failed:", error);
          setLoadError(true);
        }
      }
    })();

    return () => {
      isCancelled = true;
      if (loadedDocument) {
        void loadedDocument.destroy();
      } else if (loadingTask) {
        void loadingTask.destroy();
      }
    };
  }, [pdfUrl]);

  const goToPage = (pageIndex: number) => {
    const nextIndex = Math.max(0, Math.min(pageIndex, numPages - 1));
    const scrollContainer = scrollRef.current;

    if (!scrollContainer || numPages <= 1) return;

    setIsZoomed(false);
    panX.set(0);
    panY.set(0);
    programmaticPageRef.current = nextIndex;
    if (navigationUnlockTimerRef.current) {
      clearTimeout(navigationUnlockTimerRef.current);
    }

    setCurrentPage(nextIndex);
    scrollContainer.scrollTo({
      top: nextIndex * window.innerHeight * 0.55 + 2,
      behavior: "auto",
    });

    navigationUnlockTimerRef.current = setTimeout(() => {
      programmaticPageRef.current = null;
    }, 300);
  };

  const handleStepEnter = ({ data }: ScrollamaEvent<number>) => {
    if (programmaticPageRef.current !== null && data !== programmaticPageRef.current) {
      return;
    }

    if (navigationUnlockTimerRef.current) {
      clearTimeout(navigationUnlockTimerRef.current);
      navigationUnlockTimerRef.current = null;
    }
    programmaticPageRef.current = null;
    setIsZoomed(false);
    panX.set(0);
    panY.set(0);
    setCurrentPage(data);
  };

  const toggleZoom = () => {
    setIsZoomed(previous => {
      if (previous) {
        panX.set(0);
        panY.set(0);
      }
      return !previous;
    });
  };

  const handleZoomPan = (event: ReactMouseEvent<HTMLElement>) => {
    if (!isZoomed) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    const overflowX = pageSize.width * ((PDF_ZOOM_SCALE - 1) / 2);
    const overflowY = pageSize.height * ((PDF_ZOOM_SCALE - 1) / 2);

    panX.set(-normalizedX * overflowX);
    panY.set(-normalizedY * overflowY);
  };

  useEffect(() => {
    const zoomArea = zoomAreaRef.current;
    if (!zoomArea || !isZoomed) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const maxX = pageSize.width * ((PDF_ZOOM_SCALE - 1) / 2);
      const maxY = pageSize.height * ((PDF_ZOOM_SCALE - 1) / 2);
      panX.set(Math.max(-maxX, Math.min(maxX, panX.get() - event.deltaX)));
      panY.set(Math.max(-maxY, Math.min(maxY, panY.get() - event.deltaY)));
    };

    zoomArea.addEventListener("wheel", handleWheel, { passive: false });
    return () => zoomArea.removeEventListener("wheel", handleWheel);
  }, [currentPage, isZoomed, pageSize.height, pageSize.width, panX, panY]);

  useEffect(() => {
    const handlePageKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        goToPage(currentPage - 1);
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        goToPage(currentPage + 1);
      }
    };

    window.addEventListener("keydown", handlePageKeyDown);
    return () => window.removeEventListener("keydown", handlePageKeyDown);
  }, [currentPage, numPages]);

  if (!isMounted) return null;

  const pages = Array.from({ length: numPages }, (_, index) => index + 1);
  const sliderProgress = numPages > 1 ? (currentPage / (numPages - 1)) * 100 : 100;

  return createPortal(
    <div
      ref={scrollRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${subheading} PDF 보기`}
      className="fixed inset-0 z-[10000] overflow-y-auto overscroll-none bg-black/45 text-slate-900 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="relative">
        <div
          className="sticky top-0 z-10 flex h-screen items-center justify-center overflow-hidden p-4"
          onClick={event => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div
            className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.35)]"
            style={{
              width: pageSize.width + 32,
              fontFamily: "Arial, Helvetica, sans-serif",
              letterSpacing: "-0.025rem",
            }}
          >
            <header className="flex h-14 items-center justify-between gap-4 px-4 md:px-5">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900 md:text-base">{heading}</p>
                <p className="truncate text-[11px] text-slate-400">{subheading}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="PDF 닫기"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div
              className="relative bg-white p-4"
              style={{ height: pageSize.height + 16 }}
            >
              {loadError ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-red-500">PDF를 불러오지 못했습니다.</p>
                </div>
              ) : !pdfDocument ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-slate-400">PDF를 불러오는 중...</p>
                </div>
              ) : (
                pages.map((pageNumber, index) => (
                  <motion.section
                    key={pageNumber}
                    ref={currentPage === index ? zoomAreaRef : null}
                    aria-label={`${pageNumber} 페이지`}
                    onMouseMove={handleZoomPan}
                    initial={false}
                    animate={{
                      opacity: currentPage === index ? 1 : 0,
                      x: currentPage === index ? 0 : index < currentPage ? -80 : 80,
                      scale: currentPage === index ? 1 : 0.96,
                    }}
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-4 bottom-2 top-2 flex items-center justify-center"
                    style={{ pointerEvents: currentPage === index ? "auto" : "none" }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: currentPage === index && isZoomed ? PDF_ZOOM_SCALE : 1,
                        }}
                        style={{ x: panX, y: panY }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full w-full"
                      >
                        {Math.abs(index - currentPage) <= 1 ? (
                          <PdfCanvas
                            pdfDocument={pdfDocument}
                            pageNumber={pageNumber}
                            width={pageSize.width}
                            height={pageSize.height}
                            qualityScale={currentPage === index && isZoomed ? 2 : 1}
                          />
                        ) : null}
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 flex">
                      {isZoomed ? (
                        <button
                          type="button"
                          onClick={toggleZoom}
                          aria-label="PDF 축소"
                          className="h-full w-full cursor-zoom-out"
                        />
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 0}
                            aria-label="이전 PDF 페이지"
                            className="pdf-cursor-prev h-full w-[22%] disabled:cursor-default"
                          />
                          <button
                            type="button"
                            onClick={toggleZoom}
                            aria-label="PDF 확대"
                            className="h-full flex-1 cursor-zoom-in"
                          />
                          <button
                            type="button"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage >= numPages - 1}
                            aria-label="다음 PDF 페이지"
                            className="pdf-cursor-next h-full w-[22%] disabled:cursor-default"
                          />
                        </>
                      )}
                    </div>
                  </motion.section>
                ))
              )}
            </div>

            <footer className="flex flex-col px-4 pb-4 pt-0">
              {sections.length > 0 ? (
                <nav
                  aria-label="PDF 목차"
                  className="flex items-center overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {sections.map((section, index) => {
                    const currentPageNumber = currentPage + 1;
                    const isActive =
                      currentPageNumber >= section.startPage &&
                      currentPageNumber <= section.endPage;

                    return (
                      <div
                        key={`${section.label}-${section.startPage}`}
                        className="flex min-w-0 items-center"
                        style={{
                          flexBasis: 0,
                          flexGrow: section.endPage - section.startPage + 1,
                        }}
                      >
                        {index > 0 ? (
                          <span className="mx-2 shrink-0 text-xs text-slate-300" aria-hidden="true">
                            |
                          </span>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => goToPage(section.startPage - 1)}
                          className={`min-w-0 flex-1 truncate text-center text-[11px] transition md:text-xs ${
                            isActive
                              ? "font-semibold text-[#007AFF]"
                              : "font-medium text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          {section.label}
                        </button>
                      </div>
                    );
                  })}
                </nav>
              ) : null}
              <input
                type="range"
                min={0}
                max={Math.max(0, numPages - 1)}
                step={1}
                value={currentPage}
                onChange={event => goToPage(Number(event.target.value))}
                disabled={numPages <= 1}
                aria-label="PDF 페이지 이동"
                className="pdf-page-slider mt-1 h-2 w-full cursor-pointer appearance-none rounded-full disabled:cursor-default"
                style={{
                  background: `linear-gradient(to right, #007AFF 0%, #007AFF ${sliderProgress}%, #dbeafe ${sliderProgress}%, #dbeafe 100%)`,
                }}
              />
              <div className="mt-2.5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={numPages <= 1 || currentPage === 0}
                  aria-label="이전 페이지"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <p className="min-w-16 text-center text-xs tabular-nums text-slate-500">
                  {numPages > 0 ? `${currentPage + 1} / ${numPages}` : "— / —"}
                </p>
                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={numPages <= 1 || currentPage >= numPages - 1}
                  aria-label="다음 페이지"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </footer>
          </div>
        </div>

        {numPages > 1 ? (
          <div className="relative z-20 -mt-[100vh] pb-[50vh] pt-[50vh] pointer-events-none">
            <Scrollama offset={0.5} threshold={4} onStepEnter={handleStepEnter}>
              {pages.map((pageNumber, index) => (
                <Step data={index} key={pageNumber}>
                  <div
                    aria-hidden="true"
                    className="h-[55vh]"
                  />
                </Step>
              ))}
            </Scrollama>
          </div>
        ) : (
          <div className="h-screen" aria-hidden="true" />
        )}
      </div>
    </div>,
    document.body,
  );
}
