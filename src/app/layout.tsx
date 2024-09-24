import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";

const namsan = localFont({
  src: "./fonts/SeoulNamsanM.ttf",
  display: "swap",
  variable: "--font-namsan",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6395ee" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  title: {
    template: "HaHoWay | %s",
    default: "HaHoWay",
  },
  description: "하하호호 즐거운 지하철 탑승!",
  icons: {
    icon: "/icon-512.png",
    shortcut: "/icon-512.png",
    apple: "/icon-512.png",
  },
  openGraph: {
    title: "HaHoWay",
    siteName: "HaHoWay",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
      },
    ],
  },
  applicationName: "HaHoWay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${namsan.variable} font-namsan`}>{children}</body>
    </html>
  );
}
