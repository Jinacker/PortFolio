import { useLocale, useTranslations } from "next-intl";

import SectionWatcher from "@/_components/SectionWatcher";
import SlideUpInView from "@/_components/SlideUpInView";
import ProjectCases from "@/_components/project/ProjectCases";
import projects from "@/data/projects";
import type { Locale } from "@/i18n/routing";

export default function ProjectSection() {
  const t = useTranslations("Project");
  const locale = useLocale() as Locale;

  return (
    <SectionWatcher id="project">
      <SlideUpInView>
        <h2 className="section-eyebrow">{t("eyebrow")}</h2>
        <p className="section-title">{t("title")}</p>

        <ProjectCases cases={projects[locale]} />
      </SlideUpInView>
    </SectionWatcher>
  );
}
