import { type NextRequest, NextResponse } from "next/server";
import webpush from "web-push"

webpush.setVapidDetails(
  `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY!,
)

export async function POST(request: NextRequest) {
  try {
    const { subscription, message } = await request.json();
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "HaHoWay",
        body: message,
        icon: "/icon-512.png",
        badge: "/icon-48.png"
      })
    )
    return NextResponse.json({ message: "sucess" }, { status: 200 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}