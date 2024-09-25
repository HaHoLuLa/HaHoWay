"use client";

import { useSearchStore, useStationStore, useViewStateStore } from "@/store";
import { SubwayData, SubwayDataJson } from "@/types";
import axios from "axios";
import { FlyToInterpolator } from "deck.gl";
import { useCallback, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import subway from "../assets/subwayStations.json";
import { getChoseong } from "es-hangul";
import * as color from "@/variable";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Menu({
  location,
}: {
  location: { lat: number; lng: number };
}) {
  const { station, setStation } = useStationStore();
  const { initialViewState, setInitialViewState } = useViewStateStore();
  const { search, setSearch } = useSearchStore();

  const [width, setWidth] = useState(0);
  const [startY, setStartY] = useState<number>(0);
  const [isDrag, setIsDrag] = useState(false);

  const { data, isLoading, error } = useSWR<SubwayData>(
    station ? `/api/data?station=${station}` : null,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

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

  const flyToStaion = (station: SubwayDataJson) => {
    setInitialViewState({
      ...initialViewState,
      zoom: 16,
      latitude: parseFloat(station.lat),
      longitude: parseFloat(station.lot),
    });
    setStation(station.bldn_nm);
    setSearch("");
  };

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
        className="fixed z-[5000] bg-white w-10 h-10 rounded-full right-0 bottom-0 mb-3 mr-3 shadow-lg flex items-center justify-center"
        // title="현위치"
        onClick={() => {
          setInitialViewState({
            ...initialViewState,
            longitude: location.lng,
            latitude: location.lat,
            zoom: 13,
          });
          handleClose();
        }}
      >
        <div className="bg-white border-[2px] border-[cornflowerblue] rounded-full w-6 h-6 flex items-center justify-center relative">
          <div className="bg-[cornflowerblue] rounded-full w-1 h-1"></div>
        </div>
      </div>
      <div className="fixed z-[10000] md:right-0 right-1/2 md:translate-x-0 translate-x-1/2 w-11/12 md:w-1/3 lg:w-1/5 xl:1/6 mt-3 md:mr-3 rounded-[20px] shadow-lg py-2 pl-4 bg-white">
        <input
          className="focus:outline-none w-[95%] px-1"
          placeholder="검색할 역을 입력하세요"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        <div className="max-h-96 overflow-y-auto pr-4">
          {subway.DATA.filter(
            (item) =>
              search !== "" &&
              (getChoseong(item.bldn_nm).includes(search) ||
                item.bldn_nm.includes(search))
          )
            .reduce((acc: SubwayDataJson[], current) => {
              if (
                !acc.some(
                  (item) =>
                    item.bldn_nm === current.bldn_nm &&
                    item.real === current.real
                )
              ) {
                acc.push(current);
              }
              return acc;
            }, [])
            .map((item, index) => (
              <div
                key={index}
                className="hover:bg-gray-100 transition-colors ease-in-out duration-300 flex justify-between last:rounded-b-xl p-1"
                onClick={() => flyToStaion(item)}
              >
                <span>{item.bldn_nm}</span>
                <span
                  style={{
                    color: `rgba(${color.lineColors[item.route][0]}, ${
                      color.lineColors[item.route][1]
                    }, ${color.lineColors[item.route][2]})`,
                  }}
                  className="font-bold"
                >
                  {item.real}
                </span>
              </div>
            ))}
        </div>
      </div>
      <div
        id="info"
        className="md:w-[20%] w-full bg-white md:h-screen h-[550px] fixed md:bottom-0 -bottom-[550px] transition-all duration-300 ease-in-out z-[10000] border-t md:left-[-20%] left-0 px-3 pt-2 shadow-lg shadow-gray-300 select-none"
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
