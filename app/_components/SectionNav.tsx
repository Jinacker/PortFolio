"use client";

import { useEffect, useState } from "react";

import cn from "classnames";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { useSectionWatch } from "./SectionWatcher";
import { navItems } from "./navItems";

const SectionNav = () => {
  const t = useTranslations("Header");
  const { activeId } = useSectionWatch();
  const [isVisible, setIsVisible] = useState(false);

  // Reveal only after the hero (#main) has scrolled out of view.
  useEffect(() => {
    const hero = document.getElementById("main");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(!entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label={t("sectionNav")}
      className={cn(
        "fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3.5",
        "transition-opacity duration-200",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      {navItems.map(({ key, id }) => {
        const isActive = activeId === id;
        return (
          <Link
            key={`section-nav-${id}`}
            href={`#${id}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-2.5 no-underline"
          >
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full border-2 transition-all duration-200",
                isActive
                  ? "bg-primary border-primary scale-110"
                  : "bg-transparent border-foreground/25 group-hover:border-foreground/50",
              )}
            />
            <span
              className={cn(
                "text-xs font-semibold whitespace-nowrap transition-colors duration-200",
                isActive ? "text-foreground" : "text-foreground/40 group-hover:text-foreground/70",
              )}
            >
              {t(`nav.${key}`)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SectionNav;
