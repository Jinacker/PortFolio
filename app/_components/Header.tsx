"use client";

import { useEffect, useState } from "react";
import { GitHub, Menu, X } from "react-feather";

import cn from "classnames";
import { useAnimate, stagger } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

import useOnClickOutside from "@/utils/useOnClickOutside";

import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { navItems } from "./navItems";

type HeaderProps = React.HTMLAttributes<HTMLHeadElement>;

const GITHUB_URL = "https://github.com/MeganMagic";

const staggerMenuItems = stagger(0.07, { startDelay: 0.1 });

const Header = ({ className, ...props }: HeaderProps) => {
  const t = useTranslations("Header");

  const [isExpanded, setIsExpanded] = useState(false);
  const [scope, animate] = useAnimate();

  const toggleMobileMenu = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    animate([
      [
        ".mobile-menu",
        { clipPath: isExpanded ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" },
        { type: "spring", bounce: 0, duration: 0.4 },
      ],
      [
        ".mobile-menu-item",
        { opacity: isExpanded ? 1 : 0 },
        { duration: 0.2, delay: isExpanded ? staggerMenuItems : 0, at: "-0.2" },
      ],
    ]);
  }, [isExpanded]);

  useOnClickOutside(scope, () => setIsExpanded(false));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full h-16 px-6",
        "bg-background border-b border-foreground/10",
        "flex items-center justify-between gap-4",
        className,
      )}
      {...props}
      ref={scope}
    >
      <Link className="no-underline flex items-center gap-2.5 shrink-0" href="#top">
        <Logo />
        <p className="text-sm md:text-base whitespace-nowrap leading-none">
          <span className="font-extrabold text-foreground">{t("name")}</span>
          <span className="font-normal text-foreground/45"> | {t("role")}</span>
        </p>
      </Link>

      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden xl:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-foreground/55 hover:text-foreground transition-colors"
          >
            <GitHub className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </Link>
        </div>

        <button
          type="button"
          className="block xl:hidden text-foreground/70 -mr-1 p-1"
          onClick={toggleMobileMenu}
          aria-label={t(isExpanded ? "closeMenu" : "openMenu")}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={cn(
          "mobile-menu",
          "absolute top-full left-0 right-0",
          "flex flex-col xl:hidden px-6 py-3 indent-0",
          "bg-background border-b border-foreground/10 shadow-sm",
          isExpanded ? "pointer-events-auto" : "pointer-events-none",
        )}
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <ul className="flex flex-col list-none p-0 m-0 indent-0">
          {navItems.map(({ key, id }) => (
            <Link
              key={`header-item-m-${id}`}
              href={`#${id}`}
              className={cn("mobile-menu-item", "no-underline")}
              onClick={() => setIsExpanded(false)}
            >
              <li className="py-2.5 text-base font-semibold whitespace-nowrap text-foreground/80">{t(`nav.${key}`)}</li>
            </Link>
          ))}
        </ul>

        <div className="mobile-menu-item flex items-center justify-between gap-3 pt-3 mt-2 border-t border-foreground/10">
          <LanguageSwitcher variant="inline" />
          <div className="flex items-center gap-5">
            <ThemeToggle />
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-foreground/55 hover:text-foreground transition-colors"
            >
              <GitHub className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
