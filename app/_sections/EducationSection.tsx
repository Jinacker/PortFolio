import { useLocale, useTranslations } from "next-intl";

import EducationCard from "@/_components/EducationCard";
import SectionWatcher from "@/_components/SectionWatcher";
import SlideUpInView from "@/_components/SlideUpInView";
import educations from "@/data/educations";
import type { Locale } from "@/i18n/routing";

export default function EducationSection() {
  const t = useTranslations("Education");
  const locale = useLocale() as Locale;

  const educationItems = educations[locale].filter(d => d.category === "EDUCATION");
  const certifications = educations[locale].filter(d => d.category === "CERTIFICATION");

  return (
    <SectionWatcher id="education">
      <SlideUpInView>
        <h2 className="section-eyebrow mb-10 md:mb-14">{t("eyebrow")}</h2>

        <div className="flex flex-col gap-8 md:gap-10">
          {educationItems.map(data => (
            <EducationCard key={`edu-card-${data.id}`} {...data} />
          ))}
          <div className="w-full max-w-[600px] h-[1px] mx-auto my-3 md:my-5 bg-gradient-to-r from-foreground/0 via-foreground/15 to-foreground/0" />
          {certifications.map(data => (
            <EducationCard key={`edu-card-${data.id}`} {...data} />
          ))}
        </div>
      </SlideUpInView>
    </SectionWatcher>
  );
}
