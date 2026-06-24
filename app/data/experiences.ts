// Static portfolio data — hand-maintained.
// (Originally migrated from a Prisma/Postgres DB; the generation pipeline has been retired.)

import type { Locale } from "@/i18n/routing";

import type { Experience } from "./types";

const experiences: Record<Locale, Experience[]> = {
  ko: [
    {
      id: 11,
      title: "엘리스",
      period: "2025.04 - 현재",
      items: ["클라우드 및 교육 플랫폼 개발 및 유지보수", "디자인 시스템 개선", "AI 통합 워크플로우 구축"],
      links: [],
      is_active: true,
      sub_title: "Platform Division, Frontend Engineer",
      index: 0,
      skill_ids: [1, 5, 7, 11, 2],
      category: "WORK",
    },
    {
      id: 10,
      title: "비상교육",
      period: "2024 - 2025.04",
      items: [
        "React, Typescript 기반의 Micro Frontend Service 개발 및 유지보수",
        "소켓 통신의 양방향 수업 플랫폼 개발 및 유지보수",
        "레거시 코드 개선 및 리팩토링(Webpack, React 버전 업그레이드, 상태 관리 store 도메인 기준 분리, 중복 코드 제거 및 모듈화 등)",
      ],
      links: [],
      is_active: false,
      sub_title: "글로벌 Company, 소프트웨어개발 Cell",
      index: 1,
      skill_ids: [1, 2, 5, 6, 12, 16],
      category: "WORK",
    },
    {
      id: 2,
      title: "코드스테이츠",
      period: "2022 - 2023",
      items: [
        "회사 홈페이지, 교육 관리 시스템(LMS) 개발 및 유지보수 (React.js, Next.js, Typescript 기반)",
        "어드민 시스템 MVP 모델 개발, ver.2까지 제품 고도화 (React.js, Typescript 기반)",
        "블로그 개발 및 검색엔진 최적화 작업 (유입트래픽 25.6% 상승)",
        "성능 최적화 TF, 디자인 시스템 TF 참여",
        "통합 로그인 시스템 개발, 제품 간 통합 로그인 상태관리 구현",
      ],
      links: [
        {
          label: "웹사이트",
          href: "https://www.codestates.com/",
        },
        {
          label: "코드스테이츠 블로그",
          href: "https://www.codestates.com/blog",
        },
      ],
      is_active: false,
      sub_title: "IT 교육 부트캠프 스타트업<br/>Internal System Product팀, Frontend-Engineer",
      index: 2,
      skill_ids: [1, 5, 6, 7, 8, 9, 11, 12, 15, 18, 19, 20, 21],
      category: "WORK",
    },
    {
      id: 1,
      title: "티끌",
      period: "2023 - 2024",
      items: [
        "React, TypeScript 기반의 SPA 개발. 모바일 / 데스크탑 대응 반응형 웹사이트 개발",
        "Redux 이용하여 클라이언트 상태 관리, React-Query 이용하여 서버 상태 관리 구현",
        "React-hook-form 활용하여 form 상태 관리 및 validation 구현",
        "Figma 활용 유저 스토리 및 와이어프레임 작성, UI/UX 디자인",
      ],
      links: [
        {
          label: "Figma",
          href: "https://www.figma.com/file/ak0eHSwx6SW3cYfR9MdPmG/High-Fidelity?type=design&node-id=197-138&mode=design",
        },
        {
          label: "Github",
          href: "https://github.com/kdh-92/Tiggle",
        },
      ],
      is_active: false,
      sub_title: "가계부 공유 플랫폼 개발 프로젝트",
      index: 3,
      skill_ids: [1, 5, 9, 10, 8, 12, 14, 17, 27],
      category: "PROJECT",
    },
  ],
  en: [
    {
      id: 11,
      title: "Elice",
      period: "2025.04 - Present",
      items: [
        "Development and maintenance of cloud and education platform",
        "Design system improvements",
        "Building AI-integrated workflows",
      ],
      links: [],
      is_active: true,
      sub_title: "Platform Division, Frontend Engineer",
      index: 0,
      skill_ids: [1, 5, 7, 11, 2],
      category: "WORK",
    },
    {
      id: 10,
      title: "Visang Education",
      period: "2024 - 2025.04",
      items: [
        "Development and maintenance of Micro Frontend Services using React and TypeScript",
        "Development and maintenance of a real-time bidirectional classroom platform via WebSocket",
        "Legacy code improvement and refactoring (Webpack and React version upgrades, state management store separation by domain, deduplication and modularization)",
      ],
      links: [],
      is_active: false,
      sub_title: "Global Company, Software Development Cell",
      index: 1,
      skill_ids: [1, 2, 5, 6, 12, 16],
      category: "WORK",
    },
    {
      id: 2,
      title: "Codestates",
      period: "2022 - 2023",
      items: [
        "Development and maintenance of the company website and LMS (React.js, Next.js, TypeScript)",
        "Built admin system MVP, iterated to v2 (React.js, TypeScript)",
        "Built company blog with SEO improvements (25.6% increase in organic traffic)",
        "Participated in performance optimization TF and design system TF",
        "Developed unified login system with cross-product login state management",
      ],
      links: [
        {
          label: "Website",
          href: "https://www.codestates.com/",
        },
        {
          label: "Codestates Blog",
          href: "https://www.codestates.com/blog",
        },
      ],
      is_active: false,
      sub_title: "IT Education Bootcamp Startup<br/>Internal System Product Team, Frontend Engineer",
      index: 2,
      skill_ids: [1, 5, 6, 7, 8, 9, 11, 12, 15, 18, 19, 20, 21],
      category: "WORK",
    },
    {
      id: 1,
      title: "Tiggle",
      period: "2023 - 2024",
      items: [
        "SPA development with React and TypeScript; responsive web for mobile and desktop",
        "Client state management with Redux; server state management with React-Query",
        "Form state management and validation with React-hook-form",
        "User story and wireframe creation, UI/UX design in Figma",
      ],
      links: [
        {
          label: "Figma",
          href: "https://www.figma.com/file/ak0eHSwx6SW3cYfR9MdPmG/High-Fidelity?type=design&node-id=197-138&mode=design",
        },
        {
          label: "Github",
          href: "https://github.com/kdh-92/Tiggle",
        },
      ],
      is_active: false,
      sub_title: "Shared Expense Tracker Platform Development Project",
      index: 3,
      skill_ids: [1, 5, 9, 10, 8, 12, 14, 17, 27],
      category: "PROJECT",
    },
  ],
};

export default experiences;
