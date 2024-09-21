"use client";

import {
  APIProvider,
  Map as GoogleMap,
  limitTiltRange,
} from "@vis.gl/react-google-maps";
import { DeckGL } from "deck.gl";
import { useLine, useMarker } from "./Hooks";
import * as color from "@/variable";
import { ChangeEvent, useEffect, useState } from "react";
import { SubwayData } from "@/types";
import { useStationStore } from "@/store";
import useSWR, { mutate } from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Map() {
  const { station, setStation } = useStationStore();
  const { data, isLoading } = useSWR<SubwayData>(
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

  useEffect(() => {
    console.log(
      ",--.  ,--.        ,--.  ,--.       ,--.   ,--.                 \n|  '--'  | ,--,--.|  '--'  | ,---. |  |   |  | ,--,--.,--. ,--.\n|  .--.  |' ,-.  ||  .--.  || .-. ||  |.'.|  |' ,-.  | \\  '  / \n|  |  |  |\\ '-'  ||  |  |  |' '-' '|   ,'.   |\\ '-'  |  \\   '  \n`--'  `--' `--`--'`--'  `--' `---' '--'   '--' `--`--'.-'  /   \n                                                      `---'    "
    );
  }, []);

  useEffect(() => {
    const info = document.getElementById("info");
    const viewPort = window.innerWidth;
    if (station) {
      if (viewPort < 768) {
        info!.style.transform = "translateY(-160px)";
      } else {
        info!.style.transform = "translateX(100%)";
      }
    }
  }, [station]);

  const handleClose = () => {
    const info = document.getElementById("info");
    const viewPort = window.innerWidth;
    if (viewPort < 768) {
      info!.style.transform = "translateY(384px)";
    } else {
      info!.style.transform = "translateX(-100%)";
    }
    setStation("");
  };

  useEffect(() => {
    console.log(data?.realtimeArrivalList)
  }, [data])

  return (
    <>
      <div
        id="info"
        className="md:w-[20%] w-full bg-white md:h-screen h-96 fixed md:bottom-0 -bottom-96 transition-all duration-300 ease-in-out z-10 border-t md:left-[-20%] left-0 px-3 pt-2"
      >
        <div className="flex justify-between relative">
          <span className="text-lg pt-1">{isLoading ? "로딩중" : station}</span>
          {/* {window.innerWidth < 768 && (
            <button className="left-1/2 -translate-x-1/2 font-bold text-xl absolute">
              ▲▼
            </button>
          )} */}
          <div>
            <button onClick={() => mutate(`/api/data?station=${station}`)} className="text-2xl p-0">↻</button>
            <button onClick={handleClose} className="text-2xl p-0">
              🗙
            </button>
          </div>
        </div>
        <div className="mt-3">
          {data?.realtimeArrivalList
            ? data?.realtimeArrivalList?.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span
                    style={{
                      color: `rgba(${color.subwayColors[item.subwayId][0]}, ${
                        color.subwayColors[item.subwayId][1]
                      }, ${color.subwayColors[item.subwayId][2]})`,
                    }}
                    className={`font-bold`}
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
          controller={
            {
              // dragRotate: false
            }
          }
          initialViewState={{
            latitude: 37.5665,
            longitude: 126.978,
            zoom: 11,
            maxZoom: 17,
            minZoom: 11,
          }}
          onViewStateChange={limitTiltRange}
          getTooltip={({ object }) => object?.name}
        >
          <GoogleMap
            mapId={"dfa9c89e5dca4495"}
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={0}
          />
        </DeckGL>
      </APIProvider>
    </>
  );
}
