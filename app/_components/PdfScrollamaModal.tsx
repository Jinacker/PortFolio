"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "react-feather";
import { motion } from "framer-motion";
import { Scrollama, Step, type ScrollamaEvent } from "react-scrollama";

interface PdfScrollamaModalProps {
  pdfUrl: string;
  title: string;
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
}

function getPageSize() {
  const availableWidth = window.innerWidth - 32;
  const availableHeight = window.innerHeight - 168;
  const width = Math.max(280, Math.floor(Math.min(1200, availableWidth, availableHeight / 0.5625)));

  return { width, height: Math.floor(width * 0.5625) };
}

function PdfCanvas({ pdfDocument, pageNumber, width, height }: PdfCanvasProps) {
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
      const pixelRatio = window.devicePixelRatio || 1;
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
  }, [height, pageNumber, pdfDocument, width]);

  return <canvas ref={canvasRef} className="block h-full w-full rounded-xl bg-white shadow-2xl" />;
}

export default function PdfScrollamaModal({ pdfUrl, title, onClose }: PdfScrollamaModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const programmaticPageRef = useRef<number | null>(null);
  const navigationUnlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [pdfDocument, setPdfDocument] = useState<PdfDocument | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
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
    document.body.style.overflow = "hidden";
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
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
    setCurrentPage(data);
  };

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

  return createPortal(
    <div
      ref={scrollRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} PDF 보기`}
      className="fixed inset-0 z-[10000] overflow-y-auto bg-slate-950 text-white"
    >
      <div className="relative">
        <div className="sticky top-0 z-10 h-screen overflow-hidden">
          <header className="absolute inset-x-0 top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/10 bg-slate-950/80 px-4 backdrop-blur-md md:px-6">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold md:text-base">{title}</p>
              <p className="text-xs text-white/50">
                {numPages > 1 ? "스크롤하면 다음 페이지로 전환됩니다" : "PDF 포트폴리오"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="PDF 닫기"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="relative h-full px-4 pb-20 pt-16">
            {loadError ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-red-300">PDF를 불러오지 못했습니다.</p>
              </div>
            ) : !pdfDocument ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-white/60">PDF를 불러오는 중...</p>
              </div>
            ) : (
              pages.map((pageNumber, index) => (
                <motion.section
                  key={pageNumber}
                  aria-label={`${pageNumber} 페이지`}
                  initial={false}
                  animate={{
                    opacity: currentPage === index ? 1 : 0,
                    x: currentPage === index ? 0 : index < currentPage ? -80 : 80,
                    scale: currentPage === index ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center px-4 pb-20 pt-16"
                  style={{ pointerEvents: currentPage === index ? "auto" : "none" }}
                >
                  <PdfCanvas
                    pdfDocument={pdfDocument}
                    pageNumber={pageNumber}
                    width={pageSize.width}
                    height={pageSize.height}
                  />
                </motion.section>
              ))
            )}
          </div>

          <footer className="absolute inset-x-0 bottom-0 z-30 flex h-20 items-center justify-center gap-4 border-t border-white/10 bg-slate-950/80 px-4 backdrop-blur-md">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={numPages <= 1 || currentPage === 0}
              aria-label="이전 페이지"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 transition enabled:hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <p className="min-w-20 text-center text-sm tabular-nums text-white/70">
              {numPages > 0 ? `${currentPage + 1} / ${numPages}` : "— / —"}
            </p>
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={numPages <= 1 || currentPage >= numPages - 1}
              aria-label="다음 페이지"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 transition enabled:hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </footer>
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
