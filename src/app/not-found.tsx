"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push("/"), 3000)
  }, [router])
  return <div className="w-screen h-screen text-2xl flex items-center justify-center"><span>페이지를 찾을 수 없어 메인으로 돌아갑니다.</span></div>
}