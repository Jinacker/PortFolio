"use client";

import { ArrowUpRight, FileText } from "react-feather";

import cn from "classnames";
import Image from "next/image";

import type {
  ExperienceDetailSection,
  ExperienceLink,
} from "@/data/types";

interface ExperienceDetailPanelProps {
  id?: string;
  items?: readonly string[];
  sections?: readonly ExperienceDetailSection[];
  pdfLink?: ExperienceLink;
  onOpenPdf: (href: string) => void;
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

export default function ExperienceDetailPanel({
  id,
  items = [],
  sections = [],
  pdfLink,
  onOpenPdf,
  className,
}: ExperienceDetailPanelProps) {
  if (items.length === 0 && sections.length === 0 && !pdfLink) {
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
            <div
              key={section.title}
              className="py-3 first:pt-0 last:pb-0"
            >
              <h4 className="mb-2 border-b border-slate-200 pb-1.5 text-sm font-bold text-foreground/85 md:text-base">
                {section.title}
              </h4>
              <div
                className={cn(
                  section.media?.placement === "left" &&
                    "sm:grid sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start sm:gap-4",
                )}
              >
                {section.media ? (
                  <div
                    className={cn(
                      section.media.placement === "left" ? "mb-2.5 sm:mb-0" : "mb-2.5",
                    )}
                    style={{ maxWidth: section.media.maxWidth }}
                  >
                    {section.media.href ? (
                      <a
                        href={section.media.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${section.media.alt} 링크 열기`}
                        className="block overflow-hidden rounded-md no-underline transition hover:opacity-90"
                      >
                        <Image
                          src={section.media.src}
                          alt={section.media.alt}
                          width={section.media.width}
                          height={section.media.height}
                          quality={95}
                          className="h-auto w-full"
                        />
                      </a>
                    ) : (
                      <Image
                        src={section.media.src}
                        alt={section.media.alt}
                        width={section.media.width}
                        height={section.media.height}
                        quality={95}
                        className="h-auto w-full rounded-md"
                      />
                    )}
                  </div>
                ) : null}
                <div>
                  {section.items.length > 0 ? (
                    section.layout === "paragraphs" ? (
                      <div className="space-y-2">
                        {section.items.map(data => (
                          <p
                            key={data}
                            className="break-keep text-sm font-normal leading-[1.6] text-foreground/75"
                          >
                            {renderHighlightedText(data, section.highlights)}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <ul className="list-disc space-y-0.5 pl-5">
                        {section.items.map(data => (
                          <li
                            key={data}
                            className="break-keep text-sm font-normal leading-[1.5] text-foreground/75"
                          >
                            {renderHighlightedText(data, section.highlights)}
                          </li>
                        ))}
                      </ul>
                    )
                  ) : null}
                  {section.media?.href && section.media.linkLabel ? (
                    <a
                      href={section.media.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex w-full items-center justify-end gap-1 pr-3 text-xs font-semibold text-primary/75 no-underline transition hover:text-primary"
                    >
                      {section.media.linkLabel}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
              {section.showPdf && pdfLink ? (
                <button
                  type="button"
                  onClick={() => onOpenPdf(pdfLink.href)}
                  className="flex items-center gap-2 rounded-lg border border-primary/20 bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/35 hover:bg-primary/5"
                >
                  <FileText className="h-4 w-4" />
                  {pdfLink.label}
                </button>
              ) : null}
            </div>
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
        <button
          type="button"
          onClick={() => onOpenPdf(pdfLink.href)}
          className={cn(
            "flex items-center gap-2 rounded-lg border border-primary/20 bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/35 hover:bg-primary/5",
            items.length > 0 && "mt-4",
          )}
        >
          <FileText className="h-4 w-4" />
          {pdfLink.label}
        </button>
      ) : null}
    </div>
  );
}
