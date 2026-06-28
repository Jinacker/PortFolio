"use client"

import { useState, useEffect, useRef } from "react"
import { FaHandFist } from "react-icons/fa6"; // FaHandFist 아이콘 추가
import {
  Calendar,
  Award,
  Users,
  Code,
  ExternalLink,
  User,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Cake,
  Wrench,
  Github,
  BookOpen,
  Folder,
  Flame,
  MessageCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  X,
  HelpCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TimelineItem {
  id: string
  title: string
  organization?: string
  period: string
  type: "award" | "activity" | "education" | "upcoming" | "development"
  description: string
  details?: string // Add this new field for additional description
  role?: string // Add this new field for role information
  award?: string
  link?: string
  contribution?: string
  responsibility?: string
  order: number // 시간순 정렬을 위한 순서
}

interface ProjectItem {
  id: string
  title: string
  period: string
  description: string
  tech: string
  status: "completed" | "in-progress"
  award?: string
  link: string
}

// 시간 역순으로 정렬된 타임라인 데이터 (최신부터)
const timelineData: TimelineItem[] = [
  {
    id: "coding-start",
    title: "코딩 첫 시작",
    period: "2018년",
    type: "education" as const,
    description: "고등학교 코딩 동아리 - 프로젝트 대회",
    details:
      "아두이노로 구현한 스마트홈 프로젝트 경험이 처음 코딩을 접한 계기이자, IT 분야로 진로를 정하게 된 중요한 출발점이었습니다.",
    award: "최우수상 수상",
    link: "https://blog.naver.com/rlawls1448/223554607352",
    order: 1,
  },
  {
    id: "maker-contest",
    title: "제 5회 INU 메이커 경진대회",
    period: "2020-2",
    type: "award" as const,
    details: "팀장으로 교내 메이커 경진대회에서 우수상 수상, 코로나 대응 아이디어 기획 및 구현",
    award: "우수상 수상",
    link: "https://blog.naver.com/rlawls1448/222223758063",
    order: 2,
  },
  {
    id: "research-group",
    title: "교수-학생 전공심화 연구모임",
    period: "2020-2",
    type: "activity" as const,
    description: "인천대학교",
    details: "코로나 방역 관련 아이디어로 교수-학생 전공심화 연구모임 참여",
    link: "https://blog.naver.com/rlawls1448/222176617026",
    order: 3,
  },
  {
    id: "smart-living",
    title: "부천시 스마트리빙랩 시민 참여단",
    period: "2024 여름",
    type: "activity" as const,
    description: "부천시 스마트리빙랩 시민 참여단 팀장 수료",
    details:
      "시민의 실질적인 의견이 어떻게 도시 설계에 반영되는지를 직접 경험하고, 조별 논의 및 제안 활동에 참여했습니다.",
    link: "https://blog.naver.com/rlawls1448/223554607352",
    order: 4,
  },
  {
    id: "dinnoz",
    title: "DINNOZ 1기 우수 서포터즈",
    period: "2024 여름",
    type: "award" as const,
    description: "IT 박람회 DINNOZ 1기 우수 서포터즈 수료",
    details:
      "콘텐츠 기획 및 미션 수행 전반에 적극 참여. 뽑아주신 마음에 보답하고 싶어, 모든 미션에 정성을 다해 임했습니다.",
    link: "https://blog.naver.com/rlawls1448/223672365443",
    order: 5,
  },
  {
    id: "spatial-info-6",
    title: "제 6회 공간정보 활용 경진대회",
    period: "2024년 여름",
    type: "award" as const,
    description: "팀장 참여",
    details:
      "실시간 교통 상황을 기반으로 응급차량의 이동 경로를 최적화하고, 민간 차량 흐름을 효율적으로 유도하는 시스템을 제안했습니다.",
    award: "최우수상 수상",
    link: "https://blog.naver.com/rlawls1448/223675136871",
    order: 6,
  },
  {
    id: "digital-twin",
    title: "2024 농어촌 디지털트윈 서비스 아이디어 경진대회",
    period: "2024년 여름",
    type: "award" as const,
    description: "농촌 고령층의 건강, 일정, 커뮤니티 참여를 통합 관리할 수 있는 디지털 트윈 플랫폼을 제안했습니다.",
    award: "장려상 수상",
    link: "https://blog.naver.com/rlawls1448/223674643082",
    order: 7,
  },
  {
    id: "data-creator",
    title: "2024 데이터 크리에이터 캠프",
    period: "2024 여름",
    type: "education" as const,
    description: "인공지능 및 데이터 분석 대회 스타터 과정 수료",
    details: "ResNet 기반 CNN 모델로 패션 이미지 분류 프로젝트 수행",
    link: "https://blog.naver.com/rlawls1448/223681491796",
    order: 8,
  },
  {
    id: "scholarship",
    title: "국토정보공사 발전 장려 장학생",
    period: "2024-2",
    type: "award" as const,
    description: "국토정보공사 발전 장려 장학생 선정",
    link: "https://blog.naver.com/rlawls1448/223636051928",
    order: 9,
  },
  {
    id: "inha-workshop",
    title: "인하공방 동아리",
    period: "2024-2",
    type: "activity" as const,
    description: "제어/설계 동아리 활동",
    details: "자율주행 기술 관련 오픈 스터디 참여",
    link: "https://blog.naver.com/rlawls1448/223785118853?trackingCode=blog_bloghome_searchlist",
    order: 10,
  },
  {
    id: "inha-study",
    title: "인하동동 그룹 스터디",
    period: "2024-2",
    type: "activity" as const,
    description: "인하동동 그룹 스터디 팀장",
    details:
      "전공 과목을 중심으로 동기 및 후배들과 그룹 스터디를 운영하며 학습 내용 정리, 질의응답, 진도 관리 등을 주도했습니다.",
    link: "https://blog.naver.com/rlawls1448/223603614252",
    order: 11,
  },
  {
    id: "curvism",
    title: "커비이심 서포터즈 1기",
    period: "2024-2",
    type: "activity" as const,
    description: "커비이심 서포터즈 1기 수료",
    link: "https://blog.naver.com/rlawls1448/223674626853",
    order: 12,
  },
  {
    id: "kt-supporters",
    title: "KT 대학생 IT 서포터즈 2기",
    period: "2024 겨울",
    type: "activity" as const,
    description: "중학생 대상 AI 코딩 교육 봉사 커리큘럼 기획팀 부팀장",
    details:
      "도서산간 지역 중학생을 대상으로 코딩 커리큘럼을 기획·제작하고, 직접 방문해 교육 봉사와 진로 멘토링을 진행했습니다.",
    link: "https://blog.naver.com/rlawls1448/223815131854",
    order: 13,
  },
  {
    id: "kseb-bootcamp",
    title: "KSEB 부트캠프 4기",
    period: "2024 겨울 ~ 현재 ",
    type: "education" as const,
    description: "KSEB 부트캠프 4기 참여",
    details: "교내 연계 부트캠프에 참여하여, 기초부터 실무까지 개발 전반에 대한 내용을 폭넓게 배우고 있습니다.",
    award: "우수 교육생 수상",
    link: "https://blog.naver.com/rlawls1448/223814972761",
    contribution: "백엔드 개발 과정 수료, Django를 활용한 웹 애플리케이션 개발 프로젝트 완성",
    order: 14,
  },
  {
    id: "scholarship-2",
    title: "국토정보공사 발전 장려 장학생",
    period: "2025-1",
    type: "award" as const,
    description: "2번째 국토정보공사 발전 장려 장학생 선정",
    link: "https://blog.naver.com/rlawls1448/223842792230",
    order: 15,
  },
  {
    id: "react-course",
    title: "한입 리액트 완강",
    period: "2025년 2월",
    type: "education" as const,
    description: "React로 웹 개발 처음 입문",
    details:
      "인프런 한입 크기로 잘라 먹는 리액트 강의를 완주하며 React 기초부터 실전까지 학습했습니다. 컴포넌트 설계, 상태 관리, 라이프사이클 등 React의 핵심 개념을 익혔습니다.",
    link: "https://blog.naver.com/rlawls1448/223815205664",
    order: 16,
  },
  {
    id: "likelion",
    title: "멋쟁이사자처럼 13기",
    period: "2025-1 ~ 현재",
    type: "education" as const,
    description: "BE 파트 참여",
    details:
      "멋쟁이사자처럼 백엔드 트랙에 참여하여 Django 기반 웹 개발 교육을 이수하고, 다양한 협동 과제를 통해 GitHub Flow 기반의 협업 방식에 익숙해졌습니다.",
    link: "https://blog.naver.com/rlawls1448/223815192434",
    order: 17,
  },
  {
    id: "debug-president",
    title: "코딩 동아리 DEBUG",
    organization: "인하대학교",
    period: "2025-1",
    type: "activity" as const,
    description: "학과 코딩 동아리 DEBUG 회장 활동",
    details:
      "사라졌던 학과 개발 동아리 DEBUG를 부활시켜 운영을 재개하고, 후배들을 대상으로 기초 코딩 멘토링을 진행하며 성공적으로 첫 활동을 마무리했습니다.",
    link: "https://blog.naver.com/rlawls1448/223908879860",
    order: 18,
  },
  {
    id: "mini-project",
    title: "2025 I-Mini Project",
    period: "2025-1",
    type: "award" as const,
    description: "FE 개발 및 팀장으로 참여",
    details: "편향 없는 뉴스 소비를 위한 이슈 요약 서비스 ISSUE ONE을 기획하고 개발했습니다.",
    award: "대상 수상",
    link: "https://blog.naver.com/rlawls1448/223913885215",
    contribution: "React와 TypeScript를 활용한 프론트엔드 개발 담당, 팀원들과의 협업을 통한 프로젝트 관리 및 일정 조율",
    order: 19,
  },
  {
    id: "familog-hackathon",
    title: "FamiLog — 멋쟁이사자처럼 인하대 해커톤",
    period: "2025-여름",
    type: "development" as const,
    description: "Django BE",
    details: "가족이 하루 질문을 통해 소통하는 기록 서비스입니다. 짧은 시간 안에 팀과 함께 MVP를 완성해가는 과정이 핵심 경험이었습니다.",
    link: "https://github.com/LikeLion-13th-E-TEAM-Inha-Hackathon",
    order: 20,
  },
  {
    id: "shympyo-app",
    title: "쉼표 - 무더위 쉼터 지도",
    period: "2025-여름",
    type: "development" as const,
    description: "React Native 앱 개발",
    details: "주변의 무더위 쉼터를 가장 빠르게 찾을 수 있는 위치 기반 서비스입니다. 사용자에게 필요한 순간에 ‘바로 보이는’ 정보를 만드는 데 집중했습니다.",
    link: "https://github.com/ShymPyo",
    order: 21,
  },
  {
    id: "smart-wms-project",
    title: "Smart WMS — 신세계 산학프로젝트",
    period: "2025-여름",
    type: "award" as const,
    details: "백엔드에서 입·출고, 재고, 작업 상태 같은 도메인 흐름을 정리하며 운영 로직을 안정적으로 모델링하는 경험을 얻었습니다.",
    award: "우수상",
    link: "https://github.com/KSEB-4th-Project-3rd-Team",
    order: 22,
  },
  {
    id: "geonneogeonneo-hackathon",
    title: "건너건너 — 멋쟁이사자처럼 중앙 해커톤",
    period: "2025-여름",
    type: "development" as const,
    description: "Django BE - 채팅 개발",
    details: "지인 기반의 신뢰 네트워크를 잇는 서비스입니다. 사람 사이의 흐름이 끊기지 않는 경험을 만드는 데 집중했습니다.",
    link: "https://github.com/Team-Hawaiian-Pizza",
    order: 23,
  },
  {
    id: "scholarship-grade-1",
    title: "성적 우수장학금 수상",
    period: "2025-1학기",
    type: "award" as const,
    description: "3분의2 교내 성적 우수 장학금을 수상했습니다.",
    link: "https://blog.naver.com/rlawls1448/224005262527",
    order: 24,
  },
  {
    id: "debug-president-2",
    title: "코딩 동아리 DEBUG",
    organization: "인하대학교",
    period: "2025-2학기",
    type: "activity" as const,
    description: "학과 코딩 동아리 DEBUG 회장",
    details: "1학기 디버그의 성공적인 마무리 후, 운영 및 커리큘럼 개선 후 2학기 활동 진행중입니다. 후배들을 대상으로 코딩 입문 수업을 강의하고 있습니다.",
    link: "https://blog.naver.com/rlawls1448/224005303699",
    order: 25,
  },
  {
    id: "umc-9th",
    title: "UMC 9기 YB",
    period: "2025-9 ~ 현재",
    type: "activity" as const,
    description: "Node 서버 파트에서 팀 단위 개발 흐름과 협업 구조를 익히고 있습니다.",
    link: "https://blog.naver.com/rlawls1448/224005292835",
    order: 26,
  },
  {
    id: "katsu-map",
    title: "돈가스 지도 — 1인 개발 프로젝트 / 앱 출시",
    period: "2025-11",
    type: "development" as const,
    description: "React Native 기반 1인 개발 프로젝트",
    details: "서울 돈가스 맛집을 지도 기반으로 탐색하는 개인 프로젝트입니다. 기획부터 개발, 출시까지 혼자 완주한 첫 서비스입니다.",
    link: "https://apps.apple.com/kr/app/%EB%8F%88%EA%B0%80%EC%8A%A4-%EC%A7%80%EB%8F%84/id6755211452",
    order: 27,
  },
].sort((a, b) => b.order - a.order) // a.order - b.order에서 b.order - a.order로 변경

const projectData: ProjectItem[] = [
  {
    id: "issue-one",
    title: "📰 이슈 요약 플랫폼: ISSUE ONE",
    period: "2025-1",
    description: "I-Mini Project 출품작",
    tech: "React 기반 FE 및 팀장",
    status: "completed",
    award: "대상 수상",
    link: "https://github.com/KSEB-4-E",
  },
  {
    id: "familog",
    title: "👨‍👩‍👧 가족판 썸원: FamiLog",
    period: "2025 여름",
    description: "멋쟁이사자처럼 인하대 해커톤",
    tech: "Django 기반 BE",
    status: "completed",
    link: "https://github.com/LikeLion-13th-E-TEAM-Inha-Hackathon",
  },
  {
    id: "smart-wms",
    title: "🚚 RL 기반 AMR 경로 최적화 · 클라우드형 WMS",
    period: "2025 여름",
    description: "신세계 I&C 산학협력 프로젝트 출품작",
    tech: "Spring Boot 기반 BE + FE 보조",
    status: "completed",
    award: "우수상 수상",
    link: "https://github.com/KSEB-4th-Project-3rd-Team",
  },
  {
    id: "trust-network",
    title: "👬 지역 기반 신뢰 네트워크 플랫폼: 건너건너",
    period: "2025 여름",
    description: "멋쟁이사자처럼 중앙해커톤",
    tech: "Django 기반 BE - 1대1 채팅 파트",
    status: "completed",
    link: "https://github.com/Team-Hawaiian-Pizza",
  },
  {
    id: "shelter-map",
    title: "🕊 무더위 쉼터 지도: 쉼표",
    period: "2025 여름 ~ 현재 개발중",
    description: "K-Paas 공모전 출품작 / 스토어 출시 준비중",
    tech: "React Native 기반 FE",
    status: "completed",
    link: "https://github.com/ShymPyo",
  },
  {
    id: "katsu-map-project",
    title: "돈가스 지도 — 1인 개발 프로젝트 / 앱 출시",
    period: "2025-11",
    description: "아직 일주일만에 만든 MVP라 장기적으로 운영하며 업그레이드 할 예정입니다.",
    tech: "React Native / Nest.js",
    status: "completed",
    link: "https://github.com/Katsu-Map",
  },
]

// 프론트엔드 타임라인 데이터
const frontendTimelineData = [
  {
    id: 1,
    title: "프론트엔드 입문",
    period: "2025년 2월",
    description: "인프런 한입 리액트 강의를 완강하며 웹 개발에 처음 입문했고,\nReact의 기초부터 실전까지 학습했습니다.",
  },
  {
    id: 2,
    title: "ISSUE ONE (🥇대상 수상)",
    period: "2025년 3월 ~ 6월",
    description: "강의에서 벗어나, 백지 위에 제가 만들고 싶은걸 만든 첫 프로젝트였습니다.",
  },
  {
    id: 3,
    title: "쉼표, 무더위 쉼터 지도",
    period: "2025년 8월 ~ 11월",
    description: "React Native를 활용한 첫 앱 개발 프로젝트로, 사용자 경험(UX)에 대해 많은 것을 배웠습니다.",
  },
  {
    id: 4,
    title: "MakerFaire 부스 페이지",
    period: "2025년 9월",
    description: "실제로 사용되는 서비스를 처음으로 만들어본 프로젝트였습니다.",
  },
  {
    id: 5,
    title: "돈가스 지도",
    period: "2025년 11월 ~ 운영중",
    description: "1인 개발로 앱을 출시하고 운영하며, 사용자들의 편의를 위해 항상 고민중입니다.",
  },
  {
    id: 6,
    title: "카츠헌터 X 돈가스지도",
    period: "2026년 1월 ~",
    description: "국내 최고 돈가스 리뷰 전문 인플루언서 '카츠헌터'님과 콜라보하여,\n돈가스 지도를 전국으로 확장해 나가고 있습니다.",
  },
]

// 백엔드 타임라인 데이터
const backendTimelineData = [
  {
    id: 1,
    title: "백엔드 입문",
    period: "2025년 3월",
    description: "멋쟁이사자처럼 인하대 BE 파트로 참여해, Django 기반으로 백엔드 개발에 처음 입문했습니다.",
  },
  {
    id: 2,
    title: "FamiLog",
    period: "2025년 7월",
    description: "처음으로 백엔드 역할을 맡아 실제 프로젝트를 진행했습니다.",
  },
  {
    id: 3,
    title: "SmartWMS (🥈 우수상)",
    period: "2025년 7월 ~ 8월",
    description: "실제 창고 운영 흐름을 비즈니스 로직으로 옮기며, 처음으로 성능 최적화를 고민해본 프로젝트였습니다.",
  },
  {
    id: 4,
    title: "건너건너",
    period: "2025년 8월",
    description: "채팅 기능 구현을 통해 실시간 통신 구조를 이해하고, 아키텍처 분리가 개발 경험에 미치는 영향을 체감한 프로젝트였습니다.",
  },
  {
    id: 5,
    title: "UMC - 인하대 9기 YB",
    period: "2025년 9월 ~",
    description: "인하대 UMC 9기 Node.js Server 파트로 활동하며, TypeScript 기반으로 서버 개발을 학습하고 있습니다.",
  },
  {
    id: 6,
    title: "돈가스 지도",
    period: "2025년 11월 ~ 운영중",
    description: "실사용자에게 안정적인 서비스를 제공하기 위해 문제를 사전예방하는 운영을 처음으로 고민한 프로젝트였습니다.",
  },
  {
    id: 7,
    title: "외주 작업",
    period: "2025년 12월 ~",
    description: "처음으로 받은 외주 작업입니다. 동시 주문이 발생하는 상황을 가정하고, 데이터 정합성과 안정성을 고려한 백엔드 아키텍처를 설계하고 있습니다.",
  },
  {
    id: 8,
    title: "알바로그",
    period: "2026년 1월 ~",
    description: "UMC 프로젝트로 현재 개발 중이며, CodeRabbit을 통해 PR 단위의 코드 리뷰 자동화를 실험·적용하고 있습니다.",
  },
]

// 공간정보 타임라인 데이터
const gisTimelineData = [
  {
    id: 1,
    title: "공간정보공학과 입학",
    period: "2021년 3월",
    description: "위치기반 IT 분야에 관심을 가지고 인하대학교 공간정보공학과에 입학하게 되었습니다.",
  },
  {
    id: 2,
    title: "QGIS 프로젝트\n도로–건축물 이격거리 공간분석",
    period: "2024년 6월",
    description: "건축법 이격거리 규정을 실제 공간데이터에 적용해 도로–건축물 관계를 GIS 분석으로 검증한 공간정보 프로젝트",
  },
  // {
  //   id: 3,
  //   title: "2024 한이음 ICT 멘토링 프로젝트",
  //   period: "2024년 04월",
  //   description: "공간정보 기술(SLAM)로 실내 환경을 인식하고 해석하는 과정이 임베디드 시스템과 결합될 때 어떤 가능성이 있는지를 탐색해본 경험이었습니다.",
  // },
  // {
  //   id: 4,
  //   title: "대국민 디지털 트윈 아이디어 공모전",
  //   period: "2024년 9월",
  //   description: "해양 쓰레기 문제를 결과가 아닌 원인 관점에서 공간적으로 재해석하며, 디지털 트윈의 가능성과 한계를 함께 고민해본 프로젝트였습니다.",
  // },
  {
    id: 3,
    title: "제6회 공간정보 활용 경진대회 최우수상 수상 🥇",
    period: "2024년 10월",
    description: "공간정보를 활용해 응급 상황에서 실제로 도움이 될 수 있는 서비스를 구상하면서 공간정보 기술이 사람의 삶과 직접 맞닿아 있다는 점을 처음으로 실감하게 되었습니다.",
  },
  {
    id: 4,
    title: "농어촌 디지털 트윈 서비스 아이디어 경진대회\n장려상 수상🥉",
    period: "2024년 10월",
    description: "농촌 고령층의 일상과 디지털 환경을 고민하며, 디지털 트윈 기술이 지역과 세대의 간극을 줄이는 데 어떻게 쓰일 수 있는지를 구체적으로 고민해본 경험이었습니다.",
  },
  {
    id: 5,
    title: "RTAP2U 활용\nRTCM 버전별 측위 성능 비교 검증",
    period: "2024년 10~12월",
    description: "RTCM 3.1과 3.2 버전의 측위 데이터를 수집하고, 정밀도와 정확도 분석을 통해 멀티 GNSS의 신뢰성을 검증한 GPS/GNSS 정밀 측위 분석 프로젝트",
  },
  {
    id: 6,
    title: "ArcGIS 프로젝트\n폐기물 매립지 적지 선정",
    period: "2025년 5월",
    description: "AHP 기반 Map Algebra를 활용해 환경·사회·지형 요인을 통합한 폐기물 매립지 적지 선정 프로젝트",
  },
  {
    id: 7,
    title: "공간분석 프로젝트\n플리마켓 입지 적합성 분석",
    period: "2025년 6월",
    description: "생활인구·교통 데이터를 활용해 플리마켓 최적 입지를 분석하고, 사물주소 체계를 결합해 운영과 안내까지 연결한 공간분석 프로젝트",
  },
  // {
  //   id: 7,
  //   title: "시민체감 수원형 도시안전 서비스 아이디어톤",
  //   period: "2024년 10월",
  //   description: "공간정보를 활용해 도시 범죄 문제를 '사건'이 아닌 '공간 패턴'으로 바라보며, 도시 안전 서비스의 가능성을 고민해본 프로젝트였습니다.",
  // },
  // {
  //   id: 8,
  //   title: "제7회 서울특별시 드론 활용 경진대회",
  //   period: "2024년 11월",
  //   description: "병해충 문제를 공간 데이터로 재해석하며, 드론과 GIS를 결합한 정밀 방제의 가능성과 한계를 함께 고민해본 프로젝트였습니다.",
  // },
]

// 인공지능 타임라인 데이터
const aiTimelineData = [
  {
    id: 1,
    title: "CNN 기반 패션 이미지 분류 및 스타일 선호 예측",
    period: "2024.09 ~ 2024.10",
    description: "인공지능을 처음 접한 프로젝트로, 학습이 성립되기까지의 과정에서 전처리와 학습 전략의 중요성을 체감하며 인공지능에 흥미를 느끼게 된 경험이었습니다.",
  },
  {
    id: 2,
    title: "인공지능공학과 복수전공 시작",
    period: "2025-1학기 ~",
    description: "데이터 크리에이터 프로젝트를 계기로 인공지능에 대한 흥미가 생겨, 인공지능공학과 복수전공을 선택하게 되었습니다.",
  },
  {
    id: 3,
    title: "KT 대학생 IT 서포터즈 2기 부팀장",
    period: "~ 2025.03",
    description: "도서산간 중학생을 대상으로 AI 코딩 교육 봉사를 진행하며, 로봇을 활용한 게임형 커리큘럼과 블록 코딩 기반 모델 학습 과정을 직접 설계·운영했습니다.",
  },
  {
    id: 4,
    title: "LLaMA 3.2 Fine-tuning 프로젝트",
    period: "2025.12",
    description: "자연어처리 과목을 통해 배운 내용을 바탕으로, 서비스에 활용 가능한 인공지능에 관심을 갖고 진행한 프로젝트입니다.",
  },
  {
    id: 5,
    title: "현재 최대 관심사 = AI 활용 !!",
    period: "2025 ~",
    description: "AI를 적재적소에 도입해 서비스 가치를 높이고 개발 생산성을 극대화하는 방법에 관심이 많습니다.",
  },
]

// 섹션별 애니메이션을 위한 커스텀 훅
const useScrollAnimation = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px 0px 0px",
      },
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const observeElement = (element: HTMLElement | null) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element)
    }
  }

  return { visibleSections, observeElement }
}

export default function Portfolio() {
  const [hasMounted, setHasMounted] = useState(false);
  const { visibleSections, observeElement } = useScrollAnimation()
  const [activeTab, setActiveTab] = useState<'timeline' | 'projects'>('timeline');

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // 이미지 프리로드 후 모달 열기 함수 (여러 이미지 지원)
  const openModalWithImagePreload = (imageSrc: string | string[], modalName: string) => {
    const images = Array.isArray(imageSrc) ? imageSrc : [imageSrc];
    let loadedCount = 0;
    let modalOpened = false;

    const openModal = () => {
      if (!modalOpened) {
        modalOpened = true;
        setActiveModal(modalName);
      }
    };

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          openModal();
        }
      };
      // 이미지가 이미 캐시되어 있는 경우
      if (img.complete) {
        loadedCount++;
        if (loadedCount === images.length) {
          openModal();
        }
      }
    });
  };

  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    // 브라우저의 자동 스크롤 복원 비활성화
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 강제로 최상단으로 스크롤
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 상태 초기화
    setHasMounted(true);
  }, []);


  const getTypeIcon = (type: string) => {
    switch (type) {
      case "award":
        return <Award className="w-5 h-5" />
      case "activity":
        return <Users className="w-5 h-5" />
      case "education":
        return <Code className="w-5 h-5" />
      case "development":
        return <Wrench className="w-5 h-5" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "award":
        return "bg-yellow-500"
      case "activity":
        return "bg-green-500"
      case "education":
        return "bg-blue-500"
      case "development":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "award":
        return "bg-yellow-100 text-yellow-800"
      case "activity":
        return "bg-green-100 text-green-800"
      case "education":
        return "bg-blue-100 text-blue-800"
      case "development":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "award":
        return "수상"
      case "activity":
        return "활동"
      case "education":
        return "교육"
      case "development":
        return "개발"
      default:
        return "기타"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">완료</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">진행중</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">기타</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div>
            <h1 className="typewriter-h1"><span className="typewriter-1"></span></h1>
            <h2 className="typewriter-h2"><span className="typewriter-2"></span></h2>

            <div className="slide-in-container">
              <p className="slide-in-left">
                  떠오른 발상을 실제 동작하는 서비스로 빚어내는 이 과정이<br/>
                  너무나도 재미있어 개발자의 길을 선택했습니다.
              </p>
              <p className="slide-in-right">
                  <span className="text-blue-600 font-bold">백엔드 개발</span>을 집중적으로 공부하고 있으며,<br/>
                  프론트엔드와 웹디자인도 맡아가며 역량을 넓히고 있습니다.
              </p>
            </div>
        </div>
      </section>

      {/* Navigation Links - Sticky */}
      <div className="w-full flex justify-center sticky top-6 z-50 -mt-20 pb-12">
        <div className="bg-gray-200/40 backdrop-blur-md border border-gray-300/30 rounded-full shadow-lg px-6 py-3">
          <div className="flex gap-8 md:gap-10 text-sm md:text-base font-medium">
            <a href="#about" className="text-gray-800 hover:text-gray-900 transition flex items-center gap-2">
                <User className="w-5 h-5" /> 소개
            </a>
            <a href="#skills" className="text-gray-800 hover:text-gray-900 transition flex items-center gap-2">
                <Code className="w-5 h-5" /> 기술
            </a>
            <a href="#experience" className="text-gray-800 hover:text-gray-900 transition flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> 경험
            </a>
            <a href="#contact" className="text-gray-800 hover:text-gray-900 transition flex items-center gap-2">
                <Mail className="w-5 h-5" /> 문의
            </a>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <section id="about" className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 md:mb-24">
            <h2 className="flex items-center gap-x-4 text-4xl md:text-5xl font-bold text-gray-900">
              <User className="w-8 h-8 md:w-10 md:h-10 text-blue-600" /> 소개
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500 font-medium">이름</p>
                <p className="text-sm md:text-base font-semibold text-gray-900">김진</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Cake className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500 font-medium">생년월일</p>
                <p className="text-sm md:text-base font-semibold text-gray-900">01.03.20</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500 font-medium">위치</p>
                <p className="text-sm md:text-base font-semibold text-gray-900">인천광역시</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500 font-medium">연락처</p>
                <p className="text-sm md:text-base font-semibold text-gray-900">010-8948-3847</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-gray-500 font-medium">이메일</p>
                <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 break-all">rlawls1448@naver.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 md:col-span-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-none">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div className="pt-3">
                <p className="text-sm text-gray-500 font-medium">학력</p>
                <p className="text-sm md:text-base font-semibold text-gray-900">인하대학교 재학</p>
                <p className="text-xs md:text-sm text-gray-500">(주) 공간정보공학과 / (복) 인공지능공학과</p>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4 pt-16">
            <div className="flex flex-col items-center flex-none"> {/* 아이콘 박스와 텍스트를 세로로 정렬 */}
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center"> {/* 크기 더 키우고 */}
                <FaHandFist className="w-10 h-10 text-blue-600" /> {/* 아이콘 크기 더 키우고 */}
              </div>
              <p className="text-sm text-gray-500 font-medium mt-2">좌우명</p> {/* 아이콘 아래로 텍스트 이동 */}
            </div>
            <div className="mt-[-0.5rem]"> {/* 음수 마진으로 위로 올리기 */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                "시작이 반이다 🔥"
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                어떤 일이든 시작이 가장 어렵고도 중요한 순간이라고 믿습니다.<br></br>
                비록 서툴더라도, 시작이 있어야 배움과 성장이 따라온다고 생각합니다.<br></br>
                그래서 저는 완벽한 준비보단, 먼저 움직이는 사람이고자 합니다.
              </p>
            </div>
          </div>

          {/* 회고록 모음 섹션 */}
          <div className="pt-20">
            <div className="flex items-center gap-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">회고록 모음</h3>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                5년간 블로그를 꾸준히 운영하며 생각과 경험을 기록해왔습니다.<br />
                군 생활 동안에도 하루도 빠짐없이 일기를 쓸 정도로 기록에 진심입니다.<br />
                이 글들은 저라는 사람을 그대로 담아낸 기록입니다.
              </p>

              <a
                href="https://blog.naver.com/rlawls1448"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-blue-600 hover:text-blue-700 font-medium border border-blue-200 hover:border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors shrink-0"
              >
                <span>블로그 방문하기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="infinite-scroll-container">
              <div className="infinite-scroll-track">
                {/* 첫 번째 세트 */}
                <a href="https://blog.naver.com/rlawls1448/224132285494" target="_blank" rel="noopener noreferrer" className="memoir-card">
                  <img src="/projects/2025-2.png" alt="2025-2학기 회고록" className="memoir-card-image" />
                  <div className="memoir-card-content">
                    <p className="memoir-card-title">2025-2학기 회고록</p>
                    <p className="memoir-card-subtitle">성장과 도전의 기록</p>
                  </div>
                  <div className="memoir-card-arrow">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>

                <a href="https://blog.naver.com/rlawls1448/224005262527" target="_blank" rel="noopener noreferrer" className="memoir-card">
                  <img src="/projects/2025-summer.png" alt="2025 여름방학 회고록" className="memoir-card-image" />
                  <div className="memoir-card-content">
                    <p className="memoir-card-title">2025 여름방학 회고록</p>
                    <p className="memoir-card-subtitle">뜨거운 여름의 성장기</p>
                  </div>
                  <div className="memoir-card-arrow">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>

                <a href="https://blog.naver.com/rlawls1448/223927328023" target="_blank" rel="noopener noreferrer" className="memoir-card">
                  <img src="/projects/2025-1.png" alt="2025-1학기 회고록" className="memoir-card-image" />
                  <div className="memoir-card-content">
                    <p className="memoir-card-title">2025-1학기 회고록</p>
                    <p className="memoir-card-subtitle">새로운 시작의 기록</p>
                  </div>
                  <div className="memoir-card-arrow">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>

                <a href="https://blog.naver.com/rlawls1448/223785118853" target="_blank" rel="noopener noreferrer" className="memoir-card">
                  <img src="/projects/2024.png" alt="2024년 회고록" className="memoir-card-image" />
                  <div className="memoir-card-content">
                    <p className="memoir-card-title">2024년 회고록</p>
                    <p className="memoir-card-subtitle">한 해를 돌아보며</p>
                  </div>
                  <div className="memoir-card-arrow">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>

                {/* 두 번째 세트 (무한 루프를 위한 복제) */}
                <a href="https://blog.naver.com/rlawls1448/224132285494" target="_blank" rel="noopener noreferrer" className="memoir-card">
                  <img src="/projects/2025-2.png" alt="2025-2학기 회고록" className="memoir-card-image" />
                  <div className="memoir-card-content">
                    <p className="memoir-card-title">2025-2학기 회고록</p>
                    <p className="memoir-card-subtitle">성장과 도전의 기록</p>
                  </div>
                  <div className="memoir-card-arrow">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>

                <a href="https://blog.naver.com/rlawls1448/224005262527" target="_blank" rel="noopener noreferrer" className="memoir-card">
                  <img src="/projects/2025-summer.png" alt="2025 여름방학 회고록" className="memoir-card-image" />
                  <div className="memoir-card-content">
                    <p className="memoir-card-title">2025 여름방학 회고록</p>
                    <p className="memoir-card-subtitle">뜨거운 여름의 성장기</p>
                  </div>
                  <div className="memoir-card-arrow">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>

                <a href="https://blog.naver.com/rlawls1448/223927328023" target="_blank" rel="noopener noreferrer" className="memoir-card">
                  <img src="/projects/2025-1.png" alt="2025-1학기 회고록" className="memoir-card-image" />
                  <div className="memoir-card-content">
                    <p className="memoir-card-title">2025-1학기 회고록</p>
                    <p className="memoir-card-subtitle">새로운 시작의 기록</p>
                  </div>
                  <div className="memoir-card-arrow">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>

                <a href="https://blog.naver.com/rlawls1448/223785118853" target="_blank" rel="noopener noreferrer" className="memoir-card">
                  <img src="/projects/2024.png" alt="2024년 회고록" className="memoir-card-image" />
                  <div className="memoir-card-content">
                    <p className="memoir-card-title">2024년 회고록</p>
                    <p className="memoir-card-subtitle">한 해를 돌아보며</p>
                  </div>
                  <div className="memoir-card-arrow">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="flex items-center gap-x-4 text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              <Code className="w-8 h-8 md:w-10 md:h-10 text-blue-600" /> 기술
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-left mb-12 mt-12">
              <strong>매일 새로운 것을 배우는 재미</strong>에 푹 빠져 열심히 성장 중입니다!<br></br>
              궁극적으로는.. 특정 기술에 얽매이지 않고,<br></br> 혼자서도 뭐든 뚝딱 만들어낼 수 있는 <strong className="text-blue-600">풀스택 역량</strong>을 손에 넣고 싶습니다. <br></br>
              이 막연하지만 소중한 목표가 저를 나아가게 하는 가장 큰 원동력입니다.
            </p>
          </div>

          {/* 핵심 역량 */}
          <div className="max-w-4xl mx-auto py-20">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">핵심 역량</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 열정 */}
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 bg-white border-2 border-blue-100 rounded-full flex flex-col items-center justify-center">
                  <Flame className="w-14 h-14 text-blue-600 mb-2" />
                  <span className="text-base font-bold text-gray-900">열정</span>
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed text-left">
                  만들고 배우는 과정 자체에서 즐거움을 느낍니다.<br></br>
                  필요한 기술이라면 스택을 가리지 않고 학습하고 적용해왔습니다.
                </p>
              </div>

              {/* 소통 */}
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 bg-white border-2 border-blue-100 rounded-full flex flex-col items-center justify-center">
                  <MessageCircle className="w-14 h-14 text-blue-600 mb-2" />
                  <span className="text-base font-bold text-gray-900">소통</span>
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed text-left">
                  다양한 활동과 프로젝트에서 팀장을 맡아 협업을 이끌어왔습니다.<br></br>
                  의견을 조율하고 팀의 방향을 맞추는 소통에 익숙합니다.
                </p>
              </div>

              {/* 기록 */}
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 bg-white border-2 border-blue-100 rounded-full flex flex-col items-center justify-center">
                  <FileText className="w-14 h-14 text-blue-600 mb-2" />
                  <span className="text-base font-bold text-gray-900">기록</span>
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed text-left">
                  개발 과정과 배운 내용을 꾸준히 기록하며 스스로를 점검합니다.<br></br>
                  약 5년간 블로그를 운영하며, 기록을 습관으로 유지해왔습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 기술 스택 소제목 */}
          <div className="max-w-4xl mx-auto mt-16 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">기술 스택</h3>
          </div>

                    {/* Box 1: 프론트엔드 & 백엔드 */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">프론트엔드</h3>
                          <div className="flex flex-wrap gap-2">
                            <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
                            <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/>
                            <img src="https://img.shields.io/badge/React%20Native-20B2AA?style=for-the-badge&logo=react&logoColor=white"/>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">백엔드</h3>
                          <div className="flex flex-wrap gap-2">
                            <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>
                            <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"/>
                            <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
                            <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white"/>
                          </div>
                        </div>
                      </div>
                    </div>
          
                    {/* 설명 문단 */}
                                                  <div className="max-w-3xl mx-auto">
                                                    <p className="text-gray-700 text-xs md:text-sm leading-relaxed text-left mb-12">
                                                      <strong>프론트엔드와 백엔드</strong>를 모두 경험하며, 화면부터 서버·데이터 흐름까지 <strong>전체 구조를 이해하고 개발합니다.</strong><br></br>
                                                      React 기반 UI 구현뿐 아니라 <strong>API 설계와 서버 개발</strong> 경험이 있으며,
                                                      기획 요구사항을 기술 구조로 옮기는 과정에 익숙합니다.<br></br>
                                                      현재는 <strong>TypeScript 기반의 Node.js 백엔드 개발</strong>에 집중하며 역량을 확장하고 있습니다.
                                                    </p>
                                                  </div>          {/* Box 2: 인프라 & 협업 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">인프라 & 플랫폼</h3>
                <div className="flex flex-wrap gap-2">
                  <img src="https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazon%20aws&logoColor=white"/>
                  <img src="https://img.shields.io/badge/Google%20Cloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white"/>
                  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
                  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
                  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"/>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">개발 & 테스트 도구</h3>
                <div className="flex flex-wrap gap-2">
                  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/>
                  <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"/>
                  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
                  <img src="https://img.shields.io/badge/Postman-EF5B25?style=for-the-badge&logo=postman&logoColor=white"/>
                  <img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white"/>
                </div>
              </div>
            </div>
          </div>

          {/* 설명 문단 2 */}
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 text-xs md:text-sm leading-relaxed text-left mb-12">
              사용자가 <strong>안정적이고 편리하게 서비스를 이용할 수 있는 환경</strong>을 고민합니다. <br></br>
              <strong>로그와 모니터링 도구</strong>를 활용해 서비스 상태를 파악하고, 문제 상황을 <strong>빠르게 인지하고 대응</strong>하려 노력합니다. <br></br>
              서비스 성능과 확장성을 고려해 <strong>캐시·세션</strong> 등 인프라 구성 요소를 설계하고 개선하는 데에도 관심을 두고 있습니다.<br></br>
              <strong>테스트 자동화</strong>를 기반으로 변경 사항을 검증하며, 안정적인 운영을 위해 문제를 예방하는 개발을 지향합니다.
            </p>
          </div>

          {/* Box 3: 데이터베이스 & 공간정보 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">데이터베이스</h3>
                          <div className="flex flex-wrap gap-2">
                            <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white"/>
                            <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white"/>
                            <img src="https://img.shields.io/badge/MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white"/>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">공간정보</h3>
                          <div className="flex flex-wrap gap-2">
                            <img src="https://img.shields.io/badge/QGIS-589632?style=for-the-badge&logo=qgis&logoColor=white"/>
                            <img src="https://img.shields.io/badge/ArcGIS-2C7AC3?style=for-the-badge&logo=arcgis&logoColor=white"/>
                            <img src="https://img.shields.io/badge/PostGIS-336791?style=for-the-badge&logo=postgresql&logoColor=white"/>
                          </div>
                        </div>
                      </div>
                              </div>
                    
                              {/* 설명 문단 3 */}
                              <div className="max-w-3xl mx-auto">
                                <p className="text-gray-700 text-xs md:text-sm leading-relaxed text-left mb-12 mt-12">
                                  <strong>공간 데이터</strong>를 활용해 <strong>위치 기반 맥락</strong>을 서비스 기능에 반영할 수 있습니다.<br></br>
                                  <strong>지도·좌표 정보와 사용자 행동</strong>을 연결해, 실제 사용 상황에 맞는 기능을 설계합니다.<br></br>
                                  <strong>공간정보</strong>를 단순한 데이터가 아닌, <strong>사용자 경험을 확장하는 요소</strong>로 활용합니다.
                                </p>
                              </div>
                    
                                      </div>
      </section>

      {/* Experience Section (Timeline + Projects) */}
      <section id="experience" className="py-32 px-6 bg-white" ref={observeElement}>
        <div className="max-w-4xl mx-auto">
          <h2 className="flex items-center gap-x-4 text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-blue-600" /> 경험
          </h2>

          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-left mb-12">
              <strong>기술</strong>은 결국 <strong>사람</strong>을 향해야 한다고 생각합니다.<br></br>
              <strong>사람들</strong>의 일상에 실제로 도움이 되는 <strong className="text-blue-600">가치</strong>를 만들어내고 싶습니다.
              <br></br><br></br>
              그래서 그 가치를 사람들에게 닿는 형태로 직접 구현해보고 싶었고,<br></br>
              그 과정에서 자연스럽게 <strong>개발</strong>을 시작하게 되었습니다.
            </p>
          </div>

          {/* 개발 타임라인 소제목 */}
          <div className="max-w-4xl mx-auto mt-36 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">개발 타임라인</h3>
          </div>

          {/* 프론트엔드/백엔드 타임라인 */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* 프론트엔드 타임라인 */}
            <div>
              <h3 className="text-xl font-bold mb-4 mt-2 text-center">
                <span className="border-[3.5px] border-blue-500 text-blue-500 rounded-full px-6 py-2 inline-block">프론트엔드</span>
              </h3>
              <div className="p-4">
                {frontendTimelineData.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative"
                    style={{
                      padding: index % 2 === 0 ? '20px 0 20px 20px' : '20px 20px 20px 0',
                      maxWidth: '350px',
                    }}
                  >
                    {/* 간단한 반원형 border */}
                    <div
                      className={`
                        absolute pointer-events-none -top-0.5 -bottom-0
                        ${index % 2 === 0
                          ? 'border-l-[3px] border-t-[3px] border-b-[3px] rounded-tl-[30px] rounded-bl-[30px] left-0 w-1/2'
                          : 'border-r-[3px] border-t-[3px] border-b-[3px] rounded-tr-[30px] rounded-br-[30px] right-0 w-1/2'
                        }
                        border-blue-500
                      `}
                    ></div>

                    {/* 첫 번째 카드 위로 곡선 */}
                    {index === 0 && (
                      <div className="absolute right-[41%] -top-[35.1px] w-12 h-9 border-r-[3.1px] border-b-[3px] border-blue-500 rounded-br-[30px]"></div>
                    )}

                    {/* 방향 아이콘 */}
                    {index !== frontendTimelineData.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-6 h-6 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center z-10">
                        <ChevronDown className="w-3 h-3 text-blue-500" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                      </div>
                    )}

                    {/* 진행중 아이콘 */}
                    {index === frontendTimelineData.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-7 h-7 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center z-10">
                        <Loader2 className="w-4 h-4 text-blue-500 animate-[spin_3s_linear_infinite]" strokeWidth={3} />
                      </div>
                    )}

                    {/* 카드 */}
                    <div className="bg-white rounded-lg p-4 relative shadow-sm border border-gray-200">
                      {/* 점 - 카드 왼쪽/오른쪽 중간에 배치 */}
                      <span
                        className="absolute w-2.5 h-2.5 bg-white rounded-full border-2 border-blue-500"
                        style={{
                          [index % 2 === 0 ? 'left' : 'right']: '-24.5px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      ></span>

                                              {item.id === 2 ? (
                                                <div className="flex justify-between items-start mb-3">
                                                  <div className="flex-1 pr-3">
                                                    <h4 className="text-sm font-bold text-blue-600 mb-1">
                                                      {item.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                                                    <p className="text-xs text-gray-700">{item.description}</p>
                                                  </div>
                                                  <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ml-3 bg-gray-100 flex items-center justify-center border border-gray-300">
                                                    <img
                                                      src="/projects/ISSUE_ONE.png"
                                                      alt="ISSUE ONE"
                                                      className="w-full h-full object-contain"
                                                    />
                                                  </div>
                                                </div>
                                              ) : item.id === 3 ? (
                                                <div className="flex justify-between items-start mb-3">
                                                  <div className="flex-1 pr-3">
                                                    <h4 className="text-sm font-bold text-blue-600 mb-1">
                                                      {item.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                                                    <p className="text-xs text-gray-700">{item.description}</p>
                                                  </div>
                                                  <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ml-3 bg-gray-100 flex items-center justify-center border border-gray-300">
                                                    <img
                                                      src="/projects/shympyo.png"
                                                      alt="무더위 쉼터: 쉼표"
                                                      className="w-full h-full object-contain"
                                                    />
                                                  </div>
                                                </div>
                                              ) : item.id === 4 ? (
                                                <div className="flex justify-between items-start mb-3">
                                                  <div className="flex-1 pr-3">
                                                    <h4 className="text-sm font-bold text-blue-600 mb-1">
                                                      {item.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                                                    <p className="text-xs text-gray-700">{item.description}</p>
                                                  </div>
                                                  <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ml-3 bg-gray-100 flex items-center justify-center border border-gray-300">
                                                    <img
                                                      src="/projects/makerFaire.png"
                                                      alt="메이커페어 2025 - 부스 페이지"
                                                      className="w-full h-full object-contain"
                                                    />
                                                  </div>
                                                </div>
                                              ) : item.id === 5 ? (
                                                <div className="flex justify-between items-start mb-3">
                                                  <div className="flex-1 pr-3">
                                                    <h4 className="text-sm font-bold text-blue-600 mb-1">
                                                      {item.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                                                    <p className="text-xs text-gray-700">{item.description}</p>
                                                  </div>
                                                  <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ml-3 bg-gray-100 flex items-center justify-center border border-gray-300">
                                                    <img
                                                      src="/projects/KatsuMap.png"
                                                      alt="돈가스 지도"
                                                      className="w-full h-full object-contain"
                                                    />
                                                  </div>
                                                </div>
                                              ) : item.id === 6 ? (
                                                <div className="flex justify-between items-start mb-3">
                                                  <div className="flex-1 pr-3">
                                                    <h4 className="text-sm font-bold text-blue-600 mb-1">
                                                      {item.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                                                    <p className="text-xs text-gray-700">{item.description}</p>
                                                  </div>
                                                  <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ml-3 bg-white flex items-center justify-center border border-gray-300">
                                                    <img
                                                      src="/projects/katz_hunter_logo.svg"
                                                      alt="카츠헌터 X 돈가스지도"
                                                      className="w-full h-full object-contain"
                                                    />
                                                  </div>
                                                </div>
                                              ) : (
                                                <>
                                                  <h4 className="text-sm font-bold text-blue-600 mb-1">
                                                    {item.title}
                                                  </h4>
                                                  <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                                                  <p className="text-xs text-gray-700">{item.description}</p>
                                                </>
                                              )}
                      {/* ISSUE ONE 프로젝트 자세히 보기 버튼 */}
                      {item.id === 2 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/Issue_one_detail.png', 'issueOne')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 무더위 쉼터: 쉼표 프로젝트 자세히 보기 버튼 */}
                      {item.id === 3 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/shympyo_detail.png', 'shympyo')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 메이커페어 2025: 부스 페이지 자세히 보기 버튼 */}
                      {item.id === 4 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/makerFaire_detail.png', 'makerFaire')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 돈가스 지도 프로젝트 자세히 보기 버튼 */}
                      {item.id === 5 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/KatsuMap_detail.png', 'katsuMap')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 카츠헌터 X 돈가스지도 자세히 보기 버튼 */}
                      {item.id === 6 && (
                        <a
                          href="https://www.instagram.com/katz_hunter/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors block text-center"
                        >
                          자세히 보기
                        </a>
                      )}
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* 백엔드 타임라인 */}
            <div>
              <h3 className="text-xl font-bold mb-4 mt-2 text-center">
                <span className="border-[3.5px] border-green-500 text-green-500 rounded-full px-6 py-2 inline-block">백엔드</span>
              </h3>
              <div className="p-4">
                {backendTimelineData.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative"
                    style={{
                      padding: index % 2 === 0 ? '20px 0 20px 20px' : '20px 20px 20px 0',
                      maxWidth: '350px',
                    }}
                  >
                    {/* 간단한 반원형 border */}
                    <div
                      className={`
                        absolute pointer-events-none -top-0.5 -bottom-0
                        ${index % 2 === 0
                          ? 'border-l-[3px] border-t-[3px] border-b-[3px] rounded-tl-[30px] rounded-bl-[30px] left-0 w-1/2'
                          : 'border-r-[3px] border-t-[3px] border-b-[3px] rounded-tr-[30px] rounded-br-[30px] right-0 w-1/2'
                        }
                        border-green-500
                      `}
                    ></div>

                    {/* 첫 번째 카드 위로 곡선 */}
                    {index === 0 && (
                      <div className="absolute right-[42%] -top-[35.1px] w-12 h-9 border-r-[3.1px] border-b-[3px] border-green-500 rounded-br-[30px]"></div>
                    )}

                    {/* 방향 아이콘 */}
                    {index !== backendTimelineData.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-6 h-6 bg-white border-2 border-green-500 rounded-full flex items-center justify-center z-10">
                        <ChevronDown className="w-3 h-3 text-green-500" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                      </div>
                    )}

                    {/* 진행중 아이콘 */}
                    {index === backendTimelineData.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-7 h-7 bg-white border-2 border-green-500 rounded-full flex items-center justify-center z-10">
                        <Loader2 className="w-4 h-4 text-green-500 animate-[spin_3s_linear_infinite]" strokeWidth={3} />
                      </div>
                    )}

                    {/* 카드 */}
                    <div className="bg-white rounded-lg p-4 relative shadow-sm border border-gray-200">
                      {/* 점 - 카드 왼쪽/오른쪽 중간에 배치 */}
                      <span
                        className="absolute w-2.5 h-2.5 bg-white rounded-full border-2 border-green-500"
                        style={{
                          [index % 2 === 0 ? 'left' : 'right']: '-24.5px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      ></span>

                      {item.id === 2 ? (
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 pr-3">
                            <h4 className="text-sm font-bold text-green-600 mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                            <p className="text-xs text-gray-700">{item.description}</p>
                          </div>
                          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ml-3 bg-gray-100 flex items-center justify-center border border-gray-300">
                            <img
                              src="/projects/FamiLog.png"
                              alt="FamiLog"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      ) : item.id === 3 ? (
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 pr-3">
                            <h4 className="text-sm font-bold text-green-600 mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                            <p className="text-xs text-gray-700">{item.description}</p>
                          </div>
                          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ml-3 bg-gray-100 flex items-center justify-center border border-gray-300">
                            <img
                              src="/projects/SmartWMS.png"
                              alt="SmartWMS"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      ) : item.id === 4 ? (
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 pr-3">
                            <h4 className="text-sm font-bold text-green-600 mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                            <p className="text-xs text-gray-700">{item.description}</p>
                          </div>
                          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ml-3 bg-gray-100 flex items-center justify-center border border-gray-300">
                            <img
                              src="/GnGn.png"
                              alt="건너건너"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      ) : item.id === 5 ? (
                        <>
                          <h4 className="text-sm font-bold text-green-600 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                          <p className="text-xs text-gray-700">{item.description}</p>
                        </>
                      ) : item.id === 6 ? (
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 pr-3">
                            <h4 className="text-sm font-bold text-green-600 mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                            <p className="text-xs text-gray-700">{item.description}</p>
                          </div>
                          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ml-3 bg-gray-100 flex items-center justify-center border border-gray-300">
                            <img
                              src="/projects/KatsuMap.png"
                              alt="돈가스 지도"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      ) : item.id === 7 ? (
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 pr-3">
                            <h4 className="text-sm font-bold text-green-600 mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                            <p className="text-xs text-gray-700">{item.description}</p>
                          </div>
                          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ml-3 bg-gray-100 flex items-center justify-center border border-gray-300">
                            <img
                              src="/projects/Trad.png"
                              alt="외주 작업"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      ) : item.id === 8 ? (
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 pr-3">
                            <h4 className="text-sm font-bold text-green-600 mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                            <p className="text-xs text-gray-700">{item.description}</p>
                          </div>
                          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ml-3 bg-gray-100 flex items-center justify-center border border-gray-300">
                            <img
                              src="/projects/albaLog.png"
                              alt="알바로그"
                              className="w-full h-full object-cover scale-145"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="text-sm font-bold text-green-600 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                          <p className="text-xs text-gray-700">{item.description}</p>
                        </>
                      )}
                      {/* FamiLog 자세히 보기 버튼 */}
                      {item.id === 2 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/FamiLog_detail.png', 'famiLog')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-green-600 border border-green-500 rounded-lg hover:bg-green-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* SmartWMS 자세히 보기 버튼 */}
                      {item.id === 3 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/SmartWMS_detail.png', 'smartWMS')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-green-600 border border-green-500 rounded-lg hover:bg-green-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 건너건너 자세히 보기 버튼 */}
                      {item.id === 4 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/GNGN_detail.png', 'geonneoGeonnoe')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-green-600 border border-green-500 rounded-lg hover:bg-green-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 돈가스 지도 자세히 보기 버튼 */}
                      {item.id === 6 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/KatsuMap_detail.png', 'katsuMapBackend')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-green-600 border border-green-500 rounded-lg hover:bg-green-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 외주 작업 자세히 보기 버튼 */}
                      {item.id === 7 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/tradlab_detail.png', 'trad')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-green-600 border border-green-500 rounded-lg hover:bg-green-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 알바로그 자세히 보기 버튼 */}
                      {item.id === 8 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/albaLog.png', 'albaLog')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-green-600 border border-green-500 rounded-lg hover:bg-green-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 공간정보/인공지능 타임라인 */}
          <div className="max-w-4xl mx-auto mt-16 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">도메인 타임라인</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-4 mt-2 text-center">
                <span className="border-[3.5px] border-purple-500 text-purple-500 rounded-full px-6 py-2 inline-block">공간정보</span>
              </h3>
              <div className="p-4">
                {gisTimelineData.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative"
                    style={{
                      padding: index % 2 === 0 ? '20px 0 20px 20px' : '20px 20px 20px 0',
                      maxWidth: '350px',
                    }}
                  >
                    <div
                      className={`
                        absolute pointer-events-none -top-0.5 -bottom-0
                        ${index % 2 === 0
                          ? 'border-l-[3px] border-t-[3px] border-b-[3px] rounded-tl-[30px] rounded-bl-[30px] left-0 w-1/2'
                          : 'border-r-[3px] border-t-[3px] border-b-[3px] rounded-tr-[30px] rounded-br-[30px] right-0 w-1/2'
                        }
                        border-purple-500
                      `}
                    ></div>
                    {index === 0 && (
                      <div className="absolute right-[41%] -top-[35.1px] w-12 h-9 border-r-[3.1px] border-b-[3px] border-purple-500 rounded-br-[30px]"></div>
                    )}
                    {index !== gisTimelineData.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-6 h-6 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center z-10">
                        <ChevronDown className="w-3 h-3 text-purple-500" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                      </div>
                    )}
                    {index === gisTimelineData.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-7 h-7 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center z-10">
                        <Loader2 className="w-4 h-4 text-purple-500 animate-[spin_3s_linear_infinite]" strokeWidth={3} />
                      </div>
                    )}
                    <div className="bg-white rounded-lg p-4 relative shadow-sm border border-gray-200">
                      <span
                        className="absolute w-2.5 h-2.5 bg-white rounded-full border-2 border-purple-500"
                        style={{
                          [index % 2 === 0 ? 'left' : 'right']: '-24.5px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      ></span>
                      <h4 className="text-sm font-bold text-purple-600 mb-1 whitespace-pre-line">{item.title}</h4>
                      <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                      <p className="text-xs text-gray-700">{item.description}</p>
                      {/* QGIS 프로젝트 자세히 보기 버튼 */}
                      {item.id === 2 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/qgis.png', 'qgisProject')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* Self Grow 자세히 보기 버튼 - 주석처리 */}
                      {/* {item.id === 3 && (
                        <button
                          onClick={() => setActiveModal('selfGrow')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )} */}
                      {/* 대국민 디지털 트윈 아이디어 공모전 자세히 보기 버튼 - 주석처리 */}
                      {/* {item.id === 4 && (
                        <button
                          onClick={() => setActiveModal('oceanTrash')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )} */}
                      {/* 공간정보 경진대회 자세히 보기 버튼 */}
                      {item.id === 3 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/rescue_route_detail.png', 'rescueRoute')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 농어촌 디지털 트윈 자세히 보기 버튼 */}
                      {item.id === 4 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/digital_twin.png', 'digitalTwin')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* GNSS 측위 성능 비교 자세히 보기 버튼 */}
                      {item.id === 5 && (
                        <button
                          onClick={() => openModalWithImagePreload(['/projects/gps_1.png', '/projects/gps_2.png'], 'gnssProject')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* ArcGIS 폐기물 매립지 자세히 보기 버튼 */}
                      {item.id === 6 && (
                        <button
                          onClick={() => openModalWithImagePreload('/projects/arcgis.png', 'arcgisProject')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 플리마켓 입지 분석 자세히 보기 버튼 */}
                      {item.id === 7 && (
                        <button
                          onClick={() => openModalWithImagePreload(['/projects/fli_1.png', '/projects/fli_2.png'], 'fleamarketProject')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 수원 도시안전 아이디어톤 자세히 보기 버튼 - 주석처리 */}
                      {/* {item.id === 7 && (
                        <button
                          onClick={() => setActiveModal('suwonSafety')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )} */}
                      {/* 드론 활용 경진대회 자세히 보기 버튼 - 주석처리 */}
                      {/* {item.id === 8 && (
                        <button
                          onClick={() => setActiveModal('droneContest')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 mt-2 text-center">
                <span className="border-[3.5px] border-orange-500 text-orange-500 rounded-full px-6 py-2 inline-block">인공지능</span>
              </h3>
              <div className="p-4">
                {aiTimelineData.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative"
                    style={{
                      padding: index % 2 === 0 ? '20px 0 20px 20px' : '20px 20px 20px 0',
                      maxWidth: '350px',
                    }}
                  >
                    <div
                      className={`
                        absolute pointer-events-none -top-0.5 -bottom-0
                        ${index % 2 === 0
                          ? 'border-l-[3px] border-t-[3px] border-b-[3px] rounded-tl-[30px] rounded-bl-[30px] left-0 w-1/2'
                          : 'border-r-[3px] border-t-[3px] border-b-[3px] rounded-tr-[30px] rounded-br-[30px] right-0 w-1/2'
                        }
                        border-orange-500
                      `}
                    ></div>
                    {index === 0 && (
                      <div className="absolute right-[41%] -top-[35.1px] w-12 h-9 border-r-[3.1px] border-b-[3px] border-orange-500 rounded-br-[30px]"></div>
                    )}
                    {index !== aiTimelineData.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-6 h-6 bg-white border-2 border-orange-500 rounded-full flex items-center justify-center z-10">
                        <ChevronDown className="w-3 h-3 text-orange-500" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                      </div>
                    )}
                    {index === aiTimelineData.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-7 h-7 bg-white border-2 border-orange-500 rounded-full flex items-center justify-center z-10">
                        <Loader2 className="w-4 h-4 text-orange-500 animate-[spin_3s_linear_infinite]" strokeWidth={3} />
                      </div>
                    )}
                    <div className="bg-white rounded-lg p-4 relative shadow-sm border border-gray-200">
                      <span
                        className="absolute w-2.5 h-2.5 bg-white rounded-full border-2 border-orange-500"
                        style={{
                          [index % 2 === 0 ? 'left' : 'right']: '-24.5px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      ></span>
                      <h4 className="text-sm font-bold text-orange-600 mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                      <p className="text-xs text-gray-700">{item.description}</p>
                      {/* 데이터 크리에이터 캠프 자세히 보기 버튼 */}
                      {item.id === 1 && (
                        <button
                          onClick={() => setActiveModal('assemble')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-orange-600 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* KT IT 서포터즈 자세히 보기 버튼 */}
                      {item.id === 3 && (
                        <a
                          href="https://www.withdigital.co.kr/kit04_list.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-orange-600 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors block text-center"
                        >
                          자세히 보기
                        </a>
                      )}
                      {/* NSMC LLaMA Fine-tuning 자세히 보기 버튼 */}
                      {item.id === 4 && (
                        <button
                          onClick={() => setActiveModal('nsmc')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-orange-600 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 현재 관심사 자세히 보기 버튼 */}
                      {item.id === 5 && (
                        <button
                          onClick={() => setActiveModal('aiInterest')}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-orange-600 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                        >
                          AI 이렇게 활용해요!
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 성장 이야기 펼치기 버튼 */}
          <div className="text-center mt-16 mb-8">
            <p className="text-gray-500 text-base md:text-lg mb-2">지도 위의 좌표가 AI를 만나 살아있는 서비스가 되는 그날까지,</p>
            <p className="text-gray-500 text-lg md:text-xl mb-8">김진의 여정은 계속됩니다...</p>
            <button
              onClick={() => setIsExperienceExpanded(!isExperienceExpanded)}
              className={`inline-flex items-center gap-2 py-3 text-gray-600 hover:text-blue-600 border-2 border-gray-200 hover:border-blue-400 rounded-full transition-colors ${
                isExperienceExpanded ? 'px-5' : 'pl-12 pr-5'
              }`}
            >
              <span className="text-sm md:text-base font-medium">
                {isExperienceExpanded ? '접기' : '다른 활동도 궁금하신가요?'}
              </span>
              {isExperienceExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          <div className={`transition-[opacity,max-height] duration-300 ease-in-out ${
            isExperienceExpanded ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0 overflow-hidden'
          }`}>
            {isExperienceExpanded && (
            <>
              {/* Tab Buttons */}
              <div className="flex gap-4 mb-12 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`pb-4 px-2 text-base font-medium transition-colors ${
                activeTab === 'timeline'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              경험 ({timelineData.length})
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-4 px-2 text-base font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              프로젝트 ({projectData.length})
            </button>
          </div>

          {/* Timeline Tab Content */}
          {activeTab === 'timeline' && (
            <div>
              <div className="max-w-2xl mx-auto mb-12 px-4">
                                  <p className="text-gray-600 text-left text-xs md:text-sm leading-relaxed">                  
                  {' '}지금까지 제가 몰입해온 활동들을 정리하며,
                  {' '}어떤 태도로 배우고 성장해왔는지 전달하고 싶었습니다.<br></br>
                  {' '}이 타임라인에는 개발뿐 아니라 제가 경험한 다양한 도전과 노력의 흔적을 담았습니다.
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="flex justify-center flex-wrap gap-2 mb-8 px-4">
            <Button
              size="sm"
              variant={!selectedFilter ? "default" : "outline"}
              onClick={() => setSelectedFilter(null)}
              className="rounded-full text-xs md:text-sm"
            >
              All
            </Button>
            <Button
              size="sm"
              variant={selectedFilter === 'award' ? "default" : "outline"}
              onClick={() => setSelectedFilter('award')}
              className="rounded-full text-xs md:text-sm"
            >
              수상
            </Button>
            <Button
              size="sm"
              variant={selectedFilter === 'development' ? "default" : "outline"}
              onClick={() => setSelectedFilter('development')}
              className="rounded-full text-xs md:text-sm"
            >
              개발
            </Button>
            <Button
              size="sm"
              variant={selectedFilter === 'activity' ? "default" : "outline"}
              onClick={() => setSelectedFilter('activity')}
              className="rounded-full text-xs md:text-sm"
            >
              활동
            </Button>
            <Button
              size="sm"
              variant={selectedFilter === 'education' ? "default" : "outline"}
              onClick={() => setSelectedFilter('education')}
              className="rounded-full text-xs md:text-sm"
            >
              교육
            </Button>
          </div>

          {/* Main Timeline */}
          <div className="relative">
            {/* Timeline Cards - 섹션이 보이면 모든 카드가 한번에 나타남 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10 px-2 md:px-0">
              {(
                selectedFilter
                  ? timelineData.filter(item => {
                      if (selectedFilter === 'development') {
                        return item.type === 'development' || item.id === 'smart-wms-project' || item.id === 'mini-project';
                      }
                      return item.type === selectedFilter;
                    })
                  : timelineData
              ).map((item, index) => (
                <div key={item.id} className="relative">
                  <Card
                    className={`bg-white hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-blue-500 h-80 relative transform ${
                      hasMounted && visibleSections.has("experience") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: hasMounted && visibleSections.has("experience") ? `${index * 50}ms` : "0ms",
                    }}
                  >
                    <CardContent className="p-4 md:p-6 h-full flex flex-col">
                      {/* Timeline number in top right corner */}
                      <div className="absolute top-3 right-3 md:top-4 md:right-4 w-7 h-7 md:w-8 md:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                        {item.order}
                      </div>

                      {/* Header */}
                      <div className="flex items-start justify-between mb-3 md:mb-4 pr-8 md:pr-10">
                        <div
                          className={`w-10 h-10 md:w-12 md:h-12 ${getTypeColor(item.type)} rounded-lg flex items-center justify-center text-white flex-shrink-0`}
                        >
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="text-right">
                          <Badge className={`${getTypeBadgeColor(item.type)} text-xs`}>{getTypeLabel(item.type)}</Badge>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">{item.period}</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-sm md:text-base text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                        {item.organization && <p className="text-xs md:text-sm text-gray-500 mb-2">{item.organization}</p>}
                        <p className="text-gray-600 mb-2 text-xs md:text-sm line-clamp-2">{item.description}</p>

                        {/* Add this section for additional details */}
                        {item.details && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
                            <p className="text-blue-800 text-xs">{item.details}</p>
                          </div>
                        )}

                        {/* Award section remains the same */}
                        {item.award && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
                            <div className="flex items-center">
                              <Award className="w-4 h-4 text-yellow-600 mr-2" />
                              <span className="text-yellow-800 font-medium text-xs">{item.award}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent mt-auto text-xs md:text-sm"
                        onClick={() => window.open(item.link, "_blank")}
                      >
                        자세히보기
                        <ExternalLink className="ml-2 w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
            </div>
          )}

          {/* Projects Tab Content */}
          {activeTab === 'projects' && (
            <div>
              <div className="max-w-2xl mx-auto mb-12 px-4">
                <p className="text-gray-600 text-center text-xs md:text-sm leading-relaxed">
                  무언가를 함께 만들어가는 경험이 가장 즐겁습니다. 🚀<br></br>
                  {' '}아이디어가 현실이 되는 그 순간이 너무 좋네요 :)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2 md:px-0">
            {projectData.map((project, index) => (
              <div key={project.id}>
                <Card
                  className={`bg-white hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-blue-500 h-72 relative transform ${
                    hasMounted && visibleSections.has("experience") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: hasMounted && visibleSections.has("experience") ? `${index * 60}ms` : "0ms",
                  }}
                >
                  <CardContent className="p-4 md:p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        <Folder className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div className="text-right">
                        {getStatusBadge(project.status)}
                        <p className="text-xs md:text-sm text-gray-500 mt-1">{project.period}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className={`font-bold text-gray-900 mb-2 ${project.id === "smart-wms" ? "text-sm md:text-base leading-tight" : "text-sm md:text-base leading-tight"}`}
                      >
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-3 text-xs md:text-sm">{project.description}</p>

                      {/* Tech Stack */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
                        <p className="text-blue-800 text-xs font-medium">{project.tech}</p>
                      </div>

                      {/* Award section */}
                      {project.award && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
                          <div className="flex items-center">
                            <Award className="w-4 h-4 text-yellow-600 mr-2" />
                            <span className="text-yellow-800 font-medium text-xs">{project.award}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent mt-auto text-xs md:text-sm"
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      GitHub 보기
                      <ExternalLink className="ml-2 w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
              </div>
            </div>
          )}
            </>
          )}
          </div>
        </div>
      </section>

      {/* ISSUE ONE Modal */}
      {activeModal === 'issueOne' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Project Image */}
            <div className="w-full p-4">
              <img
                src="/projects/Issue_one_detail.png"
                alt="ISSUE ONE 프로젝트"
                className="w-full h-auto rounded-t-2xl"
              />
            </div>

            {/* Project Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">ISSUE ONE</h2>
              <p className="text-lg text-gray-600 mb-6">편향 없는 뉴스 이슈 요약 플랫폼 (Frontend · 팀장)</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2025.03 ~ 2025.06 / 실질적 개발기간은 3주 </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">개발 인원</p>
                  <p className="text-base font-semibold text-gray-900">백엔드 2명 / 크롤링 1명 / 데이터분석 2명 / <span className="text-blue-600 font-bold">프론트엔드 1명</span></p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">[ 🏆 I-MINI PROJECT 대상 수상작 ]<br></br>여러 언론사의 기사를 수집·분석하여 AI 요약으로 제공하고, 정치적 성향을 시각적으로 비교할 수 있는 뉴스 요약 플랫폼</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">서비스 링크</p>
                  <a
                    href="https://issue-one.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    issue-one.vercel.app
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">GitHub 링크</p>
                  <a
                    href="https://github.com/KSEB-4-E"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    github.com/KSEB-4-E
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 디자인 레퍼런스 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎨 디자인 레퍼런스</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">무신사(MUSINSA)</p>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 기술 스택</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700"><strong>Frontend:</strong> React 19, Vite, React Router DOM, Styled-Components</p>
                  <p className="text-sm text-gray-700"><strong>비동기 통신:</strong> Axios</p>
                  <p className="text-sm text-gray-700"><strong>UI:</strong> Styled-Components, React Icons, React Spinners</p>
                  <p className="text-sm text-gray-700"><strong>배포:</strong> Vercel</p>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할 (FrontEnd · 팀장)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">프로젝트 기획 및 전체 구조 설계 주도</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">프론트엔드 전반 개발 및 UI/UX 설계</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">모바일 환경을 고려한 반응형 웹 구현</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">검색 플로우·라우팅·상태 전달 구조 설계</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">팀 내 기술 방향성 결정 및 구현 가이드 제공</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">기능 정의, 화면 흐름 문서화 및 협업 커뮤니케이션 담당</p>
                  </li>
                </ul>
              </div>

              {/* 주요 구현 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 구현 내용</h3>

                {/* 다중 언론사 기사 수집 */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">다중 언론사 기사 수집 및 AI 요약 UI 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">키워드 검색 시 여러 언론사 기사 결과를 한 화면에서 비교</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">AI 요약 결과를 핵심 사실 / 공통 쟁점 / 전망 단계로 구조화하여 제공</p>
                    </li>
                  </ul>
                </div>

                {/* 언론사 정치 성향 */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">언론사 정치 성향 시각화</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">보수 / 진보 / 중도 성향을 색상 기반 UI로 구분</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">언론사 로고와 카드형 레이아웃으로 직관적 비교 가능</p>
                    </li>
                  </ul>
                </div>

                {/* 검색 플로우 */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">검색 → 로딩 → 결과 페이지 UX 플로우 설계</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">AI 처리 대기 시간을 로딩 페이지로 분리해 사용자 이탈 최소화</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">React Router state와 URL query를 병행한 데이터 전달 구조 설계</p>
                    </li>
                  </ul>
                </div>

                {/* 모바일 우선 */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">모바일 우선 반응형 UI 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">모바일 화면에 최적화된 카드 레이아웃 및 인터랙션 구성</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">화면 크기에 따른 레이아웃·여백·텍스트 크기 유연 대응</p>
                    </li>
                  </ul>
                </div>

                {/* 시스템 테마 */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">시스템 테마 연동 다크 모드 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">prefers-color-scheme 기반 OS 테마 자동 감지</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Styled-Components ThemeProvider를 통한 전역 테마 관리</p>
                    </li>
                  </ul>
                </div>

                {/* SPA 사용자 경험 */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">SPA 사용자 경험 개선</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">검색 플로우 중 뒤로가기 제어</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">페이지 이동 시 스크롤 위치 초기화</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 프로젝트 후기 */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📝 프로젝트 후기</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    강의를 따라 구현하던 방식에서 벗어나,
                    기획부터 구조 설계, UI/UX, 구현까지 전부 직접 결정해 본 첫 프로젝트였습니다.<br></br>
                    처음부터 원하는 서비스를 만들어가는 과정이 쉽지는 않았지만,
                    그만큼 개발이 가장 재미있게 느껴졌고 스스로 설계하고 구현할 수 있다는 자신감을 얻었습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ShymPyo Modal */}
      {activeModal === 'shympyo' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Project Image */}
            <div className="w-full p-4">
              <img
                src="/projects/shympyo_detail.png"
                alt="쉼표 프로젝트"
                className="w-full h-auto rounded-t-2xl"
              />
            </div>

            {/* Project Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">쉼표</h2>
              <p className="text-lg text-gray-600 mb-6">무더위 쉼터 위치 안내 및 이용 관리 모바일 앱 (Frontend)</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2025.08 ~ 2025.11 / 개발기간 3개월</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">개발 인원</p>
                  <p className="text-base font-semibold text-gray-900">백엔드 2 명 / <span className="text-blue-600 font-bold">프론트엔드 1 명</span></p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">[ ☁️ K-Paas 공모전 출품작 ]<br></br>폭염 상황에서 사용자가 주변 무더위 쉼터를 빠르게 찾고, 실시간 위치·길안내·이용 현황을 통해 안전하게 이동할 수 있도록 돕는 앱</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">GitHub 링크</p>
                  <a
                    href="https://github.com/ShymPyo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    github.com/ShymPyo
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 디자인 레퍼런스 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎨 디자인 레퍼런스</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">토스, 네이버 지도, 카카오맵 UI</p>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 기술 스택</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700"><strong>Frontend:</strong> React Native (Expo), TypeScript</p>
                  <p className="text-sm text-gray-700"><strong>지도/위치:</strong> Kakao Maps WebView, Expo Location</p>
                  <p className="text-sm text-gray-700"><strong>경로 안내:</strong> TMAP 보행자 경로 API</p>
                  <p className="text-sm text-gray-700"><strong>인증:</strong> Google / Kakao / Naver OAuth 2.0</p>
                  <p className="text-sm text-gray-700"><strong>상태 관리:</strong> React Context API</p>
                  <p className="text-sm text-gray-700"><strong>실시간 통신:</strong> Server-Sent Events(SSE)</p>
                  <p className="text-sm text-gray-700"><strong>배포/환경:</strong> Expo, 환경변수 기반 설정</p>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할 (FrontEnd)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">프로젝트 기획 및 서비스 구조 설계 주도</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">프론트엔드 전반 개발 (사용자/관리자 화면 포함)</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">지도·위치 기반 핵심 기능 설계 및 구현</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">팀 내 기술 방향성 결정 및 기능 우선순위 조율</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">백엔드 API 구조 협의 및 요구사항 정리</p>
                  </li>
                </ul>
              </div>

              {/* 주요 구현 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 구현 내용</h3>
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">지도 기반 무더위 쉼터 탐색</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Kakao Maps WebView를 활용한 지도 렌더링</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">주변 쉼터 목록 및 상세 정보 모달 제공</p>
                    </li>
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">실시간 위치 트래킹</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">expo-location을 활용한 실제 사용자 위치 수집</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">1초 주기 / 2m 이상 이동 시 위치 갱신</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">WebView 메시지 통신으로 지도 마커 및 중심 위치 부드럽게 갱신</p>
                    </li>
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">도보 길안내 기능 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">TMAP 보행자 경로 API 연동</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">GeoJSON 응답 파싱 후 Polyline으로 실제 보행 경로 시각화</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">예상 거리 및 소요 시간 안내</p>
                    </li>
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">소셜 로그인(OAuth 2.0) 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Google / Kakao / Naver 로그인 연동</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">인가 코드 기반 인증 흐름 설계 및 토큰 관리</p>
                    </li>
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">실시간 이용 현황 업데이트</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">SSE 기반으로 쉼터 이용자 수 및 상태 실시간 반영</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">관리자 화면에서 이용자 입·퇴장 즉시 확인 가능</p>
                    </li>
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">모바일 UX 최적화</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">하단 슬라이드 패널 제스처 UI 구현</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">키보드 대응(KeyboardAvoidingView, dismiss 처리)으로 입력 UX 개선</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">iOS/Android 환경 모두 고려한 레이아웃 안정화</p>
                    </li>
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">접근성을 고려한 사용자 환경 옵션 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">노약자 및 저시력자를 고려하여 고대비 테마 모드 제공</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">글자 크기 조절 옵션을 통해 사용자 상황에 맞는 화면 가독성 확보</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">설정 변경 시 전역 UI에 즉시 반영되도록 Context 기반 테마 관리</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">접근성 옵션 적용 후에도 지도·모달·버튼 UI가 깨지지 않도록 레이아웃 대응</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 프로젝트 후기 */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📝 프로젝트 후기</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    처음으로 앱 형태의 서비스를 만들어본 프로젝트였습니다.<br></br>
                    웹과 달리 모바일은 터치, 스크롤, 제스처 등 선택지가 많아
                    사용자의 행동 흐름을 어떻게 설계할지가 매우 중요하다는 점을 배울 수 있었습니다.<br></br>
                    기능 구현을 넘어, 사용자가 의도한 흐름대로 움직이게 만드는 UX 설계에 대해 고민해볼 수 있었던 경험이었습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MakerFaire Modal */}
      {activeModal === 'makerFaire' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Project Image */}
            <div className="w-full p-4">
              <img
                src="/projects/makerFaire_detail.png"
                alt="메이커페어 2025 - 부스 소개 및 제품 설명서 페이지"
                className="w-full h-auto rounded-t-2xl"
              />
            </div>

            {/* Project Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">"네오엔" 부스 소개 및 제품 설명서 페이지</h2>
              <p className="text-lg text-gray-600 mb-6">메이커페어 서울 2025 부스 안내·제품 설명 웹사이트 (Frontend)</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2025.09 / 개발기간 약 일주일</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">개발 인원</p>
                  <p className="text-base font-semibold text-gray-900"><span className="text-blue-600 font-bold">프론트엔드 2명</span></p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">메이커페어 서울 2025에서 직접 창업해 부스를 운영하며, 부스 내 판매 제품의 QR 기반 온라인 설명서 겸 소개 웹사이트를 제작</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">서비스 링크</p>
                  <a
                    href="https://neon-makerfaire.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    neon-makerfaire.vercel.app/
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">GitHub 링크</p>
                  <a
                    href="https://github.com/Jinacker/neon_maker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    github.com/Jinacker/neon_maker
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 디자인 레퍼런스 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎨 디자인 레퍼런스</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">메이커페어 서울 2025 공식 홈페이지</p>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 기술 스택</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700"><strong>Frontend:</strong> React 19, Vite</p>
                  <p className="text-sm text-gray-700"><strong>스타일링:</strong> CSS (모바일 우선 반응형 설계)</p>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">메이커페어 서울 2025 창업 부스 운영 및 제품 판매 참여</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">부스 웹사이트 기획 · 디자인 · 프론트엔드 개발</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">제품 설명 구조 설계 및 사용자 동선 정의</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">이미지 로딩 구조 설계 및 성능 최적화</p>
                  </li>
                </ul>
              </div>

              {/* 주요 구현 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 구현 내용</h3>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">창업 부스 제품 설명서 웹사이트 제작</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">아이들을 위한 전자 개발 키트를 중심으로 제품 설명 페이지 구성</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">각 제품에 QR 코드를 동봉하여, QR 스캔 시 즉시 제품 사용 설명서로 연결</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">오프라인 부스–온라인 설명서를 자연스럽게 연결하는 구조 설계</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">모바일 우선 반응형 웹 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">전시장 환경 특성을 고려해 모바일 화면 기준으로 UI 설계</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">QR 스캔 후 빠르게 정보를 확인할 수 있도록 단순하고 직관적인 화면 구성</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">데스크톱 환경에서도 모바일 비율을 유지해 일관된 사용자 경험 제공</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">사진 중심 콘텐츠 구조 설계</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">제품 특성상 사진 비중이 높아, 텍스트보다 시각 자료 위주의 설명 흐름 구성</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">사진이 많아도 사용자가 부담 없이 정보를 따라갈 수 있도록 이미지 배치 순서와 그룹화에 집중</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">프론트엔드 성능 최적화</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">대량의 제품 사진으로 인한 초기 로딩 문제를 주요 이슈로 인식</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">React.lazy와 Suspense를 활용한 Lazy Loading 적용</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">페이지 단위 컴포넌트 분리 및 이미지 로딩 시점 제어</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">현장 환경에서도 QR 스캔 후 빠르게 설명서를 확인할 수 있도록 UX 개선</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 프로젝트 후기 */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📝 프로젝트 후기</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    실제 사람들이 사용하는 서비스를 처음으로 만들어본 프로젝트였습니다.<br></br>
                    프론트엔드에서도 성능과 최적화가 UX에 직접적인 영향을 준다는 점을 실감하며, 개발이 더욱 재미있고 보람 있게 느껴졌습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KatsuMap Modal */}
      {activeModal === 'katsuMap' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Project Image */}
            <div className="w-full p-4">
              <img
                src="/projects/KatsuMap_detail.png"
                alt="돈가스 지도"
                className="w-full h-auto rounded-t-2xl"
              />
            </div>

            {/* Project Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">돈가스 지도</h2>
              <p className="text-lg text-gray-600 mb-6">지도 기반 돈가스 맛집 탐색 모바일 애플리케이션 (1인 개발 · Frontend)</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2025.11 ~ 현재 운영 중 / 일주일만에 MVP 완성 후 런칭. 그 후 지속적인 업데이트 중!</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">개발 인원</p>
                  <p className="text-base font-semibold text-gray-900"><span className="text-blue-600 font-bold">백엔드 + 프론트엔드 1명 (1인 개발)</span></p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">[ 👤 누적 350명 사용자 · DAU 10명 유지 중 ]<br></br>서울 전역 돈가스 맛집을 지도 기반으로 탐색하고, 즐겨찾기·태그·리뷰 참여를 통해 사용자 경험이 축적되는 실사용 모바일 앱</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">App Store 링크</p>
                  <a
                    href="https://apps.apple.com/kr/app/돈가스-지도/id6755211452"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    🍎 App Store
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">Play Store 링크</p>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.katsumap.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    📱 Play Store
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">GitHub 링크</p>
                  <a
                    href="https://github.com/Katsu-Map"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    github.com/Katsu-Map
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 디자인 레퍼런스 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎨 디자인 레퍼런스</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">순수 창작</p>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 기술 스택 (Frontend)</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700"><strong>Framework:</strong> React Native, Expo</p>
                  <p className="text-sm text-gray-700"><strong>Navigation:</strong> React Navigation (Tab / Stack)</p>
                  <p className="text-sm text-gray-700"><strong>UI & Interaction:</strong> react-native-reanimated, react-native-gesture-handler, react-native-svg</p>
                  <p className="text-sm text-gray-700"><strong>Map:</strong> React Native WebView + Kakao Map API</p>
                  <p className="text-sm text-gray-700"><strong>State Management:</strong> React Context API</p>
                  <p className="text-sm text-gray-700"><strong>Networking:</strong> Axios</p>
                  <p className="text-sm text-gray-700"><strong>Local Storage:</strong> AsyncStorage</p>
                  <p className="text-sm text-gray-700"><strong>Error Monitoring:</strong> Sentry</p>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">앱 기획 · UI/UX 설계 · 프론트엔드 전반을 1인 개발</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">iOS / Android 앱 직접 출시 및 운영</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">사용자 피드백을 기반으로 UI·UX 지속 개선</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">실제 사용 환경에서 발생하는 문제를 중심으로 반복 개선</p>
                  </li>
                </ul>
              </div>

              {/* 주요 구현 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 구현 내용</h3>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">하이브리드 지도 구조 설계 및 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">React Native UI 위에 WebView로 Kakao Map API 연동</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">지도 렌더링은 WebView에서 처리하고, 화면 흐름·상태·모달 UI는 네이티브에서 제어</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">RN ↔ WebView 간 메시지 통신으로 마커 업데이트, 위치 이동, 상세 모달 제어</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">모바일 UX에 최적화된 화면 흐름 설계</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">하단 탭 기반 구조로 주요 기능(Home / 즐겨찾기 / 메시지 / 설정) 분리</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">지도 화면에서 바텀시트 UI를 도입해 리스트 ↔ 지도 전환을 자연스럽게 연결</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">드래그 제스처에 따라 여러 단계로 확장되는 바텀시트 UX 구현</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">앱 초기 진입 경험(App Initialization Flow) 설계</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">네이티브 스플래시 → 커스텀 스플래시 → 메인 화면으로 이어지는 흐름 구성</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">커스텀 폰트 로딩, 세션 확인이 완료된 후 화면을 노출해 깜빡임 없는 안정적인 초기 UX 제공</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">사용자 참여 중심 UI 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">즐겨찾기, 태그 제안, 한 줄 평 등 사용자가 직접 참여하는 인터랙션 제공</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">즐겨찾기 등록/해제 시 즉각적인 UI 피드백(토스트, 상태 반영) 적용</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">사용자 행동이 지도와 상세 화면에 바로 반영되도록 상태 관리 설계</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">검색 및 탐색 UX 고도화</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">식당명 검색 기능 UI 구현</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">지도 상 검색 반경 시각화 및 레이어 겹침 문제 해결</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">검색 결과와 지도 상태가 일관되게 유지되도록 화면 동기화</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">안정성 및 품질 개선</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">안드로이드 시스템 폰트 크기 변경 시 레이아웃 깨짐 이슈 해결 (allowFontScaling=false 적용)</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">iPad 화면 비율 대응 및 다양한 디바이스 해상도 대응</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Sentry 연동으로 실제 사용자 환경에서 발생하는 오류 추적 및 개선</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">SVG 좌표계 기반 지도 UI 안정화</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">메인 화면 서울 권역 지도를 SVG 좌표계 기반으로 설계하여 화면 비율 변화에도 레이아웃 고정</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">디바이스 해상도·종횡비와 무관하게 동일한 지도 배치와 터치 영역 유지</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">반응형 스타일링 대신 좌표 기준 레이아웃을 적용해 UI 깨짐 이슈 사전 방지</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">백오피스(관리자 대시보드) 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">서비스 운영을 위한 관리자 웹 대시보드 구축</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Recharts를 활용한 사용자 통계 및 데이터 시각화</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">식당 정보 관리, 태그 제안 검토, 리뷰 모니터링 기능 구현</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">지속적인 UI/UX 개선 및 업데이트</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">다수의 버전 업데이트를 통해 UI 개선, 인터랙션 보완</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">앱 스토어 심사 과정에서 발생한 이슈 대응 경험</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">운영 중 사용자 피드백을 반영한 반복 개선 사이클 경험</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 프로젝트 후기 */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📝 프로젝트 후기</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    실제 사용자들이 제가 만든 앱을 사용한다는 것만으로 가슴이 벅차오릅니다. <br></br>
                    운영하며 쏟아지는 피드백을 UI/UX 개선과 기능 추가로 빠르게 반영하고 있으며,
                    개발이 단순한 구현을 넘어 책임과 애착이 필요한 일이라는 점을 깊이 느끼고 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FamiLog Modal */}
      {activeModal === 'famiLog' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Project Image */}
            <div className="w-full p-4">
              <img
                src="/projects/FamiLog_detail.png"
                alt="FamiLog"
                className="w-full h-auto rounded-t-2xl"
              />
            </div>

            {/* Project Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">FamiLog</h2>
              <p className="text-lg text-gray-600 mb-6">가족 소통을 위한 1일1 질문·기록 기반 커뮤니케이션 웹 서비스 (Backend)</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2025.07 / 개발기간 약 일주일</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">개발 인원</p>
                  <p className="text-base font-semibold text-gray-900"><span className="text-blue-600 font-bold">백엔드 2명</span> / 프론트엔드 2명</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">[ 🦁 멋쟁이사자처럼 인하대 해커톤 ]<br></br>가족 구성원 간 소통을 돕는 질문 추천·답변 공유 기능을 갖춘 웹 기반 커뮤니케이션 플랫폼. (가족판 썸원)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">GitHub 링크</p>
                  <a
                    href="https://github.com/LikeLion-13th-E-TEAM-Inha-Hackathon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    github.com/LikeLion-13th-E-TEAM-Inha-Hackathon
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 기술 스택</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700"><strong>Framework:</strong> Django REST Framework</p>
                  <p className="text-sm text-gray-700"><strong>Authentication:</strong> JWT (djangorestframework-simplejwt)</p>
                  <p className="text-sm text-gray-700"><strong>Database:</strong> SQLite</p>
                  <p className="text-sm text-gray-700"><strong>Deployment:</strong> Render</p>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할 (Backend)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">RESTful API 서버 전체 설계 및 구축</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">JWT 기반 인증·인가 시스템 구현</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">백엔드 파트 담당 2명 중 1명으로 프로젝트 핵심 기능 개발 주도</p>
                  </li>
                </ul>
              </div>

              {/* 주요 구현 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 구현 내용</h3>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">Django Model 설계 및 관계형 DB 구조 정의</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">User, Question, Answer 등 핵심 엔티티 설계</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">ForeignKey, OneToOneField 등 정규화된 데이터베이스 관계 구현</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Django ORM을 활용한 CRUD 기능 구현</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">JWT 기반 인증·인가 시스템</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">djangorestframework-simplejwt 활용하여 Access Token / Refresh Token 발급·갱신 구조 구현</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Token 검증 및 사용자 인증 미들웨어 처리</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">로그인 / 회원가입 / 로그아웃 엔드포인트 설계</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">질문·답변 API 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">질문 목록 조회, 랜덤 질문 추천 API</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">답변 등록, 수정, 삭제 API 구현</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">질문·답변 간 관계를 활용한 필터링 및 조회 로직 구성</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">Serializer를 통한 데이터 검증·직렬화</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">ModelSerializer 활용한 엔티티↔JSON 변환 구조 작성</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Validation 로직 추가로 프론트에서 받은 요청 데이터의 무결성 보장</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">nested serializer 활용한 복합적인 데이터 구조 관리</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">View 설계 및 HTTP 메서드 처리</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">APIView / ViewSet 기반으로 RESTful API 엔드포인트 구현</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">GET, POST, PUT/PATCH, DELETE 메서드별 로직 구성</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">권한·인증 데코레이터(@permission_classes) 적용</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 기술적 고민 및 학습 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧠 기술적 고민 및 학습</h3>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">백엔드 기본 개념 습득 (Django, DRF)</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">MTV 패턴, ORM, Serializer, View 등 Django/DRF 핵심 개념 학습</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">프론트엔드와의 협업 경험을 통해 REST API 설계 원칙 이해</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">JWT 인증 구조 이해</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Access Token과 Refresh Token의 역할 구분, 토큰 갱신 흐름 파악</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">인증·인가가 어떻게 서버에서 처리되는지 경험</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">팀 협업 및 버전 관리</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">백엔드 2명, 프론트엔드 2명이 함께 작업하는 협업 프로젝트</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Git을 활용한 브랜치 관리, PR 리뷰 경험</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">프론트-백 연동 및 배포</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Render를 활용한 서버 배포 및 실제 운영 환경 경험</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">프론트엔드 팀과 API 명세서 기반 소통, 데이터 형식 맞춰가며 협업</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 프로젝트 후기 */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📝 프로젝트 후기</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    처음으로 백엔드 개발자 역할을 맡아 진행한 프로젝트로, Django와 DRF의 기본 구조를 직접 경험하며 백엔드에 대한 이해를 넓힐 수 있었습니다. <br></br>
                    특히, 프론트엔드 팀과 협업하며 API 설계 및 데이터 구조를 맞춰가는 과정에서 실전적인 개발 경험을 쌓았고, JWT 기반 인증 시스템 구축을 통해 서버 보안의 중요성을 체감했습니다. <br></br>
                    비록 해커톤이라는 짧은 기간 동안 진행된 프로젝트였지만, 협업의 중요성과 백엔드 개발자로서의 역할을 명확히 이해할 수 있는 소중한 경험이었습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SmartWMS Modal */}
      {activeModal === 'smartWMS' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Project Image */}
            <div className="w-full p-4">
              <img
                src="/projects/SmartWMS_detail.png"
                alt="Smart WMS"
                className="w-full h-auto rounded-t-2xl"
              />
            </div>

            {/* Project Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Smart WMS</h2>
              <p className="text-lg text-gray-600 mb-6">AMR 기반 스마트 창고 관리 시스템 (Backend)</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2025.07 ~ 2025.08 / 개발기간 2개월</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900"><span className="text-blue-600 font-bold">Backend 1명</span> / Frontend 1명 / AI 2명</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">[ 🏢 신세계 I&C 산학협력 프로젝트 - 🏆 정보통신기획평가원 원장상 수상]<br></br>재고·입출고·AMR 로봇 상태를 통합 관리하고, 실시간 대시보드와 3D 창고 시뮬레이션을 제공하는 스마트 창고 관리 시스템</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">GitHub 링크</p>
                  <a
                    href="https://github.com/KSEB-4th-Project-3rd-Team"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    github.com/KSEB-4th-Project-3rd-Team
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 기술 스택</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700"><strong>Backend:</strong> Spring Boot, Java</p>
                  <p className="text-sm text-gray-700"><strong>Security:</strong> Spring Security (세션 기반 인증)</p>
                  <p className="text-sm text-gray-700"><strong>Database:</strong> MySQL (AWS RDS), JPA/Hibernate</p>
                  <p className="text-sm text-gray-700"><strong>Infra:</strong> AWS EC2, Docker, Nginx</p>
                  <p className="text-sm text-gray-700"><strong>API Docs:</strong> Swagger(OpenAPI)</p>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할 (Backend 단독 담당)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">백엔드 전체 API 설계 및 구현</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">재고·입출고·랙·AMR 도메인 모델링</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">대시보드 및 창고맵 API 성능 최적화</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">인증/권한, 배포 환경 구성까지 백엔드 전반 담당</p>
                  </li>
                </ul>
              </div>

              {/* 주요 구현 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 구현 내용</h3>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">창고 관리 핵심 도메인 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">재고(Item / Inventory), 랙(Rack), 입·출고 주문(InOutOrder) CRUD API 구현</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">재고 변동 이력 관리 및 입출고 상태 흐름(State Flow) 설계</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">AMR 로봇 상태(위치, 배터리, 작업 상태) 관리 API 구현</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">인증 및 권한 관리</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Spring Security 기반 세션 인증 시스템 구축</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">관리자 / 일반 사용자 권한 분리 및 접근 제어</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">BCrypt 기반 비밀번호 해싱 적용</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">대시보드 성능 최적화</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">N+1 쿼리 원인 분석 및 JOIN FETCH 기반 쿼리 재설계</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Hibernate MultipleBagFetchException 발생 이슈 해결<br></br>→ 컬렉션 타입 List → Set 변경 및 LAZY 전략 적용</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700"><strong>대시보드 초기 로딩 시간 14.67초 → 0.42초 (약 97% 개선)</strong></p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">랙(Rack) API 성능 개선</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">랙–재고 관계 조회 시 발생하던 N+1 쿼리 제거</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">단일 JOIN FETCH 쿼리로 통합</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700"><strong>API 응답 시간 1.13초 → 0.33초 (약 70% 개선)</strong></p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">창고맵 전용 경량 API 설계</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Unity WebGL 기반 3D 창고 시뮬레이션 연동</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">전체 랙 상세 데이터 대신<br></br>→ 위치, 점유 여부, 상태 정보만 반환하는 전용 DTO 설계</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700"><strong>응답 데이터 크기 약 70% 감소, 로딩 시간 대폭 개선</strong></p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">출고 등록 프로세스 성능 개선</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">출고 등록 화면 진입 시 필요한 데이터 사전 로딩 구조로 변경</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">중복 API 호출 제거 및 불필요한 연산 최소화</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">출고 등록 체감 속도 및 안정성 개선</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">배포 및 운영 환경 구성</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Docker 기반 백엔드 컨테이너화</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">AWS EC2 + RDS 운영 환경 구축</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Nginx 리버스 프록시 및 HTTPS(SSL) 설정</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">헬스체크 기반 서비스 상태 관리</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 기술적 고민 및 학습 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧠 기술적 고민 및 학습</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">JPA/Hibernate의 N+1 쿼리, 컬렉션 Fetch 전략을 실제 성능 병목 사례를 통해 깊이 이해</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">단순 CRUD 구현이 아닌, 쿼리 수·응답 시간·응답 데이터 크기를 기준으로 한 성능 개선 경험</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">DB 설계 및 쿼리 구조 개선만으로 대규모 성능 향상이 가능하다는 점을 체감</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">WebGL, 대시보드, 출고 화면 등 사용자 체감 성능 중심의 API 분리 설계 경험</p>
                  </li>
                </ul>
              </div>

              {/* 프로젝트 후기 */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📝 프로젝트 후기</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    백엔드를 단독으로 맡아 서비스 전체 구조와 성능까지 책임졌던 프로젝트였습니다.<br></br>
                    실제 병목 지점을 직접 분석하고 수치로 개선 결과를 확인하면서,<br></br>
                    백엔드 개발에서 설계와 성능 최적화의 중요성을 깊이 체감할 수 있었습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GeonneoGeonneo Modal */}
      {activeModal === 'geonneoGeonnoe' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Project Image */}
            <div className="w-full p-4">
              <img
                src="/projects/GNGN_detail.png"
                alt="건너건너"
                className="w-full h-auto rounded-t-2xl"
              />
            </div>

            {/* Project Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">건너건너</h2>
              <p className="text-lg text-gray-600 mb-6">신뢰 기반 네트워크 연결 플랫폼 – 실시간 채팅 파트 담당 (Backend)</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2024.08 / 개발기간 약 일주일</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900">Backend 3명 (<span className="text-blue-600 font-bold">채팅 파트 담당</span>) / Frontend 3명</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">[ 🦁 멋쟁이사자처럼 중앙 해커톤 ]<br></br>지인 기반 네트워크에서 사용자 간 신뢰 연결을 돕는 플랫폼으로,<br />실시간 1:1 채팅을 통해 ‘건너건너’ 연결되는 커뮤니케이션을 지원하는 서비스</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">GitHub 링크</p>
                  <a
                    href="https://github.com/Team-Hawaiian-Pizza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    github.com/Team-Hawaiian-Pizza
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 기술 스택</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700"><strong>Backend:</strong> Django, Django REST Framework</p>
                  <p className="text-sm text-gray-700"><strong>Real-time:</strong> Django Channels, WebSocket</p>
                  <p className="text-sm text-gray-700"><strong>Database:</strong> MySQL</p>
                  <p className="text-sm text-gray-700"><strong>Cache / Message Broker:</strong> Redis</p>
                  <p className="text-sm text-gray-700"><strong>Infra:</strong> Docker, Nginx</p>
                  <p className="text-sm text-gray-700"><strong>Architecture:</strong> Monolith → Multi-Module 구조</p>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할 (채팅 서비스 전담)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">실시간 채팅 서비스 설계 및 구현</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">기존 모놀리스 구조를 멀티모듈 아키텍처로 분리</p>
                  </li>
                   <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">WebSocket 기반 실시간 통신 로직 전반 담당</p>
                  </li>
                   <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">채팅 API 명세 작성 및 프론트엔드 연동 지원</p>
                  </li>
                </ul>
              </div>

              {/* 주요 구현 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 구현 내용</h3>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">실시간 1:1 채팅 기능 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">WebSocket 기반 실시간 메시지 송·수신</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Django Channels + Redis Channel Layer 구성</p>
                    </li>
                     <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">메시지 전송, 수신, 읽음 처리, 타이핑 상태 구현</p>
                    </li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">채팅 성능 최적화</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">초기 접속 시 전체 메시지 로드 → 페이지네이션 기반 무한 스크롤 방식으로 개선</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">최근 메시지 우선 로딩 후 이전 메시지 점진적 조회</p>
                    </li>
                     <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">메시지 인덱스 설계로 조회 성능 개선</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">모놀리스 → 멀티모듈 아키텍처 전환</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">기존 Core 서비스와 채팅 도메인 분리</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">채팅 서비스는 사용자 ID만 참조하도록 설계하여 서비스 간 결합도 최소화</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">추후 MSA 확장을 고려한 구조로 설계</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">WebSocket 구조 이해 및 안정화</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">ASGI 서버(daphne) 기반 WebSocket 서버 구성</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Redis 기반 채널 레이어를 통한 연결 관리</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">WebSocket 연결/해제, 재연결 흐름 직접 디버깅하며 실시간 통신 구조 이해</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 기술적 고민 및 학습 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧠 기술적 고민 및 학습</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">REST API와 WebSocket의 역할 차이를 실제 구현을 통해 체득</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">실시간 통신에서 상태 관리, 연결 안정성, 메시지 순서 보장의 중요성을 이해</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">단순 기능 구현이 아니라, 확장 가능한 채팅 아키텍처를 고민한 경험</p>
                  </li>
                </ul>
              </div>

              {/* 프로젝트 후기 */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📝 프로젝트 후기</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                  채팅 기능을 구현하며 WebSocket과 실시간 통신 구조를 처음으로 깊이 이해하게 된 프로젝트였습니다.
                  <br />특히 모놀리스 구조를 멀티모듈로 전환하며, 서비스 분리와 아키텍처 설계가 개발 경험에 얼마나 큰 영향을 주는지 체감할 수 있었습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KatsuMap Backend Modal */}
      {activeModal === 'katsuMapBackend' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Project Image */}
            <div className="w-full p-4">
              <img
                src="/projects/KatsuMap_detail.png"
                alt="돈가스 지도 백엔드"
                className="w-full h-auto rounded-t-2xl"
              />
            </div>

            {/* Project Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">돈가스 지도</h2>
              <p className="text-lg text-gray-600 mb-6">지도 기반 돈가스 맛집 탐색 모바일 애플리케이션 (1인 개발 · Backend)</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2025.11 ~ 현재 (운영 중) / 일주일 만에 MVP 완성 후 지속적 업데이트 중!</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900"><span className="text-blue-600 font-bold">백엔드 + 프론트엔드 1명 (1인 개발)</span></p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">[ 👤 누적 350명 사용자 · DAU 10명 유지 중 ]<br></br>서울 전역 돈가스 맛집을 지도 기반으로 탐색하고, 즐겨찾기·태그·리뷰 참여를 통해 사용자 경험이 축적되는 실사용 모바일 앱</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">GitHub 링크</p>
                  <a
                    href="https://github.com/Katsu-Map"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    github.com/Katsu-Map
                    <Github className="w-4 h-4" />
                  </a>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">🍎 App Store</p>
                  <a
                    href="https://apps.apple.com/kr/app/%EB%8F%88%EA%B0%80%EC%8A%A4-%EC%A7%80%EB%8F%84/id6755211452"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    돈가스 지도 다운로드
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">📱 Play Store</p>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.katsumap.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    돈가스 지도 다운로드
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 기술 스택</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700"><strong>Backend:</strong> NestJS, TypeScript</p>
                  <p className="text-sm text-gray-700"><strong>Database:</strong> Supabase (PostgreSQL, PostGIS), Prisma ORM</p>
                  <p className="text-sm text-gray-700"><strong>Infra:</strong> Google Cloud Run (Serverless), Docker</p>
                  <p className="text-sm text-gray-700"><strong>CI/CD:</strong> Google Cloud Build</p>
                  <p className="text-sm text-gray-700"><strong>Cache:</strong> In-memory Cache</p>
                  <p className="text-sm text-gray-700"><strong>External API:</strong> Kakao Map REST API</p>
                  <p className="text-sm text-gray-700"><strong>Crawling / AI:</strong> BeautifulSoup4, HuggingFace</p>
                  <p className="text-sm text-gray-700"><strong>Security:</strong> Helmet, Rate Limiting, Validation Pipe</p>
                  <p className="text-sm text-gray-700"><strong>Auth:</strong> UUID 기반 사용자 식별 + Session 기반 인증</p>
                  <p className="text-sm text-gray-700"><strong>Testing:</strong> Jest, Supertest</p>
                  <p className="text-sm text-gray-700"><strong>Logging:</strong> 사용자 접속·행동 로그 수집</p>
                  <p className="text-sm text-gray-700"><strong>API Docs:</strong> Swagger (OpenAPI)</p>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할 (Backend 단독 담당)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">백엔드 전체 아키텍처 설계 및 구현</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Cloud Run 기반 서버리스 환경 구성 및 운영</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">위치 기반 검색, 랭킹, 크롤링, AI 파이프라인 개발</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">세션 인증, 무중단 배포, 테스트 자동화, 로깅 포함 운영 전반 담당</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">관리자 백오피스용 API 설계 및 구현</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">실서비스 트래픽 대응 및 지속적인 개선</p>
                  </li>
                </ul>
              </div>

              {/* 주요 구현 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 구현 내용</h3>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">위치 기반 맛집 추천 (Kakao REST API + PostGIS)</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">사용자가 장소명을 입력하면 Kakao Map REST API를 통해 좌표(위도/경도) 조회</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">조회된 좌표를 기준으로 PostgreSQL PostGIS 공간 쿼리 실행</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">ST_DWithin, ST_Distance를 활용한 반경 기반 검색 구현</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">장소 → 좌표 변환 → 공간 검색 → 근처 맛집 추천의 전체 흐름을 백엔드에서 직접 설계</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">지도 및 장소 정보 연동</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Kakao Map REST API 기반 장소 상세 정보 조회</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">좌표 기반 데이터 검증으로 지도 UI와 백엔드 데이터 정합성 유지</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">외부 지도 API 의존성을 최소화한 구조 설계</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">랭킹 데이터 수집 및 가공</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">BeautifulSoup4 기반 크롤링 파이프라인 구현</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Google Place ID 기준으로 가게 리뷰 및 사진 데이터 수집</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">크롤링 데이터 정제 후 랭킹 및 가게 상세 정보에 활용</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">AI 기반 대표 이미지 자동 선정</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">HuggingFace 이미지 분류 모델 활용</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">수집된 가게 사진 중 '돈가스일 확률이 가장 높은 이미지'를 대표 이미지로 자동 선정</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">수동 큐레이션 없이도 일관된 가게 대표 이미지 제공</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">사용자 식별 및 인증 구조 (UUID + Session)</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">회원가입 없이 바로 사용할 수 있는 서비스 구조 설계</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">앱 최초 실행 시 UUID 발급 → 사용자 고유 식별자로 활용</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">UUID 기반 초기 식별 후 Session Token 발급</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">이후 모든 요청은 Session 기반 인증으로 처리</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">유저별 즐겨찾기, 태그, 활동 이력 제공</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">서버에는 Session Token Hash만 저장하여 보안성 확보</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">관리자 백오피스 API 구현</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">관리자 전용 인증 구조 설계</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">가게 정보 관리, 문의/신고 처리, 데이터 수정 API 제공</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">운영을 고려한 관리자 전용 엔드포인트 분리</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">사용자 접속 및 행동 로깅</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">사용자 접속, 주요 API 호출 로그 수집</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">서비스 사용 흐름 분석 및 운영 판단에 활용</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">장애 대응 및 이상 트래픽 분석 기반 마련</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">성능 및 안정성 최적화</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700"><strong>인메모리 캐싱 적용</strong></p>
                    </li>
                    <li className="flex items-start gap-3 ml-4">
                      <div className="w-1 h-1 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600">인기 가게, 권역별 조회 결과 캐싱</p>
                    </li>
                    <li className="flex items-start gap-3 ml-4">
                      <div className="w-1 h-1 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600">반복 요청 시 DB 접근 최소화</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Rate Limiting 적용으로 비정상 트래픽 방어</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Helmet 적용을 통한 HTTP 보안 헤더 설정</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">공통 Exception Filter로 에러 응답 표준화</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">테스트 자동화</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Jest + Supertest 기반 API 통합 테스트 구축</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">주요 API에 대해 정상 / 예외 / 인증 케이스 테스트 작성</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">배포 전 테스트 자동 실행으로 안정성 확보</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">CI/CD 및 무중단 배포</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Google Cloud Build 기반 CI/CD 파이프라인 구성</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">코드 변경 시 테스트 → Docker 이미지 빌드 → Cloud Run 배포 자동화</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Cloud Run Revision 전환을 통한 무중단 배포</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">서비스 중단 없이 기능 개선 및 업데이트 수행</p>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-2">Cloud Run 서버리스 운영 및 비용 최적화</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Docker 이미지 기반 Cloud Run 배포</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">트래픽에 따른 자동 스케일링</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">무상태(stateless) 서버 구조 설계</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700"><strong>월 평균 서버 비용 약 2,000원 수준으로 운영</strong></p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">서버리스 구조를 통한 인프라 비용 및 운영 부담 최소화</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 기술적 고민 및 학습 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧠 기술적 고민 및 학습</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Kakao REST API와 PostGIS를 결합한 위치 기반 검색 구조를 실서비스에 적용</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Supabase(PostgreSQL + PostGIS)를 활용한 서버리스 친화적 DB 운영 경험</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Redis 없이 서버리스 환경에 적합한 인메모리 캐싱 전략의 장단점 검증</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">UUID + 세션 기반 인증으로 회원가입 없는 개인화 기능 제공</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">로깅, 테스트, CI/CD, 무중단 배포까지 포함한 운영 중심 백엔드 설계 역량 강화</p>
                  </li>
                </ul>
              </div>

              {/* 프로젝트 후기 */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📝 프로젝트 후기</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    실사용자가 있는 서비스를 단독으로 운영하며, 백엔드 개발이 기능 구현을 넘어 설계와 운영 전반을 책임지는 영역임을 체감했습니다.<br></br>
                    서버리스 환경에서 성능과 비용을 함께 고려하며, 실서비스에 필요한 기술 선택과 운영 관점을 직접 경험한 프로젝트였습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trad (외주 작업) Modal */}
      {activeModal === 'trad' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Project Image */}
            <div className="w-full p-4 flex flex-col items-center">
              <img
                src="/projects/tradlab_detail.png"
                alt="외주 작업"
                className="w-3/4 h-auto rounded-2xl"
              />
              <p className="text-sm text-gray-500 mt-2 italic">이전 요구사항에 맞춰 설계했던 폐기된 아키텍처</p>
            </div>

            {/* Project Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">외주 작업</h2>
              <p className="text-lg text-gray-600 mb-6">동시 주문 환경에서의 백엔드 동시성 처리 설계</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2025.12 ~ 진행중 / 개발기간 약 3개월 예상</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">역할</p>
                  <p className="text-base font-semibold text-gray-900"><span className="text-blue-600 font-bold">Backend 아키텍처 설계 및 구현</span></p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">프로젝트 소개</p>
                  <p className="text-sm text-gray-700">처음으로 진행하는 외주 프로젝트입니다.<br />초기에는 대규모 동시 접속이 발생하는 티켓팅 서비스를 가정한 전체 아키텍처 설계를 목표로 시작했으나, 요구사항 조정에 따라 현재는 동시 주문 상황에서 발생하는 동시성 문제를 안정적으로 처리하는 백엔드 구조 설계에 집중하고 있습니다.<br /><br />프론트엔드 개발자 1명과 함께 팀을 구성하여 협업 중입니다.</p>
                </div>
              </div>

              {/* 주요 고민 사항 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 주요 고민 사항</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">다수의 사용자가 동시에 주문 요청을 보낼 때 발생하는 데이터 정합성 문제 해결</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">중복 주문, 초과 판매 등을 방지하기 위한 동시성 제어 전략 설계</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">실제 서비스 환경을 고려한 안정적이고 확장 가능한 백엔드 구조 설계</p>
                  </li>
                </ul>
              </div>

              {/* 프로젝트 상태 */}
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>🚀 현재 상태:</strong> 동시 주문 상황을 가정한 시나리오 정의 및 동시성 처리 중심의 아키텍처 설계, 초기 구현 진행 중
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    상세 구현 내용 및 결과는 프로젝트 완료 후 업데이트될 예정입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 알바로그 Modal */}
      {activeModal === 'albaLog' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Project Image */}
            <div className="w-full p-4 flex justify-center">
              <img
                src="/projects/albaLog.png"
                alt="알바로그"
                className="w-48 h-48 object-cover rounded-2xl"
              />
            </div>

            {/* Project Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">알바로그</h2>
              <p className="text-lg text-gray-600 mb-6">알바 통합 관리 플랫폼 (Backend)</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2026.01 ~ / 약 한달 예정</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900">PM 1명 / Design 2명 / Frontend 4명 / <span className="text-blue-600 font-bold">Backend 5명</span></p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">[ 🚀 UMC 9th DemoDay 프로젝트 ]<br></br>알바생과 매니저를 위한 통합 관리 플랫폼으로,<br />CodeRabbit을 통해 PR 단위의 코드 리뷰 자동화를 실험·적용하고 있습니다.</p>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 기술 스택</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700"><strong>Runtime:</strong> Node.js & Express</p>
                  <p className="text-sm text-gray-700"><strong>Language:</strong> TypeScript</p>
                  <p className="text-sm text-gray-700"><strong>API Docs:</strong> Tsoa & OpenAPI 3.0</p>
                  <p className="text-sm text-gray-700"><strong>Database:</strong> MySQL</p>
                  <p className="text-sm text-gray-700"><strong>Infra:</strong> Docker, NginX</p>
                  <p className="text-sm text-gray-700"><strong>CI/CD:</strong> Github Actions</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 어셈블 (ASSEMBLE) Modal */}
      {activeModal === 'assemble' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Project Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🧩 2024 데이터 크리에이터 캠프</h2>
              <p className="text-lg text-gray-600 mb-1">패션 스타일 이미지 분류 및 선호 예측 AI 프로젝트</p>
              <p className="text-sm text-gray-500 mb-6">팀 프로젝트 · Computer Vision / Recommendation</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2024.09 ~ 2024.10 (약 2달)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900">4인 팀 프로젝트</p>
                  <p className="text-sm text-gray-600 mt-1">※ 본인 담당: 이미지 전처리 파이프라인 설계, CNN 모델 학습 및 성능 개선, 추천 파트 디버깅 및 분석</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">패션 이미지 데이터를 기반으로<br />① 성별·스타일 이미지 분류(CNN),<br />② 설문 기반 스타일 선호 데이터 분석,<br />③ ResNet feature를 활용한 item-based 추천 시스템까지<br />데이터 → 모델 → 추천 전 과정을 단계적으로 구현한 종합 AI 프로젝트</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">블로그 링크</p>
                  <a
                    href="https://blog.naver.com/rlawls1448/223648547754"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    프로젝트 회고록 보기
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 문제 정의와 접근 흐름 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 문제 정의와 접근 흐름</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    이 프로젝트는 단순 분류 모델 구현이 아니라, <strong>"라벨/데이터가 애초에 깔끔하지 않은 상황에서 성능을 끌어올리는 실전형 문제"</strong>였습니다.

                    특히 ResNet-18을 pretrained 없이 무작위 초기화로 학습해야 했고, 데이터도 학습 4,070장 / 검증 951장, 클래스는 <strong>31개(성별×스타일 조합)</strong>로 클래스당 150장도 안 되는 수준이라 "모델을 바꾸는 것"보다 <strong>"데이터를 제대로 만들기"</strong>가 더 중요했습니다.
                  </p>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 기술 스택</h3>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700"><strong>Language:</strong> Python</p>
                  <p className="text-sm text-gray-700"><strong>Framework:</strong> PyTorch, torchvision</p>
                  <p className="text-sm text-gray-700"><strong>Model:</strong> ResNet-18, DeepLabV3 (ResNet-50 backbone)</p>
                  <p className="text-sm text-gray-700"><strong>CV:</strong> OpenCV, PIL</p>
                  <p className="text-sm text-gray-700"><strong>Recommendation:</strong> Item-based Collaborative Filtering</p>
                  <p className="text-sm text-gray-700"><strong>Similarity:</strong> Cosine Similarity, Euclidean Distance</p>
                  <p className="text-sm text-gray-700"><strong>Data:</strong> Image Dataset (약 5,000장), Survey JSON / XLSX</p>
                  <p className="text-sm text-gray-700"><strong>Environment:</strong> Jupyter Notebook</p>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">패션 이미지 전처리 파이프라인 설계 및 품질 개선</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">ResNet-18 기반 이미지 분류 모델 학습 및 성능 분석</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">세그멘테이션·객체 인식 기반 데이터 품질 개선</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">추천 시스템 파트 코드 디버깅 및 정확도 개선</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">실험 결과 분석 및 성능 변화 원인 정리</p>
                  </li>
                </ul>
              </div>

              {/* 주요 구현 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 구현 내용</h3>

                {/* Mission 1 */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs">Mission 1</span>
                    패션 스타일 이미지 분류
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">▸ 파일명 기반 데이터 구조 설계</p>
                      <p className="text-xs text-gray-600 ml-3">{'{W/T}_{이미지ID}_{시대}_{스타일}_{성별}.jpg'} 규칙을 파싱해 성별·스타일 라벨 자동 생성</p>
                      <p className="text-xs text-gray-600 ml-3">이미지 ID 기준으로 통계 집계하여 데이터 분포 파악</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">▸ ResNet-18 기반 이미지 분류</p>
                      <p className="text-xs text-gray-600 ml-3">Pretrained 모델을 사용하지 않고 Random Initialization 상태에서 학습</p>
                      <p className="text-xs text-gray-600 ml-3">총 31개 클래스(성별 × 스타일 조합) 분류</p>
                      <p className="text-xs text-gray-600 ml-3">데이터 규모 대비 높은 난이도의 분류 문제 설정</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">▸ 전처리 전략 개선 <span className="text-orange-600">(핵심 기여)</span></p>
                      <p className="text-xs text-gray-600 ml-3">단순 리사이즈 기반 학습에서 성능 한계를 확인</p>
                      <p className="text-xs text-gray-600 ml-3">DeepLabV3 + ResNet50 백본을 활용한 인물 세그멘테이션 적용</p>
                      <p className="text-xs text-gray-600 ml-3">배경 제거 후 인물 중심 이미지로 재구성</p>
                      <p className="text-xs text-gray-600 ml-3">OpenCV(BGR) ↔ PIL(RGB) 색상 채널 불일치 문제를 직접 디버깅</p>
                      <p className="text-xs text-gray-600 ml-3">바운딩박스/리사이즈 순서 문제 해결로 데이터 손실 최소화</p>
                      <p className="text-sm text-orange-600 font-semibold mt-2">➡ Validation Accuracy 약 50% → 64%까지 향상</p>
                    </div>
                  </div>
                </div>

                {/* Mission 2 */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs">Mission 2</span>
                    패션 스타일 선호 데이터 분석
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p className="text-xs text-gray-600">설문 JSON 데이터 중 실제 이미지와 매칭 가능한 데이터만 필터링</p>
                    <p className="text-xs text-gray-600">사용자별 스타일 선호 여부(Q5 응답 기반)를 정규화</p>
                    <p className="text-xs text-gray-600">100명 사용자 × 스타일 선호 테이블(DataFrame) 구성</p>
                    <p className="text-xs text-gray-600">이미지 기반 모델 결과와 결합 가능한 형태로 데이터 구조 정리</p>
                  </div>
                </div>

                {/* Mission 3 */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs">Mission 3</span>
                    패션 스타일 선호 예측
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">▸ Item-based Collaborative Filtering 구현</p>
                      <p className="text-xs text-gray-600 ml-3">User-based 방식 대신 아이템 간 유사도 중심 추천 구조 채택</p>
                      <p className="text-xs text-gray-600 ml-3">ResNet-18 중간 레이어에서 512차원 feature vector 추출</p>
                      <p className="text-xs text-gray-600 ml-3">이미지 간 유사도를 기준으로 선호 여부 예측</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">▸ Similarity 설계 및 디버깅</p>
                      <p className="text-xs text-gray-600 ml-3">Cosine Similarity + Euclidean Distance 결합</p>
                      <p className="text-xs text-gray-600 ml-3">정확도 100%로 잘못 계산되던 오류를 추적</p>
                      <p className="text-xs text-gray-600 ml-3">엑셀(xlsx) 데이터 로딩 오류로 모든 예측값이 0이 되던 문제 발견</p>
                      <p className="text-xs text-gray-600 ml-3">데이터 로딩 및 검증 로직 수정</p>
                      <p className="text-xs text-gray-600 ml-3">OOM 방지를 위한 배치 단위 similarity 계산 적용</p>
                      <p className="text-xs text-gray-600 ml-3">threshold, 가중치(alpha) 튜닝을 통한 성능 최적화</p>
                    </div>
                    <p className="text-sm text-orange-600 font-semibold">➡ 최종 Prediction Accuracy 약 67.9% (최대 ~78% 실험 결과 확인)</p>
                  </div>
                </div>
              </div>

              {/* 기술적 고민 및 학습 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧠 기술적 고민 및 학습</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">데이터가 적을수록 전처리 품질이 모델 성능을 결정한다는 점을 실험으로 체감</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">CNN 학습에서 배경 제거가 단순 보조 작업이 아니라 핵심 성능 요인임을 이해</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">"더 오래 학습한다고 더 좋은 모델이 되는 것은 아니다"라는 점을 과적합 실험을 통해 직접 확인</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">추천 시스템에서 모델보다 데이터 구조와 유사도 정의가 더 중요할 수 있음을 학습</p>
                  </li>
                </ul>
              </div>

              {/* 프로젝트 후기 */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📝 프로젝트 후기</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  적은 데이터와 불균형한 분포, 그리고 pretrained 없이 시작하는 모델 조건 속에서 <strong>전처리·학습 전략·디버깅이 모델 성능을 얼마나 크게 바꿀 수 있는지</strong>를 직접 경험한 프로젝트였습니다.
                  <br /><br />
                  특히 아무것도 학습되지 않은 상태의 ResNet-18 모델이 데이터 품질 개선만으로 점진적으로 "학습되기 시작하는 과정"을 지켜보며, AI 모델이 결코 블랙박스가 아니라 <strong>사람의 선택과 설계에 크게 의존하는 시스템</strong>이라는 점을 체감할 수 있었습니다.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* NSMC LLaMA Fine-tuning Modal */}
      {activeModal === 'nsmc' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Project Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🧠 NSMC 기반 한국어 감성 분석 모델 고도화</h2>
              <p className="text-lg text-gray-600 mb-1">LLaMA 3.2 Fine-tuning · LoRA Rank 실험 · Few-shot Prompt · Reasoning SFT</p>
              <p className="text-sm text-gray-500 mb-6">개인 프로젝트 · Natural Language Processing</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2025.12 / 약 한달</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900">개인 프로젝트</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">NSMC(네이버 영화 리뷰) 데이터셋을 활용해 한국어 LLaMA 3.2 모델을 대상으로<br />Fine-tuning, LoRA Rank 조정, Few-shot Prompt, Reasoning 데이터셋 생성까지 단계적으로 실험하며<br />감성 분류 성능과 추론 품질의 변화를 정량적으로 분석한 프로젝트</p>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 기술 스택</h3>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700"><strong>Model:</strong> Bllossom/llama-3.2-Korean-Bllossom-3B</p>
                  <p className="text-sm text-gray-700"><strong>Framework:</strong> PyTorch, HuggingFace Transformers</p>
                  <p className="text-sm text-gray-700"><strong>Fine-tuning:</strong> LoRA (PEFT), Unsloth</p>
                  <p className="text-sm text-gray-700"><strong>Dataset:</strong> NSMC (Naver Sentiment Movie Corpus)</p>
                  <p className="text-sm text-gray-700"><strong>Prompting:</strong> Zero-shot / Few-shot</p>
                  <p className="text-sm text-gray-700"><strong>Reasoning Data:</strong> Gemini API 기반 자동 생성</p>
                  <p className="text-sm text-gray-700"><strong>Evaluation:</strong> Accuracy, Skip rate</p>
                  <p className="text-sm text-gray-700"><strong>Environment:</strong> Google Colab (T4)</p>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">NSMC 데이터 전처리 및 학습/평가 프롬프트 설계</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">LLaMA 3.2 한국어 모델 Fine-tuning 파이프라인 구축</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">LoRA rank(r)·epoch 변화에 따른 성능 비교 실험</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Few-shot Prompt 구성 전략 및 메모리 이슈 대응</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Reasoning 데이터셋 생성 로직 설계 및 안정화</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">생성 기반 모델의 평가 로직 개선 및 성능 분석</p>
                  </li>
                </ul>
              </div>

              {/* 실험 구성 및 결과 */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4">✨ 실험 구성 및 결과</h3>

                {/* 1️⃣ Baseline */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-800">1️⃣ Baseline (Fine-tuning 없음)</p>
                    <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">0.581</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">조건: Zero-shot Prompt, 학습 없음 · 평가 데이터: NSMC test 1,000개</p>
                  <p className="text-xs text-gray-500 italic">➡ 한국어 zero-shot 분류는 가능하나, 프롬프트 구조만으로는 실사용에 부족한 성능임을 확인</p>
                </div>

                {/* 2️⃣ LoRA r=4 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-800">2️⃣ LoRA Fine-tuning (r = 4)</p>
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">best 0.782</span>
                  </div>
                  <div className="bg-white rounded border border-gray-200 overflow-hidden mb-2">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left text-gray-600">설정</th>
                          <th className="px-3 py-2 text-center text-gray-600">Accuracy</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t"><td className="px-3 py-1.5 text-gray-600">r=4 / 1 epoch</td><td className="px-3 py-1.5 text-center">0.756</td></tr>
                        <tr className="border-t bg-orange-50"><td className="px-3 py-1.5 text-gray-600">r=4 / 3 epoch</td><td className="px-3 py-1.5 text-center font-semibold">0.782</td></tr>
                        <tr className="border-t"><td className="px-3 py-1.5 text-gray-600">r=4 / 5 epoch</td><td className="px-3 py-1.5 text-center">0.778</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 italic">➡ 3 epoch 이후 성능 수렴 및 소폭 하락 · 프롬프트를 학습/평가 단계에서 동일하게 유지하는 것이 성능에 결정적</p>
                </div>

                {/* 3️⃣ LoRA r=2 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-800">3️⃣ LoRA Rank 변경 실험 (r = 2)</p>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">best 0.800</span>
                  </div>
                  <div className="bg-white rounded border border-gray-200 overflow-hidden mb-2">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left text-gray-600">설정</th>
                          <th className="px-3 py-2 text-center text-gray-600">Accuracy</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t"><td className="px-3 py-1.5 text-gray-600">r=2 / 1 epoch</td><td className="px-3 py-1.5 text-center">0.727</td></tr>
                        <tr className="border-t bg-green-50"><td className="px-3 py-1.5 text-gray-600">r=2 / 3 epoch</td><td className="px-3 py-1.5 text-center font-bold text-green-700">0.800 (최고)</td></tr>
                        <tr className="border-t"><td className="px-3 py-1.5 text-gray-600">r=2 / 5 epoch</td><td className="px-3 py-1.5 text-center">0.792</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 italic">➡ 낮은 rank에서도 충분한 학습 반복 시 더 높은 일반화 성능 달성 · 본 데이터 규모에서는 r=2, 3 epoch이 가장 효율적</p>
                </div>

                {/* 4️⃣ Few-shot */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-800">4️⃣ Few-shot Prompt 실험</p>
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">0.735</span>
                  </div>
                  <div className="space-y-2 mb-2">
                    <div className="bg-red-50 border border-red-100 rounded p-2">
                      <p className="text-xs font-medium text-red-700">▸ 초기 결과</p>
                      <p className="text-xs text-gray-600">문체가 NSMC와 맞지 않는 demonstration 사용 시 → Accuracy 0.56 ~ 0.57로 오히려 감소</p>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded p-2">
                      <p className="text-xs font-medium text-green-700">▸ 개선 전략</p>
                      <p className="text-xs text-gray-600">NSMC 특유의 구어체·짧은 리뷰 문체 반영 · 중립적 표현 제거, 감성 극단 예시 위주 구성</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic">➡ 2-shot (극단적 예시) → Accuracy 0.735 · demonstration 개수보다 예시의 명확성과 분포 적합성이 더 중요함을 확인</p>
                </div>

                {/* 5️⃣ Reasoning 데이터셋 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <p className="text-sm font-semibold text-gray-800 mb-2">5️⃣ Reasoning 데이터셋 생성</p>
                  <div className="bg-white rounded border border-gray-200 p-3 mb-2">
                    <p className="text-xs text-gray-700 mb-1"><strong>데이터 수:</strong> 1,000개 (리뷰–정답–근거)</p>
                    <p className="text-xs text-gray-700 mb-1"><strong>생성 방식:</strong> NSMC 원본 라벨 고정 · Gemini API로 정답의 타당한 이유만 생성</p>
                    <p className="text-xs text-gray-700"><strong>안정성:</strong> JSON 포맷 강제 + Retry 로직으로 배치 실패 없이 1,000개 전량 생성 성공</p>
                  </div>
                  <p className="text-xs text-gray-500 italic">➡ "문제–정답–근거" 구조의 고품질 reasoning 학습 데이터셋 구축</p>
                </div>

                {/* 6️⃣ Reasoning SFT */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-800">6️⃣ Reasoning SFT 학습 및 평가</p>
                    <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">0.761</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">학습 설정: LoRA r=8, epoch=1 · 출력 형식: 첫 단어 = 긍정/부정 + 한 문장 근거</p>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-red-50 border border-red-100 rounded p-2">
                      <p className="text-xs font-medium text-red-700 mb-1">1차 평가</p>
                      <p className="text-xs text-gray-600">Accuracy: 0.748</p>
                      <p className="text-xs text-gray-600">Skip: 369 / 500 (출력 형식 불일치)</p>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded p-2">
                      <p className="text-xs font-medium text-green-700 mb-1">개선 후 재평가</p>
                      <p className="text-xs text-gray-600">Accuracy: <strong>0.7606</strong></p>
                      <p className="text-xs text-gray-600">Evaluated: 497 / Skipped: 3</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic">➡ 분류 성능은 단순 LoRA 최고 성능(0.800)보다는 낮으나, 근거 생성이 가능한 감성 분석 모델로 확장 성공</p>
                </div>
              </div>

              {/* 전체 성능 비교 요약 */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📊 전체 성능 비교 요약</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">모델</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Accuracy</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="px-4 py-2.5 text-gray-600">Baseline</td>
                        <td className="px-4 py-2.5 text-center">0.581</td>
                      </tr>
                      <tr className="border-t border-gray-200 bg-gray-50">
                        <td className="px-4 py-2.5 text-gray-600">LoRA r=4 (best)</td>
                        <td className="px-4 py-2.5 text-center">0.782</td>
                      </tr>
                      <tr className="border-t border-gray-200 bg-green-50">
                        <td className="px-4 py-2.5 text-gray-700 font-medium">LoRA r=2 (best)</td>
                        <td className="px-4 py-2.5 text-center font-bold text-green-700">0.800</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="px-4 py-2.5 text-gray-600">Reasoning SFT</td>
                        <td className="px-4 py-2.5 text-center">0.761</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 핵심 인사이트 */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🧠 핵심 인사이트</h3>
                <div className="space-y-2">
                  {[
                    "LoRA rank는 데이터 규모·태스크 특성에 따라 최적값이 달라짐",
                    "Fine-tuning과 Prompt Engineering은 보완 관계",
                    "Few-shot은 개수보다 예시 품질이 중요",
                    "Reasoning 학습은 정확도보다 설명 가능성 향상에 기여",
                    "생성 기반 모델은 평가 로직 설계가 성능만큼 중요"
                  ].map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-gray-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 프로젝트 결론 */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📝 프로젝트 결론</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  본 프로젝트를 통해 자연어처리 이론이 실제 모델 성능 개선으로 이어지기 위해서는 <strong>데이터 구성, 학습 전략, Prompt 설계가 유기적으로 결합</strong>되어야 한다는 점을 확인했습니다.
                  <br /><br />
                  특히 이 과제는 인공지능을 단순히 "학습시키는 대상"이 아니라, <strong>서비스 맥락에 맞게 조정하고 활용하는 기술</strong>로 바라보게 만든 계기가 되었으며, 이후 인공지능을 서비스에 접목하는 방향에 지속적인 관심을 갖게 되었습니다.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* AI Interest Modal */}
      {activeModal === 'aiInterest' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🤖 저는 AI를 이렇게 활용하고 있어요!</h2>
              <p className="text-sm text-gray-500 mb-8">현재 관심을 두고 실천하고 있는 AI 활용 전략</p>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 mb-10">
                <p className="text-sm text-gray-700 leading-relaxed">
                  인공지능 모델 개발에 대한 호기심으로 복수전공을 시작했으나, 학습 과정에서 <strong>AI 기술의 실질적 활용</strong>에 더 큰 매력을 느꼈습니다.
                  <br /><br />
                  현재는 AI를 적재적소에 도입해 <strong>서비스 가치를 높이고 개발 생산성을 극대화</strong>하는 방법에 깊은 관심을 두고 있습니다!
                  <br /><br />
                  특히 1인 개발로 앱을 런칭했을때 AI를 활용해 생산성을 극대화해 <strong>기획부터 출시까지 일주일만에 완성</strong>한 경험이 있습니다.
                </p>
              </div>

              {/* 1. 개발 문서화 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">1</span>
                  개발 문서화를 통한 AI 협업 최적화
                </h3>
                <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                  <p className="text-sm text-gray-700">기능 단위로 개발 내역을 <strong>Markdown 문서로 지속 기록</strong></p>
                  <p className="text-sm text-gray-700">단순 결과물이 아니라 <strong>기획 의도 / 선택한 구조 / 트레이드오프 / TODO</strong> 까지 함께 정리</p>
                  <p className="text-sm text-gray-700">Claude, Gemini 등 LLM이 장기 맥락을 잘 기억하지 못하는 한계를 인지하고,<br />내가 작성한 문서를 컨텍스트로 제공해 작업을 끊김 없이 이어가도록 활용</p>
                  <p className="text-sm text-gray-700">복잡한 작업은 <strong>Spec 명세서</strong>를 작성해 프롬프트로 전달<br />→ 목적 / 규칙 / 기대 결과 / 나오면 안 되는 것들로 구조화</p>
                  <p className="text-sm text-gray-700">자주 쓰는 <strong>프롬프트 템플릿, 테스트 코드</strong>는 문서화해서 재사용<br />→ AI가 맥락을 더 잘 이해하고 일관된 결과 도출</p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-3">
                    <p className="text-sm text-gray-700">→ "AI에게 다시 설명하는 시간"을 줄이고</p>
                    <p className="text-sm text-gray-700">→ "이어서 바로 구현/리팩토링/검토"가 가능한 상태를 유지</p>
                    <p className="text-sm text-orange-700 font-medium mt-2">👉 AI를 내가 만든 기록을 읽고 함께 일하는 파트너로 사용</p>
                  </div>
                </div>
              </div>

              {/* 2. PR 단위 코드 리뷰 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">2</span>
                  PR 단위 코드 리뷰 자동화 (CodeRabbit AI)
                </h3>
                <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                  <p className="text-sm text-gray-700">GitHub PR 생성 시 <strong>CodeRabbit AI</strong>를 활용한 자동 코드 리뷰 도입</p>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-2">단순 스타일 체크가 아니라:</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">로직 흐름 이상 여부</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">중복 코드 / 개선 가능한 구조</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">네이밍, 책임 분리, 가독성</p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-2">사람 리뷰 전에 1차 필터로 사용하여:</p>
                    <p className="text-sm text-gray-700">✓ 리뷰 품질 상향 · 리뷰 대기 시간 단축 · 셀프 리뷰 비용 감소</p>
                    <p className="text-sm text-green-700 font-medium mt-2">특히 1인 개발 / 소규모 팀 환경에서 효과가 큼</p>
                  </div>
                </div>
              </div>

              {/* 3. 테스트 자동화 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">3</span>
                  테스트 자동화 + AI 보조 학습
                </h3>
                <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                  <p className="text-sm text-gray-700"><strong>Jest + Supertest</strong> 기반으로 API 테스트 환경 구성</p>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-2">단위 테스트 / 통합 테스트 예제를 학습할 때:</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">공식 문서 + 블로그 글 + 실습 코드</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">AI에게 "이 테스트가 왜 필요한지", "이 패턴의 의도"를 질문하며 이해</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">TDD 관련 영상/자료를 참고하고, AI를 통해 현재 코드에 맞는 테스트 시나리오로 변환</p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-2">결과적으로:</p>
                    <p className="text-sm text-gray-700">✓ 테스트 작성 진입장벽 감소 · 기능 추가 시 회귀 버그에 대한 불안 감소 · 리팩토링 속도 향상</p>
                  </div>
                </div>
              </div>

              {/* 4. 1인 개발 환경 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">4</span>
                  1인 개발 환경에서의 AI 활용 (돈가스 지도 앱 사례)
                </h3>
                <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                  <p className="text-sm text-gray-700"><strong>기획 → 디자인 → FE → BE → 배포 → 운영</strong>까지 혼자 진행</p>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-2">AI를 다음 역할로 활용:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-700">• <strong>기획 정리자</strong> (아이디어 구조화, 기능 분해)</p>
                      <p className="text-sm text-gray-700">• <strong>설계 검토자</strong> (DB 스키마, API 설계 검증)</p>
                      <p className="text-sm text-gray-700">• <strong>구현 보조자</strong> (NestJS / Prisma / RN 코드 스캐폴딩)</p>
                      <p className="text-sm text-gray-700">• <strong>운영 컨설턴트</strong> (보안, Rate Limit, 캐싱, 로깅 전략)</p>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-2">AI Agent 활용 전략:</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700">• <strong>작게 시작하기</strong> — 한번에 많이 X, 개발 Agent 하나로 시작해서 필요할 때마다 확장<br /><span className="text-xs text-gray-500 ml-4">(예: GitHub 이슈/PR 자동 생성 MCP 붙이기 등)</span></p>
                      <p className="text-sm text-gray-700">• <strong>나눠서 여러 번 호출</strong> — 한번에 다 시키면 추적이 힘듦, 단계별로 나눠서 요청</p>
                    </div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">특히 서버 안정성 리포트, 배포 전 체크리스트를 AI와 함께 작성하여</p>
                    <p className="text-sm text-purple-700 font-medium mt-1">"돌아가는 코드"가 아니라 "실제로 운영 가능한 서비스" 수준으로 끌어올림</p>
                  </div>
                </div>
              </div>

              {/* 5. 에러 추적 */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">5</span>
                  에러 추적·운영 단계에서의 AI 활용
                </h3>
                <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                  <p className="text-sm text-gray-700"><strong>Sentry</strong>를 통한 실제 사용자 환경 에러 수집</p>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-2">수집된 에러 로그와 상황을 AI에 전달하여:</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">원인 추정</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">재현 시나리오 도출</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">수정 방향 정리</p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">덕분에 단순 크래시 대응이 아니라</p>
                    <p className="text-sm text-orange-700 font-medium">왜 이런 문제가 생겼는지 구조적으로 이해하며 개선</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* QGIS Project Modal */}
      {activeModal === 'qgisProject' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Header Image */}
            <div className="w-full h-72 bg-gradient-to-r from-purple-50 to-indigo-100 flex items-center justify-center">
              <img
                src="/projects/qgis.png"
                alt="QGIS 공간분석 프로젝트"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🗺️ QGIS 공간정보 프로젝트</h2>
              <p className="text-lg text-purple-600 font-semibold mb-1">건축법 기반 도로–건축물 이격거리 준수 여부 공간분석</p>
              <p className="text-sm text-gray-500 mb-6">2024년 · 개인 프로젝트 · 도구: QGIS</p>

              {/* 프로젝트 개요 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">프로젝트 개요</p>
                  <p className="text-sm text-gray-700">본 프로젝트는 「건축법 제58조」 및 「건축법 시행령 제80조의2」에 명시된 도로 경계선으로부터 건축물의 최소 이격거리(6m) 규정을 실제 공간데이터에 적용하여, 도로와 건축물 간 이격거리 준수 여부를 GIS 공간분석으로 검증한 공간정보 프로젝트입니다.</p>
                  <p className="text-sm text-gray-700 mt-2">법령에서 제시하는 정성적 기준을 단순 설명에 그치지 않고, <strong>버퍼·중첩·교차 분석</strong>을 통해 정량적·시각적으로 확인하는 것을 목표로 했습니다.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">사용 데이터</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 인천시 GIS 건물 통합 정보 (AL_D010_28_20241104.shp)</li>
                    <li>• 도로 현황 데이터 (Z_UPIS_C_UQ151.shp)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">분석 범위</p>
                  <p className="text-sm text-gray-700">데이터 규모를 고려해 인하대학교 인근 지역으로 클리핑하여 분석 수행</p>
                </div>
              </div>

              {/* 법적 근거 및 버퍼 거리 설정 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">⚖️ 법적 근거 및 버퍼 거리 설정</h3>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2"><strong>관련 법령:</strong> 「건축법」 제58조, 「건축법 시행령」 제80조의2 및 별표 2</p>
                  <p className="text-sm text-gray-700 mb-2"><strong>버퍼 거리:</strong> 도로 경계선 기준 6m</p>
                  <p className="text-sm text-gray-700 mb-1"><strong>설정 근거:</strong></p>
                  <ul className="text-sm text-gray-700 ml-4 space-y-1">
                    <li>• 교통 안전 확보</li>
                    <li>• 일조권 및 채광 보호</li>
                    <li>• 도시 경관 및 공공 공간 확보</li>
                    <li>• 비상 차량 및 보행 동선 확보</li>
                  </ul>
                </div>
              </div>

              {/* 공간분석 과정 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 공간분석 과정</h3>
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">1. 데이터 전처리</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 도로 데이터에서 중앙선·점선 등 불필요 요소 제거</li>
                      <li>• QGIS 표현식을 활용해 도로 외곽선만 추출</li>
                      <li>• 지역·도로폭·조례 차이를 고려해 골목길 제외</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">2. 버퍼 분석</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 도로 외곽선을 기준으로 6m 버퍼 생성</li>
                      <li>• 건축법상 이격 기준을 공간적으로 모델링</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">3. 데이터 정제</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 도로 데이터 파편화 문제 해결을 위해 Dissolve(융해) 기능 적용</li>
                      <li>• 연속적인 도로 버퍼 폴리곤 생성</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">4. 중첩 및 교차 분석</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 입력 레이어: 도로 6m 버퍼</li>
                      <li>• 중첩 레이어: 건물 데이터</li>
                      <li>• Intersection 분석으로 버퍼와 겹치는 건물 추출</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">5. 결과 검증</h4>
                    <p className="text-sm text-gray-700">속성 테이블 및 지도 시각화를 통해 교차 결과 확인</p>
                  </div>
                </div>
              </div>

              {/* 분석 결과 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 분석 결과</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">대부분의 건축물이 도로 이격거리 6m 규정을 준수하고 있음을 확인</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">일부 건물에서 버퍼와의 겹침 현상 관찰</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">→ 실제 규정 위반 가능성 또는 건물 높이에 따른 2D 투영 효과로 인한 시각적 겹침 가능성</p>
                  </li>
                </ul>
              </div>

              {/* 해석 및 한계 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧠 해석 및 한계</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">「건축법 시행령」에 따라 2m 이상 옹벽·담장이 존재할 경우 이격 규정이 적용되지 않을 수 있음</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">본 프로젝트는 2D 공간데이터 기반 분석으로, 건물 높이·지형 단차·구조물 존재 여부를 완전히 반영하지 못하는 한계가 존재</p>
                  </li>
                </ul>
              </div>

              {/* 활용 가능성 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💡 활용 가능성</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">불법 증축·무허가 건축물 1차 탐지</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">건축 허가 사전 검토 보조 자료</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">도로 확장 및 도시 재정비 대상지 검토</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">화재·응급차량 접근성 등 공공 안전 관리</p>
                  </li>
                </ul>
              </div>

              {/* 프로젝트를 통해 얻은 점 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-3">📝 프로젝트를 통해 얻은 점</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  본 프로젝트를 통해 GIS는 단순 시각화 도구가 아니라, <strong>법·제도·공공 데이터를 공간적으로 해석하고 의사결정을 지원하는 분석 도구</strong>임을 체감했습니다.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  동시에, 공간분석 결과 해석 시 <strong>데이터 한계를 인식하고 보완하는 사고의 중요성</strong>도 함께 배울 수 있었습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GNSS Project Modal */}
      {activeModal === 'gnssProject' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>


            {/* Header Images */}
            <div className="w-full bg-gradient-to-r from-orange-50 to-amber-100 p-4">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/projects/gps_2.png"
                  alt="GNSS 정밀 측위 분석 이미지 1"
                  className="w-full h-64 object-contain rounded-lg"
                />
                <img
                  src="/projects/gps_1.png"
                  alt="GNSS 정밀 측위 분석 이미지 2"
                  className="w-full h-64 object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🛰️ RTAP2U 활용 RTCM 버전별 측위 성능 비교 및 신뢰성 검증</h2>
              <p className="text-lg text-purple-600 font-semibold mb-1">RTCM 3.1 vs 3.2 데이터 비교·분석을 통한 최적 측위 프로토콜 도출</p>
              <p className="text-sm text-gray-500 mb-6">2024년 10~12월 · 5인 팀 프로젝트 · GPS/GNSS 정밀 측위 분석</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">RTAP2U 수신기를 활용하여 RTCM 3.1과 3.2 버전의 측위 데이터를 수집하고, <strong>정밀도(Precision)</strong>와 <strong>정확도(Accuracy)</strong> 분석을 통해 멀티 GNSS의 신뢰성을 검증한 프로젝트</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900">5인 팀 프로젝트</p>
                </div>
              </div>

              {/* 사용 데이터 & 기술 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 사용 데이터 & 기술</h3>
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2"><strong>H/W:</strong> RTAP2U (보급형 고정밀 GNSS 수신기), 안테나, 폴대</p>
                  <p className="text-sm text-gray-700 mb-2"><strong>Protocol:</strong> NTRIP (VRS-RTCM 3.1 / VRS-RTCM 3.2 / RTK-RTCM 3.2)</p>
                  <p className="text-sm text-gray-700 mb-2"><strong>Analysis:</strong> RMSE(평균 제곱근 오차) 산출, 표준편차 분석, DOP 상관관계 분석</p>
                  <p className="text-sm text-gray-700"><strong>Software:</strong> RTAP2U Viewer, Excel (데이터 통계 처리)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">사용 데이터</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>관측 데이터:</strong> 인천 및 수도권 내 통합기준점(U인천08, U0213, U인천06, U인천02 등)에서의 정지 측량 데이터</li>
                    <li>• <strong>기준 데이터:</strong> 국토지리정보원 국가 통합 기준점 고시 성과 (참값으로 활용)</li>
                    <li>• <strong>보정 데이터:</strong> 국토지리정보원 NTRIP 서버에서 제공하는 RTCM 3.1 및 3.2 보정정보</li>
                  </ul>
                </div>
              </div>

              {/* 프로젝트 추진체계 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👥 프로젝트 추진체계</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>데이터 수집 설계</strong> → <strong>현장 관측</strong> → <strong>데이터 전처리</strong> → <strong>통계 분석</strong> → <strong>결과 도출</strong>
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">실험 설계</span>
                    </div>
                    <p className="text-sm text-gray-700">데이터 비교의 공정성을 위해 동일한 통합기준점에서 유사한 DOP 조건 하에 3가지 모드(VRS 3.1, VRS 3.2, RTK 3.2)를 연속 측정</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">데이터 수집</span>
                    </div>
                    <p className="text-sm text-gray-700">각 측점에서 모드별 5분 이상, 위성 가시성 변화를 최소화하여 연속 측정 수행</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">성과 분석</span>
                    </div>
                    <p className="text-sm text-gray-700">참값(통합기준점 좌표)과 관측값 간의 절대 오차(RMSE) 및 정밀도(표준편차) 산출</p>
                  </div>
                </div>
              </div>

              {/* 프로젝트 배경 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📋 프로젝트 배경 및 필요성</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• 기존 <strong>RTCM 3.1</strong>은 GPS와 GLONASS 위성군만 사용하는 반면, <strong>RTCM 3.2(MSM)</strong>는 Galileo, BeiDou, QZSS 등 다중 위성항법시스템(Multi-GNSS)을 지원</li>
                    <li>• 도심지나 위성 수신이 불안정한 환경에서 위성 가용 개수가 늘어나는 RTCM 3.2가 실제로 얼마나 더 높은 정확도와 신뢰성을 보장하는지 <strong>정량적인 검증</strong>이 필요</li>
                    <li>• 보급형 수신기인 RTAP2U에서도 고가의 측량 장비 수준의 데이터를 확보할 수 있는지 <strong>프로토콜별 성능 차이</strong>를 분석</li>
                  </ul>
                </div>
              </div>

              {/* 프로젝트 목표 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 프로젝트 목표</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700"><strong>정확도(Accuracy) 평가:</strong> 수직·수평 RMSE를 기준으로 각 RTCM 버전별 절대 정확도 비교</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700"><strong>정밀도(Precision) 평가:</strong> 동일 환경에서 분산 및 표준편차를 분석하여 데이터의 일관성 확인</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700"><strong>데이터 신뢰성 검증:</strong> 측정된 DOP(HDOP, VDOP) 값과 측위 오차 간의 상관관계 분석</p>
                  </li>
                </ul>
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-500 mb-2">분석 범위</p>
                  <p className="text-sm text-gray-700"><strong>공간적 범위:</strong> 인천광역시 내 통합기준점 4개소 (남동구 논현동, 미추홀구 용현동, 남구 학익동, 동구 송림동)</p>
                  <p className="text-sm text-gray-700 mt-2"><strong>비교 대상:</strong></p>
                  <ul className="text-sm text-gray-700 ml-4 mt-1 space-y-1">
                    <li>• VRS-RTCM 3.1: GPS + GLONASS</li>
                    <li>• VRS-RTCM 3.2: GPS + GLONASS + Galileo + BeiDou + QZSS (Multi-GNSS)</li>
                    <li>• RTK-RTCM 3.2: Single-RTK 방식 (비교군)</li>
                  </ul>
                </div>
              </div>

              {/* 분석 방법 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">⚙️ 분석 방법</h3>
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">절대 정확도 분석 (RMSE)</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 국가 통합기준점 고시 좌표(True Value)와 수신기 관측 좌표 간의 차이를 계산</li>
                      <li>• <strong>수평(Horizontal) 및 수직(Vertical), 3차원 RMSE</strong>를 산출하여 모드별 성능 평가</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">정밀도 분석 (Standard Deviation)</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 관측된 데이터군(Epochs)의 평균 좌표를 기준으로 각 데이터가 흩어진 정도(표준편차)를 계산</li>
                      <li>• 수신 안정성 평가</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">신뢰성 지표 분석 (DOP & TTFF)</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>PDOP/HDOP/VDOP:</strong> 위성 배치에 따른 정밀도 저하율 모니터링</li>
                      <li>• <strong>TTFF (Time To First Fix):</strong> 초기 고정해(Fix)를 얻는 데 걸리는 시간 비교</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 분석 결과 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📍 분석 결과</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">1. RTCM 3.2의 우수한 정확도 입증</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 대부분의 측점에서 <strong>RTCM 3.2(VRS)</strong>가 RTCM 3.1 대비 수평·수직 RMSE가 낮게 측정됨</li>
                      <li>• 특히 U인천02 측점의 경우, RTCM 3.1은 수평 RMSE <strong>15.8cm</strong>, 수직 RMSE <strong>18.1cm</strong>로 튀는 현상이 발생했으나, RTCM 3.2는 수평 <strong>2.3cm</strong>, 수직 <strong>11.5cm</strong>로 안정적인 결과</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">2. Multi-GNSS(다중 위성)의 효과 확인</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• RTCM 3.2 적용 시 가용 위성 수가 증가함에 따라 <strong>HDOP 및 VDOP 수치가 전반적으로 개선</strong></li>
                      <li>• 장애물이 있거나 수신 환경이 불량한 곳에서도 RTCM 3.2가 더 높은 <strong>Fix Rate(고정 성공률)</strong>와 <strong>Data Quality Rate</strong>를 유지</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">3. TTFF (초기 고정 시간) 단축</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• RTCM 3.2 모드가 3.1 모드 대비 더 빠른 시간 내에 Fix 해를 획득</li>
                      <li>• 예: U인천02 측점 TTFF <strong>46.6초(3.1)</strong> vs <strong>18.2초(3.2)</strong></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 프로젝트 의의 및 한계 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-3">💡 프로젝트 의의 및 한계</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-green-700 mb-1">✅ 의의</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 이론적으로 알려진 Multi-GNSS(RTCM 3.2)의 우수성을 <strong>실제 필드 테스트를 통해 정량적으로 검증</strong></li>
                      <li>• 보급형 기기(RTAP2U)로도 RTCM 3.2 프로토콜을 활용하면 <strong>cm급의 정밀 측위가 가능</strong>함을 확인, 저비용 고효율 측위 시스템 구축의 근거 마련</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-700 mb-1">⚠️ 한계</p>
                    <p className="text-sm text-gray-700">일부 측점(U인천08 등)에서는 수직 오차가 수평 오차에 비해 상대적으로 크게 발생하는 경향이 있어 <strong>안테나 높이 측정 오차나 전리층 지연 등 외부 변수</strong>에 대한 추가 분석이 요구됨</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ArcGIS Project Modal */}
      {activeModal === 'arcgisProject' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Header Image */}
            <div className="w-full h-72 bg-gradient-to-r from-emerald-50 to-teal-100 flex items-center justify-center">
              <img
                src="/projects/arcgis.png"
                alt="ArcGIS 폐기물 매립지 적지 선정 공간분석"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🗑️ 폐기물 매립지 적지 선정 공간분석 프로젝트</h2>
              <p className="text-lg text-purple-600 font-semibold mb-1">AHP 기반 Map Algebra를 활용한 환경·사회 요인 통합 분석</p>
              <p className="text-sm text-gray-500 mb-6">2025년 5월 · 개인 프로젝트 · GIS / Spatial Analysis</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">환경·지형·사회적 요인을 GIS 래스터 분석으로 통합해 폐기물 매립지 후보지를 데이터 기반으로 도출한 공간분석 프로젝트</p>
                </div>
              </div>

              {/* 사용 데이터 & 기술 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 사용 데이터 & 기술</h3>
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2"><strong>Tool:</strong> ArcGIS</p>
                  <p className="text-sm text-gray-700 mb-2"><strong>Analysis:</strong> Raster Analysis, Map Algebra, AHP 기반 가중치 중첩</p>
                  <p className="text-sm text-gray-700"><strong>Spatial Methods:</strong> Buffer, Reclassify, SetNull, IDW, Slope Analysis</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">사용 데이터</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• DEM 기반 경사도(Slope)</li>
                    <li>• 토양 배수등급</li>
                    <li>• 토지이용/토지피복</li>
                    <li>• 접근성(IDW, 거리 기반 가중 분석)</li>
                    <li>• 인구밀도: 통계청 1km 격자 총인구 데이터</li>
                    <li>• 자연보호구역: 국립공원·생태보전지역 등 (500m 버퍼 적용)</li>
                  </ul>
                </div>
              </div>

              {/* 가중치 설정 근거 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">⚖️ 가중치 설정 근거</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">AHP 기반 가중치 적용 참고 문헌</p>
                  <p className="text-sm text-gray-700 font-medium">『GIS를 활용한 쓰레기 매립지 입지 선정과정의 체계화 연구』(이성준 외, 2014)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-3">핵심 판단 기준</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-amber-700 min-w-[70px]">경사도</span>
                      <span>→ 물리적 안정성·침출수 위험</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-amber-700 min-w-[70px]">인구밀도</span>
                      <span>→ 사회적 수용성(NIMBY)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-amber-700 min-w-[70px]">토지이용</span>
                      <span>→ 환경·사회적 민감도</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-amber-700 min-w-[70px]">토양</span>
                      <span>→ 지하수 오염 가능성</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-amber-700 min-w-[70px]">접근성</span>
                      <span>→ 운영 효율성</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">폐기물 매립지 입지 선정 문제를 공간분석 모델로 구조화</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">래스터 해상도 통일(5m) 및 전처리 수행</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">인구밀도·환경민감지역 등 비실습 데이터 추가 선정 및 적용</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">AHP 기반 가중치 적용 및 Map Algebra 수식 설계</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">분석 결과 시각화 및 적합·부적합 지역 해석</p>
                  </li>
                </ul>
              </div>

              {/* 주요 분석 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 분석 내용</h3>
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">인구밀도 분석</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 1km 격자 총인구 데이터를 래스터로 변환</li>
                      <li>• Natural Breaks 기준 3등급 재분류 후 역점수 적용</li>
                      <li>• 사회적 수용성(NIMBY)을 고려한 적합도 반영</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">자연보호구역 배제 처리</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 국립공원·보전지역 경계 기준 500m 버퍼 생성</li>
                      <li>• SetNull 처리로 분석 단계에서 완전 배제 마스크 적용</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">가중치 기반 적합도 분석</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• AHP 기반 가중치 적용 (Slope 0.2597 / Population 0.1948 / LandUse 0.1558 / Toyang 0.1429 / IDW 0.1299)</li>
                      <li>• Map Algebra로 픽셀 단위 종합 적합도 산출</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">결과 분류</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Jenks Natural Breaks 기준 3등급 분류</li>
                      <li>• 적합 / 보통 / 부적합 지역 도출</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 분석 결과 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 분석 결과</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ 적합 지역</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 인구 밀도 낮고, 경사 완만하며</li>
                      <li>• 자연보호구역과 충분히 이격된 도심 외곽 지역</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">❌ 부적합 지역</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 도심 밀집 지역</li>
                      <li>• 급경사지 및 보호구역 인접 지역</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">분석 결과는 선행 연구에서 제시한 "완경사지 · 저인구 · 저환경민감 지역" 조건과 높은 일치성을 보임.</p>
              </div>

              {/* 프로젝트를 통해 배운 점 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-3">🧠 프로젝트를 통해 배운 점</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">공간문제는 단일 지표가 아닌 <strong>다변량 의사결정 문제</strong>임을 체감</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Map Algebra와 SetNull 처리를 통해 GIS가 정책·환경 계획에서 <strong>현실 제약을 반영하는 도구</strong>가 될 수 있음을 경험</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">공간분석은 '정답을 찾는 것'이 아니라 <strong>합리적인 선택지를 좁히는 과정</strong>이라는 인식 확립</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fleamarket Project Modal */}
      {activeModal === 'fleamarketProject' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Header Images */}
            <div className="w-full bg-gradient-to-r from-orange-50 to-amber-100 p-4">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/projects/fli_2.png"
                  alt="플리마켓 최적 입지 공간분석 1"
                  className="w-full h-64 object-contain rounded-lg"
                />
                <img
                  src="/projects/fli_1.png"
                  alt="플리마켓 최적 입지 공간분석 2"
                  className="w-full h-64 object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🛍️ 플리마켓 최적 입지 도출 및 사물주소 활용 방안</h2>
              <p className="text-lg text-purple-600 font-semibold mb-1">생활인구·대중교통 데이터 기반 플리마켓 입지 적합성 분석</p>
              <p className="text-sm text-gray-500 mb-6">2025년 4~6월 · 3인 팀 프로젝트 · 주소정보 활용 산업 아이디어 공모전 출품</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">생활인구·교통 데이터를 활용해 플리마켓 최적 입지를 분석하고, 사물주소 체계를 결합해 운영과 안내까지 연결한 공간분석 프로젝트</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900">3인 팀 프로젝트</p>
                </div>
              </div>

              {/* 사용 기술 */}
              {/* 사용 데이터 & 기술 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 사용 데이터 & 기술</h3>
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2"><strong>Tool:</strong> ArcGIS</p>
                  <p className="text-sm text-gray-700 mb-2"><strong>Analysis:</strong> 공간중첩분석, AHP 가중치 분석, 버퍼 분석</p>
                  <p className="text-sm text-gray-700"><strong>Application:</strong> 주소정보 체계 설계, 사물주소 활용 방안</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">사용 데이터</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 100m 격자 단위 상주 인구 밀도 데이터</li>
                    <li>• 버스·지하철 정류장별 승하차 인원 데이터</li>
                    <li>• 문화·체육시설 위치 데이터</li>
                    <li>• 공영 주차장 위치 데이터</li>
                    <li>• 환경부 토지피복도 (설치 가능 공간 필터링)</li>
                  </ul>
                </div>
              </div>

              {/* 프로젝트 추진체계 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👥 프로젝트 추진체계</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>데이터 수집</strong> → <strong>분석</strong> → <strong>시각화</strong> → <strong>정책 제안</strong>의 흐름으로 프로젝트를 진행하며, 정례 회의를 통해 진행 상황을 점검하고 문제를 해결
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">데이터 수집·전처리</span>
                    </div>
                    <p className="text-sm text-gray-700">데이터 및 버스 이용 데이터 수집 (POI, 토지이용 등), 데이터 전처리 및 분석용 포맷 변환</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">GIS 공간분석</span>
                    </div>
                    <p className="text-sm text-gray-700">수집된 데이터를 GIS에 매핑, AHP 기반 중첩 분석을 통해 적합도 평가 수행, 격자별 점수 산정과 토지피복도 반영을 통해 최종 적지 도출</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">시각화 및 결과 도출</span>
                      <span className="text-sm text-purple-600 font-semibold">본인 담당</span>
                    </div>
                    <p className="text-sm text-gray-700">분석 결과를 지도와 그래프로 시각화, 후보지 분포도 작성, 최종 선정 후보지에 대한 인포그래픽 제작 및 보고서 작성</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">정책 제안 및 검증</span>
                    </div>
                    <p className="text-sm text-gray-700">사물주소 부여 방안 마련 및 행정적 효과 분석, 유관 정책 및 사례 조사</p>
                  </div>
                </div>
              </div>

              {/* 프로젝트 배경 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📋 프로젝트 배경 및 필요성</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• 플리마켓은 지역 상권 활성화와 시민 참여를 동시에 유도할 수 있는 도시형 이벤트</li>
                    <li>• 실제 운영에서는 <strong>입지 선정 실패</strong>로 낮은 방문율과 셀러 수익 저하가 반복 발생</li>
                    <li>• 대부분 경험이나 직관에 의존해 장소를 선정하며, <strong>요일·시간대별 유동 패턴이나 교통 접근성</strong>을 체계적으로 고려하지 못함</li>
                    <li>• 공간정보를 활용해 플리마켓 입지를 과학적으로 분석하고, <strong>사물주소 기반 위치 안내 체계</strong>를 함께 제안</li>
                  </ul>
                </div>
              </div>

              {/* 프로젝트 목표 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 프로젝트 목표</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">생활인구와 교통 접근성을 기반으로 플리마켓 개최에 <strong>적합한 공간 도출</strong></p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">입지 특성에 따라 <strong>평일형 / 주말형 / 혼합형</strong> 플리마켓 운영 유형 분류</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">선정된 공간에 <strong>사물주소</strong>를 부여해 홍보·안내·운영 효율을 높이는 활용 방안 제시</p>
                  </li>
                </ul>
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-500 mb-1">분석 범위</p>
                  <p className="text-sm text-gray-700"><strong>공간적 범위:</strong> 인천 연수구 전역</p>
                  <p className="text-sm text-gray-700"><strong>분석 대상:</strong> 공원·광장 등 개방형 공공공간</p>
                </div>
              </div>

              {/* 활용 데이터 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 사용 데이터 및 분석 범위</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">대중교통 데이터</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 버스 정류장별 일평균 승·하차 인원</li>
                      <li>• 기준: <strong>일 2,000명 이상</strong> 정류장</li>
                      <li>• 적용 버퍼: <strong>400m</strong> (보행 접근권 기준)</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">상주 인구 데이터</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>100m × 100m</strong> 격자 단위 인구 데이터</li>
                      <li>• 상위 20%~하위 20% <strong>5분위 구간화</strong></li>
                      <li>• 보행권 고려를 위해 <strong>300m 버퍼</strong> 확장</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">토지피복 데이터</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 환경부 토지피복도 (<strong>30m 해상도</strong>)</li>
                      <li>• 플리마켓 설치 가능 유형만 필터링:</li>
                      <li className="ml-4">- 문화·체육·휴양지역 (코드 140)</li>
                      <li className="ml-4">- 기타 초지 (코드 423)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 mb-2">보조 데이터</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 문화시설 POI</li>
                      <li>• 주차장 위치 데이터</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 분석 방법 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">⚙️ 공간분석 방법</h3>
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">1. 접근성 분석</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 버스 정류장 및 지하철역을 기준으로 <strong>400m 버퍼</strong> 생성</li>
                      <li>• 버스·지하철 접근성이 중첩되는 지역은 <strong>최고 접근성 구간</strong>으로 분류</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">2. 인구 밀도 분석</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 100m 격자 인구 데이터를 <strong>분위별로 분류</strong></li>
                      <li>• 각 구간에 점수 부여 후 <strong>300m 버퍼</strong> 생성</li>
                      <li>• <strong>Erase 기법</strong>을 활용해 중복 영역 제거</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">3. 다기준 의사결정 (AHP)</h4>
                    <p className="text-sm text-gray-500 mb-2">AHP 기법으로 산출한 가중치:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div className="flex justify-between bg-white rounded px-3 py-1">
                        <span>상주 인구 밀도</span>
                        <span className="font-semibold text-purple-600">0.318</span>
                      </div>
                      <div className="flex justify-between bg-white rounded px-3 py-1">
                        <span>대중교통 접근성</span>
                        <span className="font-semibold text-purple-600">0.274</span>
                      </div>
                      <div className="flex justify-between bg-white rounded px-3 py-1">
                        <span>문화시설 접근성</span>
                        <span className="font-semibold text-purple-600">0.226</span>
                      </div>
                      <div className="flex justify-between bg-white rounded px-3 py-1">
                        <span>주차장 접근성</span>
                        <span className="font-semibold text-purple-600">0.182</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">4. 중첩 분석</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 각 요소별 점수를 가중치와 곱해 <strong>종합 적합도 점수(Score_All)</strong> 생성</li>
                      <li>• 토지피복 필터 적용 후 <strong>실제 설치 가능한 후보지만</strong> 최종 도출</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 분석 결과 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📍 분석 결과</h3>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-2">플리마켓 적합 공간의 공통 특성</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 상주 인구가 충분히 확보된 <strong>주거지 인접 공원</strong></li>
                    <li>• 대중교통 접근성이 우수한 <strong>생활권 중심 공간</strong></li>
                    <li>• 문화시설 또는 상업시설과 인접한 <strong>체류형 공간</strong></li>
                    <li>• 토지피복상 임시 행사 설치가 가능한 <strong>개방형 공간</strong></li>
                  </ul>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-2">후보지 도출</p>
                    <p className="text-sm text-gray-700">연수구 전역에서 플리마켓 개최 적합 후보지 다수 도출, 최종 후보지는 <strong>6개 구역</strong>으로 군집화하여 관리 및 운영 용이성 확보</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-2">운영 유형 분류</p>
                    <p className="text-sm text-gray-700">각 후보지는 교통 이용 패턴을 기반으로 <strong>평일형 / 주말형 / 혼합형</strong> 운영 유형으로 구분</p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 italic">→ 단순한 '좋은 장소'가 아닌 <strong>운영 전략까지 고려한 입지 평가</strong> 가능</p>
                </div>
              </div>

              {/* 사물주소 활용 방안 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏷️ 사물주소 적용 방안</h3>
                <p className="text-sm text-gray-600 mb-4">선정된 플리마켓 공간에 도로명 기반 사물주소를 부여하고, 행사 내부의 각 부스에는 임시 가상주소 체계를 적용하는 방안을 제안</p>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">주소 체계 설계</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>행사장 전체에 <strong>도로명 기반 공간주소</strong> 부여</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>행사 내부 부스에는 <strong>기간 한정 임시 가상주소</strong>(@@-마켓명-부스명) 부여</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-3">기대 효과</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>지도 앱 검색을 통한 <strong>정확한 위치 안내</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>부스별 <strong>디지털 프로필 제공</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>응급 상황 발생 시 <strong>정확한 위치 전달</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>행사 종료 후 <strong>자동 소멸되는 주소 수명주기 관리</strong></span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 border border-purple-300 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">🖥️ 프로토타입 시연</h4>
                    <p className="text-sm text-gray-700">실제 프로토타입을 제작해 <strong>지도 연동 기반 시스템 시연</strong>까지 수행</p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 mt-4 text-center">
                  <p className="text-sm text-gray-600 italic">→ 플리마켓은 <strong>"분석된 공간 + 주소로 설명 가능한 장소"</strong>로 확장</p>
                </div>
              </div>

              {/* 담당 역할 상세 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 담당 역할 상세</h3>
                <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700"><strong>GIS 기반 공간분석 설계 및 수행</strong></p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">버퍼·중첩·<strong>Erase·Union</strong> 등 공간분석 프로세스 구축</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">분석 결과 <strong>지도 및 인포그래픽 시각화</strong></p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">후보지 해석 및 <strong>정책·행정 활용 방안 정리</strong></p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700"><strong>사물주소 적용 시나리오 설계</strong> 및 서비스 구조 제안</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 프로젝트 의의 및 한계 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-3">💡 프로젝트 의의 및 한계</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-green-700 mb-1">✅ 의의</p>
                    <p className="text-sm text-gray-700">공간분석을 통해 플리마켓 입지 선정 문제를 <strong>데이터 기반으로 재정의</strong>하고, 주소정보 활용까지 연결한 <strong>공간정보 융합형 기획 프로젝트</strong></p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-700 mb-1">⚠️ 한계</p>
                    <p className="text-sm text-gray-700">통신사 유동인구 데이터 등 고정밀 자료를 활용하지 못해 일부 분석은 대중교통·인구 데이터를 통한 <strong>간접 추정에 의존</strong> → 향후 실시간 유동 데이터와 연계해 분석 정밀도 향상 가능</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Self Grow Modal */}
      {activeModal === 'selfGrow' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Header Image */}
            <div className="w-full h-72 bg-gradient-to-r from-green-50 to-emerald-100 flex items-center justify-center">
              <img
                src="/projects/selfgrow.png"
                alt="Self Grow 스마트 화분"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🌱 Self Grow: 빛을 따라 자유롭게 성장하는 스마트 화분</h2>
              <p className="text-lg text-purple-600 font-semibold mb-1">2024 한이음 ICT 멘토링 프로젝트 · 구현 과제 (미선정)</p>
              <p className="text-sm text-gray-500 mb-6">구현 전제 프로젝트 · 임베디드 / 공간정보</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2024.02.02 ~ 2024.04.01</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900">3인 팀 프로젝트</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">프로젝트 개요</p>
                  <p className="text-sm text-gray-700">2024 한이음 ICT 멘토링 프로젝트에서 실제 제작을 목표로 과제가 제시된 프로젝트로, SLAM 기반 자율 이동 스마트 화분 시스템을 제안했습니다. 프로젝트는 구현 단계를 전제로 설계되었으나, 과제 선정 과정에서 최종 선정되지 않아 실제 제작 단계로는 진행되지 못했습니다. 다만, 구현을 염두에 둔 기술 구조 설계와 시스템 흐름까지는 구체적으로 준비했습니다.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">SLAM과 센서 기반 공간 인식을 활용해 스마트 화분이 실내 환경에서 스스로 위치를 인식하고 햇빛이 가장 잘 드는 위치로 이동하도록 구현을 전제로 설계한 임베디드·공간정보 프로젝트</p>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">프로젝트 아이디어 기획 및 기술 방향 설정</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">SLAM 기반 공간 인식 및 자율 이동 구조 설계</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">센서(LiDAR, Camera) 구성 및 데이터 활용 흐름 정의</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">구현 가능성을 고려한 시스템 아키텍처 설계</p>
                  </li>
                </ul>
              </div>

              {/* 주요 설계 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 설계 내용 (구현 전제)</h3>

                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">SLAM 기반 실내 공간 인식 구조</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• LiDAR와 카메라 센서를 활용해 실내 환경을 인식하는 구조 설계</li>
                      <li>• SLAM을 통해 화분의 위치를 추정하고 이동 경로를 계획하는 흐름 정의</li>
                      <li>• 로봇·자율주행 기술을 일상적인 IoT 기기에 적용하는 시도</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">최적 위치 탐색 및 이동 시나리오</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• 조도 센서 데이터를 기반으로 햇빛이 가장 잘 드는 위치 탐색</li>
                      <li>• 고정형 스마트 화분이 아닌, 스스로 이동하는 생장 환경 제공 개념 제안</li>
                      <li>• 자율 이동이 실제 사용자 문제를 해결하는지에 대한 타당성 검토</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">식물 상태 관리 시스템 설계</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• 카메라 기반 영상 분석으로 식물 생장 상태를 확인하는 구조 설계</li>
                      <li>• 자동 급수 시스템을 연동한 관리 흐름 정의</li>
                      <li>• 사용자 개입을 최소화하는 방향으로 시스템 시나리오 구성</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 기술적 고민 및 배운 점 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧠 기술적 고민 및 배운 점</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">SLAM과 센서 기술을 구현 관점에서 어떻게 적용할 수 있는지 구체적으로 고민</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">기술적으로 가능한 것과 사용자에게 실제로 필요한 것의 차이를 인식</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">구현 이전 단계에서 아이디어의 실용성을 검증하는 과정의 중요성을 체감</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">임베디드·공간정보 기술을 서비스로 연결하는 시각을 얻음</p>
                  </li>
                </ul>
              </div>

              {/* 프로젝트 후기 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-3">📝 프로젝트 후기</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  실제 제작을 목표로 준비했던 프로젝트였지만, 과제 선정 단계에서 탈락하며 구현까지 이어지지는 못했습니다.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  그럼에도 불구하고 SLAM, 센서, 공간정보 기술을 단순한 개념이 아니라 실제 구현을 전제로 설계해본 경험은 이후 프로젝트에서 기술 선택과 실용성을 함께 고려하는 데 큰 기준점이 되었습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rescue Route Modal */}
      {activeModal === 'rescueRoute' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Header Image */}
            <div className="w-full h-72 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
              <img
                src="/projects/rescue_route_detail.png"
                alt="응급차량 경로 최적화 시스템"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🏆 실시간 교통 데이터 기반 응급차량 경로 최적화 시스템</h2>
              <p className="text-lg text-purple-600 font-semibold mb-1">제6회 공간정보 활용 경진대회 · 최우수상 (민간 아이디어 부문)</p>
              <p className="text-sm text-gray-500 mb-6">팀 프로젝트 · 공간정보 서비스 기획 및 설계 | 2024.09 ~ 2024.10</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2024.09 ~ 2024.10</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">주최 / 주관</p>
                  <p className="text-base font-semibold text-gray-900">공간정보산업진흥원</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900">4인 팀 프로젝트 (팀장)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">실시간 교통 데이터와 AI 알고리즘을 결합해 응급차량의 '골든타임'을 확보하고, 민간 차량의 자발적 우회를 유도하여 공공 안전 시너지를 창출하는 공간정보 기반 지능형 교통 시스템(ITS) 기획 프로젝트입니다.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">블로그 링크</p>
                  <a
                    href="https://blog.naver.com/rlawls1448/223631106628"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    프로젝트 회고록 보기
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할: 팀장 및 서비스 기획 총괄</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">아이디어 발굴 및 문제 정의</p>
                      <p className="text-xs text-gray-600 mt-1">도심 교통 체증 및 병원 수용 정보 부재로 인한 응급차량 지체 문제를 정의하고, 골든타임 확보를 위한 핵심 가치 설정</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">공간정보 활용 시나리오 설계</p>
                      <p className="text-xs text-gray-600 mt-1">국가교통정보센터 및 국립중앙의료원 데이터를 결합한 서비스 흐름 설계</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">기술 로직 및 알고리즘 제안</p>
                      <p className="text-xs text-gray-600 mt-1">A* 알고리즘 가중치 설계 및 민간 차량 유도를 위한 클러스터링/시계열 분석 모델 도입 제안</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">시스템 아키텍처 및 API 설계</p>
                      <p className="text-xs text-gray-600 mt-1">Express.js 기반 API 구조 및 Leaflet.js를 활용한 GeoJSON 시각화 방안 수립</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">제안서 작성 및 발표 주도</p>
                      <p className="text-xs text-gray-600 mt-1">논리적인 문서 구조 설계와 시각화 자료 구성을 통해 최우수상 수상 견인</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* 주요 기획 및 기술 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 기획 및 기술 내용</h3>

                {/* 1. 데이터 기반 응급실 및 최적 경로 선정 */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-3">1. 데이터 기반 응급실 및 최적 경로 선정</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-800 mb-2">▸ 실시간 병원 가용 정보 통합</p>
                      <p className="text-xs text-gray-600">국립중앙의료원의 실시간 병상 정보와 환자의 중증도를 AI가 분석하여 최적의 목적지 병원 자동 지정</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-800 mb-2">▸ 가중치 반영 A* 알고리즘 (Weighted A*)</p>
                      <p className="text-xs text-gray-600 mb-2">단순 최단거리가 아닌, 실시간 도로 상황을 반영한 5가지 핵심 가중치를 적용하여 경로 산출</p>
                      <ul className="space-y-1 ml-3">
                        <li className="text-xs text-gray-600">• <strong>양보 확률 가중치:</strong> 도로별 과거 양보 데이터를 기반으로 통과 용이성 계산</li>
                        <li className="text-xs text-gray-600">• <strong>교통 혼잡도 가중치:</strong> 실시간 노드 밀도 및 도로 최대 용량 반영</li>
                        <li className="text-xs text-gray-600">• <strong>도로 인프라 가중치:</strong> 차선 수, 교차로 및 신호등 개수 반영</li>
                        <li className="text-xs text-gray-600">• <strong>돌발 상황 가중치:</strong> 사고, 공사, 기상 상황 등에 따른 위험도 적용</li>
                        <li className="text-xs text-gray-600">• <strong>VMS(전광표지) 연동:</strong> 도로 메시지 기반 정체 구간 가중치 상향</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2. 민간 차량 우회 및 양보 유도 시스템 */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-3">2. 민간 차량 우회 및 양보 유도 시스템</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-800 mb-2">▸ 군집 분석을 통한 알림 범위 설정</p>
                      <p className="text-xs text-gray-600">DBSCAN 및 K-means 알고리즘으로 경로 주변의 차량 밀집도를 분석하여 효율적인 알람 전송 지역 식별</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-800 mb-2">▸ 미래 위치 예측 모델</p>
                      <p className="text-xs text-gray-600">상태 공간 모델(State Space Model)과 ARIMA 시계열 분석을 통해 민간 차량의 이동 패턴을 예측하고, 응급차량 접근 전 사전 알림 전송</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-800 mb-2">▸ 상황별 맞춤형 유도 로직</p>
                      <ul className="space-y-1 ml-3">
                        <li className="text-xs text-gray-600">• <strong>차선 비워두기:</strong> 500m 이내 접근 시 차선 변경 또는 양보 권유 메시지 송출</li>
                        <li className="text-xs text-gray-600">• <strong>우회 경로 제시:</strong> 응급차량 경로와 겹치는 정도를 페널티로 부여하여 민간 차량용 최적 우회로 탐색</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 3. 서비스 구현 및 확장성 설계 */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-800 mb-3">3. 서비스 구현 및 확장성 설계</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-800 mb-2">▸ 시각화 및 데이터 전송</p>
                      <p className="text-xs text-gray-600">WebSocket을 활용한 실시간 위치 공유와 GeoJSON 형식을 이용한 지도 렌더링(Leaflet.js) 설계</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-800 mb-2">▸ OTA(Over-the-Air) 업데이트</p>
                      <p className="text-xs text-gray-600">커넥티드 카 서비스(블루링크 등)를 통해 기존 차량 내비게이션에 소프트웨어 업데이트 방식으로 즉시 도입 가능한 구조 제안</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-800 mb-2">▸ 도메인 확장</p>
                      <p className="text-xs text-gray-600">구급차 외에도 소방차, 경찰차 등 긴급 출동 차량 및 스마트 시티 물류 최적화 시스템으로의 확장 가능성 제시</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 기획적 고민 및 배운 점 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧠 기획적 고민 및 배운 점</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">공간정보의 의사결정 도구화</p>
                      <p className="text-xs text-gray-600 mt-1">지도를 단순 시각화 매체로 보는 것을 넘어, 실시간 가중치와 예측 모델을 결합했을 때 공공 안전 분야에서 강력한 의사결정 도구가 될 수 있음을 체감함</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">데이터 전처리의 중요성</p>
                      <p className="text-xs text-gray-600 mt-1">GPS 오차 보정, 결측치 보간, 좌표계 변환 등 수집된 날것의 데이터를 GIS 데이터와 매핑하는 과정에서 데이터 정제 능력의 중요성을 학습함</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">사용자 관점의 기술 설계</p>
                      <p className="text-xs text-gray-600 mt-1">기술적 정교함도 중요하지만, 운전자가 방해받지 않으면서도 자발적으로 협조할 수 있게 하는 UI/UX 시나리오(우회로 추천 등)가 서비스 성패의 핵심임을 깨달음</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">팀 리딩 및 문서화 역량</p>
                      <p className="text-xs text-gray-600 mt-1">복잡한 알고리즘과 데이터 흐름을 시각적인 제안서로 구조화하고, 팀원 간의 역할을 조율하며 프로젝트의 완성도를 높이는 경험을 쌓음</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* 활용 데이터 및 스택 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📝 활용 데이터 및 스택</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">Data</p>
                    <p className="text-xs text-gray-600">국가교통정보센터(교통 소통/예측/돌발/CCTV/노드링크), 국립중앙의료원(응급실 가용병상)</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">Algorithm</p>
                    <p className="text-xs text-gray-600">Weighted A*, DBSCAN, K-means, State Space Model, ARIMA</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">Tech (Proposed)</p>
                    <p className="text-xs text-gray-600">Node.js (Express), WebSocket, Leaflet.js, GeoJSON, OTA</p>
                  </div>
                </div>
              </div>

              {/* 수상 후기 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📝 수상 후기</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  공간정보를 활용해 응급 상황에서 실제로 도움이 될 수 있는 서비스를 구상하면서 <strong>공간정보 기술이 사람의 삶과 직접 맞닿아 있다는 점</strong>을 처음으로 실감하게 되었습니다.
                  <br /><br />
                  아이디어 발굴부터 제안서 작성까지 전 과정을 주도하며, 공간정보 기술의 사회적 가치와 실제 활용 가능성을 인정받아 <strong>최우수상</strong>이라는 성과로 이어질 수 있었습니다.
                  <br /><br />
                  또한 이 대회에서 다른 참가자들이 직접 개발해 온 서비스들을 보며, <strong>서비스 개발</strong>에 대한 관심을 갖게 된 계기가 되었습니다.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Digital Twin Modal */}
      {activeModal === 'digitalTwin' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Header Image */}
            <div className="w-full h-72 bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-center">
              <img
                src="/projects/digital_twin.png"
                alt="농어촌 디지털 트윈 서비스"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🌾 디지털 트윈 기반 농촌 생활 커뮤니티 관리 플랫폼</h2>
              <p className="text-lg text-purple-600 font-semibold mb-1">농어촌 디지털 트윈 서비스 아이디어 경진대회 · 장려상 🥉</p>
              <p className="text-sm text-gray-500 mb-6">1인 출품작 · 서비스 기획 / 공간정보</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2024.09 ~ 2024.10</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">주관</p>
                  <p className="text-base font-semibold text-gray-900">포스텍 미래도시연구센터</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900">1인 출품작</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">농촌 지역의 고령화와 디지털 격차 문제를 해결하기 위해 디지털 트윈과 음성 기반 AI 인터페이스를 결합한 농촌 생활 커뮤니티 관리 플랫폼을 제안한 아이디어 중심의 서비스 기획 프로젝트</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">블로그 링크</p>
                  <a
                    href="https://blog.naver.com/rlawls1448/223648587549"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-purple-600 hover:underline flex items-center gap-1"
                  >
                    프로젝트 회고록 보기
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">농촌 고령층의 디지털 접근성 문제 정의</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">디지털 트윈 기반 서비스 구조 기획</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">사용자(고령층) 관점의 기능 시나리오 설계</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">제안서 스토리라인 구성 및 사회적 가치 정리</p>
                  </li>
                </ul>
              </div>

              {/* 주요 기획 내용 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 기획 내용</h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">▸ 문제 정의: 농촌 고령화와 디지털 격차</p>
                    <ul className="space-y-1 ml-3">
                      <li className="text-xs text-gray-600">• 농촌 지역의 고령 인구 증가와 디지털 서비스 접근성 문제에 주목</li>
                      <li className="text-xs text-gray-600">• 기존 디지털 서비스가 고령층에게는 오히려 진입 장벽이 된다는 점을 문제로 설정</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">▸ 디지털 트윈 기반 농촌 생활 관리 플랫폼</p>
                    <ul className="space-y-1 ml-3">
                      <li className="text-xs text-gray-600">• 농촌 지역의 인프라(전력, 급수 등)를 디지털 트윈으로 시각화</li>
                      <li className="text-xs text-gray-600">• 지역 자원과 생활 정보를 한 플랫폼에서 통합 관리하는 구조 제안</li>
                      <li className="text-xs text-gray-600">• 문제 발생 가능 지점을 사전에 파악하고 빠르게 대응할 수 있는 구조 설계</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">▸ 음성 기반 AI 비서를 활용한 접근성 개선</p>
                    <ul className="space-y-1 ml-3">
                      <li className="text-xs text-gray-600">• 고령층이 복잡한 조작 없이 서비스를 이용할 수 있도록 음성 기반 AI 비서 중심 UI/UX 제안</li>
                      <li className="text-xs text-gray-600">• 앱을 직접 조작하지 않아도: 생활 정보 조회, 건강 상태 확인, 이상 발생 시 가족·지역 보건소 자동 알림 가능</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">▸ 커뮤니티 중심 서비스 설계</p>
                    <ul className="space-y-1 ml-3">
                      <li className="text-xs text-gray-600">• 주민 간 소통을 지원하는 커뮤니티 기능 제안</li>
                      <li className="text-xs text-gray-600">• 고립되기 쉬운 농촌 고령층의 사회적 연결 강화</li>
                      <li className="text-xs text-gray-600">• 디지털 기술을 통해 삶의 질을 실질적으로 개선하는 방향에 초점</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 기획 배경 및 고민 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧠 기획 배경 및 고민</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">디지털 기술은 복잡해서 어려운 것이 아니라, 누구를 위해 어떻게 설계하느냐에 따라 접근성이 달라진다는 관점에서 출발</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">실제 가족(할머니)의 디지털 기기 사용 경험에서 아이디어를 얻어 "기술을 줄이는 설계"의 중요성을 고민</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">기술 구현보다 사회적 문제 정의와 서비스 시나리오의 설득력에 집중</p>
                  </li>
                </ul>
              </div>

              {/* 프로젝트 후기 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📝 프로젝트 후기</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  이번 공모전은 디지털 트윈과 AI 기술을 단순한 기술 요소가 아니라, <strong>사회적 문제를 해결하는 수단</strong>으로 바라보게 된 계기였습니다.
                  <br /><br />
                  아직 모든 기술을 구현할 수 있는 단계는 아니었지만, 디지털 기술이 고령층의 삶을 더 편리하게 만들 수 있다는 가능성을 <strong>서비스 기획 관점에서 구체화</strong>해볼 수 있었던 의미 있는 경험이었습니다.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Ocean Trash Modal */}
      {activeModal === 'oceanTrash' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Header */}
            <div className="w-full h-32 bg-gradient-to-r from-cyan-50 to-blue-100 flex items-center justify-center">
              <span className="text-6xl">🌊</span>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🌊 대국민 디지털 트윈 아이디어 공모전</h2>
              <p className="text-lg text-purple-600 font-semibold mb-1">디지털 트윈 기반 해류 및 지형 분석을 통한 해양 쓰레기 근원 추적 및 예방 시스템</p>
              <p className="text-sm text-gray-500 mb-6">공모전 프로젝트 · 디지털 트윈 / 공간정보 / 환경</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2024.09</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">공모전 개요</p>
                  <p className="text-sm text-gray-700">대국민 디지털 트윈 아이디어 공모전은 디지털 트윈과 공간 데이터를 활용해 사회적 문제를 해결할 수 있는 창의적인 아이디어를 제안하는 공모전입니다. 본 프로젝트는 해양 쓰레기 문제를 대상으로, 기존의 '쓰레기 밀집 지역 분석' 중심 접근에서 벗어나 문제의 발생 원인을 공간적으로 추적해보는 관점에서 아이디어를 제안했습니다.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900">팀 프로젝트 (3인)</p>
                  <p className="text-xs text-gray-500 mt-1">※ 본인 역할: 해양 쓰레기 문제의 공간적 재정의 / 해류·해저 지형 데이터 활용 아이디어 구상 / 디지털 트윈 활용 시나리오 구조화 / 팀 아이디어 정리 및 제안서 구성 보조</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">해류와 해저 지형이라는 공간 변수를 디지털 트윈 환경에 결합해, 해양 쓰레기 문제를 '결과(집적)'가 아닌 '원인(발생 근원)' 관점에서 해석해보는 방법을 고민한 디지털 트윈 기반 아이디어 공모전 프로젝트</p>
                </div>
              </div>

              {/* 역할 상세 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할 상세</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">해양 쓰레기 문제를 공간정보 관점에서 재정의</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">해류·지형 데이터가 쓰레기 이동에 미치는 영향 분석 관점 제시</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">디지털 트윈 환경에서 데이터 결합 흐름 설계</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">'역추적'이라는 접근 방식이 갖는 의미와 한계 정리</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">팀 내 아이디어 논의 정리 및 문서화</p>
                  </li>
                </ul>
              </div>

              {/* 주요 아이디어 및 접근 방식 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 아이디어 및 접근 방식</h3>

                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">1. 기존 해양 쓰레기 분석 방식의 한계 인식</h4>
                    <p className="text-sm text-gray-700 mb-2">기존 해양 쓰레기 관련 연구와 서비스는 대부분 쓰레기가 <strong>어디에 많이 쌓이는지(집적 지역)</strong>를 분석하는 데 초점을 맞추고 있었습니다.</p>
                    <p className="text-sm text-gray-700">그러나 이러한 접근은 이미 문제가 발생한 이후의 상황을 다룬다는 한계를 가진다고 판단했고, 본 프로젝트에서는 <strong>"쓰레기는 어디서부터 시작되었는가"</strong>라는 질문에서 출발했습니다.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">2. 해류·해저 지형 기반 '근원 역추적' 관점</h4>
                    <p className="text-sm text-gray-700 mb-2">해양 쓰레기는 해류, 조류, 해저 지형 등 다양한 공간적·환경적 요인에 의해 이동합니다. 이에 따라:</p>
                    <ul className="space-y-1 text-sm text-gray-700 ml-4">
                      <li>• 위성 기반 해류 데이터</li>
                      <li>• 해저 지형 정보</li>
                      <li>• 해양 환경 변수</li>
                    </ul>
                    <p className="text-sm text-gray-700 mt-2">등을 디지털 트윈 환경에 통합해, 쓰레기의 이동 경로를 <strong>거꾸로 해석(역추적)</strong>함으로써 발생 가능 지역을 추정하는 아이디어를 제안했습니다.</p>
                    <p className="text-sm text-gray-700 mt-2">이 접근은 단순한 시뮬레이션을 넘어, <strong>공간정보를 활용한 원인 중심 분석</strong>이라는 점에서 기존 방식과 차별점을 가집니다.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">3. 예방 중심의 디지털 트윈 활용 시나리오</h4>
                    <p className="text-sm text-gray-700 mb-2">본 아이디어의 궁극적인 목표는 쓰레기가 쌓인 이후의 대응이 아니라, <strong>사전에 문제를 줄이는 것</strong>이었습니다. 이를 위해:</p>
                    <ul className="space-y-1 text-sm text-gray-700 ml-4">
                      <li>• 발생 가능성이 높은 지역을 공간적으로 도출하고</li>
                      <li>• 해당 지역을 대상으로 정책적 개입, 관리 강화, 교육 캠페인 등을 제안하는</li>
                    </ul>
                    <p className="text-sm text-gray-700 mt-2"><strong>예방 중심 디지털 트윈 활용 시나리오</strong>를 구상했습니다.</p>
                    <p className="text-sm text-gray-700 mt-2">디지털 트윈을 '현상을 보여주는 도구'가 아니라 <strong>의사결정을 돕는 도구</strong>로 활용하려는 관점이 핵심이었습니다.</p>
                  </div>
                </div>
              </div>

              {/* 한계와 기술적 고민 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧠 한계와 기술적 고민</h3>
                <p className="text-sm text-gray-700 mb-3">아이디어를 구체화하는 과정에서, 해류 분석의 높은 복잡성과 현실적인 제약도 명확히 드러났습니다.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">해류는 기후·환경 요인에 따라 지속적으로 변화하며</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">이를 정밀하게 모델링하기 위해서는 방대한 데이터와 연산 자원이 필요</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">제한된 공모전 환경에서는 이를 충분히 검증·구현하기 어려웠음</p>
                  </li>
                </ul>
                <p className="text-sm text-gray-700 mt-3">이로 인해, 아이디어의 이론적 가능성에 비해 현실적인 구현 난이도가 높다는 점이 본 프로젝트의 한계로 작용했습니다.</p>
              </div>

              {/* 프로젝트 후기 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-3">📝 프로젝트 후기</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  본선 진출에는 이르지 못했지만, 이번 공모전을 통해 디지털 트윈과 공간정보 기술이 환경 문제를 다루는 데 어떤 방식으로 활용될 수 있는지를 깊이 고민해볼 수 있었습니다.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  특히 <strong>결과가 아닌 원인에 주목하는 공간적 사고 방식</strong>이 복잡한 사회·환경 문제를 바라보는 데 중요한 관점이 될 수 있음을 체감했습니다.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  이 경험은 이후 다른 디지털 트윈 및 공간정보 프로젝트에서도 문제를 정의하는 방식과 기술을 바라보는 시각에 큰 영향을 주었습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suwon Safety Modal */}
      {activeModal === 'suwonSafety' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Header Image */}
            <div className="w-full h-72 bg-gradient-to-r from-slate-50 to-gray-100 flex items-center justify-center">
              <img
                src="/projects/suwon.png"
                alt="수원형 도시안전 서비스"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🛡️ 시민체감 수원형 도시안전 서비스 아이디어톤</h2>
              <p className="text-lg text-purple-600 font-semibold mb-1">지능형 CCTV 경보기 '망루'</p>
              <p className="text-sm text-gray-500 mb-6">아이디어톤 프로젝트 · 도시안전 / 공간정보(GIS) / 서비스 기획</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2024.09.23 ~ 2024.10.25</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">대회 개요</p>
                  <p className="text-sm text-gray-700">시민체감 수원형 도시안전 서비스 아이디어톤은 도시 내 안전 문제를 시민의 일상 관점에서 바라보고, 기술과 디자인, 사회적 가치를 결합한 해결책을 제안하는 아이디어톤 대회입니다. 본 프로젝트는 수원시의 도시 안전 문제를 대상으로, 공간정보와 AI 기술을 활용해 범죄를 사후 대응이 아닌 사전 예방 관점에서 다루는 방법을 고민하며 아이디어를 제안했습니다.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900">4인 팀 (다학제 협업)</p>
                  <p className="text-xs text-gray-500 mt-1">전자공학 / 공간정보공학 / 산업디자인 / 토목공학 전공 참여</p>
                  <p className="text-xs text-gray-500 mt-1">※ 본인 역할: 공간정보(GIS) 기반 위험 지역 분석, 데이터 시각화, 자원 배치 전략 구상</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">범죄 데이터를 공간적으로 분석해 취약 지역을 도출하고, 지속 가능한 에너지와 AI 기반 분석을 결합해 도시 안전을 능동적으로 관리하는 서비스 구조를 고민한 아이디어톤 프로젝트</p>
                </div>
              </div>

              {/* 역할 상세 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할 상세</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">범죄 데이터와 인구 밀도를 활용한 공간적 위험도 분석</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">GIS 기반 범죄 취약 지역 도출</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">분석 결과의 시각화 및 지도 표현</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">공간 분석 결과를 바탕으로 한 자원 배치 전략 구상</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">공간정보 분석을 서비스 기획 흐름에 연결</p>
                  </li>
                </ul>
              </div>

              {/* 주요 아이디어 및 접근 방식 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 아이디어 및 접근 방식</h3>

                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">1. 도시 범죄 취약 지역에 대한 공간적 접근</h4>
                    <p className="text-sm text-gray-700 mb-2">도시 범죄는 단순히 발생 건수의 문제가 아니라, <strong>어디에서, 어떤 환경에서 반복되는가</strong>의 문제라고 판단했습니다.</p>
                    <p className="text-sm text-gray-700">이에 따라 범죄 발생 데이터와 인구 밀도 데이터를 결합해 공간 단위로 위험도를 산출하고, 범죄 취약 지역을 직관적으로 파악할 수 있도록 GIS 기반 시각화를 수행했습니다. 이를 통해 도시 안전 문제를 개별 사건이 아닌 <strong>공간 패턴의 문제</strong>로 바라보는 접근을 시도했습니다.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">2. 지능형 CCTV 경보기 '망루' 개념</h4>
                    <p className="text-sm text-gray-700 mb-2">본 프로젝트에서 제안한 '망루'는 단순한 CCTV 설치가 아닌, <strong>도시 안전 거점의 개념</strong>입니다.</p>
                    <ul className="space-y-1 text-sm text-gray-700 ml-4">
                      <li>• CCTV와 센서를 통해 실시간 데이터를 수집하고</li>
                      <li>• AI 기반 분석으로 이상 행동을 감지하며</li>
                      <li>• 필요 시 빠르게 대응할 수 있는 구조를 구상했습니다.</li>
                    </ul>
                    <p className="text-sm text-gray-700 mt-2">이는 사후 모니터링 중심의 기존 CCTV 활용 방식에서 벗어나, <strong>범죄를 사전에 억제하고 예방하는 방향</strong>으로 도시 안전 서비스를 재해석한 시도였습니다.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">3. 지속 가능한 전력 공급을 고려한 설계</h4>
                    <p className="text-sm text-gray-700">도시 내 모든 지역이 안정적인 전력 인프라를 갖추고 있지 않다는 점에 주목해, 태양광 패널과 수직축 풍력 터빈을 활용한 <strong>독립형 전력 공급 구조</strong>를 제안했습니다. 이는 기술적 실현 여부를 떠나, 도시 안전 인프라를 설계할 때 지속 가능성과 환경 요소를 함께 고려해야 한다는 문제의식에서 출발한 접근이었습니다.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">4. 공간정보 기반 자원 배치 전략</h4>
                    <p className="text-sm text-gray-700">GIS 분석을 통해 도출한 범죄 취약 지역을 바탕으로, 한정된 도시 안전 자원을 어디에 우선 배치해야 효과적인지를 고민했습니다. 단순히 장비를 많이 설치하는 것이 아니라, <strong>공간적 위험도가 높은 지역에 집중 배치</strong>함으로써 자원의 효율성을 높이는 전략을 서비스 구조 안에 녹이고자 했습니다.</p>
                  </div>
                </div>
              </div>

              {/* 한계와 배운 점 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧠 한계와 배운 점</h3>
                <p className="text-sm text-gray-700 mb-3">본 프로젝트는 제안서 단계에서 마무리되었고, 본선 진출에는 이르지 못해 실제 구현으로 이어지지는 못했습니다.</p>
                <p className="text-sm text-gray-700 mb-3">이 과정에서 <strong>기술적 가능성과 함께 실현 가능성을 설득력 있게 전달하는 것의 중요성</strong>을 크게 느꼈습니다.</p>
                <p className="text-sm text-gray-700">아이디어 자체의 완성도뿐 아니라, 왜 지금 필요한지, 실제로 어떻게 작동할 수 있는지를 명확히 보여주는 것이 중요하다는 점을 배웠습니다.</p>
              </div>

              {/* 프로젝트 후기 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-3">📝 프로젝트 후기</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  이번 아이디어톤을 통해 공간정보 기술이 단순한 데이터 분석을 넘어, <strong>도시 문제를 이해하고 의사결정을 돕는 핵심 도구</strong>가 될 수 있음을 깊이 체감했습니다.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  특히 GIS 기반 분석과 시각화가 도시 안전과 같은 복합적인 문제에서 문제를 구조적으로 바라보게 만드는 힘이 있다는 점을 알게 되었고, 이후 공간정보를 서비스와 정책 설계로 연결하는 관점에 큰 영향을 준 경험이었습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drone Contest Modal */}
      {activeModal === 'droneContest' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Header Image */}
            <div className="w-full h-72 bg-gradient-to-r from-sky-50 to-blue-100 flex items-center justify-center">
              <img
                src="/projects/drone.png"
                alt="드론 활용 경진대회"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🚁 제7회 서울특별시 드론 활용 경진대회</h2>
              <p className="text-lg text-purple-600 font-semibold mb-1">스마트 방제 GIS와 드론 기반 통합 관리 시스템</p>
              <p className="text-sm text-gray-500 mb-6">공모전 프로젝트 · 드론 / 공간정보(GIS) / 스마트 농업</p>

              {/* 기본 정보 */}
              <div className="mb-12">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">기간</p>
                  <p className="text-base font-semibold text-gray-900">2024.10.21 ~ 2024.11.28</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">대회 개요</p>
                  <p className="text-sm text-gray-700">제7회 서울특별시 드론 활용 경진대회는 드론 기술을 활용해 도시·환경·농업 등 다양한 사회 문제를 해결할 수 있는 창의적인 활용 방안을 제안하는 공모전입니다. 본 프로젝트는 병해충 문제를 대상으로, 드론과 GIS(공간정보 시스템)를 결합해 방제 작업을 보다 정밀하고 효율적으로 수행할 수 있는 관리 시스템을 고민하며 아이디어를 제안했습니다.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">팀 구성</p>
                  <p className="text-base font-semibold text-gray-900">팀 프로젝트</p>
                  <p className="text-xs text-gray-500 mt-1">※ 본인 역할: 공간정보(GIS) 기반 병해충 분포 분석 접근 설계, 방제 우선순위 도출 논리 정리, 아이디어 구조화</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">한 줄 소개</p>
                  <p className="text-sm text-gray-700">드론으로 수집한 병해충·환경 데이터를 GIS로 분석해 방제 대상 지역과 우선순위를 공간적으로 도출하고, 정밀 방제를 통해 환경 부담을 줄이는 방법을 고민한 드론·공간정보 융합 아이디어 프로젝트</p>
                </div>
              </div>

              {/* 역할 상세 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👨‍💻 역할 상세</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">병해충 문제를 공간적 관점에서 재정의</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">병해충 분포 데이터를 GIS로 해석하는 분석 흐름 구상</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">방제 우선순위 도출을 위한 공간 분석 논리 정리</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">드론 기반 정밀 방제 시나리오 구조화</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">팀 내 아이디어 정리 및 제안 내용 보완</p>
                  </li>
                </ul>
              </div>

              {/* 주요 아이디어 및 접근 방식 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ 주요 아이디어 및 접근 방식</h3>

                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">1. 병해충 문제에 대한 공간정보 기반 접근</h4>
                    <p className="text-sm text-gray-700 mb-2">기존의 방제 방식은 넓은 지역을 대상으로 한 일괄 방제가 주를 이루어, 자원 낭비와 환경 부담이 크다는 한계를 가진다고 판단했습니다.</p>
                    <p className="text-sm text-gray-700">이에 따라 본 프로젝트에서는 병해충 문제를 <strong>"어디에 얼마나 분포해 있는가"</strong>라는 공간 문제로 정의하고, GIS를 활용해 병해충 밀집 지역을 분석하는 접근을 시도했습니다.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">2. 드론 기반 데이터 수집과 GIS 분석 연계</h4>
                    <p className="text-sm text-gray-700 mb-2">드론에 탑재된 센서를 통해 병해충 분포와 주변 환경 정보를 수집하고, 이를 GIS 환경에서 시각화·분석해 병해충 밀도가 높은 지역과 방제가 시급한 구역을 도출하는 흐름을 구상했습니다.</p>
                    <p className="text-sm text-gray-700">이를 통해 방제 작업을 경험이나 감각이 아닌 <strong>데이터 기반 의사결정</strong>으로 전환하고자 했습니다.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">3. 방제 우선순위 분석과 정밀 방제 개념</h4>
                    <p className="text-sm text-gray-700 mb-2">GIS 분석을 통해 도출한 결과를 바탕으로 방제가 꼭 필요한 지역만 선별하고, 한정된 자원을 효율적으로 배치하는 <strong>정밀 방제 전략</strong>을 제안했습니다.</p>
                    <p className="text-sm text-gray-700">이는 기존의 무차별적 방제 방식에서 벗어나, 필요한 곳에만 최소한으로 개입함으로써 방제 효과는 높이고 환경 부담은 줄이려는 접근이었습니다.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">4. 지속 가능한 방제 관리 관점</h4>
                    <p className="text-sm text-gray-700">방제 결과 데이터를 축적해 향후 방제 계획 수립, 병해충 발생 패턴 분석 등에 활용할 수 있는 <strong>지속 가능한 관리 체계</strong>로 확장 가능한 구조를 함께 고민했습니다. 병해충 문제를 단기 대응이 아닌, 공간 데이터를 활용한 장기 관리 문제로 바라본 점이 핵심이었습니다.</p>
                  </div>
                </div>
              </div>

              {/* 한계와 배운 점 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🧠 한계와 배운 점</h3>
                <p className="text-sm text-gray-700 mb-3">아이디어를 구체화하는 과정에서, 병해충 데이터의 복잡성과 실시간 처리의 어려움이라는 현실적인 한계를 마주했습니다.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">정확한 병해충 분포 파악을 위한 데이터 확보의 어려움</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">실시간 분석을 위한 기술·자원적 제약</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">공모전 환경에서 이를 충분히 검증하기 어려운 점</p>
                  </li>
                </ul>
                <p className="text-sm text-gray-700 mt-3">이러한 이유로 본선 진출에는 이르지 못했지만, 공간정보 기반 접근의 가능성과 함께 현실적 제약을 동시에 고려해야 함을 깊이 깨닫는 계기가 되었습니다.</p>
              </div>

              {/* 프로젝트 후기 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-3">📝 프로젝트 후기</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  이번 경진대회를 통해 드론과 GIS 기술이 병해충 방제와 같은 환경 문제에서 얼마나 중요한 역할을 할 수 있는지를 분명히 느낄 수 있었습니다.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  특히 <strong>문제를 공간 데이터로 정의하고 해석하는 사고 방식</strong>이 기술적 해결책을 설계하는 데 필수적이라는 점을 체감했고, 이후 공간정보를 활용한 공공·환경 프로젝트를 바라보는 시각에 큰 영향을 준 경험이었습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Me Section */}
      <section id="contact" className="py-32 px-6 bg-gray-50" ref={observeElement}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="flex items-center justify-center gap-x-4 text-4xl md:text-5xl font-bold text-gray-900 px-4">
              <Mail className="w-8 h-8 md:w-10 md:h-10 text-blue-600" /> 문의
            </h2>
          </div>

          <p className="text-center text-base md:text-lg text-gray-600 mb-16 px-4">
            혹시 김진이 더 궁금해지셨나요?
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto px-4">
            <Card
              className={`bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer transform ${
                hasMounted && visibleSections.has("contact") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: hasMounted && visibleSections.has("contact") ? "0ms" : "0ms",
              }}
            >
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Github className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">GitHub</h3>
                <p className="text-sm text-gray-600 mb-2 md:mb-4 break-all">github.com/Jinacker</p>
                <p className="text-xs md:text-sm text-gray-500">소스 코드 저장소</p>
                <Button
                  className="mt-3 md:mt-4 bg-gray-900 hover:bg-gray-800 text-white text-sm md:text-base"
                  size="sm"
                  onClick={() => window.open("https://github.com/Jinacker", "_blank")}
                >
                  방문하기
                  <ExternalLink className="ml-2 w-3 h-3 md:w-4 md:h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card
              className={`bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer transform ${
                hasMounted && visibleSections.has("contact") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: hasMounted && visibleSections.has("contact") ? "100ms" : "0ms",
              }}
            >
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Blog</h3>
                <p className="text-sm text-gray-600 mb-2 md:mb-4 break-all">blog.naver.com/rlawls1448</p>
                <p className="text-xs md:text-sm text-gray-500">기록의 습관화</p>
                <Button
                  className="mt-3 md:mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base"
                  size="sm"
                  onClick={() => window.open("https://blog.naver.com/rlawls1448", "_blank")}
                >
                  방문하기
                  <ExternalLink className="ml-2 w-3 h-3 md:w-4 md:h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="border-t border-gray-700 pt-6 mt-6">
              <p className="text-gray-400 text-xs md:text-sm">© 2025 김진의 포트폴리오. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-2">이 포트폴리오는 지속적으로 업데이트됩니다.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
