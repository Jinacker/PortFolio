import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const tmoneyRoundWind = localFont({
  src: [
    {
      path: "../font_ttf/TmoneyRoundWindRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font_ttf/TmoneyRoundWindExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-tmoney",
})

export const metadata: Metadata = {
  title: "Jin Portfolio",
  description: "개발자 꿈나무 김진의 포트폴리오",
  generator: "v0.dev",
  openGraph: {
    title: "Jin Portfolio",
    description: "개발자 꿈나무 김진의 포트폴리오",
    url: "https://jinportfolio.vercel.app",
    siteName: "Jin Portfolio",
    images: [
      {
        url: "/favicon-32x32.png",
        width: 32,
        height: 32,
        alt: "Jin Portfolio Logo",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Jin Portfolio",
    description: "개발자 꿈나무 김진의 포트폴리오",
    images: ["/favicon-32x32.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={tmoneyRoundWind.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={tmoneyRoundWind.className}>{children}</body>
    </html>
  )
}
