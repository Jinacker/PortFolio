"use client";

import { useState } from "react";
import { ChevronDown } from "react-feather";

import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import type { ProjectCase } from "@/data/types";

interface ProjectCasesProps {
  cases: ProjectCase[];
}

const ProjectCases = ({ cases }: ProjectCasesProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 md:gap-4 w-full max-w-[768px] mx-auto">
      {cases.map(({ id, company, period, title, summary, points, stack, links }) => {
        const isOpen = openId === id;

        return (
          <div
            key={id}
            className="border border-foreground/10 rounded-xl bg-foreground/[0.02] dark:bg-light/[0.03] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : id)}
              aria-expanded={isOpen}
              className="w-full text-left flex items-start gap-3 px-5 py-4 hover:bg-foreground/[0.03] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-base md:text-lg font-semibold text-foreground">{title}</span>
                  <span className="text-xs text-foreground/45 whitespace-nowrap">
                    {company} · {period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-normal text-foreground/60 leading-normal">{summary}</p>
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 mt-0.5 shrink-0 text-foreground/40 transition-transform",
                  isOpen && "rotate-180",
                )}
                strokeWidth={1.5}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 flex flex-col gap-4">
                    <ul className="list-disc pl-5 flex flex-col gap-1.5">
                      {points.map((point, index) => (
                        <li
                          key={`${id}-point-${index}`}
                          className="text-sm font-normal text-foreground/80 leading-relaxed"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>

                    <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0 indent-0">
                      {stack.map(item => (
                        <li
                          key={`${id}-stack-${item}`}
                          className="indent-0 text-xs font-medium px-2 py-0.5 rounded-md bg-foreground/[0.06] text-foreground/60"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    {links && links.length > 0 && (
                      <div className="flex flex-wrap gap-4">
                        {links.map(({ label, href }) => (
                          <Link
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-primary no-underline hover:underline"
                          >
                            {label} ↗
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectCases;
