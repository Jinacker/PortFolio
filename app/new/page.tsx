"use client"

import { NextIntlClientProvider } from "next-intl"
import { ArrowUpRight, BookOpen, Code, Code2, GraduationCap, Mail, Trophy, User, Users } from "lucide-react"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

import SectionNav from "@/_components/SectionNav"
import SectionWatcher, { SectionWatchProvider } from "@/_components/SectionWatcher"
import SlideUpInView from "@/_components/SlideUpInView"
import EducationSection from "@/_sections/EducationSection"
import ExperienceSection from "@/_sections/ExperienceSection"
import MainSection from "@/_sections/MainSection"
import OutroSection from "@/_sections/OutroSection"
import ProjectSection from "@/_sections/ProjectSection"
import messages from "../../messages/ko.json"

import styles from "./original.module.css"

const LegacyTimelineModals = dynamic(() => import("@/_components/LegacyTimelineModals"), {
  ssr: false,
})

const NEW_SECTION_NAV_ITEMS = [
  { id: "intro", label: "소개" },
  { id: "experience", label: "경험" },
  { id: "project", label: "역량" },
  { id: "education", label: "교육" },
  { id: "blog", label: "기록" },
] as const

const passionGroups = [
  {
    title: "프로젝트 수상",
    icon: Trophy,
    iconClass: "text-yellow-300",
    items: [
      ["2025.08.28", "신세계 I&C 산학협력 프로젝트 우수상", "정보통신기획평가원장상", "https://github.com/KSEB-4th-Project-3rd-Team"],
      ["2025.06.20", "I-Mini 프로젝트 대상", "인하대학교 SW중심 대학사업단", "https://blog.naver.com/rlawls1448/223913885215"],
      ["2024.11.07", "제 6회 공간정보 활용 경진대회 최우수상", "공간정보 산업진흥원", "https://blog.naver.com/rlawls1448/223675136871"],
      ["2024.11.01", "농어촌 디지털트윈 경진대회 장려상", "포스텍 미래 도시 연구센터", "https://blog.naver.com/rlawls1448/223674643082"],
      ["2020.12.18", "제5회 INU 메이커 경진대회 우수상", "인천대학교", "https://blog.naver.com/rlawls1448/222223758063"],
    ],
  },
  {
    title: "개발 연혁",
    icon: Code2,
    iconClass: "text-[#00C676]",
    items: [
      ["2026.03 ~ 2026.06", "SureSoftTech. 시험자동화연구소 VSPICE팀 인턴", ""],
      ["2025.12 ~ 2026.06", "트래드랩 창업팀 백엔드 개발", ""],
      ["2025.09 ~ 2026.02", "UMC 9기 Node.JS Server 파트", "", "https://blog.naver.com/rlawls1448/224005292835"],
      ["2025.03 ~ 2025.12", "멋쟁이 사자처럼 13기 BE 파트", "", "https://blog.naver.com/rlawls1448/223815192434"],
      ["2025.01 ~ 2025.11", "KSEB 부트캠프 4기", "", "https://blog.naver.com/rlawls1448/223814972761"],
      ["2024.11 ~ 2025.03", "KT 대학생 IT 서포터즈 2기 - AI 코딩 커리큘럼 개발", "", "https://blog.naver.com/rlawls1448/223815131854"],
      ["2024.09 ~ 2024.11", "2024 데이터 크리에이터 캠프 스타터 과정", "", "https://blog.naver.com/rlawls1448/223681491796"],
    ],
  },
  {
    title: "개인 수상 및 장학금",
    icon: GraduationCap,
    iconClass: "text-yellow-300",
    items: [
      ["2026.05.26", "2026-1학기 Co-op 인턴 주간보고 평가 최우수상", "인하대학교 인재개발원 + 슈어소프트테크(주)"],
      ["2026.02.20", "UMC 9기 서버파트 Best Challenger 수상", "대학생 개발 연합동아리 UMC", "https://blog.naver.com/rlawls1448/224216644931"],
      ["2025.06.20", "KSEB 4기 우수교육생 수상", "인하대학교 SW중심대학사업단장상", "https://blog.naver.com/rlawls1448/223913885215"],
      ["2025.04.24", "2025 농협 조합원 자녀 대학생 장학생", "농협 영농회", "https://blog.naver.com/rlawls1448/223842792230"],
      ["2025-1학기", "국토정보공사 발전 장려 장학생", "국토정보공사 장학회", "https://blog.naver.com/rlawls1448/223842792230"],
      ["2024.10.31", "디지털 혁신 페스타 2024 우수 서포터즈 수상", "지디넷코리아", "https://blog.naver.com/rlawls1448/223672365443"],
      ["2024-2학기", "국토정보공사 발전 장려 장학생", "국토정보공사 장학회", "https://blog.naver.com/rlawls1448/223636051928"],
    ],
  },
  {
    title: "대외활동",
    icon: Users,
    iconClass: "text-[#00C676]",
    items: [
      ["2025.09", "2025 메이커페어 부스 창업 및 운영", "Maker Faire Seoul 2025", "modal:makerFaire"],
      ["2025.03 ~ 2026.02", "코딩 동아리 DEBUG 회장", "공간정보공학과 학술 동아리", "https://blog.naver.com/rlawls1448/223815163411"],
      ["2025.01", "커비eSim 서포터즈 1기", "핀트원(주)", "https://blog.naver.com/rlawls1448/223674626853"],
      ["2024.12.05 ~ 2025.03.21", "KT 대학생 IT 서포터즈 KIT 2기 - 기획팀 부팀장", "KT희망나눔그룹", "https://blog.naver.com/rlawls1448/223685580386"],
      ["2024.08.17 ~ 2024.09.21", "부천시 스마트리빙랩 시민참여단 팀장", "부천시", "https://blog.naver.com/rlawls1448/223554607352"],
      ["2024.08.12 ~ 2024.10.31", "디지털 혁신 페스타 서포터즈 1기", "지디넷코리아", "https://blog.naver.com/rlawls1448/223554640037"],
    ],
  },
]

const MEMOIR_POSITIONS = [
  "left-0 top-6 z-[4]",
  "left-[120px] top-1 z-[3]",
  "left-[240px] top-5 z-[2]",
  "left-[360px] top-9 z-[1]",
]
const MEMOIR_ANIMATION_DELAYS = ["0s", "0.8s", "1.6s", "2.4s"]

const memoirPosts = [
  {
    title: "2025-2학기 회고록",
    subtitle: "성장과 도전의 기록",
    image: "/projects/2025-2.png",
    href: "https://blog.naver.com/rlawls1448/224132285494",
  },
  {
    title: "2025 여름방학 회고록",
    subtitle: "뜨거운 여름의 성장기",
    image: "/projects/2025-summer.png",
    href: "https://blog.naver.com/rlawls1448/224005262527",
  },
  {
    title: "2025-1학기 회고록",
    subtitle: "새로운 시작의 기록",
    image: "/projects/2025-1.png",
    href: "https://blog.naver.com/rlawls1448/223927328023",
  },
  {
    title: "2024년 회고록",
    subtitle: "한 해를 돌아보며",
    image: "/projects/2024.png",
    href: "https://blog.naver.com/rlawls1448/223785118853",
  },
]

function ExistingPortfolioHeader() {
  return (
    <div className="w-full flex justify-center sticky top-6 z-50 -mt-20 pb-12">
      <div className={`${styles.portfolioNav} bg-gray-200/40 backdrop-blur-md border border-gray-300/30 rounded-full shadow-lg px-6 py-3`}>
        <div className="flex gap-8 md:gap-10 text-sm md:text-base font-medium">
          <a href="#intro" className="text-gray-800 hover:text-gray-900 transition flex items-center gap-2 no-underline">
            <User className="w-5 h-5" /> 소개
          </a>
          <a href="#experience" className="text-gray-800 hover:text-gray-900 transition flex items-center gap-2 no-underline">
            <BookOpen className="w-5 h-5" /> 경험
          </a>
          <a href="#project" className="text-gray-800 hover:text-gray-900 transition flex items-center gap-2 no-underline">
            <Code className="w-5 h-5" /> 역량
          </a>
          <a href="#contact" className="text-gray-800 hover:text-gray-900 transition flex items-center gap-2 no-underline">
            <Mail className="w-5 h-5" /> 문의
          </a>
        </div>
      </div>
    </div>
  )
}

function PassionSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  return (
    <>
      <SectionWatcher id="intro">
        <div className="w-full">
        <p className="section-eyebrow">애정과 몰입</p>
        <p className="section-title">저를 가장 잘 설명할 수 있는 단어입니다.</p>

        <div className="mx-auto grid max-w-[530px] justify-center gap-x-1 gap-y-5 md:grid-cols-[260px_260px]">
          {passionGroups.map((group) => {
            const Icon = group.icon

            return (
          <article key={group.title} className={group.title === "개발 연혁" || group.title === "대외활동" ? "ml-7 px-0" : "px-0"}>
            <div className="mb-2.5 flex items-center gap-2">
              <Icon className={`h-4 w-4 ${group.iconClass}`} strokeWidth={1.9} />
              <h3 className="text-sm font-bold text-foreground md:text-base">{group.title}</h3>
            </div>

            <ul className="list-none p-0 indent-0 [&>li]:list-none [&>li]:marker:content-none">
              {group.items.map(([date, title, organization, href]) => {
                const modalName = href?.startsWith("modal:") ? href.slice("modal:".length) : null

                return (
                <li
                  key={`${group.title}-${date}-${title}`}
                  className="py-1 indent-0 first:pt-0 last:pb-0"
                >
                  {href ? (
                    <a
                      href={modalName ? undefined : href}
                      target={modalName ? undefined : "_blank"}
                      rel={modalName ? undefined : "noopener noreferrer"}
                      onClick={modalName ? event => {
                        event.preventDefault()
                        setActiveModal(modalName)
                      } : undefined}
                      className="group block cursor-pointer [text-decoration:none!important]"
                    >
                      <p className="text-[10px] font-semibold leading-3 text-foreground/40">{date}</p>
                      <p className={`mt-0.5 font-semibold leading-4 text-foreground/85 transition-colors group-hover:text-primary ${title.includes("VSPICE") ? "whitespace-nowrap text-[10px]" : "break-keep text-[11px]"}`}>{title}</p>
                      {organization ? (
                        <p className="break-keep text-[10px] leading-3 text-foreground/45">{organization}</p>
                      ) : null}
                    </a>
                  ) : (
                    <>
                      <p className="text-[10px] font-semibold leading-3 text-foreground/40">{date}</p>
                      <p className={`mt-0.5 font-semibold leading-4 text-foreground/85 ${title.includes("VSPICE") ? "whitespace-nowrap text-[10px]" : "break-keep text-[11px]"}`}>{title}</p>
                      {organization ? (
                        <p className="break-keep text-[10px] leading-3 text-foreground/45">{organization}</p>
                      ) : null}
                    </>
                  )}
                </li>
                )
              })}
            </ul>
          </article>
          )})}
        </div>

        <div className="mx-auto mt-8 max-w-2xl break-keep text-center text-sm font-medium leading-7 text-foreground/65 md:text-base">
          <p>
            <strong className="font-semibold text-foreground/85">매일 같은 곳, 같은 사람들 안에만 머무르면 생각도 쉽게 좁아진다고 믿습니다.</strong>
            <br />
            학교 밖으로 나가 다양한 사람들과 프로젝트를 만나며 시야를 넓혀왔습니다.
          </p>
          <p className="mt-4">
            낯선 환경에서도 제가 할 수 있는 역할을 찾아왔고, 맡은 일에는 <strong className="font-semibold text-foreground/85">쉽게 식지 않는 애정</strong>을 쏟았습니다.
            <br />
            더 잘 만들고 싶다는 마음은 자연스럽게 <strong className="font-semibold text-foreground/85">더 오래 고민하는 태도</strong>로 이어졌고, 
                        <br />그 과정에서 <strong className="font-semibold text-foreground/85">몰입</strong>하는 법을 배웠습니다.
          </p>
          <p className="mt-5 font-bold text-foreground/85">그렇게 쌓인 도전과 경험들이 지금의 저를 만들었습니다.</p>
        </div>
        </div>
      </SectionWatcher>
      {activeModal ? (
        <LegacyTimelineModals activeModal={activeModal} closeModal={() => setActiveModal(null)} />
      ) : null}
    </>
  )
}

function RecordSection() {
  return (
    <SectionWatcher id="blog">
      <SlideUpInView>
        <p className="section-eyebrow">기록의 습관</p>
        <p className="section-title">생각이 흘러가버리지 않도록 꾸준히 기록해왔습니다.</p>

        <div className="relative mx-auto mb-8 h-56 w-[540px] max-w-full">
          {memoirPosts.map((post, index) => {
            return (
              <a
                key={post.title}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: MEMOIR_ANIMATION_DELAYS[index] }}
                className={`record-float-card absolute w-44 rounded-md border border-foreground/10 bg-background/90 p-2.5 no-underline shadow-sm backdrop-blur transition duration-300 hover:z-10 hover:border-primary/30 hover:shadow-md ${MEMOIR_POSITIONS[index]}`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-20 w-full rounded object-cover"
                />
                <p className="mt-2 truncate text-xs font-bold text-foreground">{post.title}</p>
                <p className="mt-0.5 truncate text-[11px] font-medium text-foreground/45">{post.subtitle}</p>
              </a>
            )
          })}
        </div>

        <div className="mx-auto max-w-[720px] text-center">
          <p className="break-keep text-sm font-medium leading-7 text-foreground/65 md:text-base">
            지나간 경험을 기록으로 남기고, 다시 돌아보는 일을 좋아합니다.
            <br />
            <br />
            5년간 블로그에 경험과 고민을 남겼고,
            <br />
            군 생활 중에도 하루도 빠짐없이 일기를 쓰며 제 생각을 정리했습니다.
          </p>
          <p className="mt-4 break-keep text-sm font-medium leading-7 text-foreground/65 md:text-base">
            그 기록들은 제가 무엇을 좋아하고, 어떤 순간에 고민하며,
            <br />
            어떤 방식으로 성장해왔는지를 가장 솔직하게 보여줍니다.
          </p>
          <p className="mt-4 break-keep text-sm font-semibold leading-7 text-foreground/80 md:text-base">
            포트폴리오에 다 담지 못한 제 이야기가 궁금하다면,
            <br />
            블로그를 편하게 구경해보셔도 좋습니다.
          </p>

          <a
            href="https://blog.naver.com/rlawls1448"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-transparent px-5 py-2.5 text-sm font-bold text-primary no-underline transition hover:bg-primary/5"
          >
            블로그 방문하기
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </SlideUpInView>
    </SectionWatcher>
  )
}

export default function NewPortfolioPage() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
    }

    window.scrollTo(0, 0)
    const frame = window.requestAnimationFrame(() => window.scrollTo(0, 0))
    const timeout = window.setTimeout(() => window.scrollTo(0, 0), 50)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
    }
  }, [])

  return (
    <NextIntlClientProvider locale="ko" messages={messages} timeZone="Asia/Seoul">
      <div className={styles.page}>
        <SectionWatchProvider>
          <main
            className="
              w-full min-w-96 max-w-screen-lg min-h-screen mx-auto
              px-5 md:px-8 lg:px-10
              flex flex-col items-center relative
            "
          >
            <MainSection />
            <ExistingPortfolioHeader />
            <PassionSection />
            <ExperienceSection />
            <ProjectSection />
            <EducationSection />
            <RecordSection />
            <SectionWatcher id="contact">
              <div className="w-full">
                <OutroSection />
              </div>
            </SectionWatcher>
          </main>
          <SectionNav items={NEW_SECTION_NAV_ITEMS} showFromLg />
        </SectionWatchProvider>
      </div>
    </NextIntlClientProvider>
  )
}
