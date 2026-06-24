// Static portfolio data — hand-maintained.
// (Originally migrated from a Prisma/Postgres DB; the generation pipeline has been retired.)

import type { Locale } from "@/i18n/routing";

import type { Education } from "./types";

const educations: Record<Locale, Education[]> = {
  ko: [
    {
      id: 1,
      title: "서강대학교",
      sub_title: "Art & Technology 전공, 융합소프트웨어 복수전공",
      period: "2016 - 2023",
      items: [
        "웹 프로그래밍 기초, 이미지 프로세싱 및 인터렉티브 미디어 프로그래밍 학습<br />기초 디자인 및 UI/UX 디자인 학습",
        "C, Java, 자료구조, 알고리즘 등 기초 CS 지식 학습<br />Python, R, 빅데이터 프로그래밍, 코퍼스 언어학 등 데이터 프로그래밍 학습",
      ],
      category: "EDUCATION",
    },
    {
      id: 2,
      title: "한국디지털미디어고등학교",
      sub_title: "디지털콘텐츠과",
      period: "2013 - 2016",
      items: ["컴퓨터 그래픽, 3D 모델링, 영상 편집, 컴퓨터 음악 등 디지털 콘텐츠 제작 기술 교육"],
      category: "EDUCATION",
    },
    {
      id: 3,
      title: "OPIc",
      sub_title: "Intermediate HIGH",
      period: "2024.03.19",
      items: [],
      category: "CERTIFICATION",
    },
    {
      id: 4,
      title: "TOEIC",
      sub_title: "915 점",
      period: "2023.11.26",
      items: [],
      category: "CERTIFICATION",
    },
  ],
  en: [
    {
      id: 1,
      title: "Sogang University",
      sub_title: "Major in Art & Technology, Double Major in Convergence Software",
      period: "2016 - 2023",
      items: [
        "Studied web programming fundamentals, image processing, and interactive media programming<br />Studied foundational design and UI/UX design",
        "Studied core CS concepts including C, Java, data structures, and algorithms<br />Studied data programming with Python, R, big data programming, and corpus linguistics",
      ],
      category: "EDUCATION",
    },
    {
      id: 2,
      title: "Korea Digital Media High School",
      sub_title: "Digital Contents Department",
      period: "2013 - 2016",
      items: [
        "Studied digital content production including computer graphics, 3D modeling, video editing, and computer music",
      ],
      category: "EDUCATION",
    },
    {
      id: 3,
      title: "OPIc",
      sub_title: "Intermediate HIGH",
      period: "2024.03.19",
      items: [],
      category: "CERTIFICATION",
    },
    {
      id: 4,
      title: "TOEIC",
      sub_title: "915",
      period: "2023.11.26",
      items: [],
      category: "CERTIFICATION",
    },
  ],
};

export default educations;
