import React from "react";

import { useLocale, useTranslations } from "next-intl";

import ExpCard from "@/_components/ExpCard";
import SectionWatcher from "@/_components/SectionWatcher";
import SlideUpInView from "@/_components/SlideUpInView";
import experiences from "@/data/experiences";
import skills from "@/data/skills";
import type { Locale } from "@/i18n/routing";

function getSkillsByIds(ids: number[]) {
  return ids
    .map(id => skills.find(skill => skill.id === id))
    .filter((skill): skill is (typeof skills)[number] => Boolean(skill))
    .sort((a, b) => a.category.localeCompare(b.category));
}

export default function ExperienceSection() {
  const t = useTranslations("Experience");
  const locale = useLocale() as Locale;

  const data = experiences[locale].map(({ skill_ids, ...exp }) => ({
    ...exp,
    skills: getSkillsByIds(skill_ids),
  }));

  const works = data.filter(({ category }) => category === "WORK");
  const projects = data.filter(({ category }) => category === "PROJECT");

  return (
    <SectionWatcher id="experience">
      <SlideUpInView>
        <h2 className="section-eyebrow">{t("eyebrow")}</h2>
        <p className="section-title">{t.rich("title", { br: () => <br /> })}</p>

        {[
          { key: "work", title: t("groups.work"), data: works },
          { key: "project", title: t("groups.project"), data: projects },
        ].map(({ key, title, data }) => (
          <React.Fragment key={`exp-${key}`}>
            <div className="flex gap-4 items-center md:max-w-[768px] mx-auto mt-12 mb-8">
              <div className="w-full h-[1px] bg-gradient-to-l from-foreground/15" />
              <p className="flex-shrink-0 text-xs md:text-sm text-foreground/50">{title}</p>
              <div className="w-full h-[1px] bg-gradient-to-r from-foreground/15" />
            </div>

            <div className="flex flex-col gap-8 md:gap-10">
              {data.map(props => (
                <ExpCard key={`exp-${title}-card-${props.id}`} {...props} />
              ))}
            </div>
          </React.Fragment>
        ))}
      </SlideUpInView>
    </SectionWatcher>
  );
}
