import parse from "html-react-parser";

import type { Education } from "@/data/types";

type EducationCardProps = Education;

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

const EducationCard = ({ id, period, title, sub_title, items }: EducationCardProps) => {
  return (
    <div key={`edu-card-${id}`} className="grid sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-x-8 sm:items-start sm:pl-24">
      <p
        className="
          flex items-start gap-2.5 text-center text-sm md:text-base text-foreground/60 mb-3 sm:justify-end
          before:content-['*'] before:text-foreground/30 before:w-[21px] before:inline-block
        "
      >
        {formatPeriod(period)}
      </p>

      <div className="pl-5 sm:pl-0 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-base md:text-lg font-semibold">{title}</p>
          <p className="text-sm md:text-base font-normal text-foreground/60 whitespace-pre-wrap">{sub_title}</p>
        </div>

        {items.length > 0 && (
          <ul className="list-disc list-inside -indent-4 md:-indent-5 pl-4 md:pl-5">
            {items.map((item, index) => (
              <li
                key={`edu-card-item-${index}`}
                className="text-xs md:text-sm font-normal mb-1 last:mb-0 text-foreground/80 leading-normal"
              >
                {parse(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EducationCard;
