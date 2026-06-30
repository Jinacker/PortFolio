"use client";

import { useState } from "react";
import { ChevronRight } from "react-feather";

import cn from "classnames";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import parse from "html-react-parser";
import { useTranslations } from "next-intl";

import Shape from "@/assets/shape-sparkle.svg";
import type { Experience, Skill } from "@/data/types";

import ExperienceDetailPanel from "./ExperienceDetailPanel";
import SkillItem from "./skill/SkillItem";

const PdfViewerModal = dynamic(() => import("./PdfViewerModal"), { ssr: false });

interface ExpCardProps extends Omit<Experience, "skill_ids"> {
  skills: Skill[];
}

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

const ExpCard = ({ id, period, is_active, title, sub_title, skills, items, links, pdfSections, detailSections, category, imageUrl }: ExpCardProps) => {
  const t = useTranslations("Experience");
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null);
  const shapeColor = category === "WORK" ? "text-[#00C676]" : category === "OPEN_SOURCE" ? "text-amber-500" : is_active ? "text-primary" : "text-foreground/30";
  const pdfLink = links.find(link => link.href.toLowerCase().endsWith(".pdf"));
  const hasDetailedBackendGroups = skills.some(skill =>
    ["DATA_AUTH", "VALIDATION_SECURITY", "CLOUD_INFRA", "MERMAID_CORE", "MERMAID_TEST_QUALITY", "MERMAID_BUILD_WORKFLOW"].includes(skill.category),
  );

  const toggleDetail = () => {
    setIsExpanded(prev => !prev);
  };

  const detailId = `experience-${id}-detail`;

  return (
    <div className="grid sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-x-8 sm:items-start sm:pl-16">
      <div className="flex gap-2.5 sm:justify-end items-start mb-3">
        <Shape className={cn(shapeColor)} />
        <p className="text-center text-sm md:text-base font-normal text-foreground/60">{formatPeriod(period)}</p>
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
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={title.includes("TradLab") ? "object-cover" : title === "돈가스 지도" ? "scale-[1.06] object-contain" : "object-contain"}
              sizes="calc(100vw - 3rem)"
            />
          </button>
        ) : null}

        <button
          type="button"
          onClick={toggleDetail}
          aria-expanded={isExpanded}
          aria-controls={detailId}
          className="flex cursor-pointer flex-col gap-1 text-left"
        >
          <p className="text-base md:text-lg font-semibold ">{title}</p>
          {sub_title && (
            <p className="text-xs md:text-sm font-normal text-foreground/60 whitespace-pre-wrap">{parse(sub_title)}</p>
          )}
        </button>

        <div className={cn("flex gap-1", imageUrl ? "items-start" : "flex-col")}>
          {imageUrl ? (
            <button
              type="button"
              onClick={toggleDetail}
              aria-expanded={isExpanded}
              aria-controls={detailId}
              aria-label={`${title} 자세히 보기`}
              className="relative mt-3 hidden h-36 w-[17rem] shrink-0 cursor-pointer overflow-hidden rounded-md border border-foreground/10 bg-white shadow-sm sm:block"
            >
              <Image
                src={imageUrl}
                alt={title}
                fill
                className={title.includes("TradLab") ? "object-cover" : title === "돈가스 지도" ? "scale-[1.06] object-contain" : "object-contain"}
                sizes="272px"
              />
            </button>
          ) : null}
          {imageUrl ? <div className="ml-3 mt-3 hidden h-36 w-px shrink-0 bg-foreground/10 sm:block" /> : null}

          <div className="ml-3 flex min-w-0 flex-1 flex-col gap-2">
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

        <button
          type="button"
          className="text-primary/75 flex items-center gap-1 mt-2"
          onClick={toggleDetail}
          aria-expanded={isExpanded}
          aria-controls={detailId}
        >
          <ChevronRight className={cn("h-4 w-4 transition-transform duration-[400ms]", isExpanded && "rotate-90")} />
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
                pdfLink={pdfLink}
                onOpenPdf={setActivePdfUrl}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      {activePdfUrl ? (
        <PdfViewerModal
          pdfUrl={activePdfUrl}
          heading={pdfLink?.label ?? "PDF 보기"}
          subheading={title}
          sections={pdfSections}
          onClose={() => setActivePdfUrl(null)}
        />
      ) : null}
    </div>
  );
};

export default ExpCard;
