import cn from "classnames";
import Image from "next/image";

type Size = "xs" | "sm" | "md";
interface SkillItemProps {
  size?: Size;
  label: string;
  imageUrl: string;
  isActive?: boolean;
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

const SkillItem = ({ size = "md", label, imageUrl, isActive = true }: SkillItemProps) => {
  return (
    <div
      className={cn(
        "relative group/skill transition-all",
        size === "md" && "w-12 h-12",
        size === "sm" && "w-8 h-8",
        size === "xs" && "w-6 h-6",
        !isActive && "opacity-15 blur-md",
      )}
    >
      <Image
        className={cn(size === "xs" ? "rounded shadow" : "rounded-md shadow-md")}
        fill={true}
        src={imageUrl}
        alt={label}
        sizes={generateSizeSet(size)}
      />
      <p
        className={cn(
          "absolute -bottom-1 translate-y-full left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-foreground/75 text-background rounded text-xs md:text-sm text-center whitespace-nowrap font-normal invisible z-10",
          isActive && "group-hover/skill:visible",
        )}
      >
        {label}
      </p>
    </div>
  );
};

export default SkillItem;
