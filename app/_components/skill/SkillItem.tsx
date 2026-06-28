"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import cn from "classnames";
import Image from "next/image";

type Size = "xs" | "sm" | "md";
interface SkillItemProps {
  size?: Size;
  label: string;
  imageUrl: string;
  isActive?: boolean;
  tooltipPlacement?: "top" | "bottom";
}

const mediaQueries: Record<Size, { min: number; max: number }> = {
  xs: {
    min: 375,
    max: 640,
  },
  sm: {
    min: 640,
    max: 768,
  },
  md: {
    min: 768,
    max: 9999,
  },
};

const itemWidths: Record<Size, number> = {
  xs: 24,
  sm: 32,
  md: 48,
};

const generateSizeSet = (size: Size) => {
  const viewWidths = Object.entries(mediaQueries).map<[Size, number]>(([key, { min }]) => [
    key as Size,
    Math.ceil((itemWidths[size] / min) * 100),
  ]);

  return viewWidths
    .map(([key, value], index) => {
      if (index === viewWidths.length - 1) {
        return `${value}vw`;
      }
      const max = mediaQueries[key].max;
      return `(max-width: ${max}px) ${value}vw`;
    })
    .join(", ");
};

const SkillItem = ({
  size = "md",
  label,
  imageUrl,
  isActive = true,
  tooltipPlacement = "bottom",
}: SkillItemProps) => {
  const [tooltipPosition, setTooltipPosition] = useState<{ left: number; top: number } | null>(null);
  const imageFitClass = label === "Gitea" || label === "Dagre.js" ? "object-cover" : "object-contain";
  const imagePaddingClass = cn(
    label === "Slack" && "p-1",
    label === "GitHub Actions" && "p-1",
  );

  const showTooltip = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    setTooltipPosition({
      left: rect.left + rect.width / 2,
      top: tooltipPlacement === "top" ? rect.top - 4 : rect.bottom + 4,
    });
  };

  return (
    <>
      <div
        className={cn(
          "relative transition-all",
          size === "md" && "w-12 h-12",
          size === "sm" && "w-8 h-8",
          size === "xs" && "w-6 h-6",
          !isActive && "opacity-15 blur-md",
        )}
        onMouseEnter={event => isActive && showTooltip(event.currentTarget)}
        onMouseLeave={() => setTooltipPosition(null)}
      >
        <Image
          className={cn(imageFitClass, imagePaddingClass, size === "xs" ? "rounded bg-white shadow" : "rounded-md bg-white shadow-md")}
          fill={true}
          src={imageUrl}
          alt={label}
          sizes={generateSizeSet(size)}
        />
      </div>
      {tooltipPosition && typeof document !== "undefined"
        ? createPortal(
            <p
              className={cn(
                "pointer-events-none fixed z-[9999] -translate-x-1/2 whitespace-nowrap rounded bg-foreground/75 px-1.5 py-0.5 text-center text-xs font-normal text-background md:text-sm",
                tooltipPlacement === "top" && "-translate-y-full",
              )}
              style={{ left: tooltipPosition.left, top: tooltipPosition.top }}
            >
              {label}
            </p>,
            document.body,
          )
        : null}
    </>
  );
};

export default SkillItem;
