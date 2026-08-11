import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const tmoneyRoundWind = localFont({
  src: [
    {
      path: "../font_ttf/TmoneyRoundWindRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font_ttf/TmoneyRoundWindExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-tmoney",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://jin-portfolio-eta.vercel.app"),
  title: "Jin Portfolio",
  description: "개발자 꿈나무 김진의 포트폴리오",
  generator: "v0.dev",
  openGraph: {
    title: "Jin Portfolio",
    description: "개발자 꿈나무 김진의 포트폴리오",
    url: "https://jin-portfolio-eta.vercel.app",
    siteName: "Jin Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jin Portfolio",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jin Portfolio",
    description: "개발자 꿈나무 김진의 포트폴리오",
    images: ["/og-image.jpg"],
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
