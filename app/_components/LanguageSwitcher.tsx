"use client";

import { useRef, useState, useTransition } from "react";
import { Check, Globe } from "react-feather";

import cn from "classnames";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import useOnClickOutside from "@/utils/useOnClickOutside";

const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
};

interface LanguageSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  // "dropdown": compact globe button + popover (desktop header).
  // "inline": locale options laid out in normal flow (mobile menu, where an
  // absolutely-positioned popover would be clipped by the menu's clip-path).
  variant?: "dropdown" | "inline";
}

const LanguageSwitcher = ({ variant = "dropdown", className, ...props }: LanguageSwitcherProps) => {
  const t = useTranslations("Header");
  const activeLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  const changeLocale = (nextLocale: Locale) => {
    setIsOpen(false);
    if (nextLocale === activeLocale) return;
    // Preserve the current path; next-intl swaps only the locale segment.
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)} {...props}>
        <Globe className="w-[18px] h-[18px] text-foreground/55 shrink-0" strokeWidth={1.5} aria-hidden />
        <div className="flex items-center gap-1" role="group" aria-label={t("changeLanguage")}>
          {routing.locales.map(locale => (
            <button
              key={locale}
              type="button"
              aria-pressed={locale === activeLocale}
              disabled={isPending}
              onClick={() => changeLocale(locale)}
              className={cn(
                "px-2.5 py-1 rounded-md text-sm transition-colors",
                locale === activeLocale
                  ? "font-semibold text-foreground bg-foreground/10"
                  : "font-normal text-foreground/55 hover:text-foreground",
              )}
            >
              {LOCALE_LABELS[locale]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} ref={ref} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={t("changeLanguage")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={isPending}
        className="flex items-center gap-1 text-foreground/55 hover:text-foreground transition-colors"
      >
        <Globe className="w-[18px] h-[18px]" strokeWidth={1.5} />
        <span className="hidden md:inline text-xs font-semibold">{LOCALE_LABELS[activeLocale]}</span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 min-w-32 p-1 rounded-xl list-none indent-0
            bg-background border border-foreground/10 shadow-lg shadow-black/5 z-50"
        >
          {routing.locales.map(locale => (
            <li key={locale} className="indent-0">
              <button
                type="button"
                role="option"
                aria-selected={locale === activeLocale}
                onClick={() => changeLocale(locale)}
                className={cn(
                  "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors",
                  "hover:bg-foreground/5",
                  locale === activeLocale ? "font-semibold text-foreground" : "font-normal text-foreground/70",
                )}
              >
                {LOCALE_LABELS[locale]}
                {locale === activeLocale && <Check className="w-4 h-4 text-primary" strokeWidth={2} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
