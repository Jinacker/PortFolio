import Link from "next/link";
import { useTranslations } from "next-intl";

import SlideUpInView from "@/_components/SlideUpInView";

const OutroSection = () => {
  const t = useTranslations("Outro");

  return (
    <section className="py-20 md:py-24">
      <SlideUpInView>
        <p className="text-center text-2xl md:text-3xl font-semibold leading-normal md:leading-normal mb-4 md:mb-6">
          {t.rich("message", { br: () => <br /> })}
        </p>

        <div className="w-72 md:w-80 mx-auto grid grid-cols-3 text-sm md:text-base gap-2 md:gap-3 p-6 md:p-8 rounded-2xl bg-dark/5 dark:bg-light/10">
          <p className="font-semibold">{t("email")}</p>
          <p className="col-span-2">rlawls1448@naver.com</p>

          <p className="font-semibold">{t("github")}</p>
          <Link href="https://github.com/Jinacker" target="_blank" className="col-span-2">
            <p>@Jinacker</p>
          </Link>
        </div>
      </SlideUpInView>
    </section>
  );
};

export default OutroSection;
