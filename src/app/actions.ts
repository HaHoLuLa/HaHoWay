"use server"

import webpush from "web-push";

webpush.setVapidDetails(
  `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY!,
)

let subscription: PushSubscription | null = null

export async function subcribeUser(sub: PushSubscription) {
  subscription = sub
  return { sucess: true }
}

export async function unsubcribeUser() {
  subscription = null
  return { sucess: true }
}

export async function sendNotification(subscription: any, message: string) {
  // if (!subscription) {
  //   throw new Error("No subscription available")
  // }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "HaHoWay",
        body: message,
        icon: "/icon-512.png",
        badge: "/icon-48.png"
      })
    )
    return { sucess: true }
  } catch (e) {
    console.error(e)
    return { sucess: false }
  }
}