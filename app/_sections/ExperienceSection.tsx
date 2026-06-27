"use client";

import React, { useState } from "react";

import { ChevronDown, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";

import ExpCard from "@/_components/ExpCard";
import SectionWatcher from "@/_components/SectionWatcher";
import SlideUpInView from "@/_components/SlideUpInView";
import experiences from "@/data/experiences";
import skills from "@/data/skills";
import type { Locale } from "@/i18n/routing";

const LegacyTimelineModals = dynamic(() => import("@/_components/LegacyTimelineModals"), {
  ssr: false,
});

const extraTimelineItems = [
  {
    group: "프론트엔드",
    color: "blue",
    items: [
      { period: "2025년 2월", title: "프론트엔드 입문", description: "인프런 한입 리액트 강의를 완강하며 웹 개발에 처음 입문했고, React의 기초부터 실전까지 학습했습니다." },
      { period: "2025년 3월 ~ 6월", title: "ISSUE ONE (🥇대상 수상)", description: "강의에서 벗어나, 백지 위에 제가 만들고 싶은걸 만든 첫 프로젝트였습니다.", image: "/projects/ISSUE_ONE.png", action: "프로젝트 자세히 보기", modalName: "issueOne", modalImages: ["/projects/Issue_one_detail.png"] },
      { period: "2025년 8월 ~ 11월", title: "쉼표, 무더위 쉼터 지도", description: "React Native를 활용한 첫 앱 개발 프로젝트로, 사용자 경험(UX)에 대해 많은 것을 배웠습니다.", image: "/projects/shympyo.png", action: "프로젝트 자세히 보기", modalName: "shympyo", modalImages: ["/projects/shympyo_detail.png"] },
      { period: "2025년 9월", title: "MakerFaire 부스 페이지", description: "실제로 사용되는 서비스를 처음으로 만들어본 프로젝트였습니다.", image: "/projects/makerFaire.png", action: "프로젝트 자세히 보기", modalName: "makerFaire", modalImages: ["/projects/makerFaire_detail.png"] },
      { period: "2025년 11월 ~ 운영중", title: "돈가스 지도", description: "1인 개발로 앱을 출시하고 운영하며, 사용자들의 편의를 위해 항상 고민중입니다.", image: "/projects/KatsuMap.png", action: "프로젝트 자세히 보기", modalName: "katsuMap", modalImages: ["/projects/KatsuMap_detail.png"] },
      { period: "2026년 1월 ~", title: "카츠헌터 X 돈가스지도", description: "국내 최고 돈가스 리뷰 전문 인플루언서와 콜라보하여, 돈가스 지도를 전국으로 확장해 나가고 있습니다.", image: "/projects/katz_hunter_logo.svg", action: "자세히 보기", href: "https://www.instagram.com/katz_hunter/" },
    ],
  },
  {
    group: "백엔드",
    color: "green",
    items: [
      { period: "2025년 3월", title: "백엔드 입문", description: "멋쟁이사자처럼 인하대 BE 파트로 참여해, Django 기반으로 백엔드 개발에 처음 입문했습니다." },
      { period: "2025년 7월", title: "FamiLog", description: "처음으로 백엔드 역할을 맡아 실제 프로젝트를 진행했습니다.", image: "/projects/FamiLog.png", action: "프로젝트 자세히 보기", modalName: "famiLog", modalImages: ["/projects/FamiLog_detail.png"] },
      { period: "2025년 7월 ~ 8월", title: "SmartWMS (🥈 우수상)", description: "실제 창고 운영 흐름을 비즈니스 로직으로 옮기며, 처음으로 성능 최적화를 고민해본 프로젝트였습니다.", image: "/projects/SmartWMS.png", action: "프로젝트 자세히 보기", modalName: "smartWMS", modalImages: ["/projects/SmartWMS_detail.png"] },
      { period: "2025년 8월", title: "건너건너", description: "채팅 기능 구현을 통해 실시간 통신 구조를 이해하고, 아키텍처 분리가 개발 경험에 미치는 영향을 체감한 프로젝트였습니다.", image: "/GnGn.png", action: "프로젝트 자세히 보기", modalName: "geonneoGeonnoe", modalImages: ["/projects/GNGN_detail.png"] },
      { period: "2025년 9월 ~", title: "UMC - 인하대 9기 YB", description: "인하대 UMC 9기 Node.js Server 파트로 활동하며, TypeScript 기반으로 서버 개발을 학습하고 있습니다." },
      { period: "2025년 11월 ~ 운영중", title: "돈가스 지도", description: "실사용자에게 안정적인 서비스를 제공하기 위해 문제를 사전예방하는 운영을 처음으로 고민한 프로젝트였습니다.", image: "/projects/KatsuMap.png", action: "프로젝트 자세히 보기", modalName: "katsuMapBackend", modalImages: ["/projects/KatsuMap_detail.png"] },
      { period: "2025년 12월 ~", title: "외주 작업", description: "동시 주문 상황을 가정하고, 데이터 정합성과 안정성을 고려한 백엔드 아키텍처를 설계하고 있습니다.", image: "/projects/Trad.png", action: "프로젝트 자세히 보기", modalName: "trad", modalImages: ["/projects/tradlab_detail.png"] },
      { period: "2026년 1월 ~", title: "알바로그", description: "UMC 프로젝트로 개발 중이며, CodeRabbit을 통해 PR 단위의 코드 리뷰 자동화를 실험·적용하고 있습니다.", image: "/projects/albaLog.png", action: "프로젝트 자세히 보기", modalName: "albaLog", modalImages: ["/projects/albaLog.png"] },
    ],
  },
  {
    group: "공간정보",
    color: "purple",
    items: [
      { period: "2021년 3월", title: "공간정보공학과 입학", description: "위치기반 IT 분야에 관심을 가지고 인하대학교 공간정보공학과에 입학하게 되었습니다." },
      { period: "2024년 6월", title: "QGIS 프로젝트\n도로-건축물 이격거리 공간분석", description: "건축법 이격거리 규정을 실제 공간데이터에 적용해 도로-건축물 관계를 GIS 분석으로 검증했습니다.", action: "프로젝트 자세히 보기", modalName: "qgisProject", modalImages: ["/projects/qgis.png"] },
      { period: "2024년 10월", title: "제6회 공간정보 활용 경진대회\n최우수상 수상 🥇", description: "공간정보를 활용해 응급 상황에 도움이 될 수 있는 서비스를 구상했습니다.", action: "프로젝트 자세히 보기", modalName: "rescueRoute", modalImages: ["/projects/rescue_route_detail.png"] },
      { period: "2024년 10월", title: "농어촌 디지털 트윈 서비스 아이디어 경진대회\n장려상 수상 🥉", description: "디지털 트윈 기술이 지역과 세대의 간극을 줄이는 방법을 고민했습니다.", action: "프로젝트 자세히 보기", modalName: "digitalTwin", modalImages: ["/projects/digital_twin.png"] },
      { period: "2024년 10~12월", title: "RTAP2U 활용\nRTCM 버전별 측위 성능 비교 검증", description: "RTCM 3.1과 3.2 측위 데이터를 수집하고 정밀도와 정확도를 분석했습니다.", action: "프로젝트 자세히 보기", modalName: "gnssProject", modalImages: ["/projects/gps_1.png", "/projects/gps_2.png"] },
      { period: "2025년 5월", title: "ArcGIS 프로젝트\n폐기물 매립지 적지 선정", description: "AHP 기반 Map Algebra로 폐기물 매립지 적지 선정 프로젝트를 진행했습니다.", action: "프로젝트 자세히 보기", modalName: "arcgisProject", modalImages: ["/projects/arcgis.png"] },
      { period: "2025년 6월", title: "공간분석 프로젝트\n플리마켓 입지 적합성 분석", description: "생활인구·교통 데이터를 활용해 플리마켓 최적 입지를 분석했습니다.", action: "프로젝트 자세히 보기", modalName: "fleamarketProject", modalImages: ["/projects/fli_1.png", "/projects/fli_2.png"] },
    ],
  },
  {
    group: "인공지능",
    color: "orange",
    items: [
      { period: "2024.09 ~ 2024.10", title: "CNN 기반 패션 이미지 분류 및 스타일 선호 예측", description: "전처리와 학습 전략의 중요성을 체감하며 인공지능에 흥미를 느끼게 된 프로젝트였습니다.", action: "프로젝트 자세히 보기", modalName: "assemble", modalImages: [] },
      { period: "2025-1학기 ~", title: "인공지능공학과 복수전공 시작", description: "데이터 크리에이터 프로젝트를 계기로 인공지능공학과 복수전공을 선택했습니다." },
      { period: "~ 2025.03", title: "KT 대학생 IT 서포터즈 2기 부팀장", description: "AI 코딩 교육 봉사를 진행하며 게임형 커리큘럼과 블록 코딩 기반 모델 학습 과정을 설계·운영했습니다.", action: "자세히 보기", href: "https://www.withdigital.co.kr/kit04_list.html" },
      { period: "2025.12", title: "LLaMA 3.2 Fine-tuning 프로젝트", description: "자연어처리 과목을 바탕으로 서비스에 활용 가능한 인공지능에 관심을 갖고 진행한 프로젝트입니다.", action: "프로젝트 자세히 보기", modalName: "nsmc", modalImages: [] },
      { period: "2025 ~", title: "현재 최대 관심사 = AI 활용", description: "AI를 적재적소에 도입해 서비스 가치와 개발 생산성을 높이는 방법에 관심이 많습니다.", action: "AI 이렇게 활용해요!", modalName: "aiInterest", modalImages: [] },
    ],
  },
];

const timelineColorClasses = {
  blue: {
    border: "border-primary",
    text: "text-primary",
    hover: "hover:bg-primary/5",
  },
  green: {
    border: "border-secondary",
    text: "text-secondary",
    hover: "hover:bg-secondary/5",
  },
  purple: {
    border: "border-purple-500",
    text: "text-purple-600",
    hover: "hover:bg-purple-50",
  },
  orange: {
    border: "border-orange-500",
    text: "text-orange-600",
    hover: "hover:bg-orange-50",
  },
} as const;

type TimelineColor = keyof typeof timelineColorClasses;

function TimelineColumn({
  title,
  color,
  items,
  onOpenModal,
}: {
  title: string;
  color: TimelineColor;
  items: Array<{ period: string; title: string; description: string; image?: string; action?: string; modalName?: string; modalImages?: string[]; href?: string }>;
  onOpenModal: (modalName: string, images: string[]) => void;
}) {
  const colorClass = timelineColorClasses[color];

  return (
    <div>
      <h3 className="mb-4 mt-2 text-center text-xl font-bold">
        <span className={`inline-block rounded-full border-[3.5px] px-6 py-2 ${colorClass.border} ${colorClass.text}`}>
          {title}
        </span>
      </h3>
      <div className="p-4">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const isLast = index === items.length - 1;

          return (
            <div
              key={`${title}-${item.period}-${item.title}`}
              className="relative"
              style={{
                padding: isEven ? "20px 0 20px 20px" : "20px 20px 20px 0",
                maxWidth: "350px",
              }}
            >
              <div
                className={`
                  pointer-events-none absolute -top-0.5 -bottom-0
                  ${isEven
                    ? "left-0 w-1/2 rounded-bl-[30px] rounded-tl-[30px] border-b-[3px] border-l-[3px] border-t-[3px]"
                    : "right-0 w-1/2 rounded-br-[30px] rounded-tr-[30px] border-b-[3px] border-r-[3px] border-t-[3px]"
                  }
                  ${colorClass.border}
                `}
              />

              {index === 0 ? (
                <div className={`absolute right-[41%] -top-[35.1px] h-9 w-12 rounded-br-[30px] border-b-[3px] border-r-[3.1px] ${colorClass.border}`} />
              ) : null}

              <div className={`absolute left-1/2 bottom-0 z-10 flex -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 bg-white ${colorClass.border} ${isLast ? "h-7 w-7" : "h-6 w-6"}`}>
                {isLast ? (
                  <Loader2 className={`h-4 w-4 animate-[spin_3s_linear_infinite] ${colorClass.text}`} strokeWidth={3} />
                ) : (
                  <ChevronDown className={`h-3 w-3 ${colorClass.text}`} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                )}
              </div>

              <div className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <span
                  className={`absolute h-2.5 w-2.5 rounded-full border-2 bg-white ${colorClass.border}`}
                  style={{
                    [isEven ? "left" : "right"]: "-24.5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />

                <div className={item.image ? "mb-3 flex items-start justify-between" : ""}>
                  <div className={item.image ? "flex-1 pr-3" : ""}>
                    <h4 className={`mb-1 whitespace-pre-line text-sm font-bold ${colorClass.text}`}>{item.title}</h4>
                    <p className="mb-2 text-xs text-gray-500">{item.period}</p>
                    <p className="break-keep text-xs leading-5 text-gray-700">{item.description}</p>
                  </div>
                  {item.image ? (
                    <div className="ml-3 flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
                      <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-contain" />
                    </div>
                  ) : null}
                </div>

                {item.action && item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 block w-full rounded-lg border px-3 py-2 text-center text-xs font-medium no-underline transition-colors ${colorClass.border} ${colorClass.text} ${colorClass.hover}`}
                  >
                    {item.action}
                  </a>
                ) : item.action && item.modalName && item.modalImages ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (item.modalName && item.modalImages) {
                        onOpenModal(item.modalName, item.modalImages);
                      }
                    }}
                    className={`mt-3 w-full rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${colorClass.border} ${colorClass.text} ${colorClass.hover}`}
                  >
                    {item.action}
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getSkillsByIds(ids: number[]) {
  return ids
    .map(id => skills.find(skill => skill.id === id))
    .filter((skill): skill is (typeof skills)[number] => Boolean(skill))
    .sort((a, b) => a.category.localeCompare(b.category));
}

export default function ExperienceSection() {
  const t = useTranslations("Experience");
  const locale = useLocale() as Locale;
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openTimelineModal = (modalName: string, images: string[]) => {
    images.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });
    setActiveModal(modalName);
  };

  const data = experiences[locale].map(({ skill_ids, ...exp }) => ({
    ...exp,
    skills: getSkillsByIds(skill_ids),
  }));

  const groups = [
    { key: "service", title: "실사용 서비스 운영", data: data.filter(({ category }) => category === "SERVICE") },
    { key: "work", title: "업무 경험", data: data.filter(({ category }) => category === "WORK") },
    { key: "open-source", title: "오픈소스 기여", data: data.filter(({ category }) => category === "OPEN_SOURCE") },
  ];

  return (
    <SectionWatcher id="experience">
      <SlideUpInView>
        <h2 className="section-eyebrow">{t("eyebrow")}</h2>
        <p className="section-title">{t.rich("title", { br: () => <br /> })}</p>

        {groups.map(({ key, title, data }) => (
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

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setIsTimelineOpen(prev => !prev)}
            className="rounded-full border border-foreground/10 px-4 py-2 text-xs font-semibold text-foreground/55 transition hover:border-primary/30 hover:text-primary"
          >
            {isTimelineOpen ? "타임라인 다시 접어넣기" : "다른 경험들도 궁금해요!"}
          </button>
        </div>

        {isTimelineOpen ? (
          <SlideUpInView>
            <div className="mx-auto mt-10 max-w-4xl">
              <div className="mx-auto mb-12 max-w-4xl">
                <h3 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">개발 타임라인</h3>
              </div>

              <div className="mb-16 grid gap-12 md:grid-cols-2">
                {extraTimelineItems.slice(0, 2).map(group => (
                  <TimelineColumn
                    key={group.group}
                    title={group.group}
                    color={group.color as TimelineColor}
                    items={group.items}
                    onOpenModal={openTimelineModal}
                  />
                ))}
              </div>

              <div className="mx-auto mb-12 mt-16 max-w-4xl">
                <h3 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">도메인 타임라인</h3>
              </div>

              <div className="mb-16 grid gap-12 md:grid-cols-2">
                {extraTimelineItems.slice(2).map(group => (
                  <TimelineColumn
                    key={group.group}
                    title={group.group}
                    color={group.color as TimelineColor}
                    items={group.items}
                    onOpenModal={openTimelineModal}
                  />
                ))}
              </div>
            </div>
          </SlideUpInView>
        ) : null}

      </SlideUpInView>
      {activeModal ? (
        <LegacyTimelineModals activeModal={activeModal} closeModal={() => setActiveModal(null)} />
      ) : null}
    </SectionWatcher>
  );
}
