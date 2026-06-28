import { ExternalLink } from "react-feather";

import { useLocale, useTranslations } from "next-intl";

import BlogCard from "@/_components/BlogCard";
import SectionWatcher from "@/_components/SectionWatcher";
import SlideUpInView from "@/_components/SlideUpInView";
import CTAButton from "@/_components/buttons/CTAButton";
import blogs from "@/data/blogs";
import type { Locale } from "@/i18n/routing";

const BLOG_LINK = "https://velog.io/@mari";

export default function BlogSection() {
  const t = useTranslations("Blog");
  const locale = useLocale() as Locale;

  return (
    <SectionWatcher id="blog">
      <SlideUpInView>
        <h2 className="section-eyebrow">{t("eyebrow")}</h2>
        <p className="section-title">{t.rich("title", { br: () => <br /> })}</p>

        <div className="cards grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-11">
          {blogs[locale].map(props => (
            <BlogCard key={`blog-card-${props.id}`} {...props} />
          ))}
        </div>

        <CTAButton
          label={t("goToBlog")}
          suffix={<ExternalLink className="w-4 h-4" />}
          link={BLOG_LINK}
          className="mx-auto"
        />
      </SlideUpInView>
    </SectionWatcher>
  );
}
