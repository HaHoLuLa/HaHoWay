// SEO 및 PWA를 위한 manifest.json을 자동 생성해주는 코드

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HaHoWay",
    short_name: "HaHoWay",
    description: "하하호호 즐거운 지하철 탑승!",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6395ee",
    icons: [
      {
        src: "/icon-48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        src: "/icon-72.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        src: "/icon-96.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        src: "/icon-144.png",
        sizes: "144x144",
        type: "image/png"
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      },
    ]
  }
}