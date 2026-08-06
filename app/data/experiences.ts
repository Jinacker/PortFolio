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
            "ASPICE · ISO 26262 등 자동차 SW 품질 도메인을 학습 — 이 제품(V-SPICE)가 어떤 공급망 구조와 니즈에서 탄생했는지 배경부터 이해하고 개발",
            "첫 임무로 사내 테스팅 툴 CT와 V-SPICE를 연결하는 테스트케이스 데이터 연동 API 개발을 담당 — 설계 → 구현 → 성능 최적화 → QA → 추가 요구사항 대응 → 인수인계까지 개발 전체 사이클을 직접 경험",
            "제품을 사용하며 느낀 불편함을 프로토타입으로 구현해 직접 제안했고, 채택 이후 사내 라이브러리 SureFlow 개발을 전담 — 완성도를 인정받아 상반기 제품 로드맵에 반영되고 실제 제품 탑재까지 완수",
            "팀 선배들이 개발한 기능의 QA·버그 리포트와 함께, 제품 개선 제안도 꾸준히 — V-SPICE 개선·버그 제안 8건, 경쟁사(Codebeamer) 벤치마킹 제안 3건",
          ],
          highlights: [
            "약 4개월",
            "풀스택 개발 인턴",
            "실제 제품에 탑재되는 기능",
            "데이터 연동 API 개발",
            "개발 전체 사이클",
            "프로토타입으로 구현해 직접 제안",
            "사내 라이브러리 SureFlow",
            "상반기 제품 로드맵",
            "실제 제품 탑재까지 완수",
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
          items: [],
          showSubDetails: true,
        },
        {
          title: "경험을 통해 배운 점",
          items: [
            "추측하지 않고 측정으로 증명하는 습관",
            "기술을 고를 때마다 선택의 이유와 포기한 것을 기록하는 태도",
            "5년 동안의 의사결정이 쌓인 레거시를 존중하며 최소한의 수정으로 가치를 더하는 방법",
            "API 개발의 절반은 코드가 아니라 타 팀과의 명세 협의라는 것",
            "한 줄짜리 수정처럼 보여도, 얽혀 있는 시스템 전체의 영향 범위를 먼저 따져야 한다는 것",
            "왜 이만큼 걸리는지 근거를 들어 설명하고 설득하는 것까지가 개발자의 일이라는 것",
            "문제를 발견하는 사람에서 직접 해결하는 사람으로 넘어가는 주도성",
            "생각보다 많은 일을 믿고 맡겨주신 덕분에 느낀 책임감과 보람 — 열심히 하면 인정받을 수 있다는 확신",
            "이 과정을 인정받아 인턴 평가에서 최우수상 수상",
          ],
          highlights: [
            "측정으로 증명",
            "선택의 이유와 포기한 것",
            "5년 동안의 의사결정이 쌓인 레거시",
            "최소한의 수정",
            "타 팀과의 명세 협의",
            "영향 범위",
            "설명하고 설득하는 것까지",
            "직접 해결하는 사람",
            "믿고 맡겨주신",
            "책임감과 보람",
            "최우수상",
          ],
          media: {
            src: "/assets/experiences/sure-award.png",
            alt: "인턴 최우수상 상장",
            width: 1036,
            height: 1470,
            maxWidth: 250,
            placement: "left",
          },
        },
        {
          title: "마지막 한마디",
          items: [
            "상상을 현실로 만들 수 있다는 게 재밌어서 개발을 시작했습니다. 누군가 매일 사용하고 실제로 도움을 받는 무언가를 만들고 싶었습니다. 그런데 어느 순간 회의감이 들더라고요. \"아무도 안 쓸 걸 왜 이렇게 열심히 만들고 있지?\" 하는 생각을 자주 했고, AI의 발전 속도에 개발을 떠나는 친구들이 하나둘 생기면서 저도 많이 흔들렸습니다.",
            "그래서 이번 인턴십은 인생의 갈림길이었습니다. 실무를 직접 겪어보며 이 일이 정말 제 적성에 맞는지 확인하고 싶었고, 아니라면 과감히 다른 길을 갈 생각이었습니다.",
            "3개월 뒤의 결론은 생각보다 명확했습니다. 제가 만든 기능이 실제 제품에 들어가고, 실제 고객이 매일 사용한다는 사실이 모든 것을 바꿔놓았습니다. 좋아하는 일을 하면서 돈까지 버니 너무 재밌더라고요. 매일 출근하는 게 기대될 만큼 재밌었고, 그동안의 회의감은 깔끔하게 해소됐습니다.",
            "수확이 하나 더 있다면, AI 시대 개발자의 일을 현장에서 직접 본 것입니다. 실무에서는 구현 자체보다 고객의 요구사항을 정의하고 조율하는 데 훨씬 많은 시간을 씁니다. 구현은 AI가 점점 대신해 주는 만큼 개발자의 무게중심은 문제를 정의하고 조율하는 쪽으로 옮겨가고 있다는 걸 체감했고, 대체를 걱정하기보다 그 흐름을 활용하는 쪽을 택하게 됐습니다.",
            "인복도 참 많았습니다. 생각보다 훨씬 많은 일을 믿고 맡겨주신 덕분에 책임감과 보람을 느끼며 일했고, 각자의 자리에서 책임감을 갖고 개발에 임하는 선배분들을 보며 자신의 직업과 전문성을 가지고 일하는 사람은 정말 멋있다는 것도 배웠습니다.",
            "저에게 이 3개월은 단순한 실무 경험이 아니라 다시 일어날 용기를 준 시간이었습니다. 앞으로 어떻게 될지는 모르지만, 일단 제가 좋아하는 개발을 조금 더 해보려고 합니다.",
          ],
          highlights: [
            "상상을 현실로",
            "회의감",
            "인생의 갈림길",
            "실제 제품에 들어가고, 실제 고객이 매일 사용한다",
            "매일 출근하는 게 기대될 만큼",
            "회의감은 깔끔하게 해소",
            "AI 시대 개발자의 일",
            "문제를 정의하고 조율하는 쪽",
            "대체를 걱정하기보다 그 흐름을 활용하는 쪽",
            "믿고 맡겨주신",
            "책임감과 보람",
            "자신의 직업과 전문성을 가지고 일하는 사람",
            "다시 일어날 용기",
            "좋아하는 개발을 조금 더",
          ],
          layout: "paragraphs",
        },
      ],
      subDetails: [
        {
          id: "ct-api",
          title: "V-SPICE ↔ CT, 대용량 테스트케이스 연동 API 설계 및 개발",
          sections: [
            {
              title: "CT 연동 API란?",
              items: [
                "V-SPICE의 함수 명세·테스트케이스를 자사 테스팅 툴 CT에 전달하는 REST API 3종",
                "고객사 데이터가 수십만 건까지 커질 수 있는 환경에서, 팀 최초의 REST API를 개발하고 성능 최적화와 도입 검증 (기존에는 파일 시스템 방식으로 전달)",
              ],
              highlights: [
                "CT",
                "REST API 3종",
                "팀 최초의 REST API",
                "성능 최적화와 도입 검증",
              ],
            },
            {
              title: "문제 확인",
              items: [
                "초기 구조는 같은 쿼리가 최대 111,002개까지 반복됐고, 요청하지 않은 TC가 응답에 섞일 가능성도 존재",
                "771 TC가 10만 TC와 비슷한 1.2~1.5초 소요 — 구간 측정 결과 Q3가 전체 시간의 약 91%를 차지",
                "복합키 문자열 연산으로 인덱스가 무효화되는 지점을 실제 실행 경로에서 특정",
              ],
              highlights: [
                "최대 111,002개",
                "Q3가 전체 시간의 약 91%",
                "인덱스가 무효화",
              ],
            },
            {
              title: "판단과 선택",
              items: [
                "Nested와 Flatten 응답안을 비교하고, CT 팀의 실제 사용 방식에 맞춰 API 명세를 협의·확정",
                "흩어진 파일·함수는 Map으로 찾고 정렬된 TC는 한 번만 순회해 조립하도록 서비스 로직 개선",
                "DB는 functionId 인덱스 조회, Java는 Set으로 정확한 pair 필터링을 담당하도록 역할 분리",
              ],
              highlights: [
                "Nested와 Flatten",
                "Map",
                "한 번만 순회",
                "DB는 functionId 인덱스 조회",
                "Java는 Set",
              ],
            },
            {
              title: "예외와 검증",
              items: [
                "10만·100만 건 테스트 데이터를 직접 구성해 반복 호출 성능과 응답 무결성을 함께 검증",
                "100만 건 생성은 청크 분할로 처리하고, 응답 압축은 운영 환경이 확정되지 않아 후속 과제로 분리",
                "요청하지 않은 데이터가 응답에 섞이는 버그까지 부하 테스트 과정에서 발견해 수정",
              ],
              highlights: [
                "10만·100만 건",
                "응답 무결성",
                "청크 분할",
                "후속 과제",
              ],
            },
            {
              title: "결과",
              items: [
                "고객사 프로젝트 1.2s → 72ms(약 16배), 10만 TC 2s → 990ms",
                "요청당 쿼리 수 111,002개 → 3개로 고정",
                "10만 TC 부하 테스트 평균 715ms, 오류율 0%",
              ],
              highlights: [
                "1.2s → 72ms",
                "2s → 990ms",
                "111,002개 → 3개",
                "715ms",
                "0%",
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
                  { label: "서비스단 가공 최적화", startPage: 29, endPage: 35 },
                  { label: "성능 측정·k6 부하 테스트", startPage: 36, endPage: 41 },
                  { label: "CT 추가 요구사항 구현", startPage: 42, endPage: 43 },
                  { label: "추가 병목 분석과 해결", startPage: 44, endPage: 46 },
                  { label: "최종 성능 비교", startPage: 47, endPage: 48 },
                ],
              },
            },
            // [빈 슬롯] "트러블 슈팅" 섹션 — PDF 확보 시 주석 해제 후 pdf 필드로 추가:
            //   ct-api-troubleshooting.pdf (확인 필요) / 버튼문구: 복합키 인덱스 무효화 병목 해결 과정 (1.2s → 72ms)
            {
              title: "경험을 통해 배운 점",
              items: [
                "인덱스는 있느냐가 아니라 타느냐의 문제 — 컬럼 연산 하나가 성능을 무너뜨린다는 것을 직접 경험",
                "성능 문제는 추측 대신 구간 측정부터 시작해야 한다는 것",
                "API 개발의 절반은 코드가 아니라 타 팀과의 명세 협의라는 것",
              ],
              highlights: [
                "타느냐",
                "구간 측정",
                "타 팀과의 명세 협의",
              ],
            },
          ],
        },
        {
          id: "sureflow",
          title: "SureFlow — 다이어그램 GUI 편집을 지원하는 사내 라이브러리 개발 및 제품 적용",
          sections: [
            {
              title: "문제와 제안",
              items: [
                "Mermaid 코드를 직접 고쳐야만 Flowchart를 수정할 수 있어 비개발 사용자의 진입 장벽이 컸던 상황",
                "아이디어에 그치지 않고 프로토타입을 실제 V-SPICE 화면에 이식해 필요성과 구현 가능성을 먼저 증명",
              ],
              highlights: [
                "Mermaid 코드를 직접",
                "실제 V-SPICE 화면에 이식",
              ],
            },
            {
              title: "프로토타입과 방향 전환",
              items: [
                "Mermaid Live Editor, Vue Flow, Graphviz, DHTMLX를 비교하고 Vue 2 제품을 유지하기 위해 IIFE 격리 방식으로 1차 이식",
                "Mermaid ↔ Vue Flow 양방향 변환기를 만들고 미지원 문법은 원문 그대로 보존했지만, 번들 크기·DOM 격리·그래프 형상 한계를 확인",
                "폐기 근거를 기록한 뒤 Mermaid가 렌더한 SVG를 직접 편집하는 순수 JS 구조로 전환",
              ],
              highlights: [
                "IIFE 격리 방식",
                "양방향 변환기",
                "원문 그대로 보존",
                "순수 JS 구조로 전환",
              ],
            },
            {
              title: "아키텍처와 안정화",
              items: [
                "편집 흐름을 script → model → SVG → interaction → model → script로 정의하고 파싱·수정·렌더링·매핑·상호작용 책임을 분리",
                "핸들러에는 Vue 객체 대신 허용된 기능만 담은 ctx를 전달해 제품 코드와의 결합을 제한",
                "미지원 문법의 원문·진단 정보 보존, Self Loop·동적 ID·이름 없는 edge·중첩 block 보정, 전역 이벤트 해제까지 반영",
              ],
              highlights: [
                "script → model → SVG → interaction → model → script",
                "책임을 분리",
                "ctx",
                "원문·진단 정보 보존",
              ],
            },
            {
              title: "제품 확장",
              items: [
                "제품에는 value/input 문자열 계약만 노출해 화면당 두 파일 수정으로 Flowchart·Sequence·Static 편집기를 임베드",
                "ALIRA 사용 흐름에 맞춰 note와 edge 가까이에 편집 동작을 배치하고, 긴 생성 코드의 Syntax Error 원인을 3종으로 분리해 대응안 제시",
                "Static Diagram은 Flowchart 계열 기능을 재사용하되 static profile과 전용 parser/generator로 형식별 규칙을 분리",
              ],
              highlights: [
                "value/input 문자열 계약",
                "화면당 두 파일 수정",
                "note와 edge 가까이",
                "static profile",
              ],
            },
            {
              title: "결과",
              items: [
                "Flowchart·Sequence·Static 편집기가 제품 Master에 반영되고 README·임베드 매뉴얼과 함께 사내 라이브러리로 인수인계",
                "note 기능을 계층별 책임에 맞춰 추가하며 구조의 확장성을 검증하고, 추가 패치 4회 동안 Critical 버그 0건",
                "아키텍처와 작업 규칙을 문서화한 조건에서 AI 작업 토큰 약 35%, 작업 시간 약 50% 감소",
              ],
              highlights: [
                "제품 Master에 반영",
                "사내 라이브러리로 인수인계",
                "Critical 버그 0건",
                "토큰 약 35%",
                "작업 시간 약 50% 감소",
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
                "리팩토링은 동작 불변의 증명 수단과 함께여야 안전하다는 것",
                "좋은 계약(value/input)이 있으면 레거시 호스트도 얇게 유지된다는 것",
              ],
              highlights: [
                "없으면 만든다",
                "동작 불변의 증명 수단",
                "레거시 호스트도 얇게",
              ],
            },
          ],
        },
        {
          id: "png-pipeline",
          title: "문서 이미지 누락 문제 분석 및 PNG 생성 구조 개선",
          sections: [
            {
              title: "문제와 원인",
              items: [
                "Import한 Design으로 문서를 생성하면 화면에 있던 Flowchart가 결과물에서 누락되는 버그를 QA 중 발견",
                "Import 경로는 Mermaid 스크립트만 저장했고, 기존 문서 생성기는 PNG 파일이 없으면 이미지 삽입을 건너뛰고 있던 구조",
                "Java 서버는 Mermaid를 렌더할 수 없고 폐쇄망이라 외부 변환 API도 사용할 수 없어 브라우저만 PNG 생성 가능",
              ],
              highlights: [
                "Flowchart가 결과물에서 누락",
                "Mermaid 스크립트만 저장",
                "브라우저만 PNG 생성 가능",
              ],
            },
            {
              title: "판단과 선택",
              items: [
                "브라우저에서 활성 함수의 Mermaid를 전부 PNG로 저장한 뒤 기존 문서 생성을 실행하는 사전 생성 파이프라인 설계",
                "활성 함수의 chartData를 한 번에 가져오는 목록 API만 추가하고 기존 Java 생성기와 저장 API는 유지",
                "준비 단계부터 생성 버튼을 잠그고 로딩 상태를 표시해 중복 요청과 실행 순서 역전을 차단",
              ],
              highlights: [
                "사전 생성 파이프라인",
                "목록 API",
                "기존 Java 생성기와 저장 API는 유지",
                "중복 요청",
              ],
            },
            {
              title: "실패 처리와 확장",
              items: [
                "PNG 변환이 실패해도 문서 생성은 계속하는 Fallback을 선택 — 전체 중단을 막는 대신 일부 이미지 누락 가능성은 허용",
                "이 구조를 기반으로 렌더 직렬성·메모리·연결 수를 측정해 배치 크기 5의 병렬화로 확장",
                "배치 크기를 설정 파일로 외부화해 고객 환경별 무배포 튜닝이 가능하도록 구성",
              ],
              highlights: [
                "문서 생성은 계속",
                "일부 이미지 누락 가능성",
                "배치 크기 5",
                "설정 파일로 외부화",
              ],
            },
            {
              title: "결과",
              items: [
                "PNG 생성 1800ms → 1172ms(-34.9%), 전체 문서 생성 -26.8%",
                "파이프라인 제품 Master merge, 문서의 이미지 누락 해소",
              ],
              highlights: [
                "1800ms → 1172ms(-34.9%)",
                "-26.8%",
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
                "QA에서 발견한 버그를 개발 과제로 전환해 직접 해결하는 사이클의 가치",
              ],
              highlights: [
                "아키텍처 제약",
                "새 경로 설계",
                "무엇이 직렬이고 무엇이 한도인가",
                "개발 과제로 전환",
              ],
            },
          ],
        },
        {
          id: "server-shutdown",
          title: "V-SPICE Server 프로세스 종료 지연 원인 분석 및 해결",
          sections: [
            {
              title: "어떤 문제였나",
              items: [
                "V-SPICE는 고객 PC에 직접 설치되어 Windows 서비스로 동작하는 제품 — 패치 파일 전달 시 서버 중지·파일 교체·재기동이 필요",
                "서비스 중지가 최대 231초까지 소요되어 종료 지연이 곧 패치 작업 지연으로 이어지는 상황",
                "고객사에 흔한 저사양 PC에서는 중지 도중 멈춰 PC 재부팅이 필수가 되는 상황",
                "과거에는 빨랐던 것이 어느 순간 느려진 회귀 버그 — 원인 불명 상태에서 담당",
              ],
              highlights: [
                "고객 PC에 직접 설치",
                "서버 중지·파일 교체·재기동",
                "231초",
                "패치 작업 지연",
                "저사양 PC",
                "PC 재부팅이 필수",
                "회귀 버그",
              ],
            },
            {
              title: "원인 분석",
              items: [
                "로그 실측으로 Catalina는 약 4초 만에 종료되지만 JVM 프로세스는 남는 것을 확인해 문제 범위를 스레드 생명주기로 축소",
                "종료 조건과 인터럽트 처리가 없는 비데몬 무한 루프 스레드 3개가 JVM 종료를 막고 있음을 특정",
                "서비스가 60초 타임아웃 뒤 강제 종료되고, 저사양 PC에서는 이 과정까지 지연되는 구조로 판단",
              ],
              highlights: [
                "Catalina는 약 4초",
                "비데몬 무한 루프 스레드 3개",
                "60초 타임아웃",
              ],
            },
            {
              title: "판단과 해결",
              items: [
                "명시적 종료 조건을 갖춘 graceful shutdown과 데몬 전환을 비교하고, 작업이 재시도되거나 재기동 후 복구 가능한 성격임을 근거로 데몬 전환 선택",
                "3개 스레드에 setDaemon(true)를 적용해 실행 중 동작은 유지하고 JVM 종료 시 기다리지 않도록 종료 정책만 변경",
                "진행 중 작업이 즉시 중단될 수 있지만 기존에도 타임아웃 후 강제 종료됐다는 점을 함께 고려하고, 근본 개선은 후속 과제로 문서화",
              ],
              highlights: [
                "graceful shutdown과 데몬 전환",
                "재기동 후 복구 가능",
                "종료 정책만 변경",
                "진행 중 작업이 즉시 중단",
                "후속 과제로 문서화",
              ],
            },
            {
              title: "검증과 결과",
              items: [
                "기동, 종료 시간, 스레드 로그, 강제 종료 진입 여부를 검증 기준으로 수립",
                "5회 반복 측정 모두 3~7초 안에 자연 종료되고 60초 타임아웃에 진입하지 않음을 확인",
                "서비스 종료 시간을 231초 → 3~7초로 단축하고 원인·선택·검증 과정을 인수인계 문서로 정리",
              ],
              highlights: [
                "강제 종료 진입 여부",
                "5회 반복 측정",
                "231초 → 3~7초",
                "인수인계 문서",
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
                "로그 증거로 검증 항목을 세우는 측정의 절차 — 절차 없는 측정은 잘못된 결론에 도달함",
                "임시 조치와 근본 해결을 구분해 제시하는 의사결정과 문서화가 신뢰를 만든다는 것",
              ],
              highlights: [
                "종료 전략까지",
                "측정의 절차",
                "구분해 제시",
              ],
            },
          ],
        },
        {
          id: "etc-quality",
          title: "QA를 통해 버그 19건+ 발굴하고 일부 이슈의 수정까지 담당",
          sections: [
            {
              title: "어떤 활동인가",
              items: [
                "선배분들이 개발하신 기능과 배포 패키지의 검수(QA)를 병행 담당",
                "단순 동작 확인이 아니라 재현 시나리오·원인 가설까지 담은 버그 리포트로 전달",
                "발견한 버그 중 일부는 리포트에서 끝내지 않고 직접 해결까지 진행",
              ],
              highlights: [
                "배포 패키지의 검수(QA)",
                "재현 시나리오·원인 가설",
                "직접 해결까지 진행",
              ],
            },
            {
              title: "QA·버그 리포트",
              items: [
                "배포 패키지의 기능 매트릭스를 전수 테스트 — 버그 리포트 19건+",
                "성공 메시지가 떠도 실제 반영 여부까지 확인 — 성공으로 표시되지만 실제로는 미반영되는 Import 순서 의존 버그 등 발견",
                "가끔만 재현되는 비결정적 버그를 13개 케이스 매트릭스로 전수 비교 — \"특정 함수 한정, 확률적 발생\"이라는 개발팀이 바로 쓸 결론 도출",
                "AI 생성 다이어그램의 Mermaid 문법 충돌 3종을 원인 분석 + 해결안과 함께 타 팀에 전달",
              ],
              highlights: [
                "전수 테스트",
                "버그 리포트 19건+",
                "Import 순서 의존 버그",
                "13개 케이스 매트릭스",
                "Mermaid 문법 충돌 3종",
              ],
            },
            {
              title: "직접 해결한 대표 사례",
              items: [
                "## AI 산출물 한글 깨짐 (EUC-KR → UTF-8)",
                "AI가 생성한 다이어그램에서 한글 주석이 \"ë¥¼\" 같은 깨진 문자로 표시되던 고질 버그",
                "소스 파일을 hex 덤프로 열어 원본이 EUC-KR임을 증거로 확정 — 서버는 원본 바이트 그대로 전송, AI는 UTF-8을 가정하는 전송 경계의 불일치가 원인",
                "전송 직전 zip 생성 시에만 · C 소스 파일만 · 실제 인코딩을 감지해 UTF-8 변환 — 디스크 원본은 일절 건드리지 않는 안전한 설계",
                "국내 고객 소스(한글 주석)에 대한 AI 분석 품질 정상화",
                "## 그 밖의 해결 사례",
                "문서 생성 시 이미지가 통째로 빠지는 버그 → PNG 파이프라인 개발로 직접 해결 (별도 카드 참고)",
                "서비스 종료가 231초씩 걸리던 V-SPICE Server 종료 지연 → 스레드 추적으로 직접 해결 (별도 카드 참고)",
              ],
              highlights: [
                "\"ë¥¼\" 같은 깨진 문자",
                "hex 덤프",
                "EUC-KR",
                "전송 경계의 불일치",
                "디스크 원본은 일절 건드리지 않는",
                "AI 분석 품질 정상화",
                "PNG 파이프라인 개발로 직접 해결",
                "스레드 추적으로 직접 해결",
              ],
              // [빈 슬롯] 이미지 확보 시 media로 추가: encoding-before-after.png (확인 필요) — 인코딩 수정 전후 다이어그램 비교 (위치: 위)
            },
            // [빈 슬롯] "트러블 슈팅" 섹션 — PDF 확보 시 주석 해제 후 pdf 필드로 추가:
            //   alira-encoding-fix.pdf (확인 필요) / 버튼문구: EUC-KR 한글 인코딩 깨짐 해결 과정 자세히 보기
            {
              title: "경험을 통해 배운 점",
              items: [
                "좋은 버그 리포트는 개발자가 바로 움직일 수 있는 리포트 — 현상만이 아니라 재현 조건·원인 가설·해결안까지",
                "성공 메시지를 그대로 믿지 않고 실제 반영 여부까지 의심하는 검증 습관",
                "눈에 보이는 현상이 아니라 바이트·로그 같은 증거로 판별하는 디버깅 감각",
                "선배분들의 기능을 검수하며 제품 전체 구조를 읽는 눈이 생긴 것",
                "QA는 검수로 끝나지 않고, 발견한 문제를 직접 해결할 때 가장 크게 성장한다는 것",
              ],
              highlights: [
                "개발자가 바로 움직일 수 있는 리포트",
                "재현 조건·원인 가설·해결안",
                "실제 반영 여부까지 의심하는 검증 습관",
                "바이트·로그 같은 증거",
                "제품 전체 구조를 읽는 눈",
                "직접 해결할 때 가장 크게 성장",
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
