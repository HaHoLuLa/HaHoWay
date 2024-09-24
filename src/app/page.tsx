"use client";

import {
  APIProvider,
  Map as GoogleMap,
  // limitTiltRange,
} from "@vis.gl/react-google-maps";
import {
  DeckGL,
  FlyToInterpolator,
  MapViewState,
  ScatterplotLayer,
} from "deck.gl";
import { useLine, useMarker } from "./Hooks";
import * as color from "@/variable";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { SubwayData, SubwayDataJson } from "@/types";
import { useSearchStore, useStationStore, useViewStateStore } from "@/store";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { getChoseong } from "es-hangul";
import subway from "./assets/subwayStations.json";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Map() {
  const { station, setStation } = useStationStore();
  const { initialViewState, setInitialViewState } = useViewStateStore();
  const { search, setSearch } = useSearchStore();
  const { data, isLoading, error } = useSWR<SubwayData>(
    station ? `/api/data?station=${station}` : null,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const [check, setCheck] = useState({
    _1호선: true,
    _2호선: true,
    _3호선: true,
    _4호선: true,
    _5호선: true,
    _6호선: true,
    _7호선: true,
    _8호선: true,
    _9호선: true,
    인천1호선: true,
    인천2호선: true,
    경강선: true,
    경의중앙선: true,
    경춘선: true,
    공항철도: true,
    서해선: true,
    수인분당선: true,
    신분당선: true,
    신림선: true,
    우이신설선: true,
    김포골드라인: true,
    에버라인선: true,
    의정부경전철: true,
    gtxA: true,
  });
  const [location, setLocation] = useState({
    lat: 0.0,
    lng: 0.0,
  });
  const [user, setUser] = useState<ScatterplotLayer>();
  const [width, setWidth] = useState(0);
  const [startY, setStartY] = useState<number>(0);
  const [isDrag, setIsDrag] = useState(false);

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

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheck((prevCheck) => ({
      ...prevCheck,
      [name]: checked,
    }));
  };

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

  const handleClose = useCallback(() => {
    const info = document.getElementById("info");
    const viewPort = window.innerWidth;
    if (viewPort < 768) {
      // info!.style.transform = "translateY(384px)";
      info!.style.bottom = "-550px"
    } else {
      info!.style.transform = "translateX(-100%)";
    }
    setStation("");
    setSearch("");
  }, [setSearch, setStation]);

  const applyViewStateConstraints = (viewState: MapViewState): any => ({
    ...viewState,
    longitude: Math.min(127.855699, Math.max(126.345945, viewState.longitude)),
    latitude: Math.min(38.179692, Math.max(36.648304, viewState.latitude)),
  });

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

  // const closeMenu = () => {
  //   const menu = document.getElementById("info");
  //   if (menu) {
  //     menu.style.bottom = "-20%";
  //   }
  // };

  useEffect(() => {
    if (location.lat !== 37.5665 || location.lng !== 126.978) {
      setUser(
        new ScatterplotLayer({
          id: "user",
          data: [
            {
              lat: location.lat,
              lng: location.lng,
            },
          ],
          getPosition: (d) => [d.lng, d.lat],
          getFillColor: [100, 149, 237, 255],
          getLineColor: [255, 255, 255, 127.5],
          stroked: true,
          radiusMinPixels: 10,
          radiusMaxPixels: 28,
          lineWidthMinPixels: 6,
          lineWidthMaxPixels: 13,
        })
      );
    }
  }, [location]);

  useEffect(() => {
    setWidth(window.innerWidth);
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

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 watchPosition을 중지
    return () => {
      if (navigator.geolocation && watchId) {
        navigator.geolocation.clearWatch(watchId);
      }

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
                    item.route === current.route
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
                  {item.route}
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
      <div className="bg-white h-screen w-1/5 z-[10000] fixed overflow-y-auto hidden">
        <ul>
          {Object.keys(check).map((item) => (
            <li key={item}>
              <label htmlFor={item} className="select-none text-xl">
                <input
                  id={item}
                  className="size-6"
                  type="checkbox"
                  name={item}
                  onChange={handleToggle}
                  defaultChecked
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY || "YOUR_API_KEY"}
      >
        <DeckGL
          layers={[
            user && user,
            check._1호선 && _1호선,
            check._1호선 && 경인선,
            check._1호선 && 경부선,
            check._1호선 && 장항선,
            check._1호선 && 경원선,
            check._1호선 && 광명행,
            check._1호선 && 서동탄행,
            check._2호선 && _2호선,
            check._2호선 && 신설동행,
            check._2호선 && 까치산행,
            check._3호선 && _3호선,
            check._4호선 && _4호선,
            check._5호선 && _5호선,
            check._5호선 && 마천행,
            check._6호선 && _6호선,
            check._7호선 && _7호선,
            check._8호선 && _8호선,
            check._9호선 && _9호선,
            check.인천1호선 && 인천1호선,
            check.인천2호선 && 인천2호선,
            check.경강선 && 경강선,
            check.김포골드라인 && 김포골드라인,
            check.서해선 && 서해선,
            check.경의중앙선 && 경의중앙선,
            check.경의중앙선 && 중앙선,
            check.경의중앙선 && 중경원선,
            check.경의중앙선 && 신촌행,
            check.경춘선 && 경춘선,
            check.공항철도 && 공항철도,
            check.에버라인선 && 에버라인선,
            check.수인분당선 && 수인분당선,
            check.신분당선 && 신분당선,
            check.신림선 && 신림선,
            check.우이신설선 && 우이신설선,
            check.의정부경전철 && 경전철,
            check.gtxA && gtxA,
            // scatterplotLayer,
            check._1호선 && line1,
            check._2호선 && line2,
            check._3호선 && line3,
            check._4호선 && line4,
            check._5호선 && line5,
            check._6호선 && line6,
            check._7호선 && line7,
            check._8호선 && line8,
            check._9호선 && line9,
            check.인천1호선 && 인천1호선역,
            check.인천2호선 && 인천2호선역,
            check.경강선 && 경강선역,
            check.경의중앙선 && 경의중앙선역,
            check.경춘선 && 경춘선역,
            check.공항철도 && 공항철도역,
            check.서해선 && 서해선역,
            check.수인분당선 && 수인분당선역,
            check.신분당선 && 신분당선역,
            check.신림선 && 신림선역,
            check.우이신설선 && 우이신설선역,
            check.김포골드라인 && 김포골드라인역,
            check.에버라인선 && 에버라인역,
            check.의정부경전철 && 경전철역,
            check.gtxA && gtxA역,
          ]}
          controller={{
            dragRotate: false,
          }}
          initialViewState={initialViewState}
          onViewStateChange={({ viewState }: any) =>
            applyViewStateConstraints(viewState)
          }
          getTooltip={({ object }) =>
            object && {
              html: `<h1>${object.name}</h1>`,
              style: {
                backgroundColor: "#fff",
                fontSize: "18px",
                color: "black",
                border: "4px solid",
                borderColor: `rgba(${color.lineColors[object.line][0]}, ${
                  color.lineColors[object.line][1]
                }, ${color.lineColors[object.line][2]})`,
                borderRadius: "30px",
                boxShadow: "2px 3px 4px gray",
                fontWeight: "bold",
                padding: "5px 10px",
              },
            }
          }
        >
          <GoogleMap
            mapId={"1126a248f639ef5c"}
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={0}
          />
        </DeckGL>
      </APIProvider>
    </>
  );
}
