"use client";

import { useStationStore } from "@/store";
import type { HandleClose, SubwayData } from "@/types";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import * as color from "@/variable";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Info({ handleClose }: { handleClose: HandleClose }) {
  const [startY, setStartY] = useState<number>(0);
  const [isDrag, setIsDrag] = useState(false);
  const [width, setWidth] = useState(0);
  const { station } = useStationStore();
  const { data, isLoading, error } = useSWR<SubwayData>(
    station ? `/api/data?station=${station}` : null,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const startDrag = (e: TouchEvent | MouseEvent) => {
    setIsDrag(true);
    if (e instanceof TouchEvent && e.touches) {
      setStartY(e.touches[0].clientY);
    } else if (e instanceof MouseEvent) {
      setStartY(e.clientY);
    }
  };

  const dragMove = useCallback(
    (e: TouchEvent | MouseEvent) => {
      const menu = document.getElementById("info");
      if (!isDrag || !menu) return;

      const currentY =
        e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      const distanceMoved = startY - currentY;

      // 스와이프 업: 메뉴가 올라가는 조건
      if (distanceMoved > 0 && distanceMoved < window.innerHeight * 0.4) {
        menu.style.bottom = `calc(-400px + ${distanceMoved}px)`;
      }

      // 스와이프 다운: 메뉴가 내려가는 조건
      // if (distanceMoved < 0 && distanceMoved > -window.innerHeight * 0.4) {
      //   menu.style.bottom = `calc(-20% - ${Math.abs(distanceMoved)}px)`;
      // }

      // 위로 스와이프 많이 했을 때 (100px 이상)
      if (distanceMoved > 200) {
        menu.style.bottom = "0"; // 메뉴가 완전히 올라옴
      }

      // 아래로 스와이프 많이 했을 때 (100px 이상)
      // if (distanceMoved < -100) {
      //   menu.style.bottom = "-20%"; // 메뉴가 완전히 내려감
      // }
    },
    [isDrag, startY] // 의존성 배열에 isDrag와 startY를 추가
  );

  const endDrag = () => {
    setIsDrag(false);
  };

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const info = document.getElementById("info");
    const viewPort = window.innerWidth;
    if (station) {
      if (viewPort < 768) {
        info!.style.bottom = "-400px";
      } else {
        info!.style.transform = "translateX(100%)";
      }
    }
  }, [station]);

  useEffect(() => {
    if (error || data?.errorMessage) {
      mutate(`/api/data?station=${station}`);
    }
  }, [error, station, data]);

  useEffect(() => {
    const menu = document.getElementById("info");
    if (window.innerWidth < 768 && station) {
      menu!.addEventListener("touchstart", startDrag);
      window.addEventListener("touchmove", dragMove);
      window.addEventListener("touchend", endDrag);
      menu!.addEventListener("mousedown", startDrag);
      window.addEventListener("mousemove", dragMove);
      window.addEventListener("mouseup", endDrag);
    }
    return () => {
      menu!.removeEventListener("touchstart", startDrag);
      window.removeEventListener("touchmove", dragMove);
      window.removeEventListener("touchend", endDrag);
      menu!.removeEventListener("mousedown", startDrag);
      window.removeEventListener("mousemove", dragMove);
      window.removeEventListener("mouseup", endDrag);
    };
  }, [dragMove, station]);

  return (
    <>
      <div
        id="info"
        className="md:w-[20%] w-full bg-white md:h-screen h-[550px] fixed md:bottom-0 -bottom-[550px] transition-all duration-300 ease-in-out z-[10000] border-t md:left-[-20%] left-0 px-3 pt-2 shadow-lg shadow-gray-300"
      >
        <div className="flex justify-between relative">
          <span className="text-lg pt-1 font-bold">
            {isLoading ? "로딩중" : station}
          </span>
          {width < 768 && (
            <div className="left-1/2 -translate-x-1/2 font-bold text-xl absolute">
              <div className="w-10 bg-[cornflowerblue] h-1 rounded-full" />
            </div>
          )}
          <div>
            <button
              onClick={() => mutate(`/api/data?station=${station}`)}
              className="text-2xl p-0 pr-2"
            >
              ↻
            </button>
            <button onClick={handleClose} className="text-2xl p-0">
              &times;
            </button>
          </div>
        </div>
        <div className="mt-3">
          {data?.realtimeArrivalList
            ? data?.realtimeArrivalList?.map((item, index) => (
                <div key={index} className="flex justify-between bg-white">
                  <span
                    style={{
                      color: `rgba(${color.subwayColors[item.subwayId][0]}, ${
                        color.subwayColors[item.subwayId][1]
                      }, ${color.subwayColors[item.subwayId][2]})`,
                    }}
                    className="font-bold"
                  >
                    {item.bstatnNm}행
                  </span>
                  <span className="text-rose-600">{item.arvlMsg2}</span>
                </div>
              ))
            : isLoading
            ? ""
            : "열차 정보가 없습니다."}
        </div>
      </div>
    </>
  );
}
