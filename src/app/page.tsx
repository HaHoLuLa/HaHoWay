"use client";

import { useLine, useMarker } from "./Hooks";
import * as color from "@/variable";
import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import LineMap from "./components/LineMap";
import { subcribeUser, unsubcribeUser, sendNotification } from "./actions";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export default function Map() {
  const [location, setLocation] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  const _1호선 = useLine(["1호선"], color.line1Color); // ok
  const 장항선 = useLine(["장항선"], color.line1Color);
  const 경부선 = useLine(["경부선"], color.line1Color);
  const 경원선 = useLine(["경원선"], color.line1Color);
  const 경인선 = useLine(["경인선"], color.line1Color);
  const 광명행 = useLine(["광명"], color.line1Color);
  const 서동탄행 = useLine(["서동탄"], color.line1Color);
  const _2호선 = useLine(["2호선"], color.line2Color); // ok
  const 신설동행 = useLine(["신설동"], color.line2Color); // ok
  const 까치산행 = useLine(["까치산"], color.line2Color); // ok
  const _3호선 = useLine(["3호선", "일산선"], color.line3Color); // ok
  const _4호선 = useLine(
    ["4호선", "안산선", "진접선", "과천선"],
    color.line4Color
  ); // ok
  const _5호선 = useLine(["5호선"], color.line5Color); // ok
  const 마천행 = useLine(["마천행"], color.line5Color); // ok
  const _6호선 = useLine(["6호선"], color.line6Color); // ok
  const _7호선 = useLine(["7호선"], color.line7Color); // ok
  const _8호선 = useLine(["8호선", "별내선"], color.line8Color); // ok
  const _9호선 = useLine(["9호선"], color.line9Color); // ok
  const 인천1호선 = useLine(["인천1"], color.인천1호선Color); // ok
  const 인천2호선 = useLine(["인천2"], color.인천2호선Color); // ok
  const 경강선 = useLine(["경강선"], color.경강선Color); // ok
  const 경의중앙선 = useLine(["경의중앙선"], color.경의중앙선Color);
  const 중앙선 = useLine(["중앙선"], color.경의중앙선Color);
  const 중경원선 = useLine(["중경원선"], color.경의중앙선Color);
  const 신촌행 = useLine(["신촌행"], color.경의중앙선Color);
  const 경춘선 = useLine(["경춘선"], color.경춘선Color); // ok
  const 공항철도 = useLine(["공항철도"], color.공항철도Color); // ok
  const 서해선 = useLine(["서해선"], color.서해선Color); // ok
  const 수인분당선 = useLine(["수인선", "분당선"], color.수인분당선Color); // ok
  const 신분당선 = useLine(["신분당"], color.신분당선Color); // ok
  const 신림선 = useLine(["신림선"], color.신림선Color); // ok
  const 우이신설선 = useLine(["우이"], color.우이신설선Color); // ok
  const 김포골드라인 = useLine(["김포골드라인"], color.김포골드라인Color); // ok
  const 에버라인선 = useLine(["에버라인선"], color.에버라인선Color); // ok
  const 경전철 = useLine(["의정부"], color.의정부경전철Color); // ok
  const gtxA = useLine(["수도권"], color.gtxAColor); // ok

  const line1 = useMarker(
    ["1호선", "장항선", "경부선", "경인선", "경원선", "광명행", "서동탄행"],
    color.line1Color
  );
  const line2 = useMarker(["2호선", "신설동행", "까치산행"], color.line2Color);
  const line3 = useMarker(["3호선", "일산선"], color.line3Color);
  const line4 = useMarker(
    ["4호선", "안산선", "진접선", "과천선"],
    color.line4Color
  );
  const line5 = useMarker(["5호선", "마천행"], color.line5Color);
  const line6 = useMarker(["6호선"], color.line6Color);
  const line7 = useMarker(["7호선"], color.line7Color);
  const line8 = useMarker(["8호선", "별내선"], color.line8Color);
  const line9 = useMarker(["9호선"], color.line9Color);
  const 인천1호선역 = useMarker(["인천1"], color.인천1호선Color);
  const 인천2호선역 = useMarker(["인천2"], color.인천2호선Color);
  const 경강선역 = useMarker(["경강선"], color.경강선Color);
  const 경의중앙선역 = useMarker(
    ["경의중앙선", "중앙선", "중경원선", "신촌행"],
    color.경의중앙선Color
  );
  const 경춘선역 = useMarker(["경춘선"], color.경춘선Color);
  const 공항철도역 = useMarker(["공항철도"], color.공항철도Color);
  const 서해선역 = useMarker(["서해선"], color.서해선Color);
  const 수인분당선역 = useMarker(["수인선", "분당선"], color.수인분당선Color);
  const 신분당선역 = useMarker(["신분당"], color.신분당선Color);
  const 신림선역 = useMarker(["신림선"], color.신림선Color);
  const 우이신설선역 = useMarker(["우이"], color.우이신설선Color);
  const 김포골드라인역 = useMarker(["김포"], color.김포골드라인Color);
  const 에버라인역 = useMarker(["에버"], color.에버라인선Color);
  const 경전철역 = useMarker(["의정부"], color.의정부경전철Color);
  const gtxA역 = useMarker(["수도권"], color.gtxAColor);

  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(
      ",--.  ,--.        ,--.  ,--.       ,--.   ,--.                 \n|  '--'  | ,--,--.|  '--'  | ,---. |  |   |  | ,--,--.,--. ,--.\n|  .--.  |' ,-.  ||  .--.  || .-. ||  |.'.|  |' ,-.  | \\  '  / \n|  |  |  |\\ '-'  ||  |  |  |' '-' '|   ,'.   |\\ '-'  |  \\   '  \n`--'  `--' `--`--'`--'  `--' `---' '--'   '--' `--`--'.-'  /   \n                                                      `---'    "
    );
    let watchId: number;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("가져오는 중 에러 발생: ", error);
        },
        {
          enableHighAccuracy: true, // 더 정확한 위치 정보 사용
          timeout: 5000, // 타임아웃 설정
          maximumAge: 0, // 캐시된 위치 정보 사용 안 함
        }
      );
    }

    // navigator.serviceWorker
    // .register("/sw.js")
    // .then((reg) => console.log("서비스 워커 등록 성공 ", reg))
    // .catch((e) => console.error(e))

    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }

    // 컴포넌트가 언마운트될 때 watchPosition을 중지
    return () => {
      if (navigator.geolocation && watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);
    await subcribeUser(sub);
  }

  async function unsubcribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubcribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(subscription, message);
      setMessage("");
    }
  }

  if (!isSupported) {
    return <p>푸쉬알림 지원안함</p>;
  }

  return (
    <>
      <div className="bg-white fixed z-[10000]">
        {subscription ? (
          <>
            <p>구독하여 알림보내기 가능</p>
            <button onClick={unsubcribeFromPush}>구독 취소</button>
            <input
              type="text"
              placeholder="메시지를 적으세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendTestNotification}>보내기</button>
          </>
        ) : (
          <>
            <p>구독하면 메시지 보내기 가능</p>
            <button onClick={subscribeToPush}>구독하기</button>
            <input
              type="text"
              placeholder="메시지를 적으세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendTestNotification}>보내기</button>
          </>
        )}
      </div>
      <Menu location={location} />
      <LineMap
        layers={[
          _1호선,
          경인선,
          경부선,
          장항선,
          경원선,
          광명행,
          서동탄행,
          _2호선,
          신설동행,
          까치산행,
          _3호선,
          _4호선,
          _5호선,
          마천행,
          _6호선,
          _7호선,
          _8호선,
          _9호선,
          인천1호선,
          인천2호선,
          경강선,
          김포골드라인,
          서해선,
          경의중앙선,
          중앙선,
          중경원선,
          신촌행,
          경춘선,
          공항철도,
          에버라인선,
          수인분당선,
          신분당선,
          신림선,
          우이신설선,
          경전철,
          gtxA,
          // scatterplotLayer,
          line1,
          line2,
          line3,
          line4,
          line5,
          line6,
          line7,
          line8,
          line9,
          인천1호선역,
          인천2호선역,
          경강선역,
          경의중앙선역,
          경춘선역,
          공항철도역,
          서해선역,
          수인분당선역,
          신분당선역,
          신림선역,
          우이신설선역,
          김포골드라인역,
          에버라인역,
          경전철역,
          gtxA역,
        ]}
        location={location}
      />
    </>
  );
}
