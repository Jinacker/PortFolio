"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { ArrowUpRight, ChevronDown, FileText, Loader } from "react-feather";

import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

import type {
  ExperienceDetailSection,
  ExperienceDetailMedia,
  ExperienceLink,
  ExperienceSubDetail,
  PdfDocumentSection,
} from "@/data/types";

// Payload for opening the PDF viewer — each PDF carries its own heading/TOC so
// one experience can attach several documents (per-section `pdf`) while the
// legacy single-PDF path (`showPdf` + links/pdfSections) keeps working.
export interface ActivePdf {
  href: string;
  label: string;
  sections?: readonly PdfDocumentSection[];
}

interface ExperienceDetailPanelProps {
  id?: string;
  items?: readonly string[];
  sections?: readonly ExperienceDetailSection[];
  subDetails?: readonly ExperienceSubDetail[];
  pdfLink?: ExperienceLink;
  onOpenPdf: (pdf: ActivePdf) => void;
  onOpenLegacyModal?: (modalName: string, images: string[]) => void;
  className?: string;
}

function renderHighlightedText(text: string, highlights: readonly string[] = []) {
  if (highlights.length === 0) return text;

  const escapedHighlights = [...highlights]
    .sort((a, b) => b.length - a.length)
    .map(item => item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escapedHighlights.join("|")})`, "g"));

  return parts.map((part, index) =>
    highlights.includes(part) ? (
      <strong
        key={`${part}-${index}`}
        className="font-semibold text-foreground/90"
      >
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

// "## " 항목을 소제목으로 해석해, 뒤따르는 항목들을 별도 불릿 묶음으로 렌더한다.
// 소제목은 ul 바깥의 일반 텍스트라 카드 콘텐츠 왼쪽 라인에 정확히 맞는다.
function BulletList({
  items,
  highlights,
}: {
  items: readonly string[];
  highlights?: readonly string[];
}) {
  const blocks: { heading?: string; rows: string[] }[] = [];
  for (const item of items) {
    if (item.startsWith("## ")) {
      blocks.push({ heading: item.slice(3), rows: [] });
    } else {
      if (blocks.length === 0) blocks.push({ rows: [] });
      blocks[blocks.length - 1].rows.push(item);
    }
  }

  return (
    <>
      {blocks.map((block, index) => (
        <div key={block.heading ?? `list-${index}`} className={cn(index > 0 && "mt-2.5")}>
          {block.heading ? (
            <p className="mb-1 break-keep text-sm font-semibold text-foreground/80">
              {block.heading}
            </p>
          ) : null}
          <ul className="list-disc space-y-0.5 pl-5">
            {block.rows.map(row => (
              <li
                key={row}
                className="break-keep text-sm font-normal leading-[1.5] text-foreground/75"
              >
                {renderHighlightedText(row, highlights)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function MediaTextBlock({
  media,
  items,
  highlights,
  layout,
  className,
}: {
  media?: ExperienceDetailSection["media"];
  items: readonly string[];
  highlights?: readonly string[];
  layout?: ExperienceDetailSection["layout"];
  className?: string;
}) {
  // Side media narrower than the default column (left 220px / right 360px)
  // shrinks the column with it, so the text keeps the freed-up width.
  const mediaColumnStyle =
    (media?.placement === "left" || media?.placement === "right") && media.maxWidth
      ? ({ "--media-col": `${media.maxWidth}px` } as CSSProperties)
      : undefined;

  return (
    <div
      className={cn(
        media?.placement === "left" &&
          "sm:grid sm:grid-cols-[var(--media-col,220px)_minmax(0,1fr)] sm:items-start sm:gap-4",
        media?.placement === "right" &&
          "sm:grid sm:grid-cols-[minmax(0,1fr)_var(--media-col,360px)] sm:items-start sm:gap-4",
        className,
      )}
      style={mediaColumnStyle}
    >
      {media ? (
        <div
          className={cn(
            media.placement === "left" || media.placement === "right"
              ? "mb-2.5 sm:mb-0"
              : "mb-2.5",
            media.placement === "right" && "sm:order-2",
          )}
          style={{ maxWidth: media.maxWidth }}
        >
          {media.href ? (
            <a
              href={media.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${media.alt} 링크 열기`}
              className="block overflow-hidden rounded-md no-underline transition hover:opacity-90"
            >
              <Image
                src={media.src}
                alt={media.alt}
                width={media.width}
                height={media.height}
                quality={95}
                className="h-auto w-full"
              />
            </a>
          ) : (
            <Image
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              quality={95}
              className="h-auto w-full rounded-md"
            />
          )}
        </div>
      ) : null}
      <div className={cn(media?.placement === "right" && "sm:order-1")}>
        {items.length > 0 ? (
          layout === "paragraphs" ? (
            <div className="space-y-2">
              {items.map(data => (
                <p
                  key={data}
                  className="break-keep text-sm font-normal leading-[1.6] text-foreground/75"
                >
                  {renderHighlightedText(data, highlights)}
                </p>
              ))}
            </div>
          ) : (
            <BulletList items={items} highlights={highlights} />
          )
        ) : null}
        {media?.href && media.linkLabel ? (
          <a
            href={media.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-end gap-1 pr-3 text-xs font-semibold text-primary/75 no-underline transition hover:text-primary"
          >
            {media.linkLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

function SubDetailMedia({ media }: { media: ExperienceDetailMedia }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative mx-auto mb-4 w-full overflow-hidden rounded-md border border-foreground/10 bg-slate-50"
      style={{
        aspectRatio: `${media.width} / ${media.height}`,
        maxWidth: media.maxWidth,
      }}
    >
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading="eager"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        role="status"
        aria-label="이미지 불러오는 중"
        className={cn(
          "absolute inset-0 grid place-items-center bg-slate-50 transition-opacity duration-200",
          isLoaded && "pointer-events-none opacity-0",
        )}
      >
        <Loader className="h-5 w-5 animate-spin text-[#FFD84D]" aria-hidden="true" />
      </div>
    </div>
  );
}

function PdfButton({
  label,
  onClick,
  compact,
  tone = "default",
  className,
}: {
  label: string;
  onClick: () => void;
  /** 좁은 자리에 들어갈 때 — 작은 글씨/패딩으로 축소 */
  compact?: boolean;
  tone?: "default" | "green";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-lg border bg-white font-semibold shadow-sm transition",
        tone === "green"
          ? "border-[#00C676]/30 text-[#00C676] hover:border-[#00C676]/60 hover:bg-[#00C676]/5"
          : "border-primary/20 text-primary hover:border-primary/35 hover:bg-primary/5",
        compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm",
        className,
      )}
    >
      <FileText className={compact ? "h-3.5 w-3.5 shrink-0" : "h-4 w-4"} />
      {label}
    </button>
  );
}

function SectionActionCards({
  actions,
  onOpenLegacyModal,
}: {
  actions?: ExperienceDetailSection["actions"];
  onOpenLegacyModal?: (modalName: string, images: string[]) => void;
}) {
  if (!actions?.length) return null;

  return (
    <div className="mt-3 flex flex-col gap-2.5">
      {actions.map(action => {
        const cardClassName = cn(
          "flex w-full items-start gap-3 rounded-xl border border-foreground/10 border-l-[3px] bg-foreground/[0.02] px-4 py-3 text-left no-underline transition-colors hover:bg-foreground/[0.04]",
          action.tone === "green" ? "border-l-[#00C676]" : "border-l-[#FFD84D]",
        );
        const content = (
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="break-keep text-sm font-semibold text-foreground/85">{action.title}</span>
              {action.period ? (
                <span className="text-[11px] font-medium text-foreground/40">{action.period}</span>
              ) : null}
            </div>
            <p className="mt-1 break-keep text-xs leading-[1.55] text-foreground/60">{action.description}</p>
            {action.label ? (
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary/75">
                {action.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            ) : null}
          </div>
        );

        if (action.modalName && onOpenLegacyModal) {
          return (
            <button
              key={`${action.title}-${action.modalName}`}
              type="button"
              onClick={() => onOpenLegacyModal(action.modalName!, action.modalImages ?? [])}
              className={cardClassName}
            >
              {content}
            </button>
          );
        }

        if (action.href) {
          const isExternal = /^https?:\/\//.test(action.href);
          return (
            <a
              key={`${action.title}-${action.href}`}
              href={action.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              onClick={event => {
                if (!action.href?.startsWith("#experience-")) return;

                event.preventDefault();
                window.history.pushState(null, "", action.href);
                window.dispatchEvent(new HashChangeEvent("hashchange"));
              }}
              className={cardClassName}
            >
              {content}
            </a>
          );
        }

        return null;
      })}
    </div>
  );
}

function PanelSection({
  section,
  pdfLink,
  subDetails = [],
  onOpenPdf,
  onOpenLegacyModal,
}: {
  section: ExperienceDetailSection;
  pdfLink?: ExperienceLink;
  subDetails?: readonly ExperienceSubDetail[];
  onOpenPdf: (pdf: ActivePdf) => void;
  onOpenLegacyModal?: (modalName: string, images: string[]) => void;
}) {
  const sectionPdf = section.pdf;
  const sectionTable = section.table;
  const beforeExtraActions = section.actions?.filter(action => action.position === "beforeExtra");
  const afterExtraActions = section.actions?.filter(action => action.position !== "beforeExtra");

  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <h4 className="mb-2 border-b border-slate-200 pb-1.5 text-sm font-bold text-foreground/85 md:text-base">
        {section.title}
      </h4>
      <MediaTextBlock
        media={section.media}
        items={section.items}
        highlights={section.highlights}
        layout={section.layout}
      />
      {sectionTable ? (
        <div
          className={cn(
            "overflow-x-auto rounded-lg border border-slate-200",
            section.items.length > 0 && "mt-3",
          )}
        >
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50">
              <tr>
                {sectionTable.headers.map(header => (
                  <th
                    key={header}
                    className="break-keep border-b border-slate-200 px-3 py-2 text-xs font-semibold text-foreground/70"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sectionTable.rows.map((row, rowIndex) => (
                <tr key={row[0] ?? rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className={cn(
                        "break-keep border-b border-slate-100 px-3 py-2 align-top text-[13px] leading-[1.6] text-foreground/75",
                        rowIndex === sectionTable.rows.length - 1 && "border-b-0",
                      )}
                    >
                      {renderHighlightedText(cell, section.highlights)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <SectionActionCards actions={beforeExtraActions} onOpenLegacyModal={onOpenLegacyModal} />
      {section.extra ? (
        sectionPdf?.inline ? (
          // 마지막 항목만 PDF 버튼과 같은 줄에 — 앞 항목들은 전체 폭을 그대로 유지
          <>
            {section.extra.items.length > 1 ? (
              <MediaTextBlock
                media={section.extra.media}
                items={section.extra.items.slice(0, -1)}
                highlights={section.extra.highlights}
                layout={section.extra.layout}
                className="mt-4"
              />
            ) : null}
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MediaTextBlock
                items={section.extra.items.slice(-1)}
                highlights={section.extra.highlights}
                layout={section.extra.layout}
                className="min-w-0 sm:flex-1"
              />
              <PdfButton
                label={sectionPdf.label}
                onClick={() =>
                  onOpenPdf({ href: sectionPdf.href, label: sectionPdf.label, sections: sectionPdf.sections })
                }
                compact
                tone={sectionPdf.tone}
                // 라벨의 \n을 그대로 살려 원하는 지점에서만 줄바꿈
                className="shrink-0 whitespace-pre-line text-left sm:min-w-[220px]"
              />
            </div>
          </>
        ) : (
          <MediaTextBlock
            media={section.extra.media}
            items={section.extra.items}
            highlights={section.extra.highlights}
            layout={section.extra.layout}
            className={
              section.extra.divider === false ? "mt-4" : "mt-4 border-t border-slate-100 pt-3.5"
            }
          />
        )
      ) : null}
      {section.docs?.length ? (
        // 소재별 문서 버튼 리스트 — 서브 카드와 같은 톤, 클릭 시 모달로 열림
        <div className={cn("flex flex-col gap-2", section.items.length > 0 && "mt-3")}>
          {section.docs.map(doc => (
            <button
              key={doc.href}
              type="button"
              onClick={() => onOpenPdf({ href: doc.href, label: doc.label, sections: doc.sections })}
              className="flex w-full items-center gap-3 rounded-xl border border-foreground/10 border-l-[3px] border-l-[#FFD84D] bg-foreground/[0.02] px-4 py-3 text-left transition-colors hover:bg-foreground/[0.03]"
            >
              <span className="min-w-0 flex-1 break-keep text-sm font-semibold text-foreground/85">
                {doc.label}
              </span>
              <FileText className="h-4 w-4 shrink-0 text-foreground/40" strokeWidth={1.5} />
            </button>
          ))}
        </div>
      ) : null}
      <SectionActionCards actions={afterExtraActions} onOpenLegacyModal={onOpenLegacyModal} />
      {sectionPdf && !(sectionPdf.inline && section.extra) ? (
        <PdfButton
          label={sectionPdf.label}
          onClick={() =>
            onOpenPdf({ href: sectionPdf.href, label: sectionPdf.label, sections: sectionPdf.sections })
          }
          tone={sectionPdf.tone}
          className={cn(section.items.length > 0 && "mt-3", sectionPdf.align === "right" && "ml-auto")}
        />
      ) : section.showPdf && pdfLink ? (
        <PdfButton
          label={pdfLink.label}
          onClick={() => onOpenPdf({ href: pdfLink.href, label: pdfLink.label })}
          className={cn(section.items.length > 0 && "mt-3")}
        />
      ) : null}
      {section.showSubDetails && subDetails.length > 0 ? (
        <SubDetailList
          subDetails={subDetails}
          onOpenPdf={onOpenPdf}
          onOpenLegacyModal={onOpenLegacyModal}
          plain
        />
      ) : null}
    </div>
  );
}

// Deep-dive cards below the main sections — same accordion idiom as ProjectCases.
function SubDetailList({
  subDetails,
  onOpenPdf,
  onOpenLegacyModal,
  plain,
}: {
  subDetails: readonly ExperienceSubDetail[];
  onOpenPdf: (pdf: ActivePdf) => void;
  onOpenLegacyModal?: (modalName: string, images: string[]) => void;
  /** 섹션 안에 임베드될 때 — 상단 구분선/라벨 없이 카드만 */
  plain?: boolean;
}) {
  const t = useTranslations("Experience");
  const [openId, setOpenId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleSubDetail = (
    id: string,
    isOpen: boolean,
    event: ReactMouseEvent<HTMLButtonElement>,
  ) => {
    const shouldOpen = !isOpen;
    const trigger = event.currentTarget;
    setOpenId(shouldOpen ? id : null);

    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }

    if (!shouldOpen || !window.matchMedia("(max-width: 767px)").matches) return;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        trigger.focus({ preventScroll: true });
        scrollTimerRef.current = setTimeout(() => {
          cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
          scrollTimerRef.current = null;
        }, 250);
      });
    });
  };

  useEffect(() => () => {
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
  }, []);

  return (
    <div className={plain ? "mt-2" : "mt-3 border-t border-slate-200 pt-3"}>
      {plain ? null : (
        <p className="mb-2.5 text-xs font-semibold text-foreground/40">{t("subDetails")}</p>
      )}
      <div className="flex flex-col gap-2.5">
        {subDetails.map(sub => {
          const isOpen = openId === sub.id;

          return (
            <div
              key={sub.id}
              ref={element => {
                cardRefs.current[sub.id] = element;
              }}
              className={cn(
                "scroll-mt-20 overflow-hidden rounded-xl bg-foreground/[0.02] [transition-property:border-color,border-width] duration-300 ease-out",
                isOpen
                  ? "border-[3px] border-[#FFD84D]"
                  : "border border-foreground/10 border-l-[3px] border-l-[#FFD84D]",
              )}
            >
              <button
                type="button"
                onClick={event => toggleSubDetail(sub.id, isOpen, event)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-foreground/[0.03]"
              >
                <span className="min-w-0 flex-1 break-keep text-sm font-semibold text-foreground/85">
                  {sub.title}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-foreground/40 transition-transform",
                    isOpen && "rotate-180",
                  )}
                  strokeWidth={1.5}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1">
                      {sub.media ? <SubDetailMedia media={sub.media} /> : null}
                      {sub.sections.map(section => (
                        <PanelSection
                          key={section.title}
                          section={section}
                          onOpenPdf={onOpenPdf}
                          onOpenLegacyModal={onOpenLegacyModal}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ExperienceDetailPanel({
  id,
  items = [],
  sections = [],
  subDetails = [],
  pdfLink,
  onOpenPdf,
  onOpenLegacyModal,
  className,
}: ExperienceDetailPanelProps) {
  if (items.length === 0 && sections.length === 0 && subDetails.length === 0 && !pdfLink) {
    return null;
  }

  return (
    <div
      id={id}
      className={cn(
        "w-full rounded-lg border border-slate-200 bg-white p-3 md:max-w-[620px]",
        className,
      )}
    >
      {sections.length > 0 ? (
        <div>
          {sections.map(section => (
            <PanelSection
              key={section.title}
              section={section}
              pdfLink={pdfLink}
              subDetails={subDetails}
              onOpenPdf={onOpenPdf}
              onOpenLegacyModal={onOpenLegacyModal}
            />
          ))}
        </div>
      ) : items.length > 0 ? (
        <ul className="list-inside list-disc -indent-5 pl-6">
          {items.map((data, index) => (
            <li
              key={`${data}-${index}`}
              className="mb-1 text-sm font-normal text-foreground/80 last:mb-0 md:text-base"
            >
              {data}
            </li>
          ))}
        </ul>
      ) : null}

      {sections.length === 0 && pdfLink ? (
        <PdfButton
          label={pdfLink.label}
          onClick={() => onOpenPdf({ href: pdfLink.href, label: pdfLink.label })}
          className={cn(items.length > 0 && "mt-4")}
        />
      ) : null}

      {/* 어떤 섹션도 showSubDetails로 가져가지 않았을 때만 패널 하단에 표시 */}
      {subDetails.length > 0 && !sections.some(section => section.showSubDetails) ? (
        <SubDetailList
          subDetails={subDetails}
          onOpenPdf={onOpenPdf}
          onOpenLegacyModal={onOpenLegacyModal}
        />
      ) : null}
    </div>
  );
}
