// 에러 시 보여줄 페이지

"use client"

export default function Error({ error }: { error: Error }) {
  return <div className="w-screen h-screen text-2xl flex items-center justify-center text-red-600"><span>{error.message}</span></div>
}