import { useLocale, useTranslations } from "next-intl";

import FeatureItems from "@/_components/FeatureItems";
import SlideUpInView from "@/_components/SlideUpInView";
import intros from "@/data/intros";
import type { Locale } from "@/i18n/routing";

export default function IntroSection() {
  const t = useTranslations("Intro");
  const locale = useLocale() as Locale;

  return (
    <section id="intro">
      <SlideUpInView>
        <p className="section-eyebrow">{t("eyebrow")}</p>
        <p className="section-title">{t("title")}</p>
        <FeatureItems features={intros[locale]} />
      </SlideUpInView>
    </section>
  );
}
