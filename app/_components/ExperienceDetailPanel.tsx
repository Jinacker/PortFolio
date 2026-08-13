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
  ExperienceStoreLink,
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

const STORE_BADGES = {
  appstore: {
    name: "App Store",
    caption: "iPhone",
    logo: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-white">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    ),
  },
  playstore: {
    name: "Google Play",
    caption: "Android",
    logo: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px]">
        <path d="M3.18 1.94A1.5 1.5 0 0 0 3 2.66v18.68c0 .27.07.52.18.72l10.1-10.06z" fill="#00A0FF" />
        <path d="M16.63 15.4l-3.35-3.34v-.13l3.35-3.34.08.05 3.97 2.25c1.13.64 1.13 1.69 0 2.34l-3.97 2.25z" fill="#FFBC00" />
        <path d="M16.71 15.33L13.28 12 3.18 22.06c.37.4.99.45 1.68.06z" fill="#FF3A44" />
        <path d="M16.71 8.67L4.86 1.88C4.17 1.49 3.55 1.54 3.18 1.94L13.28 12z" fill="#00D46A" />
      </svg>
    ),
  },
} as const;

// 앱 마켓 설치 버튼 — 실제 스토어 배지와 같은 다크 필 형태
function StoreLinkButtons({
  links,
  className,
}: {
  links?: readonly ExperienceStoreLink[];
  className?: string;
}) {
  if (!links?.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map(link => {
        const badge = STORE_BADGES[link.store];

        return (
          <a
            key={link.store}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-[#1b1b1f] px-3.5 py-2 no-underline transition hover:bg-[#2c2c31]"
          >
            {badge.logo}
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-medium tracking-wide text-white/55">
                {badge.caption}
              </span>
              <span className="mt-1 text-[13px] font-semibold text-white">{badge.name}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}

// 서비스 한 줄 슬로건 — 따옴표와 브랜드 강조색으로 본문과 확실히 구분한다
function SloganLine({ text, className }: { text: string; className?: string }) {
  return (
    <p
      className={cn(
        "break-keep text-[15px] font-bold leading-[1.5] text-[#D9432F]",
        className,
      )}
    >
      <span className="mr-0.5 text-[#D9432F]/45">&ldquo;</span>
      {text}
      <span className="ml-0.5 text-[#D9432F]/45">&rdquo;</span>
    </p>
  );
}

// 애니메이션은 GIF 대신 mp4로 넣는다 — Next 최적화기가 GIF는 원본 그대로 내보낸다.
const isVideoSrc = (src: string) => src.toLowerCase().endsWith(".mp4");

function MediaImage({ media }: { media: ExperienceDetailMedia }) {
  const isCircle = media.shape === "circle";
  const shared = cn(
    isCircle
      ? "aspect-square h-auto w-full rounded-full border border-foreground/10 object-cover"
      : media.frameAspectRatio
        ? "h-full w-full object-cover"
        : "h-auto w-full rounded-md",
  );
  const image = isVideoSrc(media.src) ? (
    <video
      src={media.src}
      width={media.width}
      height={media.height}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={media.alt}
      className={shared}
    />
  ) : (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      quality={95}
      className={shared}
    />
  );

  const linked = media.href ? (
    <a
      href={media.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${media.alt} 링크 열기`}
      className={cn(
        "block overflow-hidden no-underline transition hover:opacity-85",
        isCircle ? "rounded-full" : "rounded-md",
        !isCircle && media.frameAspectRatio && "h-full",
      )}
    >
      {image}
    </a>
  ) : (
    image
  );

  if (!media.caption) return linked;

  return (
    <div>
      {linked}
      <p
        className={cn(
          "mt-1.5 break-keep text-center text-[11px] font-medium leading-snug",
          media.href ? "text-primary/70" : "text-foreground/50",
        )}
      >
        {media.caption}
      </p>
    </div>
  );
}

function MediaTextBlock({
  media,
  items,
  highlights,
  layout,
  slogan,
  heading,
  storeLinks,
  className,
}: {
  media?: ExperienceDetailSection["media"];
  items: readonly string[];
  highlights?: readonly string[];
  layout?: ExperienceDetailSection["layout"];
  slogan?: string;
  /** 텍스트 칼럼 맨 위 소제목 — 좌/우 배치일 때 이미지 옆에 함께 들어간다 */
  heading?: string;
  storeLinks?: readonly ExperienceStoreLink[];
  className?: string;
}) {
  // 한 장이든 여러 장이든 같은 슬롯으로 다루고, 줄 전체의 배치는 첫 이미지를 따른다.
  const mediaItems = media ? (Array.isArray(media) ? media : [media]) : [];
  const rowMedia = mediaItems[0];
  // 원형은 정사각으로 잘리므로 비율을 1로 본다
  const mediaRatio = (item: ExperienceDetailMedia) =>
    item.shape === "circle" ? 1 : item.width / item.height;
  const mediaRatioSum = mediaItems.reduce((sum, item) => sum + mediaRatio(item), 0);

  // Side media narrower than the default column (left 220px / right 360px)
  // shrinks the column with it, so the text keeps the freed-up width.
  const isSideMedia = rowMedia?.placement === "left" || rowMedia?.placement === "right";
  const mediaColumnStyle = isSideMedia
    ? ({
        ...(rowMedia.maxWidth ? { "--media-col": `${rowMedia.maxWidth}px` } : {}),
        // 가로 간격만 덮어쓴다 — 모바일에서는 그리드가 아니라 영향이 없다
        ...(rowMedia.gap !== undefined ? { columnGap: rowMedia.gap } : {}),
        ...(rowMedia.textOffset !== undefined
          ? { "--text-offset": `${rowMedia.textOffset}px` }
          : {}),
      } as CSSProperties)
    : undefined;

  return (
    <div
      className={cn(
        rowMedia?.placement === "left" &&
          "sm:grid sm:grid-cols-[var(--media-col,220px)_minmax(0,1fr)] sm:items-start sm:gap-4",
        rowMedia?.placement === "right" &&
          "sm:grid sm:grid-cols-[minmax(0,1fr)_var(--media-col,360px)] sm:items-start sm:gap-4",
        rowMedia?.placement === "bottom" && "flex flex-col",
        className,
      )}
      style={mediaColumnStyle}
    >
      {rowMedia ? (
        <div
          className={cn(
            rowMedia.placement === "left" || rowMedia.placement === "right"
              ? "mb-2.5 sm:mb-0"
              : rowMedia.placement === "bottom"
                ? "order-2 mt-3"
                : "mb-2.5",
            rowMedia.placement === "right" && "sm:order-2",
            mediaItems.length === 1 && rowMedia.frameAspectRatio && "overflow-hidden rounded-md",
          )}
          style={{
            maxWidth: rowMedia.maxWidth,
            aspectRatio: mediaItems.length === 1 ? rowMedia.frameAspectRatio : undefined,
          }}
        >
          {mediaItems.length === 1 ? (
            <MediaImage media={rowMedia} />
          ) : (
            // 기본은 비율대로 폭을 나눠 높이를 맞추고, equalWidth면 같은 폭으로 배치한다.
            <div className="flex items-start gap-2">
              {mediaItems.map(item => (
                <div
                  key={item.src}
                  className="min-w-0"
                  style={{
                    flex: rowMedia.equalWidth
                      ? "1 1 0%"
                      : `${mediaRatio(item) / mediaRatioSum} 1 0%`,
                  }}
                >
                  <MediaImage media={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
      <div
        className={cn(
          rowMedia?.placement === "right" && "sm:order-1",
          rowMedia?.placement === "bottom" && "order-1",
          // 좌/우 배치에서 텍스트만 아래로 — 모바일(세로 적층)에서는 적용하지 않는다
          isSideMedia && rowMedia.textOffset !== undefined && "sm:pt-[var(--text-offset,0px)]",
        )}
      >
        {heading ? (
          <h5 className="mb-2 break-keep text-[15px] font-bold text-foreground/90">{heading}</h5>
        ) : null}
        {slogan ? <SloganLine text={slogan} className={items.length > 0 ? "mb-2.5" : undefined} /> : null}
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
        {rowMedia?.href && rowMedia.linkLabel ? (
          <a
            href={rowMedia.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-end gap-1 pr-3 text-xs font-semibold text-primary/75 no-underline transition hover:text-primary"
          >
            {rowMedia.linkLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : null}
        <StoreLinkButtons links={storeLinks} className={items.length > 0 || slogan ? "mt-3.5" : undefined} />
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
      {isVideoSrc(media.src) ? (
        <video
          src={media.src}
          width={media.width}
          height={media.height}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={media.alt}
          onLoadedData={() => setIsLoaded(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
        />
      ) : (
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
      )}
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
  tone?: "default" | "green" | "blue";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-lg border bg-white font-semibold shadow-sm transition",
        tone === "blue"
          ? "border-[#3B82F6]/30 text-[#3B82F6] hover:border-[#3B82F6]/60 hover:bg-[#3B82F6]/5"
          : tone === "green"
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
        const afterText = action.afterText ? (
          <p className="mt-3 break-keep px-1 text-sm font-normal leading-[1.6] text-foreground/75">
            {renderHighlightedText(action.afterText, action.afterHighlights)}
          </p>
        ) : null;
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
            <div key={`${action.title}-${action.modalName}`}>
              <button
                type="button"
                onClick={() => onOpenLegacyModal(action.modalName!, action.modalImages ?? [])}
                className={cardClassName}
              >
                {content}
              </button>
              {afterText}
            </div>
          );
        }

        if (action.href) {
          const isExternal = /^https?:\/\//.test(action.href);
          return (
            <div key={`${action.title}-${action.href}`}>
              <a
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
              {afterText}
            </div>
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
  // extra는 한 덩어리로도, 여러 덩어리를 이어 붙이는 배열로도 쓸 수 있다.
  const extraBlocks = section.extra
    ? Array.isArray(section.extra)
      ? section.extra
      : [section.extra]
    : [];
  // PDF 버튼을 본문 마지막 줄에 끼워 넣는 레거시 경로는 단일 extra에서만 쓴다.
  const inlinePdfExtra = sectionPdf?.inline ? extraBlocks[0] : undefined;
  const beforeExtraActions = section.actions?.filter(action => action.position === "beforeExtra");
  const afterExtraActions = section.actions?.filter(action => action.position !== "beforeExtra");

  return (
    <div className="py-3 first:pt-0 last:pb-0" data-section-title={section.title}>
      <h4 className="mb-2 border-b border-slate-200 pb-1.5 text-sm font-bold text-foreground/85 md:text-base">
        {section.title}
      </h4>
      <MediaTextBlock
        media={section.media}
        items={section.items}
        highlights={section.highlights}
        layout={section.layout}
        slogan={section.slogan}
        storeLinks={section.storeLinks}
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
      {inlinePdfExtra ? (
        // 마지막 항목만 PDF 버튼과 같은 줄에 — 앞 항목들은 전체 폭을 그대로 유지
        <>
          {inlinePdfExtra.items.length > 1 ? (
            <MediaTextBlock
              media={inlinePdfExtra.media}
              items={inlinePdfExtra.items.slice(0, -1)}
              highlights={inlinePdfExtra.highlights}
              layout={inlinePdfExtra.layout}
              className="mt-4"
            />
          ) : null}
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MediaTextBlock
              items={inlinePdfExtra.items.slice(-1)}
              highlights={inlinePdfExtra.highlights}
              layout={inlinePdfExtra.layout}
              className="min-w-0 sm:flex-1"
            />
            <PdfButton
              label={sectionPdf!.label}
              onClick={() =>
                onOpenPdf({ href: sectionPdf!.href, label: sectionPdf!.label, sections: sectionPdf!.sections })
              }
              compact
              tone={sectionPdf!.tone}
              // 라벨의 \n을 그대로 살려 원하는 지점에서만 줄바꿈
              className="shrink-0 whitespace-pre-line text-left sm:min-w-[220px]"
            />
          </div>
        </>
      ) : (
        extraBlocks.map((block, index) => (
          <MediaTextBlock
            key={block.items[0] ?? `extra-${index}`}
            media={block.media}
            items={block.items}
            highlights={block.highlights}
            layout={block.layout}
            heading={block.heading}
            className={block.divider === false ? "mt-4" : "mt-4 border-t border-slate-100 pt-3.5"}
          />
        ))
      )}
      {section.docs?.length ? (
        // 소재별 문서 버튼 리스트 — 서브 카드와 같은 톤, 클릭 시 모달로 열림
        <div
          className={cn(
            "flex flex-col gap-2",
            sectionTable ? "mt-4" : section.items.length > 0 && "mt-3",
          )}
        >
          {section.docs.map(doc => (
            <button
              key={doc.href}
              type="button"
              data-doc-href={doc.href}
              onClick={() => onOpenPdf({ href: doc.href, label: doc.label, sections: doc.sections })}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border border-foreground/10 border-l-[3px] bg-foreground/[0.02] px-4 py-3 text-left transition-colors hover:bg-foreground/[0.03]",
                doc.tone === "blue"
                  ? "border-l-[#3B82F6]"
                  : doc.tone === "green"
                    ? "border-l-[#00C676]"
                    : "border-l-[#FFD84D]",
              )}
            >
              <span className="min-w-0 flex-1 break-keep text-sm font-semibold text-foreground/85">
                {doc.label}
              </span>
              <FileText
                className={cn(
                  "h-4 w-4 shrink-0",
                  doc.tone === "blue"
                    ? "text-[#3B82F6]/70"
                    : doc.tone === "green"
                      ? "text-[#00C676]/70"
                      : "text-foreground/40",
                )}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
      ) : null}
      <SectionActionCards actions={afterExtraActions} onOpenLegacyModal={onOpenLegacyModal} />
      {sectionPdf && !inlinePdfExtra ? (
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
          directToModal={section.subDetailsMode === "modal"}
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
  directToModal,
}: {
  subDetails: readonly ExperienceSubDetail[];
  onOpenPdf: (pdf: ActivePdf) => void;
  onOpenLegacyModal?: (modalName: string, images: string[]) => void;
  /** 섹션 안에 임베드될 때 — 상단 구분선/라벨 없이 카드만 */
  plain?: boolean;
  /** 중간 아코디언 없이 subDetail의 문서를 모달로 바로 연다 */
  directToModal?: boolean;
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
          const isGreen = sub.tone === "green";
          const isBlue = sub.tone === "blue";
          const accentBorder = isBlue
            ? "border-[#3B82F6]"
            : isGreen
              ? "border-[#00C676]"
              : "border-[#FFD84D]";
          const accentLeftBorder = isBlue
            ? "border-l-[#3B82F6]"
            : isGreen
              ? "border-l-[#00C676]"
              : "border-l-[#FFD84D]";
          const directDoc = directToModal
            ? sub.sections.flatMap(section => section.docs ?? [])[0]
            : undefined;

          if (directToModal && directDoc) {
            return (
              <div key={sub.id} className="flex flex-col gap-3">
                <button
                  type="button"
                  data-doc-href={directDoc.href}
                  onClick={() =>
                    onOpenPdf({
                      href: directDoc.href,
                      label: sub.title,
                      sections: directDoc.sections,
                    })
                  }
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border border-foreground/10 border-l-[3px] bg-foreground/[0.02] px-4 py-3 text-left transition-colors hover:bg-foreground/[0.03]",
                    accentLeftBorder,
                  )}
                >
                  <span className="min-w-0 flex-1 break-keep text-sm font-semibold text-foreground/85">
                    {sub.title}
                  </span>
                  <FileText className="h-4 w-4 shrink-0 text-foreground/40" strokeWidth={1.5} />
                </button>
                {sub.afterText ? (
                  <p className="break-keep px-1 text-sm font-normal leading-[1.6] text-foreground/75">
                    {renderHighlightedText(sub.afterText, sub.afterHighlights)}
                  </p>
                ) : null}
              </div>
            );
          }

          return (
            <div key={sub.id} className="flex flex-col gap-3">
              <div
                ref={element => {
                  cardRefs.current[sub.id] = element;
                }}
                className={cn(
                  "scroll-mt-20 overflow-hidden rounded-xl bg-foreground/[0.02] [transition-property:border-color,border-width] duration-300 ease-out",
                  isOpen
                    ? cn("border-[3px]", accentBorder)
                    : cn(
                        "border border-foreground/10 border-l-[3px]",
                        accentLeftBorder,
                      ),
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
              {sub.afterText ? (
                <p className="break-keep px-1 text-sm font-normal leading-[1.6] text-foreground/75">
                  {renderHighlightedText(sub.afterText, sub.afterHighlights)}
                </p>
              ) : null}
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
