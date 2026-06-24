// Static portfolio data — hand-maintained.
// (Originally migrated from a Prisma/Postgres DB; the generation pipeline has been retired.)

import type { Locale } from "@/i18n/routing";

import type { Blog } from "./types";

const blogs: Record<Locale, Blog[]> = {
  ko: [
    {
      id: 1,
      title: "[TypeScript] openapi codegen에서 optional 삭제하기",
      date: "2024.01.10",
      forwardLink: "https://velog.io/@mari/remove-optional-in-openapi-typescript-codegen",
      bgImageUrl: "/assets/blogs/blog-1.png",
    },
    {
      id: 2,
      title: "[Ant Design] token을 이용하여 컴포넌트 padding을 변경하기",
      date: "2023.11.06",
      forwardLink: "https://velog.io/@mari/Ant-Design-padding-custom-by-token",
      bgImageUrl: "/assets/blogs/blog-2.png",
    },
    {
      id: 3,
      title: "msw 에러 해결 \"TypeError: Failed to execute 'text' on 'Response': body stream already read\"",
      date: "2023.07.25",
      forwardLink:
        "https://velog.io/@mari/msw-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0-TypeError-Failed-to-execute-text-on-Response-body-stream-already-read",
      bgImageUrl: "/assets/blogs/blog-3.png",
    },
  ],
  en: [
    {
      id: 1,
      title: "[TypeScript] Removing optional from openapi codegen",
      date: "2024.01.10",
      forwardLink: "https://velog.io/@mari/remove-optional-in-openapi-typescript-codegen",
      bgImageUrl: "/assets/blogs/blog-1.png",
    },
    {
      id: 2,
      title: "[Ant Design] Customizing component padding with tokens",
      date: "2023.11.06",
      forwardLink: "https://velog.io/@mari/Ant-Design-padding-custom-by-token",
      bgImageUrl: "/assets/blogs/blog-2.png",
    },
    {
      id: 3,
      title: "Fixing msw error: \"TypeError: Failed to execute 'text' on 'Response': body stream already read\"",
      date: "2023.07.25",
      forwardLink:
        "https://velog.io/@mari/msw-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0-TypeError-Failed-to-execute-text-on-Response-body-stream-already-read",
      bgImageUrl: "/assets/blogs/blog-3.png",
    },
  ],
};

export default blogs;
