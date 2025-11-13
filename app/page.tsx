"use client"

import { useState, useEffect, useRef } from "react"
import {
  ChevronDown,
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
    type: "education",
    description: "고등학교 코딩 동아리 - 프로젝트 대회",
    details:
      "아두이노로 구현한 스마트홈 프로젝트 경험이 처음 코딩을 접한 계기이자, IT 분야로 진로를 정하게 된 중요한 출발점이었습니다.",
    award: "최우수상 수상",
    link: "https://blog.naver.com/rlawls1448/223554607352",
    order: 1,
  },
  {
    id: "maker-contest",
    title: "제 5회 INU(교내) 메이커 경진대회",
    period: "2020-2",
    type: "award",
    description: "제 5회 INU(교내) 메이커 경진대회 팀장",
    details: "1학년 새내기 팀으로 교내 메이커 경진대회에서 우수상 수상, 코로나 대응 아이디어 기획 및 구현",
    award: "우수상 수상",
    link: "https://blog.naver.com/rlawls1448/222223758063",
    order: 2,
  },
  {
    id: "research-group",
    title: "교수-학생 전공심화 연구모임",
    period: "2020-2",
    type: "activity",
    description: "인천대학교",
    details: "코로나 방역 관련 아이디어로 교수-학생 전공심화 연구모임 참여",
    link: "https://blog.naver.com/rlawls1448/222176617026",
    order: 3,
  },
  {
    id: "smart-living",
    title: "부천시 스마트리빙랩 시 참여단",
    period: "2024 여름",
    type: "activity",
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
    type: "award",
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
    type: "award",
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
    type: "award",
    description: "농촌 고령층의 건강, 일정, 커뮤니티 참여를 통합 관리할 수 있는 디지털 트윈 플랫폼을 제안했습니다.",
    award: "장려상 수상",
    link: "https://blog.naver.com/rlawls1448/223674643082",
    order: 7,
  },
  {
    id: "data-creator",
    title: "2024 데이터 크리에이터 캠프",
    period: "2024 여름",
    type: "education",
    description: "인공지능 및 데이터 분석 대회 스타터 과정 수료",
    details: "ResNet 기반 CNN 모델로 패션 이미지 분류 프로젝트 수행",
    link: "https://blog.naver.com/rlawls1448/223681491796",
    order: 8,
  },
  {
    id: "scholarship",
    title: "국토정보공사 발전 장려 장학생",
    period: "2024-2",
    type: "award",
    description: "국토정보공사 발전 장려 장학생 선정",
    link: "https://blog.naver.com/rlawls1448/223636051928",
    order: 9,
  },
  {
    id: "inha-workshop",
    title: "인하공방 동아리",
    period: "2024-2",
    type: "activity",
    description: "제어/설계 동아리 활동",
    details: "자율주행 기술 관련 오픈 스터디 참여",
    link: "https://blog.naver.com/rlawls1448/223785118853?trackingCode=blog_bloghome_searchlist",
    order: 10,
  },
  {
    id: "inha-study",
    title: "인하동동 그룹 스터디",
    period: "2024-2",
    type: "activity",
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
    type: "activity",
    description: "커비이심 서포터즈 1기 수료",
    link: "https://blog.naver.com/rlawls1448/223674626853",
    order: 12,
  },
  {
    id: "kt-supporters",
    title: "KT 대학생 IT 서포터즈 2기",
    period: "2024 겨울",
    type: "activity",
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
    type: "education",
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
    type: "award",
    description: "2번째 국토정보공사 발전 장려 장학생 선정",
    link: "https://blog.naver.com/rlawls1448/223842792230",
    order: 15,
  },
  {
    id: "react-course",
    title: "한입 리액트 완강",
    period: "2025년 2월",
    type: "education",
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
    type: "education",
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
    type: "activity",
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
    type: "award",
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
    type: "development",
    description: "Django BE",
    details: "가족이 하루 질문을 통해 소통하는 기록 서비스입니다. 짧은 시간 안에 팀과 함께 MVP를 완성해가는 과정이 핵심 경험이었습니다.",
    link: "https://github.com/LikeLion-13th-E-TEAM-Inha-Hackathon",
    order: 20,
  },
  {
    id: "shympyo-app",
    title: "쉼표 — 무더위 쉼터 지도",
    period: "2025-여름",
    type: "development",
    description: "React Native 앱 개발",
    details: "주변의 무더위 쉼터를 가장 빠르게 찾을 수 있는 위치 기반 서비스입니다. 사용자에게 필요한 순간에 ‘바로 보이는’ 정보를 만드는 데 집중했습니다.",
    link: "https://github.com/ShymPyo",
    order: 21,
  },
  {
    id: "smart-wms-project",
    title: "Smart WMS — 산학프로젝트",
    period: "2025-여름",
    type: "award",
    description: "Spring Boot BE",
    details: "실제 창고 운영 흐름을 디지털로 정리하는 WMS 프로젝트였습니다. 현장의 동선을 구조화하는 과정에서 운영 관점의 문제 해결을 배웠습니다.",
    award: "우수상",
    link: "https://github.com/KSEB-4th-Project-3rd-Team",
    order: 22,
  },
  {
    id: "geonneogeonneo-hackathon",
    title: "건너건너 — 멋쟁이사자처럼 중앙 해커톤",
    period: "2025-여름",
    type: "development",
    description: "Django BE - 채팅 개발",
    details: "지인 기반의 신뢰 네트워크를 잇는 서비스입니다. 사람 사이의 흐름이 끊기지 않는 경험을 만드는 데 집중했습니다.",
    link: "https://github.com/Team-Hawaiian-Pizza",
    order: 23,
  },
  {
    id: "debug-president-2",
    title: "코딩 동아리 DEBUG",
    organization: "인하대학교",
    period: "2025-2학기",
    type: "activity",
    description: "학과 코딩 동아리 DEBUG 회장 활동",
    details: "1학기 디버그의 성공적인 마무리 후, 운영 및 커리큘럼 개선 후 2학기 활동 진행중입니다. 후배들을 대상으로 코딩 수업을 강의하고 있습니다.",
    link: "https://blog.naver.com/rlawls1448/224005303699",
    order: 24,
  },
  {
    id: "umc-9th",
    title: "UMC 9기 YB",
    period: "2025-9 ~ 현재",
    type: "activity",
    description: "Node 서버 파트에서 팀 단위 개발 흐름과 협업 구조를 익히고 있습니다.",
    link: "https://blog.naver.com/rlawls1448/224005292835",
    order: 25,
  },
  {
    id: "katsu-map",
    title: "돈가스 지도 — 1인 개발 프로젝트 / 앱 출시",
    period: "2025-11",
    type: "development",
    description: "서울 돈가스 맛집을 지도 기반으로 탐색하는 개인 프로젝트입니다. 기획부터 개발, 출시까지 혼자 완주한 첫 서비스입니다.",
    link: "https://github.com/Katsu-Map",
    order: 26,
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
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
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
  const [mottoVisible, setMottoVisible] = useState(false)
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const { visibleSections, observeElement } = useScrollAnimation()
  const [activeIndex, setActiveIndex] = useState(0);
  const introTexts = [
    "<div>떠오른 <strong>발상</strong>을 실제 동작하는 <strong>서비스</strong>로 빚어내는 이 과정이</div><div class='mt-6'>너무나도 재미있어 개발자의 길을 선택한 <span class='text-blue-600 font-semibold'>김진</span>입니다.</div>",
    "<div>2025년 3월부터 본격적으로 웹 개발에 <strong>입문</strong>했습니다.</div><div class='mt-6'>매일 새로운 것을 배우는 재미에 푹 빠져 열심히 <strong class='text-blue-600'>성장</strong> 중입니다.</div>",
    "<div><strong class='text-blue-600'>백엔드 개발</strong>을 집중적으로 공부하고 있으며,</div><div class='mt-6'><strong>프론트엔드</strong>와 <strong>웹 디자이너</strong>의 역할도 맡아가며 역량을 넓히고 있습니다.</div>",
    "<div><strong>궁극적으로는</strong> 특정 기술에 얽매이지 않고,</div><div class='mt-6'>혼자서도 뭐든 뚝딱 만들어낼 수 있는 <strong class='text-blue-600'>풀스택 역량</strong>을 손에 넣고 싶습니다.</div>",
    "<div>이 막연하지만 <strong>소중한 목표</strong>가 저를 나아가게 하는 가장 큰 <strong class='text-blue-600'>원동력</strong>입니다.</div>"
  ];
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setActiveIndex(index);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    const currentRefs = triggerRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (!scrollEnabled) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [scrollEnabled])

  const handleExploreClick = () => {
    setScrollEnabled(true)
    setMottoVisible(true)
    setTimeout(() => {
      document.getElementById("motto")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-48">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-60">
            저는 <span className="text-blue-600 font-semibold">김진</span>입니다
          </h1>

          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleExploreClick}
          >
            네..?
            <ChevronDown className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Motto Section */}
      <section id="motto" className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-32">
            <span className="text-blue-600">김진</span>은 이런 사람입니다
          </h2>
          <div
            className={`transition-all duration-1000 ease-out ${
              mottoVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="bg-white rounded-2xl p-16 shadow-lg border border-blue-100 text-left">
              <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center">"시작이 반이다 🔥"</p>
              <p className="text-xl text-gray-700">어떤 일이든 시작이 가장 어렵고도 중요한 순간이라고 믿습니다.</p>
              <p className="text-gray-600 mt-4">
                비록 서툴더라도, 시작이 있어야 배움과 성장이 따라온다고 생각합니다.
                <br />
                그래서 저는 완벽한 준비보단, 먼저 움직이는 사람이고자 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl md:text-2xl font-bold text-gray-900">김진에 대하여</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">이름</p>
                <p className="text-lg font-semibold text-gray-900">김진</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Cake className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">생년월일</p>
                <p className="text-lg font-semibold text-gray-900">01.03.20</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">위치</p>
                <p className="text-lg font-semibold text-gray-900">인천광역시</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">연락처</p>
                <p className="text-lg font-semibold text-gray-900">010-8948-3847</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">이메일</p>
                <p className="text-lg font-semibold text-gray-900">rlawls1448@naver.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-none">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div className="pt-3">
                <p className="text-sm text-gray-500 font-medium">학력</p>
                <p className="text-lg font-semibold text-gray-900">인하대학교 재학</p>
                <p className="text-sm text-gray-500 whitespace-nowrap">(주) 공간정보공학과 / (복) 인공지능공학과</p>
                <p className="text-sm text-gray-500">(부) 디자인융합과</p>
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mt-96 mb-[32rem]">
            <span className="text-blue-600">김진</span>은 개발자가 되고싶습니다.
          </h2>

          {/* Additional Introduction */}
          <div className="relative mt-96" style={{ height: `${introTexts.length * 50}vh` }}>
            <div className="sticky top-1/2 -translate-y-1/2 px-6">
              <div className="text-center max-w-3xl mx-auto">
                <div className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800">
                  <span
                    key={activeIndex}
                    className="inline-block animate-slide-in"
                    dangerouslySetInnerHTML={{ __html: introTexts[activeIndex] }}
                  />
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full">
              {introTexts.map((_, index) => (
                <div
                  key={index}
                  data-index={index}
                  ref={(el) => (triggerRefs.current[index] = el)}
                  className="h-[50vh]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-blue-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <Wrench className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">김진은 이런걸 공부하고 있습니다</h2>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Side - 다루고 있는 기술 */}
              <div>
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">⚙️</span>
                  <h3 className="text-xl font-bold text-gray-900">다루고 있는 기술</h3>
                </div>
                <div className="flex justify-center">
                  <a href="https://skillicons.dev" className="hover:opacity-90 transition-opacity">
                    <img
                      src="https://skillicons.dev/icons?i=nodejs,express,spring,django,react,mongodb,mysql,redis,aws,postgres,gcp,nest&perline=6"
                      alt="Tech Stack"
                      className="w-full"
                    />
                  </a>
                </div>
              </div>

              {/* Right Side - 활용 툴 */}
              <div>
                <div className="flex items-center mb-6">
                  <span className="text-1xl mr-3">🛠️</span>
                  <h3 className="text-xl font-bold text-gray-900">활용 툴</h3>
                </div>
                <div className="flex flex-wrap gap-2 justify-center items-center">
                  <img
                    src="https://img.shields.io/badge/QGIS-589632?style=for-the-badge&logo=QGIS&logoColor=white"
                    alt="QGIS"
                    className="h-10"
                  />
                  <img
                    src="https://img.shields.io/badge/ARCGIS-2C7AC3?style=for-the-badge&logo=ARCGIS&logoColor=white"
                    alt="ARCGIS"
                    className="h-10"
                  />
                  <img
                    src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"
                    alt="Git"
                    className="h-10"
                  />
                  <img
                    src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"
                    alt="GitHub"
                    className="h-10"
                  />
                  <img
                    src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"
                    alt="Docker"
                    className="h-10"
                  />
                  <img
                    src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"
                    alt="Vercel"
                    className="h-10"
                  />
                  <img
                    src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"
                    alt="Postman"
                    className="h-10"
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-white text-2xl leading-loose my-24 text-left">
            기술은 결국 사람을 향해야 한다고 믿습니다.<br/>
            저는 <strong>공간정보 기술과 웹 개발을 결합해</strong><br/>
            누군가의 일상에서 ‘조금 더 편리한 순간’을 만드는 서비스를 만들고 있습니다.<br/>
            특히 JavaScript를 주력으로 다양한 웹 개발 역량을 확장하고 있습니다.
          </p>
        </div>
      </section>

      {/* New Section */}
      <section className="pt-96 pb-48 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="text-blue-600">김진</span>은 열심히 합니다
          </h2>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 px-6 bg-white" ref={observeElement}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-4xl md:text-3xl font-bold text-gray-900">김진의 여정</h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-600 mt-6 text-left">
                {"아직 개발을 시작한 지 오래되진 않아 보여드릴 수 있는 성과는 많지 않습니다."}
                <br />
                {"하지만 지금까지 제가 몰입해온 활동들을 정리하며,"}
                <br />
                {"어떤 태도로 배우고 성장해왔는지 전달하고 싶었습니다."}
                <br />
                {"이 타임라인에는 개발뿐 아니라 제가 경험한 다양한 도전과 노력의 흔적을 담았습니다."}
              </p>
            </div>
          </div>

          {/* Main Timeline */}
          <div className="relative">
            {/* Timeline Cards - 섹션이 보이면 모든 카드가 한번에 나타남 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {timelineData.map((item, index) => (
                <div key={item.id} className="relative">
                  <Card
                    className={`bg-white hover:shadow-xl transition-all duration-500 hover:scale-105 border-l-4 border-l-blue-500 h-80 relative transform ${
                      hasMounted && visibleSections.has("timeline") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: hasMounted && visibleSections.has("timeline") ? `${index * 50}ms` : "0ms",
                    }}
                  >
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Timeline number in top right corner */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {item.order}
                      </div>

                      {/* Header */}
                      <div className="flex items-start justify-between mb-4 pr-10">
                        <div
                          className={`w-12 h-12 ${getTypeColor(item.type)} rounded-lg flex items-center justify-center text-white flex-shrink-0`}
                        >
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="text-right">
                          <Badge className={getTypeBadgeColor(item.type)}>{getTypeLabel(item.type)}</Badge>
                          <p className="text-sm text-gray-500 mt-1">{item.period}</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                        {item.organization && <p className="text-sm text-gray-500 mb-2">{item.organization}</p>}
                        <p className="text-gray-600 mb-2 text-sm line-clamp-2">{item.description}</p>

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
                        className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent mt-auto"
                        onClick={() => window.open(item.link, "_blank")}
                      >
                        자세히보기
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white" ref={observeElement}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <Folder className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-4xl md:text-3xl font-bold text-gray-900">김진의 프로젝트</h2>
            </div>
            <p className="text-gray-600 mt-6">
              무언가를 함께 만들어가는 경험이 가장 즐겁습니다. 🚀
              <br />
              아이디어가 현실이 되는 그 순간이 너무 좋네요 :)
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectData.map((project, index) => (
              <div key={project.id}>
                <Card
                  className={`bg-white hover:shadow-xl transition-all duration-500 hover:scale-105 border-l-4 border-l-blue-500 h-72 relative transform ${
                    hasMounted && visibleSections.has("projects") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: hasMounted && visibleSections.has("projects") ? `${index * 60}ms` : "0ms",
                  }}
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        <Folder className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        {getStatusBadge(project.status)}
                        <p className="text-sm text-gray-500 mt-1">{project.period}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className={`font-bold text-gray-900 mb-2 ${project.id === "smart-wms" ? "text-sm leading-tight" : "text-base leading-tight"}`}
                      >
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm">{project.description}</p>

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
                      className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent mt-auto"
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      GitHub 보기
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Me Section */}
      <section id="contact" className="py-20 px-6 bg-blue-600" ref={observeElement}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Contact Me</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card
              className={`bg-white hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer transform ${
                hasMounted && visibleSections.has("contact") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: hasMounted && visibleSections.has("contact") ? "0ms" : "0ms",
              }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Github className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">GitHub</h3>
                <p className="text-gray-600 mb-4">github.com/Jinacker</p>
                <p className="text-sm text-gray-500">소스 코드 저장소</p>
                <Button
                  className="mt-4 bg-gray-900 hover:bg-gray-800 text-white"
                  onClick={() => window.open("https://github.com/Jinacker", "_blank")}
                >
                  방문하기
                  <ExternalLink className="ml-2 w-4 h-4" />
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
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Blog</h3>
                <p className="text-gray-600 mb-4">blog.naver.com/rlawls1448</p>
                <p className="text-sm text-gray-500">기록의 습관화</p>
                <Button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open("https://blog.naver.com/rlawls1448", "_blank")}
                >
                  방문하기
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="border-t border-gray-700 pt-6 mt-6">
              <p className="text-gray-400 text-sm">© 2025 김진의 포트폴리오. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-2">이 포트폴리오는 지속적으로 업데이트됩니다.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
