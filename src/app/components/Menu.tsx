// 각 메뉴들을 모은 컴포넌트

"use client";

import { useSearchStore, useStationStore, useViewStateStore } from "@/store";
import { FlyToInterpolator } from "deck.gl";
import { useCallback, useEffect } from "react";
import MyLocation from "./menus/MyLocation";
import Search from "./menus/Search";
import type { Location } from "@/types";
import Info from "./menus/Info";

export default function Menu({ location }: { location: Location }) {
  const { setStation } = useStationStore();
  const { setInitialViewState } = useViewStateStore();
  const { setSearch } = useSearchStore();

  // Info 메뉴를 닫기 위한 함수
  const handleClose = useCallback(() => {
    const info = document.getElementById("info");
    const viewPort = window.innerWidth;
    if (viewPort < 768) {
      // info!.style.transform = "translateY(384px)";
      info!.style.bottom = "-550px";
    } else {
      info!.style.transform = "translateX(-100%)";
    }
    setStation("");
    setSearch("");
  }, [setSearch, setStation]);

  // 사용자의 현위치를 가져오기 위한 로직
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setInitialViewState({
          maxZoom: 17,
          minZoom: 11,
          transitionDuration: "auto",
          transitionInterpolator: new FlyToInterpolator({ speed: 3 }),
          zoom: 11,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, [setInitialViewState]);

  return (
    <>
      {/* 두 컴포넌트에 함수를 전달 */}
      <MyLocation location={location} handleClose={handleClose} />
      <Search />
      <Info handleClose={handleClose} />
    </>
  );
}
