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
    title: "쉼표 — 무더위 쉼터 지도",
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
    description: "강의 기반 구현에서 벗어나, 기획부터 설계·구현까지 전 과정을 직접 결정한 첫 프로젝트였습니다.",
  },
  {
    id: 3,
    title: "쉼표 — 무더위 쉼터 지도",
    period: "2025년 9월 ~ 11월",
    description: "React Native를 활용한 첫 앱 개발 프로젝트로, 사용자 경험(UX)에 대해 많은 것을 배웠습니다.",
  },
]

// 백엔드 타임라인 데이터
const backendTimelineData = [
  {
    id: 1,
    title: "Django 학습",
    period: "2024년 겨울",
    description: "KSEB 부트캠프에서 Django를 배우며 웹 애플리케이션 개발의 기초를 다졌습니다.",
  },
  {
    id: 2,
    title: "Spring Boot 프로젝트",
    period: "2025년 여름",
    description: "Smart WMS 프로젝트에서 Spring Boot로 백엔드를 개발하며 실무 경험을 쌓았습니다.",
  },
  {
    id: 3,
    title: "NestJS 학습 및 적용",
    period: "2025년 11월",
    description: "돈가스 지도 프로젝트에서 NestJS를 활용하여 TypeScript 기반 백엔드를 구축했습니다.",
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
  const [isIssueOneModalOpen, setIsIssueOneModalOpen] = useState(false);
  const [isShympyoModalOpen, setIsShympyoModalOpen] = useState(false);

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
                <p className="text-xs md:text-sm text-gray-500">(부) 디자인융합과</p>
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
              <strong>기술</strong>은 결국 <strong>사람</strong>을 향해야 한다고 생각합니다.<br></br>
              <strong>사람들</strong>의 일상에 실제로 도움이 되는 <strong className="text-blue-600">가치</strong>를 만들어내고 싶습니다.
            </p>
          </div>

          {/* 핵심 역량 */}
          <div className="max-w-4xl mx-auto py-20">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">핵심 역량</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 열정 */}
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 bg-white border-4 border-blue-100 rounded-full flex flex-col items-center justify-center">
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
                <div className="w-40 h-40 mx-auto mb-4 bg-white border-4 border-blue-100 rounded-full flex flex-col items-center justify-center">
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
                <div className="w-40 h-40 mx-auto mb-4 bg-white border-4 border-blue-100 rounded-full flex flex-col items-center justify-center">
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
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">협업 & 개발 도구</h3>
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
              <strong>매일 새로운 것을 배우는 재미</strong>에 푹 빠져 열심히 성장 중입니다!<br></br>
              궁극적으로는.. 특정 기술에 얽매이지 않고,<br></br> 혼자서도 뭐든 뚝딱 만들어낼 수 있는 <strong className="text-blue-600">풀스택 역량</strong>을 손에 넣고 싶습니다. <br></br>
              이 막연하지만 소중한 목표가 저를 나아가게 하는 가장 큰 원동력입니다.
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
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">프론트엔드</h3>
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
                    {/* 반원형 테두리 */}
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        content: '""',
                        width: '50%',
                        height: '100%',
                        border: 'solid #3b82f6',
                        ...(index % 2 === 0
                          ? {
                              left: '0px',
                              top: index === 0 ? '0px' : '-6.0px',
                              bottom: index === frontendTimelineData.length - 1 ? '0px' : '-4.5px',
                              borderWidth: `${index === 0 ? '0' : '3px'} 0 ${index === frontendTimelineData.length - 1 ? '0' : '3px'} 3px`,
                              borderRadius: `${index === 0 ? '0' : '30px'} 0 0 ${index === frontendTimelineData.length - 1 ? '0' : '30px'}`,
                            }
                          : {
                              right: '0',
                              top: '-3px',
                              bottom: index === frontendTimelineData.length - 1 ? '0px' : '-2px',
                              borderWidth: `3px 3px ${index === frontendTimelineData.length - 1 ? '0' : '3px'} 0`,
                              borderRadius: `0 30px 30px 0`,
                            }),
                      }}
                    ></div>

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
                          onClick={() => setIsIssueOneModalOpen(true)}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                      {/* 무더위 쉼터: 쉼표 프로젝트 자세히 보기 버튼 */}
                      {item.id === 3 && (
                        <button
                          onClick={() => setIsShympyoModalOpen(true)}
                          className="mt-3 w-full px-3 py-2 text-xs font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          프로젝트 자세히 보기
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 백엔드 타임라인 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">백엔드</h3>
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
                    {/* 반원형 테두리 */}
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        content: '""',
                        width: '50%',
                        height: '100%',
                        border: 'solid #10b981',
                        ...(index % 2 === 0
                          ? {
                              left: '0px',
                              top: index === 0 ? '0px' : '-6.0px',
                              bottom: index === backendTimelineData.length - 1 ? '0px' : '-4.5px',
                              borderWidth: `${index === 0 ? '0' : '3px'} 0 ${index === backendTimelineData.length - 1 ? '0' : '3px'} 3px`,
                              borderRadius: `${index === 0 ? '0' : '30px'} 0 0 ${index === backendTimelineData.length - 1 ? '0' : '30px'}`,
                            }
                          : {
                              right: '0',
                              top: '-3px',
                              bottom: index === backendTimelineData.length - 1 ? '0px' : '-2px',
                              borderWidth: `3px 3px ${index === backendTimelineData.length - 1 ? '0' : '3px'} 0`,
                              borderRadius: `0 30px 30px 0`,
                            }),
                      }}
                    ></div>

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

                      <h4 className="text-sm font-bold text-green-600 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">{item.period}</p>
                      <p className="text-xs text-gray-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 성장 이야기 펼치기 버튼 */}
          <div className="text-center mt-16 mb-8">
            <button
              onClick={() => setIsExperienceExpanded(!isExperienceExpanded)}
              className="inline-flex items-center gap-2 px-5 py-3 text-gray-600 hover:text-blue-600 border-2 border-gray-200 hover:border-blue-400 rounded-full transition-all"
            >
              <span className="text-sm md:text-base font-medium">
                {isExperienceExpanded ? '접기' : '성장 이야기 더보기'}
              </span>
              {isExperienceExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          <div className={`transition-all duration-500 ease-in-out ${
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
                    className={`bg-white hover:shadow-xl transition-all duration-500 hover:scale-105 border-l-4 border-l-blue-500 h-80 relative transform ${
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
                  className={`bg-white hover:shadow-xl transition-all duration-500 hover:scale-105 border-l-4 border-l-blue-500 h-72 relative transform ${
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
      {isIssueOneModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsIssueOneModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsIssueOneModalOpen(false)}
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
                  <p className="text-base font-semibold text-gray-900">2025.03 ~ 2025.06</p>
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
      {isShympyoModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsShympyoModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsShympyoModalOpen(false)}
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
                  <p className="text-base font-semibold text-gray-900">2025.08 ~ 2025.11</p>
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
              className={`bg-white hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer transform ${
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
              className={`bg-white hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer transform ${
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
