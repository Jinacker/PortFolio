"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Loader, X } from "react-feather";

import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownViewerModalProps {
  /** public/ 아래 md 파일 경로 (예: "/mds/kkinitalk-core.md") */
  url: string;
  heading: string;
  subheading: string;
  onClose: () => void;
}

// React children에서 순수 텍스트만 뽑는다 — h2 id(목차 앵커)용.
function childrenToText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return childrenToText((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

let mermaidSeq = 0;

// ```mermaid 코드펜스를 SVG 다이어그램으로 렌더한다. 라이브러리는 열 때만 로드.
function MermaidDiagram({ code }: { code: string }) {
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        // 웹폰트 로드 전에 노드 크기를 재면 렌더 폰트와 어긋나 텍스트가 잘린다
        await document.fonts.ready;
        mermaid.initialize({
          startOnLoad: false,
          // 원문 다이어그램이 <b>/<br/> HTML 라벨을 쓰므로 loose 필요
          securityLevel: "loose",
          theme: "neutral",
          // "inherit"로 두면 노드 크기를 재는 폰트와 실제 렌더 폰트가 달라져
          // 긴 텍스트가 노드 밖에서 잘린다 — 실제 페이지 폰트로 측정하게 명시
          fontFamily: getComputedStyle(document.body).fontFamily || "sans-serif",
          flowchart: { htmlLabels: true, wrappingWidth: 220 },
          suppressErrorRendering: true,
        });
        // 렌더 ID는 호출마다 새로 — StrictMode 이중 실행에서 같은 ID로 충돌하지 않게
        const { svg: rendered } = await mermaid.render(`mermaid-diagram-${++mermaidSeq}`, code);
        if (!cancelled) setSvg(rendered);
      } catch (error) {
        console.error("Mermaid rendering failed:", error, "\ncode:\n", code);
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code]);

  if (failed) {
    return (
      <pre className="my-3 overflow-x-auto rounded-lg bg-slate-50 p-3.5 text-xs text-slate-700">
        {code}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="my-3 grid h-40 place-items-center rounded-lg border border-slate-200 bg-slate-50/60">
        <Loader className="h-4 w-4 animate-spin text-slate-400" aria-label="다이어그램 그리는 중" />
      </div>
    );
  }

  return (
    <div
      className="my-3 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// pre의 자식들 중 mermaid 코드 엘리먼트를 찾아 원문 텍스트를 꺼낸다
function extractMermaidCode(children: ReactNode): string | null {
  const list = Array.isArray(children) ? children : [children];
  for (const child of list) {
    if (
      child &&
      typeof child === "object" &&
      "props" in child &&
      /language-mermaid/.test(
        (child as { props: { className?: string } }).props.className ?? "",
      )
    ) {
      return childrenToText(
        (child as { props: { children?: ReactNode } }).props.children,
      ).trim();
    }
  }
  return null;
}

export default function MarkdownViewerModal({ url, heading, subheading, onClose }: MarkdownViewerModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const controller = new AbortController();

    setContent(null);
    setLoadError(false);

    void fetch(url, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      // HTML 주석(작성자용 메모)은 react-markdown이 텍스트로 노출하므로 제거
      .then(text => setContent(text.replace(/<!--[\s\S]*?-->/g, "")))
      .catch(error => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Markdown loading failed:", error);
        setLoadError(true);
      });

    return () => controller.abort();
  }, [url]);

  const markdownComponents: Components = {
    h1: ({ children }) => (
      <h1 className="mb-4 mt-2 break-keep text-xl font-bold text-slate-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-9 clear-both break-keep border-b border-slate-200 pb-2 text-lg font-bold text-slate-900 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-6 break-keep text-[15px] font-semibold text-slate-800">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-1.5 mt-4 break-keep text-sm font-semibold text-slate-700">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="my-2 break-keep text-sm leading-[1.7] text-slate-600">{children}</p>
    ),
    ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>,
    ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>,
    li: ({ children }) => (
      <li className="break-keep text-sm leading-[1.6] text-slate-600">{children}</li>
    ),
    strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
    blockquote: ({ children }) => (
      <blockquote className="my-3 rounded-r-md border-l-[3px] border-primary/50 bg-primary/[0.04] px-3.5 py-2 [&_p]:my-1 [&_p]:text-[13px] [&_p]:text-slate-600">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="my-3 overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full border-collapse text-left text-[13px]">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-slate-50">{children}</thead>,
    th: ({ children }) => (
      <th className="break-keep border-b border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="break-keep border-b border-slate-100 px-3 py-2 align-top text-[13px] leading-[1.6] text-slate-600 last:border-b-0">
        {children}
      </td>
    ),
    code: ({ children, className }) =>
      className ? (
        // 코드 블록(pre 내부)
        <code className="block text-xs leading-[1.7]">{children}</code>
      ) : (
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12.5px] text-slate-800">
          {children}
        </code>
      ),
    pre: ({ children }) => {
      const mermaidCode = extractMermaidCode(children);
      if (mermaidCode) {
        return <MermaidDiagram code={mermaidCode} />;
      }
      return (
        <pre className="clear-both my-3 overflow-x-auto rounded-lg bg-slate-50 p-3.5 text-slate-700">
          {children}
        </pre>
      );
    },
    img: ({ src, alt }) => {
      if (!src || typeof src !== "string") return null;
      // 해시 힌트로 표시를 제어한다 (해시는 요청 전에 제거되므로 파일 경로에 영향 없음)
      //   #w=320            → 표시 폭 제한 (가운데 정렬)
      //   #size=406x884     → 실제 픽셀 크기 — 세로 사진의 예약 비율을 맞춰 레이아웃 틀어짐 방지
      //   #...&left         → 왼쪽에 붙이고 본문이 오른쪽으로 흐름
      const [cleanSrc, hash] = src.split("#");
      const params = new URLSearchParams(hash ?? "");
      const maxWidth = params.get("w") ? Number(params.get("w")) : undefined;
      const sizeMatch = /^(\d+)x(\d+)$/.exec(params.get("size") ?? "");
      const floatLeft = params.has("left");
      return (
        <Image
          src={cleanSrc}
          alt={alt ?? ""}
          width={sizeMatch ? Number(sizeMatch[1]) : 1280}
          height={sizeMatch ? Number(sizeMatch[2]) : 860}
          className={
            floatLeft
              ? "float-left mb-3 mr-5 mt-1 h-auto w-full rounded-md border border-slate-200"
              : "mx-auto my-2 h-auto w-full rounded-md border border-slate-200"
          }
          style={maxWidth ? { maxWidth } : undefined}
          // 터미널 캡처 등 SVG는 최적화 불필요 + Next 14.2 인식 버그가 있어 우회
          unoptimized={cleanSrc.endsWith(".svg")}
        />
      );
    },
    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
      >
        {children}
      </a>
    ),
    hr: () => <hr className="my-7 border-slate-200" />,
  };

  if (!isMounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${subheading} 문서 보기`}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/45 p-3 [font-family:Arial,Helvetica,sans-serif] md:p-6"
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex h-[92vh] w-full max-w-[780px] flex-col overflow-hidden rounded-2xl bg-white text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 px-4 py-3.5 md:px-6">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 md:text-base">
              {heading.replace(/\n/g, " ")}
            </p>
            <p className="truncate text-[11px] text-slate-400">{subheading}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="문서 닫기"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 md:px-8 md:py-6"
        >
          {loadError ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-red-500">문서를 불러오지 못했습니다.</p>
            </div>
          ) : content === null ? (
            <div className="flex h-full items-center justify-center">
              <Loader className="h-5 w-5 animate-spin text-slate-400" aria-label="문서 불러오는 중" />
            </div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
