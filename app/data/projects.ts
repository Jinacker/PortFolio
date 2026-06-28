// Static portfolio data — hand-maintained.
// Curated project cases, shown as an inline accordion (problem → approach → result).

import type { Locale } from "@/i18n/routing";

import type { ProjectCase } from "./types";

const projects: Record<Locale, ProjectCase[]> = {
  ko: [
    {
      id: "elice-mf-nav",
      company: "엘리스",
      period: "2025",
      title: "사이드 내비게이션 성능 개선",
      summary: "레거시 환경의 사이드 내비게이션을 Module Federation으로 재구성해 초기 로딩과 과다 요청을 줄였습니다.",
      points: [
        "강의별 상태(점수·진행률 등)를 개별 호출하는 N+1 구조에, 페이지네이션을 끝까지 재귀 호출하던 과다 요청이 겹쳐 초기 로딩이 21~26초에 달했습니다.",
        "백엔드·운영과 협의해 자료 수 상한을 정해 재귀 호출을 끊고, 요청을 id로 묶어 보내는 batch manager를 작성해 N+1을 배치 호출로 전환했습니다. (응답을 select로 각 id에 매핑)",
        "초기 로딩 약 15~19%↓, 수업 목록 API 47→23회(51%↓), 수업자료 LNB 127→37회(71%↓).",
        "Module Federation 전환으로 늘어난 네트워크 수신량은, 기존 앱 기능을 신규 앱으로 점진 이전하면 해소되도록 계획했습니다.",
      ],
      stack: ["Module Federation", "React", "TypeScript"],
    },
    {
      id: "elice-design-system",
      company: "엘리스",
      period: "2025",
      title: "디자인 시스템 개편 · AI 워크플로우",
      summary:
        "유지보수가 멈춰 있던 사내 디자인 시스템을 개편하고, 디자이너가 직접 다룰 수 있는 AI 워크플로우를 더했습니다.",
      points: [
        "MUI v5→v9 마이그레이션과 함께, mui-material을 래핑·재노출해 단일 진입점으로 통합했습니다. 인터페이스 변경을 래퍼가 흡수하고 import 경로를 일원화해 변경이 잦은 환경에서도 일관성을 유지합니다.",
        "디자이너가 개발자 없이 컴포넌트를 수정→문서화→MR까지 진행할 수 있도록, 팀 컨벤션을 담은 프론트엔드 AI 에이전트 스킬을 만들었습니다. (컴포넌트별 가이드 문서 + preview 기반 수정 + docs·MR 자동화)",
        "AI로 코드를 생성할 때 디자인 시스템 컨텍스트를 몰라 커스텀 컴포넌트를 매번 새로 만들던 문제를 줄였습니다.",
      ],
      stack: ["MUI", "TypeScript", "AI Agent"],
    },
    {
      id: "visang-mfe",
      company: "비상교육",
      period: "2024",
      title: "화상수업 공유 앱 MFE 설계 · 레거시 정비",
      summary:
        "여러 교육 서비스가 공유하는 화상 수업을 Module Federation 기반 shared 앱으로 분리하는 구조를 설계하고 PoC를 구축했습니다.",
      points: [
        "라이브러리 배포 대신 MF를 택해, 타 부서가 버전을 따라가는 부담 없이 화상수업 팀이 배포 주도권을 갖는 런타임 통합 구조를 만들었습니다.",
        "Webpack v4→v5로 올리고 레거시 코드를 pnpm 모노레포로 정리했습니다. standalone 동작이 필요한 콘텐츠 앱은 iframe으로 통합하고, 메시지에 식별자를 부여해 요청-응답을 Promise로 다루는 통신 계층을 구현했습니다.",
        "상태 관리를 zustand로 일원화(mobx 제거)하고 거대 store를 도메인 단위로 분리했으며, 외주 코드 리뷰로 성능 병목(과도한 리렌더, O(n²) 로직)을 짚었습니다.",
      ],
      stack: ["Module Federation", "Webpack", "pnpm", "zustand", "TypeScript"],
    },
    {
      id: "tiggle",
      company: "사이드 프로젝트",
      period: "2023.07 – 2024.07",
      title: "티끌 — 공유 가계부 플랫폼",
      summary: "기획·UI/UX·개발을 직접 주도한 풀 오너십 사이드 프로젝트입니다.",
      points: [
        "거래 CRUD·필터링, react-hook-form 기반 폼·유효성 검사, 이미지 업로드·미리보기 훅, BottomSheet·Popover·Modal 등 공용 오버레이 컴포넌트를 개발했습니다.",
        "로그인 상태 관리를 Redux·redux-persist로 구현하고, 로그인 여부를 확인해 진입을 제어하는 withAuth HOC를 작성했습니다.",
        "유저 스토리·와이어프레임부터 반응형 UI(모바일·태블릿·데스크탑)와 공용 색상·텍스트·컴포넌트 라이브러리까지 디자인하고, Figma-Token으로 Figma와 GitHub를 연동했습니다.",
      ],
      stack: ["React", "TypeScript", "Redux", "React-Query", "react-hook-form", "Figma"],
      links: [
        { label: "GitHub", href: "https://github.com/kdh-92/Tiggle" },
        {
          label: "Figma",
          href: "https://www.figma.com/file/ak0eHSwx6SW3cYfR9MdPmG/High-Fidelity?type=design&node-id=197-138&mode=design",
        },
      ],
    },
    {
      id: "codestates-blog",
      company: "코드스테이츠",
      period: "2022",
      title: "공식 블로그 구축 · 검색엔진 최적화",
      summary: "회사 공식 블로그를 홈페이지 내부에 구축하고 검색엔진 최적화를 담당했습니다. (FE 1인)",
      points: [
        "기존 WordPress 블로그를 연동하며 over-fetch를 줄이기 위해 GraphQL로 통신하고, 기존 URL은 정규표현식으로 분석해 대응 페이지로 리다이렉트했습니다.",
        "SSR과 콘텐츠별 slug URL, 동적 sitemap.xml, 메타데이터·heading 구조·alt text 정리로 SEO를 개선했습니다.",
        "8개월간 자연 유입 트래픽을 25.6% 늘리고 경쟁사 트래픽을 추월했습니다.",
      ],
      stack: ["Next.js", "TypeScript", "Styled-components", "GraphQL"],
      links: [{ label: "코드스테이츠 블로그", href: "https://www.codestates.com/blog" }],
    },
  ],
  en: [
    {
      id: "elice-mf-nav",
      company: "Elice",
      period: "2025",
      title: "Side Navigation Performance",
      summary:
        "Rebuilt a legacy side navigation with Module Federation to cut initial load time and excessive API requests.",
      points: [
        "Per-lecture status calls (scores, progress, etc.) created an N+1 pattern, and paginated data was fetched recursively to the end — together pushing initial load to 21–26 seconds.",
        "Worked with backend and ops to cap page size and stop the recursive fetching, then wrote a batch manager that groups requests by id, turning N+1 into batched calls (mapping each response back by id via a select function).",
        "Initial load down ~15–19%; class-list API 47→23 calls (−51%), course-material LNB 127→37 calls (−71%).",
        "The added network payload from Module Federation is planned to resolve as legacy features are migrated into the new app incrementally.",
      ],
      stack: ["Module Federation", "React", "TypeScript"],
    },
    {
      id: "elice-design-system",
      company: "Elice",
      period: "2025",
      title: "Design System Revamp · AI Workflow",
      summary:
        "Revamped a stalled internal design system and added an AI workflow that designers can drive themselves.",
      points: [
        "Migrated MUI v5→v9 and unified everything behind a single entry point by wrapping and re-exporting mui-material, so interface changes are absorbed by wrappers and import paths stay consistent in a fast-changing codebase.",
        "Built frontend AI agent skills encoding team conventions so designers can edit components, generate docs, and open merge requests without a developer (per-component guide docs + preview-based editing + docs/MR automation).",
        "This reduces the problem of AI regenerating custom components from scratch because it lacked design-system context.",
      ],
      stack: ["MUI", "TypeScript", "AI Agent"],
    },
    {
      id: "visang-mfe",
      company: "Visang Education",
      period: "2024",
      title: "Live-class Shared App (MFE) · Legacy Cleanup",
      summary:
        "Designed and built a PoC to split a shared live-class feature into a Module Federation app used across multiple education services.",
      points: [
        "Chose Module Federation over a published library so the live-class team keeps deployment ownership, instead of each consuming department having to track library versions.",
        "Upgraded Webpack v4→v5 and reorganized legacy code into a pnpm monorepo. Integrated a content app that had to run standalone via iframe, with a messaging layer that tags messages with ids to handle request/response as promises.",
        "Consolidated state management on Zustand (removing MobX), split a monolithic store by domain, and reviewed vendor code to flag performance bottlenecks (excessive re-renders, O(n²) logic).",
      ],
      stack: ["Module Federation", "Webpack", "pnpm", "zustand", "TypeScript"],
    },
    {
      id: "tiggle",
      company: "Side Project",
      period: "2023.07 – 2024.07",
      title: "Tiggle — Shared Household Ledger",
      summary: "A full-ownership side project where I drove planning, UI/UX, and development.",
      points: [
        "Built transaction CRUD and filtering, react-hook-form forms with validation, an image upload/preview hook, and shared overlay components (BottomSheet, Popover, Modal).",
        "Implemented auth state with Redux and redux-persist, and a withAuth HOC that gates page access by login status.",
        "Designed from user stories and wireframes to responsive UI (mobile/tablet/desktop) and a shared color/text/component library, syncing Figma and GitHub via Figma-Token.",
      ],
      stack: ["React", "TypeScript", "Redux", "React-Query", "react-hook-form", "Figma"],
      links: [
        { label: "GitHub", href: "https://github.com/kdh-92/Tiggle" },
        {
          label: "Figma",
          href: "https://www.figma.com/file/ak0eHSwx6SW3cYfR9MdPmG/High-Fidelity?type=design&node-id=197-138&mode=design",
        },
      ],
    },
    {
      id: "codestates-blog",
      company: "Codestates",
      period: "2022",
      title: "Company Blog · SEO",
      summary: "Built the company's official blog inside the main site and owned SEO. (sole frontend)",
      points: [
        "Integrated the existing WordPress blog over GraphQL to avoid over-fetching, and redirected old URLs to their new pages by parsing paths with regular expressions.",
        "Improved SEO with SSR, per-content slug URLs, a dynamic sitemap.xml, and cleaned-up metadata, heading structure, and alt text.",
        "Grew organic traffic 25.6% over eight months, overtaking a competitor's traffic.",
      ],
      stack: ["Next.js", "TypeScript", "Styled-components", "GraphQL"],
      links: [{ label: "Codestates Blog", href: "https://www.codestates.com/blog" }],
    },
  ],
};

export default projects;
