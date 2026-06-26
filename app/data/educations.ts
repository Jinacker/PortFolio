// Static portfolio data — hand-maintained.
// (Originally migrated from a Prisma/Postgres DB; the generation pipeline has been retired.)

import type { Locale } from "@/i18n/routing";

import type { Education } from "./types";

const educations: Record<Locale, Education[]> = {
  ko: [
    {
      id: 1,
      title: "인하대학교",
      sub_title: "공간정보공학과 전공, 인공지능공학과 복수전공",
      period: "2021 - 2027",
      items: [
        "위치 기반 데이터, 지도 서비스, 공간 분석 등 공간정보 기반 문제 해결 방법 학습",
        "자료구조, 알고리즘, 데이터베이스 등 CS 지식과 인공지능·데이터 처리 지식 학습",
        "공간 데이터와 소프트웨어 개발 역량을 연결해 실제 서비스 구현 역량 확장",
      ],
      category: "EDUCATION",
    },
    {
      id: 2,
      title: "자격 준비중,,",
      sub_title: "정보처리기사 · 측량 및 지형공간정보기사 · TOEIC Speaking",
      period: "2026",
      items: [
        "정보처리기사 - 필기 합격 - 실기 준비중",
        "측량 및 지형공간정보기사 - 필기 합격 - 실기 준비중",
        "TOEIC 및 TOEIC Speaking 준비중",
      ],
      category: "CERTIFICATION",
    },
  ],
  en: [
    {
      id: 1,
      title: "Inha University (Enrolled)",
      sub_title: "Major in Geoinformatic Engineering, Double Major in Artificial Intelligence Engineering",
      period: "2021 - 2027",
      items: [
        "Studying geoinformatic engineering to interpret real-world problems through location-based data, map services, spatial analysis, and route exploration.",
        "Building CS fundamentals including data structures, algorithms, and databases through a double major in artificial intelligence engineering.",
        "Connecting spatial data processing with AI and software development to build services that solve real user problems.",
      ],
      category: "EDUCATION",
    },
    {
      id: 2,
      title: "Certifications",
      sub_title: "Engineer Information Processing · Surveying & Geospatial Information Engineer · TOEIC Speaking",
      period: "2026",
      items: [
        "Engineer Information Processing - written exam passed - practical exam in progress",
        "Surveying & Geospatial Information Engineer - written exam passed - practical exam in progress",
        "TOEIC Speaking in progress",
      ],
      category: "CERTIFICATION",
    },
  ],
};

export default educations;
