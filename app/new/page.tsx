"use client"

import { NextIntlClientProvider } from "next-intl"
import { BookOpen, Code, Mail, User } from "lucide-react"

import { SectionWatchProvider } from "@/_components/SectionWatcher"
import BlogSection from "@/_sections/BlogSection"
import EducationSection from "@/_sections/EducationSection"
import ExperienceSection from "@/_sections/ExperienceSection"
import IntroSection from "@/_sections/IntroSection"
import MainSection from "@/_sections/MainSection"
import OutroSection from "@/_sections/OutroSection"
import ProjectSection from "@/_sections/ProjectSection"
import messages from "../../messages/ko.json"

import styles from "./original.module.css"

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
            <IntroSection />
            <ExperienceSection />
            <ProjectSection />
            <BlogSection />
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
