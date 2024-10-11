// 모든 페이지들의 루트 레이아웃 페이지 코드

import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";

// 폰트 최적화를 위해 localFont 함수로 폰트 적용
const namsan = localFont({
  src: "./fonts/SeoulNamsanM.ttf",
  display: "swap",
  variable: "--font-namsan",
});

// PWA를 위해 테마컬러 적용
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6395ee" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// 메타 데이터 적용
export const metadata: Metadata = {
  title: {
    template: "HaHoWay (Test) | %s",
    default: "HaHoWay (Test)",
  },
  description: "하하호호 즐거운 지하철 탑승!",
  icons: {
    icon: "/icon-512.png",
    shortcut: "/icon-512.png",
    apple: "/icon-512.png",
  },
  openGraph: {
    title: "HaHoWay (Test)",
    siteName: "HaHoWay (Test)",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
      },
    ],
  },
  applicationName: "HaHoWay (Test)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* 폰트 적용 */}
      <body className={`${namsan.variable} font-namsan select-none`}>{children}</body>
    </html>
  );
}
