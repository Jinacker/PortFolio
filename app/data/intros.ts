// Static portfolio data — hand-maintained.
// (Originally migrated from a Prisma/Postgres DB; the generation pipeline has been retired.)

import type { Locale } from "@/i18n/routing";

import type { Intro } from "./types";

const intros: Record<Locale, Intro[]> = {
  ko: [
    {
      id: 1,
      title: "확장 가능한 프론트엔드 구조 설계",
      detail:
        "마이크로 프론트엔드 구조를 설계하고 PoC를 구축했으며, 실제 서비스에 점진적으로 적용하며 고도화하고 있습니다.<br/>팀 내 라이브러리를 만들 때 DX를 고려해, 변경이 잦은 환경에서도 일관성과 유지보수성을 지키도록 했습니다.",
      blobUrl: "/assets/intros/feature1.png",
    },
    {
      id: 2,
      title: "성능 개선과 레거시 리팩토링",
      detail:
        "레거시 환경의 사이드 내비게이션을 Module Federation으로 재구성해 초기 로딩 시간을 약 15~19% 줄이고, 중복 서버 요청을 최대 71% 줄였습니다.<br/>상태 관리를 zustand로 일원화하고 거대 store를 도메인 단위로 분리하는 등 레거시 코드를 정리해 유지보수성을 높였습니다.",
      blobUrl: "/assets/intros/feature2.png",
    },
    {
      id: 3,
      title: "직군 간 협업과 조율",
      detail:
        "목적 조직에서 스프린트를 진행하며 디자이너·백엔드와 협업했고, 기술적 제약과 비용을 근거로 설명하며 작업 범위와 책임 경계를 조율해 왔습니다.<br/>프론트엔드 AI Agent 스킬을 설계해, 개발자가 아닌 직군도 AI를 통해 MR 작성까지 할 수 있는 워크플로우를 만들고 있습니다.",
      blobUrl: "/assets/intros/feature3.png",
    },
  ],
  en: [
    {
      id: 1,
      title: "Scalable Frontend Architecture",
      detail:
        "Designed and built a PoC for a micro-frontend architecture, and have been rolling it out incrementally in production.<br/>When building internal libraries, I focus on developer experience so consistency and maintainability hold up even in a fast-changing codebase.",
      blobUrl: "/assets/intros/feature1.png",
    },
    {
      id: 2,
      title: "Performance & Legacy Refactoring",
      detail:
        "Rebuilt a legacy side navigation with Module Federation, cutting initial load time by about 15–19% and redundant server requests by up to 71%.<br/>Consolidated state management on Zustand and split a monolithic store by domain, cleaning up legacy code to improve maintainability.",
      blobUrl: "/assets/intros/feature2.png",
    },
    {
      id: 3,
      title: "Cross-functional Collaboration",
      detail:
        "Working within a product team, I collaborate with designers and backend engineers across sprints, aligning scope and responsibility boundaries by explaining technical constraints and trade-offs.<br/>I'm designing frontend AI agent skills so non-developer roles can open merge requests through AI and work more efficiently.",
      blobUrl: "/assets/intros/feature3.png",
    },
  ],
};

export default intros;
