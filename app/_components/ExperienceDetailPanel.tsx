"use client";

import { useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronDown, FileText } from "react-feather";

import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

import type {
  ExperienceDetailSection,
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
            <ul className="list-disc space-y-0.5 pl-5">
              {items.map(data => (
                <li
                  key={data}
                  className="break-keep text-sm font-normal leading-[1.5] text-foreground/75"
                >
                  {renderHighlightedText(data, highlights)}
                </li>
              ))}
            </ul>
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

function PdfButton({
  label,
  onClick,
  compact,
  className,
}: {
  label: string;
  onClick: () => void;
  /** 좁은 자리에 들어갈 때 — 작은 글씨/패딩으로 축소 */
  compact?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-lg border border-primary/20 bg-white font-semibold text-primary shadow-sm transition hover:border-primary/35 hover:bg-primary/5",
        compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm",
        className,
      )}
    >
      <FileText className={compact ? "h-3.5 w-3.5 shrink-0" : "h-4 w-4"} />
      {label}
    </button>
  );
}

function PanelSection({
  section,
  pdfLink,
  subDetails = [],
  onOpenPdf,
}: {
  section: ExperienceDetailSection;
  pdfLink?: ExperienceLink;
  subDetails?: readonly ExperienceSubDetail[];
  onOpenPdf: (pdf: ActivePdf) => void;
}) {
  const sectionPdf = section.pdf;

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
      {sectionPdf && !(sectionPdf.inline && section.extra) ? (
        <PdfButton
          label={sectionPdf.label}
          onClick={() =>
            onOpenPdf({ href: sectionPdf.href, label: sectionPdf.label, sections: sectionPdf.sections })
          }
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
        <SubDetailList subDetails={subDetails} onOpenPdf={onOpenPdf} plain />
      ) : null}
    </div>
  );
}

// Deep-dive cards below the main sections — same accordion idiom as ProjectCases.
function SubDetailList({
  subDetails,
  onOpenPdf,
  plain,
}: {
  subDetails: readonly ExperienceSubDetail[];
  onOpenPdf: (pdf: ActivePdf) => void;
  /** 섹션 안에 임베드될 때 — 상단 구분선/라벨 없이 카드만 */
  plain?: boolean;
}) {
  const t = useTranslations("Experience");
  const [openId, setOpenId] = useState<string | null>(null);

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
              className="overflow-hidden rounded-xl border border-foreground/10 border-l-[3px] border-l-primary/50 bg-foreground/[0.02]"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : sub.id)}
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
                      {sub.sections.map(section => (
                        <PanelSection
                          key={section.title}
                          section={section}
                          onOpenPdf={onOpenPdf}
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
        <SubDetailList subDetails={subDetails} onOpenPdf={onOpenPdf} />
      ) : null}
    </div>
  );
}
