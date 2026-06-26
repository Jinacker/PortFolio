"use client"

import { NextIntlClientProvider } from "next-intl"
import { ArrowUpRight, BookOpen, Code, Code2, GraduationCap, Mail, Trophy, User, Users } from "lucide-react"

import { SectionWatchProvider } from "@/_components/SectionWatcher"
import EducationSection from "@/_sections/EducationSection"
import ExperienceSection from "@/_sections/ExperienceSection"
import MainSection from "@/_sections/MainSection"
import OutroSection from "@/_sections/OutroSection"
import ProjectSection from "@/_sections/ProjectSection"
import messages from "../../messages/ko.json"

import styles from "./original.module.css"

const passionGroups = [
  {
    title: "프로젝트 수상",
    icon: Trophy,
    iconClass: "text-yellow-300",
    items: [
      ["2025.08.28", "신세계 I&C 산학협력 프로젝트 우수상", "정보통신기획평가원장상"],
      ["2025.06.20", "I-Mini 프로젝트 대상", "인하대학교 SW중심 대학사업단"],
      ["2024.11.07", "제 6회 공간정보 활용 경진대회 최우수상", "공간정보 산업진흥원"],
      ["2024.11.01", "농어촌 디지털트윈 경진대회 장려상", "포스텍 미래 도시 연구센터"],
      ["2020.12.18", "제5회 INU 메이커 경진대회 우수상", "인천대학교"],
    ],
  },
  {
    title: "개발 연혁",
    icon: Code2,
    iconClass: "text-[#00C676]",
    items: [
      ["2026.03 ~ 2026.06", "SureSoftTech. 시험자동화연구소 VSPICE팀 인턴", ""],
      ["2025.12 ~ 2026.06", "트래드랩 창업팀 백엔드 개발", ""],
      ["2025.09 ~ 2026.02", "UMC 9기 Node.JS Server 파트", ""],
      ["2025.03 ~ 2025.12", "멋쟁이 사자처럼 13기 BE 파트", ""],
      ["2025.01 ~ 2025.11", "KSEB 부트캠프 4기", ""],
      ["2024.11 ~ 2025.03", "KT 대학생 IT 서포터즈 2기 - AI 코딩 커리큘럼 개발", ""],
      ["2024.09 ~ 2024.11", "2024 데이터 크리에이터 캠프 스타터 과정", ""],
    ],
  },
  {
    title: "개인 수상 및 장학금",
    icon: GraduationCap,
    iconClass: "text-yellow-300",
    items: [
      ["2026.05.26", "2026-1학기 Co-op 인턴 주간보고 평가 최우수상", "인하대학교 인재개발원 + 슈어소프트테크(주)"],
      ["2026.02.20", "UMC 9기 서버파트 Best Challenger 수상", "대학생 개발 연합동아리 UMC"],
      ["2025.06.20", "KSEB 4기 우수교육생 수상", "인하대학교 SW중심대학사업단장상"],
      ["2025.04.24", "2025 농협 조합원 자녀 대학생 장학생", "농협 영농회"],
      ["2025-1학기", "국토정보공사 발전 장려 장학생", "국토정보공사 장학회"],
      ["2024.10.31", "디지털 혁신 페스타 2024 우수 서포터즈 수상", "지디넷코리아"],
      ["2024-2학기", "국토정보공사 발전 장려 장학생", "국토정보공사 장학회"],
    ],
  },
  {
    title: "대외활동",
    icon: Users,
    iconClass: "text-[#00C676]",
    items: [
      ["2025.09", "2025 메이커페어 부스 창업 및 운영", "Maker Faire Seoul 2025"],
      ["2025.03 ~ 2026.02", "코딩 동아리 DEBUG 회장", "공간정보공학과 학술 동아리"],
      ["2025.01", "커비eSim 서포터즈 1기", "핀트원(주)"],
      ["2024.12.05 ~ 2025.03.21", "KT 대학생 IT 서포터즈 KIT 2기 기획팀 부팀장", "KT희망나눔그룹"],
      ["2024.08.17 ~ 2024.09.21", "부천시 스마트리빙랩 시민참여단 팀장", "부천시"],
      ["2024.08.12 ~ 2024.10.31", "디지털 혁신 페스타 서포터즈", "지디넷코리아"],
    ],
  },
]

const MEMOIR_POSITIONS = [
  "left-0 top-6 rotate-[-12deg] z-[4]",
  "left-[120px] top-1 rotate-[-4deg] z-[3]",
  "left-[240px] top-5 rotate-[5deg] z-[2]",
  "left-[360px] top-9 rotate-[12deg] z-[1]",
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
          <a href="#skills" className="text-gray-800 hover:text-gray-900 transition flex items-center gap-2 no-underline">
            <Code className="w-5 h-5" /> 기술
          </a>
          <a href="#experience" className="text-gray-800 hover:text-gray-900 transition flex items-center gap-2 no-underline">
            <BookOpen className="w-5 h-5" /> 경험
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
  return (
    <section id="intro" className="w-full">
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
              {group.items.map(([date, title, organization]) => (
                <li
                  key={`${group.title}-${date}-${title}`}
                  className="py-1 indent-0 first:pt-0 last:pb-0"
                >
                  <p className="text-[10px] font-semibold leading-3 text-foreground/40">{date}</p>
                  <p className={`mt-0.5 font-semibold leading-4 text-foreground/85 ${title.includes("VSPICE") ? "whitespace-nowrap text-[10px]" : "break-keep text-[11px]"}`}>{title}</p>
                  {organization ? (
                    <p className="break-keep text-[10px] leading-3 text-foreground/45">{organization}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </article>
        )})}
      </div>

      <p className="mx-auto mt-7 max-w-2xl break-keep text-center text-sm font-semibold leading-6 text-foreground/75 md:text-base">
        맡은 일에 애정을 가지고, 후회가 남지 않을 만큼 몰입해왔습니다.
        <br />
        그 과정에서 쌓인 경험들이 지금의 저를 만들었습니다.
      </p>
    </section>
  )
}

function RecordSection() {
  return (
    <section id="blog" className="w-full">
      <p className="section-eyebrow">기록의 습관</p>
      <p className="section-title">생각이 흘러가버리지 않도록 꾸준히 기록해왔습니다.</p>

      <div className="relative mx-auto mb-10 h-56 w-[540px] max-w-full">
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
          5년간 블로그에 경험과 고민을 남겼고,
          <br />
          군 생활 동안에도 하루도 빠짐없이 일기를 쓰며 스스로를 돌아봤습니다.
        </p>
        <p className="mt-4 break-keep text-sm font-medium leading-7 text-foreground/65 md:text-base">
          결과보다 과정에 가까운 이야기들,
          <br />
          그리고 제가 어떤 방식으로 배우고 성장해왔는지를 담아두었습니다.
        </p>
        <p className="mt-4 break-keep text-sm font-semibold leading-7 text-foreground/80 md:text-base">
          제가 어떤 생각을 하며 여기까지 왔는지 궁금하다면,
          <br />
          블로그에 남겨둔 기록들을 편하게 구경해보셔도 좋습니다.
        </p>

        <a
          href="https://blog.naver.com/rlawls1448"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-bold text-primary no-underline transition hover:bg-primary/10"
        >
          블로그 방문하기
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </a>
      </div>
    </section>
  )
}

export default function NewPortfolioPage() {
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
            <RecordSection />
            <ProjectSection />
            <EducationSection />
            <div id="contact" className="w-full">
              <OutroSection />
            </div>
          </main>
        </SectionWatchProvider>
      </div>
    </NextIntlClientProvider>
  )
}
