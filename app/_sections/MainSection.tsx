"use client";

import { useTranslations } from "next-intl";

import FirstShape from "@/_components/MotionShapes/FirstShape";
import SecondShape from "@/_components/MotionShapes/SecondShape";
import ThirdShape from "@/_components/MotionShapes/ThirdShape";

const MainSection = () => {
  const t = useTranslations("Main");

  return (
    <div id="main" className="w-full pb-28 flex flex-col items-center">
      <div className="w-full relative flex justify-center scale-[32%] sm:scale-[40%] origin-bottom">
        <FirstShape />
        <SecondShape />
        <ThirdShape />
      </div>

      <h1 className="w-full p-6 md:p-8 bg-light z-40 dark:bg-dark">
        {t.rich("heading", { em: chunks => <em>{chunks}</em>, br: () => <br /> })}
      </h1>

      <p className="text-center text-base md:text-lg font-normal text-gray-400 break-keep mb-6 md:mb-8">
        {t.rich("subtitle", { br: () => <br /> })}
      </p>
    </div>
  );
};

export default MainSection;
