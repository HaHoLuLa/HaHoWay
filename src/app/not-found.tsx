// 404 에러 시 표시해 줄 페이지

"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    // 컴포넌트 마운트 시 3초 뒤 메인으로 이동
    setTimeout(() => router.push("/"), 3000)
  }, [router])
  return <div className="w-screen h-screen text-2xl flex items-center justify-center"><span>페이지를 찾을 수 없어 메인으로 돌아갑니다.</span></div>
}