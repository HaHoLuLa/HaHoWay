// SEO를 위한 robots.txt를 만들어 주는 코드

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    }
  }
}