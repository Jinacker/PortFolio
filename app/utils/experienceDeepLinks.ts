// 이력서·지원서에 이미 배포된 링크(#experience-<id>)로 들어왔을 때
// 카드를 펼치는 것에서 끝내지 않고, 그 경험에서 가장 먼저 보여줄 소재까지 연다.
//
// 링크 주소는 바꿀 수 없으므로(이미 제출됨) 어떤 소재를 열지는 여기에 고정한다.
// 소재를 바꾸려면 이 표만 수정하면 된다.

export type ExperienceDeepLinkTarget =
  /** 문서 모달을 바로 연다 — href·label은 해당 문서 버튼과 같은 값을 쓴다 */
  | { kind: "doc"; href: string; label: string }
  /** 그 섹션까지만 내려간다 — title은 detailSections의 title과 같아야 한다 */
  | { kind: "section"; title: string };

export const EXPERIENCE_DEEP_LINK_TARGETS: Record<number, ExperienceDeepLinkTarget> = {
  // 돈가스 지도 → 취향 추천 기능 문서
  101: {
    kind: "doc",
    href: "/mds/katsu-map/impl-4-recommend.md",
    label: "돈가스 테이스팅 기록을 바탕으로 취향에 맞는 식당을 추천하는 기능을 만들었습니다",
  },
  // 슈어소프트테크 인턴 → 핵심 작업 섹션까지만 (아래 카드는 펼치지 않는다)
  102: {
    kind: "section",
    title: "핵심 작업",
  },
  // 끼니톡 → 식단 분석 AI 서버 문서
  105: {
    kind: "doc",
    href: "/mds/kkinitalk/impl-1-model.md",
    label: "식사 사진을 영양 정보로 바꾸는 AI 분석 서버를 만들었습니다",
  },
  // AI, 모델에서 제품으로 → 계획 기반 개발 흐름 문서
  106: {
    kind: "doc",
    href: "/mds/ai-workflow/plan.md",
    label: "계획하고 개발하기 — Plan-first · Task 체크리스트 · 승인 게이트",
  },
};
