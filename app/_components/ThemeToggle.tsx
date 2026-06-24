"use client";

import { Moon, Sun } from "react-feather";

import cn from "classnames";
import { useTranslations } from "next-intl";

type ThemeToggleProps = React.HTMLAttributes<HTMLButtonElement>;

const ThemeToggle = ({ className, ...props }: ThemeToggleProps) => {
  const t = useTranslations("Header");

  // Icons are toggled via the `.dark` class (CSS-driven) so the rendered output
  // matches between server and client — no hydration mismatch on first paint.
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Ignore storage errors (e.g. privacy mode); the in-page toggle still works.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("toggleTheme")}
      title={t("toggleTheme")}
      className={cn("text-foreground/55 hover:text-foreground transition-colors", className)}
      {...props}
    >
      <Sun className="w-[18px] h-[18px] dark:hidden" strokeWidth={1.5} />
      <Moon className="w-[18px] h-[18px] hidden dark:block" strokeWidth={1.5} />
    </button>
  );
};

export default ThemeToggle;
