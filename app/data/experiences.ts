// Static portfolio data — hand-maintained.
// (Originally migrated from a Prisma/Postgres DB; the generation pipeline has been retired.)

import type { Locale } from "@/i18n/routing";

import type { Experience } from "./types";

const experiences: Record<Locale, Experience[]> = {
  ko: [
    {
      id: 101,
      title: "돈가스 지도",
      period: "2025.11 - 현재",
      items: [],
      links: [],
      is_active: true,
      sub_title: "1인 개발로 시작한 앱 서비스가 유저 5,000명을 넘기고, 인플루언서와 협업해 현재도 확장중인 경험",
      imageUrl: "/assets/projects/katsu-map-app-store.png",
      index: 0,
      skill_ids: [30, 31, 5, 36, 39, 32, 33, 34, 35, 18, 37, 38],
      category: "SERVICE",
    },
    {
      id: 102,
      title: "SureSoftTech. 시험자동화연구소 - VSPICE팀 인턴",
      period: "2026.03 - 2026.06",
      items: [],
      links: [],
      detailSections: [
        {
          title: "어떤 회사, 어떤 제품이었나",
          items: [
            "슈어소프트테크는 자동차처럼 오류가 곧 사고로 이어지는 미션 크리티컬 소프트웨어를 검증하는 국내 대표 V&V 전문 기업",
            "소속 팀은 자동차 SW의 국제 인증 심사(ASPICE & ISO26262) 준비를 돕는 플랫폼 V-SPICE를 개발",
          ],
          highlights: [
            "자동차 SW",
            "오류가 곧 사고로 이어지는 미션 크리티컬 소프트웨어",
            "ASPICE & ISO26262",
            "V-SPICE",
          ],
          media: {
            src: "/assets/experiences/VSPICE-LOGO.png",
            alt: "V-SPICE 로고",
            width: 476,
            height: 172,
            maxWidth: 230,
            placement: "left",
          },
          extra: {
            items: [
              "V-SPICE란 요구사항·설계·코드·시험 간 추적성을 관리하고 개발 문서와 산출물 생성을 자동화하는 플랫폼",
              "Spring Boot + JSP + Vue2 + PostgreSQL 기반, 5년간 쌓인 코드베이스 위에서의 개발",
              "해당 분기에는 AI 엔진(ALIRA)이 C 코드를 분석해 설계 문서와 다이어그램을 자동으로 만들어주는 신기능 개발이 주요과제",
            ],
            highlights: [
              "요구사항·설계·코드·시험 간 추적성",
              "산출물 생성을 자동화",
              "AI 엔진(ALIRA)",
              "신기능 개발이 주요과제",
              "Spring Boot + JSP + Vue2 + PostgreSQL",
              "5년간 쌓인 코드베이스",
            ],
            divider: false,
          },
          pdf: {
            href: "/pdfs/vspice-ai-sdd-architecture.pdf",
            label: "상반기 성과 발표 자료로 보는\nV-SPICE와 나의 기여",
            inline: true,
            sections: [
              { label: "배경·경쟁 구도", startPage: 1, endPage: 2 },
              { label: "해결 접근", startPage: 3, endPage: 4 },
              { label: "SureFlow 소개", startPage: 5, endPage: 5 },
              { label: "도구 완성도 11건", startPage: 6, endPage: 6 },
              { label: "데모", startPage: 7, endPage: 7 },
              { label: "품질관리·성과", startPage: 8, endPage: 8 },
              { label: "결함 해결 내역", startPage: 9, endPage: 9 },
              { label: "마무리·부록", startPage: 10, endPage: 11 },
            ],
          },
        },
        {
          title: "무슨 일을 맡았나",
          items: [
            "약 4개월 동안 풀스택 개발 인턴으로 근무 — 팀장님의 배려 덕분에 공부나 연습이 아닌, 실제 제품에 탑재되는 기능을 맡을 수 있었음",
            "첫 임무로 사내 테스팅 툴 CT와 V-SPICE를 연결하는 데이터 연동 API 개발을 담당 — 설계 → 구현 → 성능 최적화 → QA → 추가 요구사항 대응·유지보수 → 인수인계까지 개발 전체 사이클을 직접 경험",
            "제품을 쓰며 느낀 불편함을 프로토타입으로 만들어 직접 제안하고, 채택된 뒤에는 그 사내 라이브러리(SureFlow) 개발을 전담해 끝까지 완성",
            "팀 선배들이 개발한 기능의 QA·버그 리포트와 함께, 제품 개선 제안도 꾸준히 — V-SPICE 개선·버그 제안 8건, 경쟁사(Codebeamer) 벤치마킹 제안 3건",
            "ASPICE · ISO 26262 등 자동차 SW 품질 도메인을 학습 — 이 제품(V-SPICE)가 어떤 공급망 구조와 니즈에서 탄생했는지 배경부터 이해하고 개발",
          ],
          highlights: [
            "약 4개월",
            "풀스택 개발 인턴",
            "실제 제품에 탑재되는 기능",
            "데이터 연동 API 개발",
            "개발 전체 사이클",
            "프로토타입으로 만들어 직접 제안",
            "사내 라이브러리(SureFlow)",
            "끝까지 완성",
            "QA·버그 리포트",
            "V-SPICE 개선·버그 제안 8건",
            "벤치마킹 제안 3건",
            "ASPICE · ISO 26262",
            "자동차 SW 품질 도메인",
            "배경부터 이해하고 개발",
          ],
        },
        {
          title: "핵심 작업",
          items: [
            "팀 최초의 REST API인 대용량 테스트케이스 연동 API 개발 — 같은 쿼리가 최대 111,002번 반복 실행되던 구조를 3번으로 줄이고, 응답 속도 1.2초 → 72ms(약 16배)",
            "다이어그램을 코드 없이 마우스로 편집하는 GUI 에디터 SureFlow를 외부 라이브러리 없이 직접 개발 — 제품 정식 반영(Master merge)",
            "개발 중 발견한 렌더링 버그를 파고들어 Mermaid.js 오픈소스에 기여 — GitHub Star 약 88k 프로젝트에 PR #7711 Merge, 정식 릴리즈 반영",
            "문서 생성 시 다이어그램 이미지가 통째로 빠지는 버그를 PNG 사전 생성 파이프라인으로 해결 — 생성 시간 34.9% 단축",
            "서버를 끄는 데 231초씩 걸리던 문제의 원인을 스레드 단위까지 추적해 3~7초로 해결",
            "그 외 AI 산출물의 한글 깨짐 근본 해결, DB 구조 정량 분석·발표, QA 버그 리포트 19건+",
          ],
          highlights: [
            "대용량 테스트케이스 연동 API",
            "최대 111,002번",
            "3번",
            "1.2초 → 72ms",
            "SureFlow",
            "제품 정식 반영(Master merge)",
            "Mermaid.js 오픈소스에 기여",
            "PR #7711 Merge",
            "PNG 사전 생성 파이프라인",
            "34.9% 단축",
            "231초",
            "3~7초",
            "한글 깨짐 근본 해결",
            "버그 리포트 19건+",
          ],
        },
        {
          title: "결과",
          items: [
            "인턴 최우수상 수상",
            "직접 만든 에디터가 제품 Master에 merge되어 실기능으로 반영, 제품 로드맵에 포함",
            "SureFlow는 README·임베드 매뉴얼과 함께 사내 라이브러리로 인수인계",
            "팀 최초의 REST API 표준과 부하 테스트·모니터링 환경(k6, Grafana)이 팀 자산으로 남음",
            "팀의 2026 상반기 성과 발표 자료에 SureFlow가 제품 전략의 핵심 기능으로, CT 연동 API가 기여 항목으로 공식 수록",
          ],
          highlights: [
            "인턴 최우수상",
            "제품 Master에 merge",
            "제품 로드맵",
            "사내 라이브러리로 인수인계",
            "REST API 표준",
            "k6, Grafana",
            "2026 상반기 성과 발표 자료",
          ],
          media: {
            src: "/assets/experiences/sure-award.png",
            alt: "인턴 최우수상 상장",
            width: 1036,
            height: 1470,
            maxWidth: 200,
            placement: "left",
          },
        },
        {
          title: "경험을 통해 배운 점",
          items: [
            "추측하지 않고 측정으로 증명하는 습관 — 구간별 로그, hex 덤프, 전후 실측 비교로 모든 개선을 숫자로 남김",
            "기술을 고를 때마다 왜 이걸 골랐고 무엇을 포기했는지를 기록하는 태도",
            "5년 된 레거시를 존중하며 최소한의 수정으로 가치를 더하는 방법",
            "문제를 발견하는 사람에서 직접 해결하는 사람으로 넘어가는 주도성",
          ],
          highlights: [
            "측정으로 증명",
            "왜 이걸 골랐고 무엇을 포기했는지",
            "최소한의 수정으로 가치를 더하는",
            "직접 해결하는 사람",
          ],
        },
        {
          title: "마지막 한마디",
          items: [
            "인턴을 시작할 때는 사실 개발에 대한 회의감이 있던 시기였습니다.",
            "하지만 내가 만든 기능이 실제 제품에 들어가서, 실제 고객이 사용한다는 경험이 그 회의감을 완전히 바꿔놓았습니다. 회의에서 흘러나온 \"GUI로 다이어그램을 편집할 수 있으면 좋겠다\"는 한마디를 개인 프로젝트로 시작해 제품 기능까지 밀어붙였고, 그 과정에서 만난 버그는 오픈소스 기여로까지 이어졌습니다.",
            "레거시는 낡은 코드가 아니라 5년의 의사결정이 쌓인 나이테라는 것, 그걸 읽어내며 일하는 법을 배운 것이 이 인턴십에서 얻은 가장 큰 자산입니다.",
          ],
          highlights: [
            "내가 만든 기능이 실제 제품에 들어가서, 실제 고객이 사용한다",
            "오픈소스 기여",
            "5년의 의사결정이 쌓인 나이테",
          ],
          layout: "paragraphs",
        },
      ],
      subDetails: [
        {
          id: "sureflow",
          title: "SureFlow — Mermaid 다이어그램 GUI 에디터 (사내 라이브러리)",
          sections: [
            {
              title: "SureFlow란?",
              items: [
                "Mermaid 문법을 몰라도 다이어그램을 GUI로 편집할 수 있게 해주는 자체 개발 에디터",
                "Flowchart / Sequence / Component 다이어그램 3종 편집 지원",
                "외부 라이브러리 의존 없이 파서·제너레이터·SVG 매핑·인터랙션을 전부 직접 구현",
              ],
              highlights: [
                "GUI로 편집",
                "Flowchart / Sequence / Component",
                "파서·제너레이터·SVG 매핑·인터랙션",
              ],
            },
            {
              title: "개발 계기",
              items: [
                "V-SPICE의 제어흐름도는 Mermaid 코드를 직접 수정해야만 고칠 수 있어 사용자 러닝커브가 컸음",
                "회의에서 \"GUI로 편집할 수 있으면 좋겠다\"는 요구가 반복되는 것을 보고 개인 시간에 토이 프로젝트로 시작",
                "Vue Flow(IIFE 격리) → DHTMLX → 자체 구현으로 세 번의 접근 전환 끝에 최종 방식 확정",
              ],
              highlights: [
                "Mermaid 코드를 직접 수정",
                "개인 시간에 토이 프로젝트",
                "Vue Flow(IIFE 격리) → DHTMLX → 자체 구현",
              ],
            },
            {
              title: "핵심 작업",
              items: [
                "\"제품에 내장된 Mermaid로 렌더하고 그 SVG를 모델과 매핑해 편집한다\" — 좌표 계산 없이 원본과 100% 동일 형상 보장",
                "script → model → svg → interaction 편집 루프와 6계층 책임 분리 아키텍처 설계",
                "Mermaid 공식 Playground에도 없는 기능 4종 — Self Loop 편집, 파싱 에러 줄 보존, 드래그 오토팬, 블록 분기 GUI 삽입",
                "빌드 파일 2개 + 값만 주고받는 최소한의 연결(value/input) 설계로, 화면당 2개 파일 수정만으로 3개 화면에 탑재",
              ],
              highlights: [
                "SVG를 모델과 매핑",
                "원본과 100% 동일 형상",
                "script → model → svg → interaction",
                "6계층 책임 분리",
                "Self Loop 편집",
                "에러 줄 보존",
                "오토팬",
                "최소한의 연결(value/input)",
                "화면당 2개 파일 수정",
              ],
            },
            {
              title: "결과",
              items: [
                "시퀀스 + 컴포넌트 에디터가 제품 Master에 merge — 실기능 반영, 제품 로드맵 포함",
                "발표 후 팀에서 \"사내 라이브러리화 하자\"는 역제안 — 인턴 최우수상의 핵심 근거",
                "README·임베드 매뉴얼과 함께 사내 라이브러리로 인수인계",
                "최대 컴포넌트 1,883줄 → 834줄(-56%) 리팩토링 — 이동한 81개 메서드 본문 동일성 검증, 회귀 14케이스 전부 PASS",
                "팀 상반기 성과 발표에 제품 전략의 핵심 기능으로 공식 수록 — 결함 12건 해결 이력 관리, 추가 패치 4회 동안 Critical 버그 0건",
              ],
              highlights: [
                "제품 Master에 merge",
                "제품 로드맵",
                "인턴 최우수상",
                "사내 라이브러리로 인수인계",
                "1,883줄 → 834줄(-56%)",
                "81개 메서드",
                "핵심 기능으로 공식 수록",
                "12건 해결",
                "Critical 버그 0건",
              ],
              // [빈 슬롯] 이미지 확보 시 media로 추가: sureflow-editor.png (확인 필요) — 시퀀스·컴포넌트 다이어그램 편집 화면 (위치: 위)
            },
            {
              title: "프로토타입 과정",
              items: [],
              pdf: {
                href: "/pdfs/sureflow-prototype.pdf",
                label: "1차 프로토타입(Vue Flow) 개발 건의 자료 보기",
                sections: [
                  { label: "Pain Point와 프로토타입", startPage: 1, endPage: 3 },
                  { label: "Vue Flow 검토", startPage: 4, endPage: 7 },
                  { label: "IIFE 격리 이식", startPage: 8, endPage: 13 },
                  { label: "양방향 변환기 직접 구현", startPage: 14, endPage: 23 },
                  { label: "피드백과 방향 전환", startPage: 24, endPage: 31 },
                ],
              },
            },
            {
              title: "작업 내용",
              items: [],
              pdf: {
                href: "/pdfs/sureflow-dev-embed.pdf",
                label: "SureFlow 아키텍처·기능·임베드 자세히 보기",
                sections: [
                  { label: "핵심 작동 원리와 계층 구조", startPage: 4, endPage: 17 },
                  { label: "기능 고도화", startPage: 24, endPage: 31 },
                  { label: "버그 해결", startPage: 32, endPage: 37 },
                  { label: "V-SPICE 임베드", startPage: 38, endPage: 44 },
                  { label: "제안·TODO", startPage: 45, endPage: 53 },
                ],
              },
            },
            {
              title: "기능 확장",
              items: [],
              pdf: {
                href: "/pdfs/sureflow-extension-refactor.pdf",
                label: "시퀀스·컴포넌트 다이어그램 확장 과정 보기",
                sections: [
                  { label: "시퀀스 임베드", startPage: 2, endPage: 6 },
                  { label: "ALIRA 시퀀스 분석", startPage: 7, endPage: 11 },
                  { label: "Syntax Error 3종 분석", startPage: 12, endPage: 15 },
                  { label: "컴포넌트 다이어그램", startPage: 16, endPage: 20 },
                ],
              },
            },
            {
              title: "경험을 통해 배운 점",
              items: [
                "없으면 만든다 — 단, 폐기한 접근의 한계를 실증하고 기록하는 것까지가 개발이라는 것",
                "그려진 SVG 화면에서 원래의 논리 구조를 역추적하는 것이 이런 에디터의 핵심 난제라는 것",
                "리팩토링은 동작 불변의 증명 수단과 함께여야 안전하다는 것",
                "좋은 계약(value/input)이 있으면 레거시 호스트도 얇게 유지된다는 것",
              ],
              highlights: [
                "없으면 만든다",
                "원래의 논리 구조를 역추적",
                "동작 불변의 증명 수단",
                "레거시 호스트도 얇게",
              ],
            },
          ],
        },
        {
          id: "ct-api",
          title: "V-SPICE ↔ CT 대용량 테스트케이스 연동 API",
          sections: [
            {
              title: "CT 연동 API란?",
              items: [
                "V-SPICE의 함수 명세·테스트케이스 데이터를 자사 테스팅 툴 CT에 전달하는 REST API 3종",
                "CT 측의 AI 기반 테스트 코드 생성 기능이 이 데이터를 기반으로 동작",
                "고객사 환경은 파일 수천 개, 테스트케이스 수십만 건 규모 — 처음부터 대용량을 전제로 설계",
              ],
              highlights: [
                "CT",
                "REST API 3종",
                "AI 기반 테스트 코드 생성",
                "테스트케이스 수십만 건",
              ],
            },
            {
              title: "개발 계기",
              items: [
                "기존 팀은 JSP 서버사이드 렌더링 중심이라 대외 REST API 표준 자체가 부재",
                "이후 개발의 토대가 될 팀 첫 REST API를 인턴 1주차에 담당",
                "CT 측 와이어프레임에서 사용자 시나리오를 직접 도출해 필요한 API 3종을 정의",
              ],
              highlights: [
                "대외 REST API 표준",
                "팀 첫 REST API",
                "사용자 시나리오",
              ],
            },
            {
              title: "핵심 작업",
              items: [
                "응답 구조는 Nested/Flatten 2안을 만들어 CT팀과 협의로 확정, PK 비노출 등 피드백 반영",
                "세 방향에서 성능 최적화 — 같은 쿼리가 반복 실행되던 구조(최대 111,002개)를 3개로 고정, 필터링을 DB로 옮겨 전송 데이터 약 88% 절감, 데이터 조립은 정렬 후 1회 순회 방식으로 교체",
                "조건이 따로 적용돼 요청하지 않은 데이터까지 응답에 섞이는 버그를 스스로 발견해 복합키 매칭으로 수정",
                "10만·100만 TC 시드를 직접 구성해 k6 부하 테스트, Grafana + Prometheus 모니터링 구축",
              ],
              highlights: [
                "Nested/Flatten 2안",
                "최대 111,002개",
                "3개로 고정",
                "약 88% 절감",
                "1회 순회 방식",
                "요청하지 않은 데이터까지 응답에 섞이는 버그",
                "10만·100만 TC",
                "k6 부하 테스트",
                "Grafana + Prometheus",
              ],
            },
            {
              title: "결과",
              items: [
                "고객사 프로젝트 1.2s → 72ms(약 16배), 10만 TC 2s → 990ms, 소규모 프로젝트 197ms → 26ms",
                "10만 TC 부하 테스트 평균 715ms, 오류율 0% 확인",
                "응답 무결성 전수 검증(함수 57 / IO 876 / TC 771 / 값 8,654 일치) 후 CT 측 전달 완료",
                "팀 최초의 REST API 표준과 부하 테스트·모니터링 인프라가 팀 자산으로 남음",
              ],
              highlights: [
                "1.2s → 72ms",
                "2s → 990ms",
                "197ms → 26ms",
                "715ms",
                "0%",
                "전수 검증",
                "REST API 표준",
              ],
              // [빈 슬롯] 이미지 확보 시 media로 추가: ct-api-before-after.png (확인 필요) — 리팩토링 전후 응답 속도 비교 (위치: 위)
            },
            {
              title: "작업 내용",
              items: [],
              pdf: {
                href: "/pdfs/ct-api-design-implementation.pdf",
                label: "CT API 구현·성능 개선 과정 자세히 보기",
                sections: [
                  { label: "서비스단 가공 최적화", startPage: 32, endPage: 36 },
                  { label: "시드 구성·k6 부하 테스트", startPage: 37, endPage: 42 },
                  { label: "병목 분석과 해결", startPage: 43, endPage: 46 },
                  { label: "최종 성능 비교", startPage: 47, endPage: 49 },
                ],
              },
            },
            // [빈 슬롯] "트러블 슈팅" 섹션 — PDF 확보 시 주석 해제 후 pdf 필드로 추가:
            //   ct-api-troubleshooting.pdf (확인 필요) / 버튼문구: 복합키 인덱스 무효화 병목 해결 과정 (1.2s → 72ms)
            {
              title: "경험을 통해 배운 점",
              items: [
                "인덱스는 있느냐가 아니라 타느냐의 문제 — 컬럼 연산 하나가 성능을 무너뜨린다는 것을 직접 경험",
                "테스트 데이터가 버그를 숨긴다 — 고유한 시드 데이터 탓에 크로스 프로덕트 버그가 보이지 않았던 경험",
                "성능 문제는 추측 대신 단계별 타이밍 로그로 구간을 측정하고 시작해야 한다는 것",
                "타 부서가 소비하기 쉬운 JSON을 협의로 확정하는 과정 자체가 API 개발의 절반이라는 것",
              ],
              highlights: [
                "타느냐",
                "테스트 데이터가 버그를 숨긴다",
                "단계별 타이밍 로그",
                "협의로 확정",
              ],
            },
          ],
        },
        {
          id: "png-pipeline",
          title: "문서 Generate PNG 파이프라인 구축·병렬화",
          sections: [
            {
              title: "어떤 기능인가",
              items: [
                "문서(Document) 생성 시 함수별 제어흐름도 이미지를 삽입하기 위한 PNG 사전 생성·저장 파이프라인",
                "Generate 전에 브라우저가 함수별 Mermaid 스크립트를 렌더 → PNG blob → 서버 저장하는 구조",
              ],
              highlights: [
                "PNG 사전 생성·저장 파이프라인",
                "PNG blob",
              ],
            },
            {
              title: "개발 계기",
              items: [
                "패키지 QA 중 Import한 프로젝트의 문서에서 제어흐름도가 전부 빈 채로 나오는 버그 발견",
                "원인: 원래 PNG는 AI 서버가 만들어주는데, Import 문서에는 스크립트만 있고 PNG가 없음",
                "Mermaid는 JS 라이브러리라 Java 서버에서 렌더 불가, 외부 변환 API는 폐쇄망이라 불가 — \"PNG를 만들 수 있는 유일한 주체는 브라우저\"라는 결론",
              ],
              highlights: [
                "Import한 프로젝트의 문서에서 제어흐름도가 전부 빈 채로",
                "스크립트만 있고 PNG가 없음",
                "Java 서버에서 렌더 불가",
                "폐쇄망",
              ],
            },
            {
              title: "핵심 작업",
              items: [
                "Generate 전에 함수별 PNG를 생성·저장하는 파이프라인 신설 — 동기 보장 / 최소 변경 / Fallback 3원칙 (실패해도 문서 생성은 반드시 실행)",
                "BATCH_SIZE=5 배치 병렬화 — 렌더는 JS 싱글스레드, Canvas 메모리 장당 약 12MB, HTTP/1.1 도메인당 6연결이라는 근거 3개로 도출",
                "BATCH_SIZE를 application.properties로 외부화해 고객 환경별 무배포 튜닝 지원",
                "SAD/SDD에 중복된 변환 로직을 SvgExport 공용 유틸로 일원화, Range.getClientRects()로 줄바꿈 복원",
              ],
              highlights: [
                "동기 보장 / 최소 변경 / Fallback",
                "BATCH_SIZE=5 배치 병렬화",
                "근거 3개",
                "application.properties로 외부화",
                "SvgExport 공용 유틸",
              ],
            },
            {
              title: "결과",
              items: [
                "PNG 저장 1800ms → 1172ms(-34.9%), E2E 2910ms → 2130ms(-26.8%)",
                "Generate 전 Mermaid→PNG 파이프라인 제품 Master merge, SAD까지 확장",
                "Import 경로 문서의 이미지 누락 해소, 화면과 동일한 PNG 품질 확보",
              ],
              highlights: [
                "1800ms → 1172ms(-34.9%)",
                "2910ms → 2130ms(-26.8%)",
                "제품 Master merge",
                "이미지 누락 해소",
              ],
              // [빈 슬롯] 이미지 확보 시 media로 추가: png-pipeline-before-after.png (확인 필요) — 배치 병렬화 전후 생성 시간 비교 (위치: 위)
            },
            {
              title: "작업 내용",
              items: [],
              pdf: {
                href: "/pdfs/png-pre-generation-pipeline.pdf",
                label: "버그 원인 추적과 파이프라인 구현 자세히 보기",
                sections: [
                  { label: "버그 현상·원인 추적", startPage: 2, endPage: 3 },
                  { label: "관련 파일 분석", startPage: 4, endPage: 5 },
                  { label: "해결 방안", startPage: 6, endPage: 7 },
                  { label: "구현 상세", startPage: 8, endPage: 9 },
                ],
              },
            },
            // [빈 슬롯] "트러블 슈팅" 섹션 — PDF 확보 시 주석 해제 후 pdf 필드로 추가:
            //   png-raster-limit.pdf (확인 필요) / 버튼문구: 대형 다이어그램 raster 실패 분석 (2.6GB 캔버스 한계)
            {
              title: "경험을 통해 배운 점",
              items: [
                "버그의 원인이 아키텍처 제약이면, 픽스가 아니라 새 경로 설계가 답이라는 것",
                "병렬성은 \"몇 개 동시에\"가 아니라 무엇이 직렬이고 무엇이 한도인가에서 도출해야 한다는 것",
                "공용 유틸로의 수렴이 품질 수정의 파급력을 만든다는 것 — 한 곳을 고치면 전 화면에 반영",
                "QA에서 발견한 버그를 개발 과제로 전환해 직접 해결하는 사이클의 가치",
              ],
              highlights: [
                "아키텍처 제약",
                "새 경로 설계",
                "무엇이 직렬이고 무엇이 한도인가",
                "공용 유틸로의 수렴",
                "개발 과제로 전환",
              ],
            },
          ],
        },
        {
          id: "server-shutdown",
          title: "VSPICE Server 종료 지연 트러블슈팅 (231초 → 3~7초)",
          sections: [
            {
              title: "어떤 문제였나",
              items: [
                "V-SPICE Windows 서비스 중지가 231초(측정에 따라 372초)까지 소요",
                "저사양 PC에서는 멈춰서 재부팅까지 필요한 상황",
                "과거에는 빨랐다 — 어느 시점에 생긴 회귀(regression)",
              ],
              highlights: [
                "231초",
                "저사양 PC",
                "회귀(regression)",
              ],
            },
            {
              title: "원인 분석",
              items: [
                "로그 분석 결과 Catalina 자체는 약 4.26초에 종료 완료 → 문제를 \"Tomcat이 꺼진 뒤 무언가가 JVM을 붙잡는다\"로 재정의",
                "JVM은 non-daemon 스레드가 남아 있으면 종료되지 않는다는 모델에 근거해 후보 축소",
                "InterruptedException을 무시한 채 도는 non-daemon while(true) 스레드 3개 특정 (가비지 파일 정리 / 세션 관리 / 업로드 잡 큐 폴링)",
                "서비스 래퍼의 stop-timeout 약 60초 강제 종료 수순과 겹쳐 지연이 증폭되는 구조까지 규명",
              ],
              highlights: [
                "약 4.26초",
                "무언가가 JVM을 붙잡는다",
                "non-daemon 스레드",
                "non-daemon while(true) 스레드 3개",
                "stop-timeout 약 60초",
              ],
            },
            {
              title: "해결",
              items: [
                "선택지 A/B 비교 — A: SmartLifecycle 기반 근본 리팩토링(회귀 리스크 큼) vs B: 데몬 전환(변경 최소)",
                "세 작업 모두 중단돼도 복구 가능(다음 부팅 때 재스캔 / 다음 사이클에 보정 / 큐·DB 재처리)함을 근거로 B 채택",
                "3개 스레드에 setDaemon(true) 적용 — 변경 최소 4줄, 런타임 동작은 그대로 두고 종료 정책만 변경",
                "데몬화는 임시 조치임을 명시하고 graceful shutdown 구조화를 후속 과제로 문서화",
              ],
              highlights: [
                "A/B 비교",
                "중단돼도 복구 가능",
                "B 채택",
                "setDaemon(true)",
                "종료 정책만",
                "graceful shutdown 구조화",
              ],
            },
            {
              title: "결과",
              items: [
                "서비스 종료 231초 → 3~7초 자연 종료, 단발이 아닌 5회 재현 확인",
                "검증 항목 4종 수립 후 전부 PASS — 기동 후 정상 동작, STOP 후 수 초 내 종료, 경고 미지속, 강제 kill 경로 미진입",
                "원인 규명부터 검증까지 전 과정을 인수인계 문서(PDF/PPT)로 정리",
              ],
              highlights: [
                "231초 → 3~7초",
                "5회 재현",
                "전부 PASS",
                "인수인계 문서(PDF/PPT)",
              ],
              // [빈 슬롯] 이미지 확보 시 media로 추가: shutdown-before-after.png (확인 필요) — 서비스 중지 시간 측정 전후 비교 (위치: 위)
            },
            {
              title: "트러블 슈팅",
              items: [],
              pdf: {
                href: "/pdfs/vspice-server-shutdown-fix.pdf",
                label: "서비스 중지 지연 개선 전 과정 자세히 보기",
                sections: [
                  { label: "문제 현상", startPage: 1, endPage: 3 },
                  { label: "원인 분석", startPage: 4, endPage: 7 },
                  { label: "해결 방안 결정", startPage: 8, endPage: 10 },
                  { label: "적용 결과·검증", startPage: 11, endPage: 19 },
                ],
              },
            },
            {
              title: "경험을 통해 배운 점",
              items: [
                "백그라운드 스레드는 만드는 순간에 종료 전략까지 설계해야 한다는 것",
                "측정도 절차다 — 로그 증거로 검증 항목을 세우지 않으면 잘못된 결론에 도달한다는 것",
                "근본 해결(A)과 최소 수정(B)을 트레이드오프와 함께 분리 제시하는 의사결정 방법",
                "임시 조치임을 숨기지 않고 후속 과제로 명시하는 것이 문서의 신뢰를 만든다는 것",
              ],
              highlights: [
                "종료 전략",
                "측정도 절차다",
                "트레이드오프와 함께 분리 제시",
                "후속 과제로 명시",
              ],
            },
          ],
        },
        {
          id: "encoding-fix",
          title: "AI 산출물 한글 인코딩 깨짐 해결 (EUC-KR → UTF-8)",
          sections: [
            {
              title: "어떤 문제였나",
              items: [
                "AI 엔진(ALIRA)이 생성한 다이어그램에서 한글 주석이 \"ë¥¼\" 같은 깨진 문자로 표시",
                "국내 고객 소스에는 한글 주석이 흔해 AI 분석 품질에 직접 영향",
                "원본·전송·AI·렌더 중 어느 단계에서 깨지는지조차 불명확한 상태",
              ],
              highlights: [
                "\"ë¥¼\" 같은 깨진 문자",
                "AI 분석 품질",
                "어느 단계에서 깨지는지조차 불명확",
              ],
            },
            {
              title: "원인 규명",
              items: [
                "\"ë¥¼\"는 UTF-8 바이트를 Latin-1로 오해석한 전형적 mojibake 패턴 → 인코딩 불일치로 방향 설정",
                "문제 소스 파일을 hex 덤프로 열어 b9cc(EUC-KR의 '만')를 확인 — 원본이 EUC-KR임을 추측이 아닌 증거로 확정",
                "서버는 C 소스를 raw bytes 그대로 zip으로 전송 ↔ ALIRA는 UTF-8을 가정 — 전송 경계의 계약 불일치가 근본 원인",
              ],
              highlights: [
                "mojibake 패턴",
                "hex 덤프",
                "EUC-KR",
                "전송 경계의 계약 불일치",
              ],
            },
            {
              title: "해결 설계",
              items: [
                "전송 직전 zip 생성 시에만 변환 — 읽기/저장 등 다른 경로 무영향",
                "대상은 C 소스 확장자로 한정해 바이너리 오변환 위험 차단",
                "파일별로 juniversalchardet으로 실제 인코딩을 감지 후 UTF-8 변환 — 혼재 저장소에서도 안전",
                "기각한 대안 2개 — 원본 일괄 변환(비가역·위험), ALIRA 측 수정 요청(타 팀 시스템 의존) → 내 시스템의 출구에서 계약을 맞추는 방향 선택",
              ],
              highlights: [
                "zip 생성 시에만 변환",
                "C 소스 확장자로 한정",
                "juniversalchardet",
                "내 시스템의 출구",
              ],
            },
            {
              title: "결과",
              items: [
                "EUC-KR 소스의 한글 주석이 AI 산출물에서 정상 표시 — 고질 버그의 근본 해결",
                "국내 고객 소스에 대한 AI 분석 품질 정상화",
                "디스크 원본은 일절 변경하지 않는 사용자 자산 불변 원칙 유지",
              ],
              highlights: [
                "정상 표시",
                "AI 분석 품질 정상화",
                "디스크 원본은 일절 변경하지 않는",
              ],
              // [빈 슬롯] 이미지 확보 시 media로 추가: encoding-before-after.png (확인 필요) — 인코딩 수정 전후 다이어그램 비교 (위치: 위)
            },
            // [빈 슬롯] "트러블 슈팅" 섹션 — PDF 확보 시 주석 해제 후 pdf 필드로 추가:
            //   alira-encoding-fix.pdf (확인 필요) / 버튼문구: EUC-KR 한글 인코딩 깨짐 해결 과정 자세히 보기
            {
              title: "경험을 통해 배운 점",
              items: [
                "인코딩 버그는 보이는 문자가 아니라 바이트로 판별한다는 것 — hex 덤프가 유일한 확정 증거",
                "타 시스템의 가정을 바꿀 수 없다면 내 시스템의 출구에서 계약을 맞추면 된다는 것",
                "원본 불변·범위 한정·감지 기반 변환이라는 안전한 수정 설계",
                "개선 제안 목록에 올린 문제를 스스로 해결하는 발견자에서 해결자로의 전환",
              ],
              highlights: [
                "바이트로 판별",
                "내 시스템의 출구에서 계약",
                "원본 불변·범위 한정·감지 기반 변환",
                "발견자에서 해결자로",
              ],
            },
          ],
        },
        {
          id: "analysis-quality",
          title: "FK-LESS DB 구조 분석 & 배포 패키지 QA",
          sections: [
            {
              title: "어떤 활동인가",
              items: [
                "V-SPICE의 DB는 테이블 간 외래키(FK)가 거의 없는 구조 — 연관 id를 일반 컬럼으로 두고 서비스 코드가 관계를 관리",
                "API 개발 중 리버스엔지니어링 ERD에서 이 구조를 발견, FK 유무 장단점 리서치 과제로 확장해 분석·발표",
                "병행하여 배포 패키지 전수 QA와 버그 리포트 활동 수행",
              ],
              highlights: [
                "외래키(FK)가 거의 없는 구조",
                "FK 유무 장단점 리서치",
                "전수 QA",
              ],
            },
            {
              title: "FK-LESS 분석",
              items: [
                "전체 엔티티 약 95개 중 93개에 FK 없음, 논리적 FK 컬럼 사용 562건 / 93개 파일 정량 조사",
                "무결성은 서비스 레이어의 수동 cascade가 담당 — 삭제 시퀀스 15~24개 테이블, 순서는 주석으로만 관리",
                "이론이 아니라 코드 증거로 검증 — \"찌꺼기 데이터 삭제\" 주석은 고아 행의 직접 증거, ddl-auto=update는 스키마 유연성의 방증",
                "채택 이유 4가지를 코드 근거와 함께 추론하되 추론임을 정직하게 명시",
              ],
              highlights: [
                "93개에 FK 없음",
                "562건 / 93개 파일",
                "수동 cascade",
                "코드 증거",
                "추론임을 정직하게 명시",
              ],
            },
            {
              title: "QA 활동",
              items: [
                "Code2DD / Model2DD 기능 매트릭스 전수 테스트 — 재현 시나리오·원인 가설을 담은 버그 리포트 19건+",
                "성공 토스트를 믿지 않는다 — 성공 표시되지만 실제 미반영되는 Import 순서 의존 버그 등 발견",
                "비결정적 버그를 13개 케이스 매트릭스로 전수 비교해 \"특정 함수 한정, 확률적 발생\"이라는 개발팀이 바로 쓸 결론 도출",
                "AI 생성 시퀀스의 Mermaid 문법 충돌 3종을 원인 분석 + 해결안과 함께 타 팀에 전달",
              ],
              highlights: [
                "버그 리포트 19건+",
                "Import 순서 의존 버그",
                "13개 케이스 매트릭스",
                "Mermaid 문법 충돌 3종",
              ],
            },
            {
              title: "결과",
              items: [
                "FK-LESS 분석을 8주차에 발표 — \"FK-LESS는 책임의 위치를 DB에서 서비스 코드로 옮긴 구조\"라는 결론",
                "분석 결과가 실제 API 개발의 데이터 관계 유효성 검증 설계로 그대로 이어짐",
                "QA에서 발견한 PNG 누락 버그는 직접 파이프라인 개발로 해결 — QA가 개발 과제로 이어지는 사이클",
              ],
              highlights: [
                "책임의 위치를 DB에서 서비스 코드로",
                "데이터 관계 유효성 검증 설계",
                "직접 파이프라인 개발",
              ],
            },
            {
              title: "경험을 통해 배운 점",
              items: [
                "레거시의 \"왜\"는 코드 증거로 재구성할 수 있다는 것 — 설정 파일 하나도 구조 선택의 방증",
                "좋은 버그 리포트는 화면·현상·영향·재현 조건·원인 가설·해결안까지 갖춰야 한다는 것",
                "비결정적 버그는 재현 여부가 아니라 발생 확률과 조건의 지도를 만드는 것이 가치라는 것",
                "FK가 없는 환경에서는 \"이 값이 유효한 관계인가\"를 항상 물어야 한다는 것",
              ],
              highlights: [
                "코드 증거로 재구성",
                "원인 가설·해결안",
                "발생 확률과 조건의 지도",
                "유효한 관계",
              ],
            },
          ],
        },
      ],
      is_active: false,
      sub_title: "사내 라이브러리를 직접 구축해 인턴 최우수상을 받고, 실제 제품 로드맵 반영까지 이어낸 경험",
      imageUrl: "/assets/projects/suresofttech.png",
      index: 1,
      skill_ids: [45, 46, 51, 40, 41, 42, 34, 43, 44, 47, 48, 49, 50, 65, 64],
      category: "WORK",
    },
    {
      id: 103,
      title: "TradLab 스타트업 창업 경험",
      period: "2025.11 - 2026.06",
      items: [],
      links: [],
      is_active: false,
      sub_title: "초기 창업팀 멤버로 활동하며 아이디어를 특허, 법인, 투자 유치까지 연결한 경험",
      imageUrl: "/assets/projects/tradlab-logo.png",
      index: 2,
      skill_ids: [53, 32, 33, 34, 66, 56, 57, 63, 35, 62, 59, 60, 64],
      category: "WORK",
    },
    {
      id: 104,
      title: "Mermaid.js 오픈소스 기여 경험",
      period: "2026.05",
      items: [],
      links: [{ label: "Mermaid.js - Self Loop Edge 렌더링 버그 해결 과정", href: "/pdfs/mermaid-oss-contribution.pdf" }],
      pdfSections: [
        { label: "문제 분석", startPage: 1, endPage: 4 },
        { label: "수정 방향 및 적용", startPage: 5, endPage: 12 },
        { label: "동작 검증", startPage: 13, endPage: 19 },
        { label: "PR 및 마무리", startPage: 20, endPage: 24 },
      ],
      detailSections: [
        {
          title: "Mermaid.js란?",
          items: [
            "텍스트 문법만으로 다이어그램을 그릴 수 있는 대표적인 오픈소스 라이브러리",
            "Flowchart, Sequence Diagram, State Diagram 등 개발 문서화에 자주 쓰이는 도구",
            "GitHub Star 약 88k를 보유한 글로벌 프로젝트",
          ],
          highlights: ["텍스트 문법", "Flowchart", "Sequence Diagram", "State Diagram", "GitHub Star 약 88k", "글로벌 프로젝트"],
        },
        {
          title: "기여 계기",
          items: [
            "회사 프로젝트에서 Mermaid.js를 사용하며 다이어그램 렌더링 기능을 자주 다룸",
            "사용 중 Self Loop Edge가 어색하게 그려지고, 편집도 불안정한 문제 발견",
            "단순 사용 이슈가 아니라 Mermaid.js 내부 렌더링 문제라고 판단하고 직접 분석 시작",
          ],
          highlights: ["회사 프로젝트", "Self Loop Edge", "내부 렌더링 문제", "직접 분석"],
        },
        {
          title: "기여 내용",
          items: [
            "여러 조각으로 쪼개져 보이던 Self Loop Edge를 하나의 논리적 edge로 렌더링되도록 개선",
            "기존에는 불안정하던 self-loop의 선택, 삭제, 라벨 편집 동작을 안정화",
            "Flowchart / State Diagram에서 self-loop가 시각적으로 더 자연스럽고 간결하게 표현되도록 수정",
            "내부 layout 구현 세부사항이 최종 SVG에 노출되던 문제를 정리",
            "실제 Mermaid.js에 merge되어 전 세계 사용자의 self-loop 렌더링 경험 개선",
          ],
          highlights: [
            "Self Loop Edge",
            "하나의 논리적 edge",
            "선택, 삭제, 라벨 편집",
            "Flowchart / State Diagram",
            "시각적으로 더 자연스럽고 간결하게",
            "layout 구현 세부사항",
            "최종 SVG",
            "Mermaid.js에 merge",
            "전 세계 사용자",
          ],
          media: {
            src: "/assets/experiences/mermaid-self-loop-result.png",
            alt: "Self Loop Edge 렌더링 개선 전후 비교",
            width: 906,
            height: 346,
          },
        },
        {
          title: "결과",
          items: [
            "Mermaid.js PR #7711 Merge로 공식 코드베이스 반영",
            "전 세계 사용자가 사용하는 Self Loop Edge 렌더링 흐름 개선",
            "약 88k Star 규모의 글로벌 오픈소스에 core rendering 개선으로 기여",
            "Mermaid.js 측으로부터 기여 보상으로 Mermaid.live 1년 프리미엄 이용권 수령",
          ],
          highlights: [
            "Mermaid.js PR #7711 Merge",
            "공식 코드베이스 반영",
            "전 세계 사용자",
            "Self Loop Edge 렌더링 흐름 개선",
            "약 88k Star",
            "core rendering 개선",
            "Mermaid.live 1년 프리미엄 이용권",
          ],
          media: {
            src: "/assets/experiences/mermaid-pr-7711.png",
            alt: "Merge된 Mermaid.js PR #7711",
            width: 700,
            height: 618,
            href: "https://github.com/mermaid-js/mermaid/pull/7711",
            linkLabel: "PR 바로가기",
            maxWidth: 200,
            placement: "left",
          },
          extra: {
            items: [
              "@mermaid-js/tiny@11.16.0 버전, 메이저 패치로 포함되어 정식 릴리즈",
              "이제 전 세계 사용자가 그리는 Self Loop Edge는 내가 작업한 코드로 렌더링됨",
            ],
            highlights: [
              "@mermaid-js/tiny@11.16.0",
              "정식 릴리즈",
              "Self Loop Edge",
              "내가 작업한 코드",
            ],
            media: {
              src: "/assets/experiences/mermaid-release-11-16-0.png",
              alt: "Mermaid.js 11.16.0 릴리스 노트에 반영된 Self Loop Edge 개선",
              width: 1246,
              height: 450,
              href: "https://github.com/mermaid-js/mermaid/releases/tag/%40mermaid-js%2Ftiny%4011.16.0",
              linkLabel: "패치 바로가기",
              maxWidth: 360,
              placement: "right",
            },
          },
        },
        {
          title: "트러블 슈팅",
          items: [],
          showPdf: true,
        },
        {
          title: "경험을 통해 배운 점",
          items: [
            "내가 겪은 불편함을 직접 해결해, 전 세계 Mermaid.js 사용자에게 반영되는 개선으로 연결",
            "Vitest 기반 로직 테스트와 Cypress 기반 렌더링 테스트를 함께 다루며, 단순 기능 확인을 넘어 시각 회귀까지 고려하는 테스트 관점 확장",
            "UI 라이브러리에서는 코드 동작뿐 아니라 실제 렌더링 결과까지 검증해야 한다는 점을 경험",
            "오픈소스 리뷰 과정에서 변경의 신뢰도를 높이기 위해 테스트가 어떻게 설계되어야 하는지 배움",
            "단순 사용자를 넘어, 내가 사용하는 도구 자체를 개선하는 개발 경험을 쌓음",
          ],
          highlights: [
            "직접 해결",
            "전 세계 Mermaid.js 사용자",
            "Vitest 기반 로직 테스트",
            "Cypress 기반 렌더링 테스트",
            "시각 회귀",
            "실제 렌더링 결과",
            "변경의 신뢰도",
            "테스트가 어떻게 설계되어야 하는지",
            "도구 자체를 개선하는 개발 경험",
          ],
        },
        {
          title: "마지막 한마디",
          items: [
            "오픈소스 문화는 소프트웨어에서 가장 멋진 문화 중 하나라고 생각합니다.",
            "사실 정말 이상하잖아요? 자기가 만든 걸 공짜로 모두한테 나눠준다니...",
            "하지만 소프트웨어가 짧은 역사 속에서도 폭발적으로 발전할 수 있었던 이유 중 하나가 바로 이런 공개와 기여의 문화라고 생각합니다.",
            "학교에서 오픈소스 개론 수업을 재미있게 들었던 기억이 있는데, 직접 오픈소스에 기여해보니 그 의미가 직접 와닿아서 너무 재밌는 경험이었습니다!",
          ],
          highlights: ["오픈소스 문화", "공개와 기여의 문화", "직접 오픈소스에 기여", "직접 와닿아서"],
          layout: "paragraphs",
        },
      ],
      is_active: false,
      sub_title: "약 88k GitHub Star를 보유한 글로벌 다이어그램 오픈소스에 직접 기여한 경험",
      imageUrl: "/assets/projects/mermaid-github.png",
      index: 3,
      skill_ids: [81, 69, 67, 68, 71, 72, 74, 75, 73, 76, 78, 79, 80],
      category: "OPEN_SOURCE",
    },
  ],
  en: [
    {
      id: 101,
      title: "Katsu Map",
      period: "2025.11 - Present",
      items: [],
      links: [],
      is_active: true,
      sub_title: "A live service started as a solo project and grown to 3,000 MAU",
      imageUrl: "/assets/projects/katsu-map-app-store.png",
      index: 0,
      skill_ids: [30, 31, 5, 36, 39, 32, 33, 34, 35, 18, 37, 38],
      category: "SERVICE",
    },
    {
      id: 102,
      title: "SureSoftTech. VSPICE Team Intern",
      period: "2026.03 - 2026.06",
      items: [],
      links: [],
      is_active: false,
      sub_title: "Built an internal library and earned recognition as the best intern",
      imageUrl: "/assets/projects/suresofttech.png",
      index: 1,
      skill_ids: [45, 46, 51, 40, 41, 42, 34, 43, 44, 47, 48, 49, 50, 65, 64],
      category: "WORK",
    },
    {
      id: 103,
      title: "TradLab Early Startup Team",
      period: "2025.11 - 2026.06",
      items: [],
      links: [],
      is_active: false,
      sub_title: "Joined an early startup team and connected an idea to patent, incorporation, and fundraising",
      imageUrl: "/assets/projects/tradlab-logo.png",
      index: 2,
      skill_ids: [53, 32, 33, 34, 66, 56, 57, 63, 35, 62, 59, 60, 64],
      category: "WORK",
    },
    {
      id: 104,
      title: "Mermaid.js Open Source Contribution",
      period: "2026.05",
      items: [],
      links: [{ label: "View PDF", href: "/pdfs/mermaid-oss-contribution.pdf" }],
      pdfSections: [
        { label: "Problem Analysis", startPage: 1, endPage: 4 },
        { label: "Fix and Implementation", startPage: 5, endPage: 12 },
        { label: "Verification", startPage: 13, endPage: 19 },
        { label: "PR and Wrap-up", startPage: 20, endPage: 24 },
      ],
      detailSections: [
        {
          title: "What is Mermaid.js?",
          items: [
            "A leading open-source library for creating diagrams from text syntax",
            "Widely used for development documentation including flowcharts, sequence diagrams, and state diagrams",
            "A global project with about 88k GitHub stars",
          ],
        },
        {
          title: "Motivation",
          items: [
            "Frequently worked with Mermaid.js diagram rendering in a company project",
            "Found awkward Self Loop Edge rendering and unstable editing behavior",
            "Identified it as an internal rendering issue and began analyzing the codebase",
          ],
        },
        {
          title: "Contribution",
          items: [
            "Analyzed why a Self Loop Edge was rendered as multiple fragmented SVG paths",
            "Updated the rendering logic so it appears as one natural, compact edge",
            "Improved self-loop behavior in Flowchart and State Diagram",
            "Added tests and submitted a pull request",
            "Completed maintainer review and merged the change",
          ],
          media: {
            src: "/assets/experiences/mermaid-self-loop-result.png",
            alt: "Self Loop Edge rendering before and after",
            width: 906,
            height: 346,
          },
        },
        {
          title: "Result",
          items: [
            "Contributed directly to a global open-source codebase with about 88k stars",
            "The bug I found was fixed in Mermaid.js",
            "My code is now part of the Self Loop Edge rendering flow used by Mermaid users",
            "Moved beyond using a library to improving the tool itself",
          ],
          media: {
            src: "/assets/experiences/mermaid-pr-7711.png",
            alt: "Merged Mermaid.js PR #7711",
            width: 700,
            height: 618,
            href: "https://github.com/mermaid-js/mermaid/pull/7711",
            linkLabel: "View pull request",
            maxWidth: 200,
            placement: "left",
          },
          extra: {
            items: [
              "Shipped worldwide as a major patch in the official @mermaid-js/tiny@11.16.0 release",
              "Every Self Loop Edge users draw now renders through the code I wrote",
            ],
            highlights: [
              "@mermaid-js/tiny@11.16.0",
              "major patch",
              "worldwide",
              "Self Loop Edge",
              "the code I wrote",
            ],
            media: {
              src: "/assets/experiences/mermaid-release-11-16-0.png",
              alt: "Self Loop Edge improvement shipped in the Mermaid.js 11.16.0 release notes",
              width: 1246,
              height: 450,
              href: "https://github.com/mermaid-js/mermaid/releases/tag/%40mermaid-js%2Ftiny%4011.16.0",
              linkLabel: "View the release",
              maxWidth: 360,
              placement: "right",
            },
          },
        },
        {
          title: "Troubleshooting",
          items: [],
          showPdf: true,
        },
        {
          title: "What I Learned",
          items: [
            "Turned a problem I experienced into an improvement delivered to Mermaid.js users worldwide",
            "Expanded my testing perspective beyond functional checks to visual regression by working with Vitest logic tests and Cypress rendering tests",
            "Learned that UI libraries must verify the actual rendered result as well as code behavior",
            "Learned how tests should be designed to increase confidence during open-source review",
            "Gained experience improving the tools I use rather than remaining only a user",
          ],
          highlights: ["Mermaid.js users worldwide", "Vitest logic tests", "Cypress rendering tests", "visual regression", "actual rendered result", "increase confidence", "improving the tools I use"],
        },
        {
          title: "Final Thoughts",
          items: [
            "I believe open-source culture is one of the most remarkable cultures in software.",
            "It is strange when you think about it: people freely share what they have built with everyone.",
            "Yet this culture of openness and contribution is one of the reasons software has advanced so rapidly in its short history.",
            "I enjoyed an open-source introduction course at university, but contributing directly made its meaning tangible and turned this into an especially rewarding experience.",
          ],
          highlights: ["open-source culture", "openness and contribution", "contributing directly", "made its meaning tangible"],
          layout: "paragraphs",
        },
      ],
      is_active: false,
      sub_title: "Contributed to a global diagramming open source project with about 88k GitHub stars",
      imageUrl: "/assets/projects/mermaid-github.png",
      index: 3,
      skill_ids: [81, 69, 67, 68, 71, 72, 74, 75, 73, 76, 78, 79, 80],
      category: "OPEN_SOURCE",
    },
  ],
};

export default experiences;
