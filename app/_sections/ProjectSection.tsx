"use client";

import { useState } from "react";

import SectionWatcher from "@/_components/SectionWatcher";
import SkillItem from "@/_components/skill/SkillItem";
import SlideUpInView from "@/_components/SlideUpInView";

const competencies = [
  {
    id: "operation-driven",
    title: "운영 환경을 기준으로 영향 범위를 좁히는 개발",
    images: ["/projects/operation_1.png"],
    tools: ["Grafana", "Sentry", "Cloud Logging", "Cloud Monitoring", "Lighthouse"],
    highlights: [
      "현재 사용 중인 사용자, 업데이트하지 않은 사용자, 앞으로 확장될 기능",
      "로그와 재현 조건",
      "필요한 부분만 안정적으로 바꾸는 것",
    ],
    paragraphs: [
      "개발 환경에서 정상 동작하는 기능도 실제 사용자 환경에서는 예상치 못한 문제로 이어질 수 있다고 생각합니다.",
      "그래서 기능을 수정할 때는 현재 사용 중인 사용자, 업데이트하지 않은 사용자, 앞으로 확장될 기능까지 함께 고려하며 영향 범위를 먼저 판단합니다. 문제가 발생하면 로그와 재현 조건을 바탕으로 원인을 좁히고, 기존 흐름을 깨뜨리지 않는 최소 변경으로 개선합니다.",
      "실서비스 운영과 인턴에서의 레거시 경험을 통해, 좋은 수정은 많은 코드를 바꾸는 것이 아니라 문제의 원인을 정확히 찾아 필요한 부분만 안정적으로 바꾸는 것이라는 기준을 갖게 되었습니다.",
    ],
  },
  {
    id: "full-cycle",
    title: "여러 역할의 관점을 잇는 협업 중심의 풀사이클 경험",
    images: ["/projects/makerfaire_booth.png"],
    tools: ["Figma", "Notion", "Jira", "Slack", "GitHub"],
    highlights: [
      "서비스가 만들어지고 사용자에게 전달되는 전체 흐름",
      "실제 구현과 협업이 가능한 단위",
      "개발 흐름 안에 녹여왔습니다",
    ],
    paragraphs: [
      "기획, 디자인, 프론트엔드, 백엔드, 운영까지 여러 역할을 직접 맡으며 서비스가 만들어지고 사용자에게 전달되는 전체 흐름을 경험했습니다.",
      "각 역할을 직접 수행해보며 화면을 만드는 입장, API를 설계하는 입장, 운영 중 문제를 대응하는 입장의 제약과 고민을 이해하게 되었습니다. 덕분에 요구사항을 단순 기능 목록이 아니라 실제 구현과 협업이 가능한 단위로 정리하는 데 강점이 있습니다.",
      "사용자 피드백을 꾸준히 받아왔고, 이를 화면, 기능, 운영 방식에 반영해 제품을 개선해왔습니다. 사용자의 반응을 듣고 방향을 조정하는 과정을 자연스럽게 개발 흐름 안에 녹여왔습니다.",
    ],
  },
  {
    id: "change-ready-backend",
    title: "변경을 감당하는 구조 설계",
    images: ["/projects/backend_1.png"],
    tools: ["Vitest", "Jest/SuperTest", "GitHub Actions", "Cloud Build", "Docker"],
    highlights: [
      "변경을 견디고 검증할 수 있는 구조",
      "역할별 책임",
      "데이터가 변경되는 기준",
      "테스트 기준",
      "구조와 테스트 기준",
      "테스트부터 코드 검사, 빌드, 배포까지 이어지는 흐름을 자동화",
    ],
    paragraphs: [
      "요구사항은 계속 바뀌기 때문에, 기능을 빠르게 추가하는 것보다 변경을 견디고 검증할 수 있는 구조를 중요하게 생각합니다.",
      "기능을 만들 때는 먼저 역할별 책임과 데이터가 변경되는 기준을 정리합니다. 동시에 어떤 입력에서 정상 동작해야 하고, 어떤 상황에서 실패해야 하는지를 테스트 기준으로 남깁니다. 구조와 테스트 기준이 함께 잡혀 있어야 기능을 확장하거나 내부 구현을 바꿀 때도 기존 흐름이 유지되는지 확인할 수 있다고 생각합니다.",
      "테스트부터 코드 검사, 빌드, 배포까지 이어지는 흐름을 자동화해 변경 사항을 반복적으로 확인하고, 안정적으로 반영할 수 있는 구조를 만들고자 합니다.",
    ],
  },
  {
    id: "ai-spatial-value",
    title: "공간정보와 인공지능을 활용한 개발 생산성과 품질 개선",
    images: ["/projects/arcgis_pro.png"],
    tools: ["QGIS", "ARCGIS", "HuggingFace", "Headroom", "CodeRabbit", "GitHub MCP"],
    highlights: [
      "사용자의 이동과 탐색, 선택을 돕는 서비스 기능",
      "설계 검토, 구현 보조, 리뷰, 오류 분석",
      "개발 속도와 안정성",
      "개발 워크플로우 개선",
    ],
    paragraphs: [
      "공간정보공학을 공부하며 데이터가 단순한 좌표나 수치에 머무르지 않고, 사용자의 이동과 탐색, 선택을 돕는 서비스 기능으로 연결될 수 있다는 점을 배웠습니다. 이를 바탕으로 지도와 위치 데이터를 단순 표시가 아닌 사용자 경험을 개선하는 방향으로 활용하는 데 관심을 가지고 있습니다.",
      "또한 AI를 단순 코드 생성기가 아니라 설계 검토, 구현 보조, 리뷰, 오류 분석을 돕는 개발 도구로 활용하고 있습니다. 기능 구현 전 의도, 구조, 예외 상황을 문서화하고 이를 AI 컨텍스트로 활용해 작업의 방향성을 유지합니다.",
      "빠르게 구현하되 도메인 규칙과 품질 기준은 직접 검토하는 방식으로 개발 속도와 안정성을 높이고 있습니다."
    ],
  },
] as const;

const verticalLabels = ["운영", "협업", "설계", "활용"] as const;
const accentColors = ["#007AFF", "#00C676", "#FF9F0A"] as const;
const numberColors = ["#007AFF", "#00C676", "#FFD84D"] as const;
const lineColors = ["#007AFF", "#00C676", "#FFD84D"] as const;
const titleKeywords = ["운영", "협업", "설계", "활용"] as const;

const toolIconUrls: Record<string, string> = {
  Grafana: "/assets/skills/grafana.webp",
  Sentry: "https://cdn.simpleicons.org/sentry",
  "Cloud Logging": "/assets/skills/cloudlogging.avif",
  "Cloud Monitoring": "/assets/skills/cloudmonitoring.jpeg",
  Lighthouse: "/assets/skills/lighthouse.png",
  Figma: "/assets/skills/figma.png",
  Notion: "https://cdn.simpleicons.org/notion",
  Jira: "/assets/skills/jira.png",
  Slack: "/assets/skills/slack.png",
  GitHub: "/assets/skills/github.png",
  Vitest: "/assets/skills/vitest.png",
  "Jest/SuperTest": "/assets/skills/Jest.png",
  "GitHub Actions": "/assets/skills/github-actions.png",
  "Cloud Build": "/assets/skills/cloudbuild.png",
  Docker: "/assets/skills/docker.svg",
  QGIS: "/assets/skills/qgis.png",
  ARCGIS: "https://cdn.simpleicons.org/arcgis",
  HuggingFace: "/assets/skills/huggingface.webp",
  Headroom: "/assets/skills/headroom.svg",
  CodeRabbit: "https://cdn.simpleicons.org/coderabbit",
  "GitHub MCP": "/assets/skills/githubmcp.webp",
};

function renderHighlightedText(text: string, highlights: readonly string[]) {
  const escaped = highlights.map(item => item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));

  return parts.map((part, index) =>
    highlights.includes(part) ? (
      <strong key={`${part}-${index}`} className="font-bold text-slate-900">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function ProjectSection() {
  const [openId, setOpenId] = useState<string>(competencies[0].id);

  return (
    <SectionWatcher id="project">
      <SlideUpInView>
        <h2 className="section-eyebrow">핵심 역량</h2>
        <p className="section-title">
          서비스의 전체 흐름을 이해하고, <br/>
          <br className="md:hidden" /> 운영 환경에서 드러나는 문제를 기술적으로 개선합니다.
        </p>

        {/* css_sliding_cards 레포 구조 그대로 포팅: 하단 정렬 row(아이콘 + 고정폭 description) */}
        <div className="mx-auto flex w-full max-w-[780px] flex-col gap-2.5 md:items-stretch md:flex-row">
          {competencies.map(({ id, title, images, tools, highlights, paragraphs }, index) => {
            const isOpen = openId === id;
            const label = verticalLabels[index % verticalLabels.length];
            const accentColor = accentColors[index % accentColors.length];
            const numberColor = numberColors[index % numberColors.length];
            const lineColor = lineColors[index % lineColors.length];
            const titleKeyword = titleKeywords[index % titleKeywords.length];

            return (
              <button
                key={id}
                type="button"
                onClick={() => setOpenId(id)}
                aria-expanded={isOpen}
                className={`relative flex flex-col overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white text-left shadow-[0_10px_30px_-8px_rgba(15,23,42,0.18)] transition-[width,height,flex] duration-700 ease-[cubic-bezier(.28,-.03,0,.99)] ${
                  isOpen
                    ? "h-auto md:flex-1"
                    : "h-[60px] md:h-auto md:w-[76px] md:flex-none"
                }`}
              >
                {/* 접힌 상태에서는 짧은 라벨만 노출 */}
                <span
                  className={`pointer-events-none absolute left-1/2 top-6 hidden -translate-x-1/2 items-start gap-px transition-opacity duration-150 md:flex ${
                    isOpen ? "opacity-0" : "opacity-100 [transition-delay:550ms]"
                  }`}
                >
                  <span className="mt-0.5 h-[61px] w-[5px] shrink-0 rounded-full" style={{ backgroundColor: lineColor }} />
                  <span className="whitespace-nowrap text-[28px] font-semibold text-[#4e4e53] [font-family:Arial,sans-serif] [font-weight:600] [letter-spacing:0] [writing-mode:vertical-rl]">
                    {label}
                  </span>
                </span>

                {/* 카드 확장이 끝난 다음 본문을 한 번에 노출 */}
                <div
                  className={`min-h-0 flex-1 overflow-hidden px-[15px] pb-6 pt-6 transition-none md:pb-0 md:transition-[opacity,transform] md:ease-out ${
                    isOpen
                      ? "translate-y-0 opacity-100 md:duration-200 md:[transition-delay:650ms]"
                      : "pointer-events-none translate-y-3 opacity-0 md:duration-100 md:[transition-delay:0ms]"
                  }`}
                >
                  <div className="flex h-full w-full flex-col md:w-[500px]">
                    {images.length > 0 ? (
                      <div className="mb-3 flex gap-2">
                        {images.map(src => (
                          <img
                            key={src}
                            src={src}
                            alt=""
                            className="h-32 flex-1 rounded-lg border border-black/5 object-cover object-[50%_18%]"
                          />
                        ))}
                      </div>
                    ) : null}
                    <div className="space-y-2">
                      {paragraphs.map(paragraph => (
                        <p key={paragraph} className="break-keep text-[13px] font-medium leading-[1.6] text-slate-500">
                          {renderHighlightedText(paragraph, highlights)}
                        </p>
                      ))}
                    </div>
                    <div className={`ml-auto mr-4 py-1 ${index < 2 ? "mt-2" : ""}`}>
                      <div className="flex items-center">
                        <p className="mr-2 shrink-0 whitespace-nowrap text-[10px] font-semibold text-foreground/35">활용툴</p>
                        <ul className="flex list-none flex-nowrap gap-2 p-0 indent-0">
                          {tools.map(tool => (
                            <li key={`${id}-${tool}`} className="indent-0">
                              <SkillItem
                                size="xs"
                                label={tool}
                                imageUrl={toolIconUrls[tool]}
                                tooltipPlacement="top"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 번호 + 소제목 — 아래에 (같은 위계) */}
                <div
                  className={`relative order-first flex min-h-[58px] w-full shrink-0 items-center gap-2.5 p-2.5 md:order-last md:p-3 ${
                    isOpen ? "" : "md:justify-center md:px-0"
                  }`}
                >
                  <div
                    className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                      isOpen ? "text-white" : "bg-[#f5f5f7] text-[#77777d]"
                    }`}
                    style={isOpen ? { backgroundColor: numberColor } : undefined}
                  >
                    {index + 1}
                  </div>
                  <h4
                    className={`min-w-0 font-bold transition-none md:transition-opacity ${
                      isOpen
                        ? "flex-1 whitespace-normal break-keep text-left text-base font-black leading-tight text-[#4e4e53] opacity-100 [font-family:Arial,sans-serif] [font-weight:900] [letter-spacing:0] md:flex-none md:whitespace-nowrap md:text-lg md:duration-200 md:[transition-delay:650ms]"
                        : "text-xl font-black text-[#262627] opacity-100 [font-family:Arial,sans-serif] [font-weight:900] [letter-spacing:0] md:hidden md:duration-150"
                    }`}
                  >
                    {isOpen
                      ? title.split(titleKeyword).map((part, partIndex, parts) => (
                          <span key={`${part}-${partIndex}`}>
                            {part}
                            {partIndex < parts.length - 1 ? <span style={{ color: accentColor }}>{titleKeyword}</span> : null}
                          </span>
                        ))
                      : label}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </SlideUpInView>
    </SectionWatcher>
  );
}
