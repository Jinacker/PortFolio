"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "react-feather";

import cn from "classnames";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import parse from "html-react-parser";
import { useTranslations } from "next-intl";

import Shape from "@/assets/shape-sparkle.svg";
import type { Experience, Skill } from "@/data/types";
import { EXPERIENCE_DEEP_LINK_TARGETS } from "@/utils/experienceDeepLinks";

import ExperienceDetailPanel, { type ActivePdf } from "./ExperienceDetailPanel";
import SkillItem from "./skill/SkillItem";

const PdfViewerModal = dynamic(() => import("./PdfViewerModal"), { ssr: false });
const MarkdownViewerModal = dynamic(() => import("./MarkdownViewerModal"), { ssr: false });
const LegacyTimelineModals = dynamic(() => import("./LegacyTimelineModals"), { ssr: false });

interface ExpCardProps extends Omit<Experience, "skill_ids"> {
  skills: Skill[];
}

// 상세 패널 펼침 애니메이션 길이 — 이 뒤에 소재 위치가 확정된다
const PANEL_EXPAND_DURATION_MS = 400;
// scrollend를 지원하지 않는 브라우저에서 마지막 scroll 이벤트 뒤 기다리는 시간
const SCROLL_SETTLE_DELAY_MS = 120;

const skillGroups = [
  {
    label: "Core",
    categories: ["MERMAID_CORE"],
  },
  {
    label: "Test & Quality",
    categories: ["MERMAID_TEST_QUALITY"],
  },
  {
    label: "Build & Workflow",
    categories: ["MERMAID_BUILD_WORKFLOW"],
  },
  {
    label: "Model",
    categories: ["AI_MODEL"],
  },
  {
    label: "Agent",
    categories: ["AI_AGENT"],
  },
  {
    label: "AI Infra",
    categories: ["AI_INFRA"],
  },
  {
    label: "AI Eng",
    categories: ["KKINI_AI_SERVER"],
  },
  {
    label: "BackEnd",
    categories: ["KKINI_CHATBOT"],
  },
  {
    label: "FrontEnd",
    categories: ["KKINI_APP"],
  },
  {
    label: "FrontEnd",
    categories: ["FRONTEND", "FRONTEND_LIBRARY", "DESIGN"],
  },
  {
    label: "BackEnd",
    categories: ["BACKEND", "RUNTIME_LANGUAGE", "FRAMEWORK_API"],
  },
  {
    label: "Auth",
    categories: ["DATA_AUTH"],
  },
  {
    label: "Infra & Tools",
    categories: ["INFRA_TEST", "ENV", "VALIDATION_SECURITY", "CLOUD_INFRA"],
  },
  {
    label: "기타",
    categories: ["ETC"],
  },
];

const formatPeriod = (period: string) => {
  const separator = period.includes(" - ") ? " - " : period.includes(" ~ ") ? " ~ " : null;

  if (!separator) {
    return <span>{period}</span>;
  }

  const [start, end] = period.split(separator);

  return (
    <span className="flex flex-col items-center leading-tight">
      <span>{start}</span>
      <span className="text-foreground/35">-</span>
      <span>{end}</span>
    </span>
  );
};

const ExpCard = ({
  id,
  period,
  hidePeriod,
  is_active,
  title,
  sub_title,
  skills,
  items,
  links,
  pdfSections,
  detailSections,
  subDetails,
  category,
  imageUrl,
  imageBackgroundColor,
  placeholderSlots,
}: ExpCardProps) => {
  const t = useTranslations("Experience");
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePdf, setActivePdf] = useState<ActivePdf | null>(null);
  const [activeLegacyModal, setActiveLegacyModal] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const deepLinkScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollSettleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeScrollEndListenerRef = useRef<(() => void) | null>(null);
  const shapeColor =
    category === "STARTUP"
      ? "text-[#FFD84D]"
      : category === "WORK" || category === "OPEN_SOURCE"
        ? "text-[#00C676]"
        : is_active
          ? "text-primary"
          : "text-foreground/30";
  const pdfLink = links.find(link => link.href.toLowerCase().endsWith(".pdf"));
  const hasDetailContent =
    items.length > 0 ||
    links.length > 0 ||
    Boolean(detailSections?.length) ||
    Boolean(subDetails?.length);
  const isDraft = Boolean(placeholderSlots && !hasDetailContent);
  const showImageSlot = Boolean(imageUrl || placeholderSlots);
  const hasDetailedBackendGroups = skills.some(skill =>
    ["DATA_AUTH", "VALIDATION_SECURITY", "CLOUD_INFRA", "MERMAID_CORE", "MERMAID_TEST_QUALITY", "MERMAID_BUILD_WORKFLOW"].includes(skill.category),
  );

  const toggleDetail = () => {
    const shouldExpand = !isExpanded;
    setIsExpanded(shouldExpand);

    if (!shouldExpand || !window.matchMedia("(max-width: 767px)").matches) return;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const card = cardRef.current;
        card?.focus({ preventScroll: true });
        card?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const detailId = `experience-${id}-detail`;
  const isAnimatedImage = Boolean(imageUrl?.toLowerCase().endsWith(".gif"));

  useEffect(() => {
    const scrollToCard = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          cardRef.current?.focus({ preventScroll: true });
          cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    };

    const scrollToDeepLinkTarget = (selector: string, block: ScrollLogicalPosition = "center") => {
      const target = cardRef.current?.querySelector(selector);

      if (target) target.scrollIntoView({ behavior: "smooth", block });
      else cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // 스크롤이 실제로 멈춘 뒤에 이어서 실행한다.
    // scrollend를 지원하지 않는 브라우저에서는 마지막 scroll 이벤트를 기준으로 판정한다.
    const runAfterScrollEnd = (run: () => void) => {
      const scrollTarget: EventTarget = window;
      let hasRun = false;

      removeScrollEndListenerRef.current?.();
      removeScrollEndListenerRef.current = null;
      if (scrollSettleTimerRef.current) clearTimeout(scrollSettleTimerRef.current);
      scrollSettleTimerRef.current = null;

      const finish = () => {
        if (hasRun) return;
        hasRun = true;
        scrollTarget.removeEventListener("scroll", scheduleFallback);
        scrollTarget.removeEventListener("scrollend", finish);
        if (scrollSettleTimerRef.current) clearTimeout(scrollSettleTimerRef.current);
        scrollSettleTimerRef.current = null;
        removeScrollEndListenerRef.current = null;
        run();
      };

      const scheduleFallback = () => {
        if (scrollSettleTimerRef.current) clearTimeout(scrollSettleTimerRef.current);
        scrollSettleTimerRef.current = setTimeout(finish, SCROLL_SETTLE_DELAY_MS);
      };

      scrollTarget.addEventListener("scroll", scheduleFallback, { passive: true });
      scrollTarget.addEventListener("scrollend", finish);
      scheduleFallback();
      removeScrollEndListenerRef.current = () => {
        scrollTarget.removeEventListener("scroll", scheduleFallback);
        scrollTarget.removeEventListener("scrollend", finish);
      };
    };

    const deepLinkTarget = EXPERIENCE_DEEP_LINK_TARGETS[id];

    const openFromHash = () => {
      const defaultHash = `#experience-${id}`;
      const cardOnlyHash = `${defaultHash}-card`;
      const isCardOnlyDeepLink = window.location.hash === cardOnlyHash;

      if (window.location.hash !== defaultHash && !isCardOnlyDeepLink) return;

      scrollToCard();

      runAfterScrollEnd(() => {
        setIsExpanded(true);

        if (isCardOnlyDeepLink || !deepLinkTarget) {
          // 펼치면서 생긴 레이아웃 변화를 반영해 카드 상단으로 다시 맞춘다.
          scrollToCard();
          return;
        }

        // 패널이 다 펼쳐진 뒤 → 그 소재까지 내려가고 → 다 내려간 다음 모달을 연다.
        if (deepLinkScrollTimerRef.current) clearTimeout(deepLinkScrollTimerRef.current);
        deepLinkScrollTimerRef.current = setTimeout(() => {
          deepLinkScrollTimerRef.current = null;

          if (deepLinkTarget.kind === "section") {
            scrollToDeepLinkTarget(`[data-section-title="${deepLinkTarget.title}"]`, "start");
            return;
          }

          scrollToDeepLinkTarget(`[data-doc-href="${deepLinkTarget.href}"]`);
          runAfterScrollEnd(() => {
            setActivePdf({ href: deepLinkTarget.href, label: deepLinkTarget.label });
          });
        }, PANEL_EXPAND_DURATION_MS);
      });
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => {
      window.removeEventListener("hashchange", openFromHash);
      if (deepLinkScrollTimerRef.current) clearTimeout(deepLinkScrollTimerRef.current);
      if (scrollSettleTimerRef.current) clearTimeout(scrollSettleTimerRef.current);
      removeScrollEndListenerRef.current?.();
    };
  }, [id]);

  const openLegacyModal = (modalName: string, images: string[]) => {
    images.forEach(src => {
      const image = new window.Image();
      image.src = src;
    });
    setActiveLegacyModal(modalName);
  };

  return (
    <div
      id={`experience-${id}`}
      ref={cardRef}
      tabIndex={-1}
      className="grid scroll-mt-20 outline-none sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-x-8 sm:items-start sm:pl-16"
    >
      <div className="flex gap-2.5 sm:justify-end items-start mb-3">
        <Shape className={cn(shapeColor)} />
        {hidePeriod ? null : (
          <p className="text-center text-sm md:text-base font-normal text-foreground/60">{formatPeriod(period)}</p>
        )}
      </div>

      <div className="pl-6 sm:pl-0 flex flex-col gap-3">
        {imageUrl ? (
          <button
            type="button"
            onClick={toggleDetail}
            aria-expanded={isExpanded}
            aria-controls={detailId}
            aria-label={`${title} 자세히 보기`}
            className="relative h-36 w-full cursor-pointer overflow-hidden rounded-md border border-foreground/10 bg-white shadow-sm sm:hidden"
            style={imageBackgroundColor ? { backgroundColor: imageBackgroundColor } : undefined}
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              unoptimized={isAnimatedImage}
              className={title.includes("TradLab") || title.includes("끼니톡") || title.includes("Kkinni") ? "object-cover" : title === "돈가스 지도" ? "scale-[1.06] object-contain" : title === "AI, 모델에서 제품으로" ? "-translate-y-1 scale-[1.22] object-contain" : "object-contain"}
              sizes="calc(100vw - 3rem)"
            />
          </button>
        ) : placeholderSlots ? (
          <div
            role="img"
            aria-label="이미지 입력 예정"
            className="h-36 w-full rounded-md border border-dashed border-foreground/15 bg-foreground/[0.015] sm:hidden"
          />
        ) : null}

        {isDraft ? (
          <div className="flex flex-col gap-1 text-left">
            <p className="text-base font-semibold md:text-lg">{title}</p>
            {sub_title ? (
              <p className="whitespace-pre-wrap text-xs font-normal text-foreground/60 md:text-sm">
                {parse(sub_title)}
              </p>
            ) : null}
          </div>
        ) : (
          <button
            type="button"
            onClick={toggleDetail}
            aria-expanded={isExpanded}
            aria-controls={detailId}
            className="flex cursor-pointer flex-col gap-1 text-left"
          >
            <p className="text-base font-semibold md:text-lg">{title}</p>
            {sub_title ? (
              <p className="whitespace-pre-wrap text-xs font-normal text-foreground/60 md:text-sm">
                {parse(sub_title)}
              </p>
            ) : null}
          </button>
        )}

        <div className={cn("flex gap-1", showImageSlot ? "items-start" : "flex-col")}>
          {imageUrl ? (
            <button
              type="button"
              onClick={toggleDetail}
              aria-expanded={isExpanded}
              aria-controls={detailId}
              aria-label={`${title} 자세히 보기`}
              className="relative mt-3 hidden h-36 w-[17rem] shrink-0 cursor-pointer overflow-hidden rounded-md border border-foreground/10 bg-white shadow-sm sm:block"
              style={imageBackgroundColor ? { backgroundColor: imageBackgroundColor } : undefined}
            >
              <Image
                src={imageUrl}
                alt={title}
                fill
                unoptimized={isAnimatedImage}
                className={title.includes("TradLab") || title.includes("끼니톡") || title.includes("Kkinni") ? "object-cover" : title === "돈가스 지도" ? "scale-[1.06] object-contain" : title === "AI, 모델에서 제품으로" ? "-translate-y-1 scale-[1.22] object-contain" : "object-contain"}
                sizes="272px"
              />
            </button>
          ) : placeholderSlots ? (
            <div
              role="img"
              aria-label="이미지 입력 예정"
              className="mt-3 hidden h-36 w-[17rem] shrink-0 rounded-md border border-dashed border-foreground/15 bg-foreground/[0.015] sm:block"
            />
          ) : null}
          {showImageSlot ? (
            <div className="ml-3 mt-3 hidden h-36 w-px shrink-0 bg-foreground/10 sm:block" />
          ) : null}

          <div className="ml-3 flex min-w-0 flex-1 flex-col gap-2">
            {skills.length === 0 && placeholderSlots ? (
              <div
                aria-label="기술 스택 입력 예정"
                className="h-16 w-full rounded-md border border-dashed border-foreground/15 bg-foreground/[0.015]"
              />
            ) : null}
            {skillGroups.map(({ label, categories }) => {
              const groupSkills = skills.filter(skill => categories.includes(skill.category));

              if (groupSkills.length === 0) {
                return null;
              }

              return (
                <div key={`experience-${id}-skill-group-${label}`} className="flex items-center gap-0.5">
                  <p className={cn("shrink-0 text-[10px] font-semibold text-foreground/35", hasDetailedBackendGroups ? "w-[96px] md:w-[108px]" : "w-[50px] md:w-14")}>{label}</p>
                  <ul className="flex max-w-80 flex-wrap gap-2 p-0 indent-0 list-none md:max-w-none">
                    {groupSkills.map(skill => (
                      <li key={`experience-${id}-skill-${skill.id}`} className="indent-0">
                        <SkillItem size="xs" label={skill.item} imageUrl={skill.blobUrl} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {isDraft ? null : (
          <>
            <button
              type="button"
              className="mt-2 flex items-center gap-1 text-primary/75"
              onClick={toggleDetail}
              aria-expanded={isExpanded}
              aria-controls={detailId}
            >
              <ChevronRight className={cn("h-4 w-4 transition-transform [transition-duration:400ms]", isExpanded && "rotate-90")} />
              <p className="text-left text-xs md:text-sm">{isExpanded ? t("hideDetail") : t("showDetail")}</p>
            </button>
            <AnimatePresence initial={false}>
              {isExpanded ? (
                <motion.div
                  key={detailId}
                  initial={{ height: 0, marginTop: "-0.75rem", opacity: 0 }}
                  animate={{ height: "auto", marginTop: 0, opacity: 1 }}
                  exit={{ height: 0, marginTop: "-0.75rem", opacity: 0 }}
                  transition={{
                    height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    marginTop: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.25, ease: "easeOut" },
                  }}
                  className="overflow-hidden"
                >
                  <ExperienceDetailPanel
                    id={detailId}
                    items={items}
                    sections={detailSections}
                    subDetails={subDetails}
                    pdfLink={pdfLink}
                    // Legacy single-PDF experiences carry no per-PDF TOC — fall back
                    // to the experience-level pdfSections.
                    onOpenPdf={pdf => setActivePdf({ ...pdf, sections: pdf.sections ?? pdfSections })}
                    onOpenLegacyModal={openLegacyModal}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </>
        )}
      </div>
      {/* href가 .md면 마크다운 문서 모달, 아니면 PDF 뷰어 */}
      {activePdf ? (
        activePdf.href.toLowerCase().endsWith(".md") ? (
          <MarkdownViewerModal
            url={activePdf.href}
            heading={activePdf.label}
            subheading={title}
            onClose={() => setActivePdf(null)}
          />
        ) : (
          <PdfViewerModal
            pdfUrl={activePdf.href}
            heading={activePdf.label}
            subheading={title}
            sections={activePdf.sections}
            onClose={() => setActivePdf(null)}
          />
        )
      ) : null}
      {activeLegacyModal ? (
        <LegacyTimelineModals
          activeModal={activeLegacyModal}
          closeModal={() => setActiveLegacyModal(null)}
        />
      ) : null}
    </div>
  );
};

export default ExpCard;
