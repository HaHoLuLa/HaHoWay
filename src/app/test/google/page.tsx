"use client";

import {
  APIProvider,
  Map as GoogleMap,
  Marker,
  limitTiltRange,
} from "@vis.gl/react-google-maps";
import subway from "../../assets/subwayStations.json";
import { DeckGL, ScatterplotLayer } from "deck.gl";
import { useLine, useMarker } from "./Hooks";
import * as color from "./variable";
import { ChangeEvent, useState } from "react";

export default function Map() {
  const subwayPosition = subway.DATA.map((item) => ({
    name: item.bldn_nm,
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lot),
  }));

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
  const 경의중앙선 = useLine(
    ["경의중앙선", "경원선", "중앙선", "중경원선"],
    color.경의중앙선Color
  );
  const 경춘선 = useLine(["경춘선"], color.경춘선Color); // 임시 ok
  const 공항철도 = useLine(["공항철도"], color.공항철도Color); // ok
  const 서해선 = useLine(["서해선"], color.서해선Color); // 임시
  const 수인분당선 = useLine(["수인선", "분당선"], color.수인분당선Color); // 임시 ok
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

  const scatterplotLayer = new ScatterplotLayer({
    id: "subway-stations",
    data: subwayPosition,
    getPosition: (d) => [d.lng, d.lat],
    // getRadius: 25, // Radius in meters
    getFillColor: [255, 255, 255, 255],
    getLineColor: [0, 0, 0, 255],
    pickable: true,
    radiusMinPixels: 7,
    radiusMaxPixels: 25,
    lineWidthMinPixels: 2,
    onClick: (pickingInfo, event) => {
      alert(pickingInfo.object.name);
    },
  });

  const line5 = useMarker(["5호선", "마천행"])

  return (
    <>
      <div className="fixed top-2 right-2 z-[10000] border">
        <input type="text" placeholder="역명 검색" />
      </div>
      <div className="bg-white h-screen w-1/5 z-[10000] fixed overflow-y-auto">
        <ul>
          {Object.keys(check).map((item) => (
            <li key={item}>
              <label htmlFor={item} className="select-none text-2xl">
                <input
                  id={item}
                  className="size-8"
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
      <APIProvider apiKey={process.env.NEXT_PUBLIC_API_KEY || "YOUR_API"}>
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
            check._5호선 && line5
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
            // maxZoom: 15,
            minZoom: 11,
          }}
          onViewStateChange={limitTiltRange}
        >
          <GoogleMap mapId={"dfa9c89e5dca4495"}>
            {/* defaultBounds={{north: 37.7019,
            south: 37.4283,
            east: 127.1838,
            west: 126.7644}} */}
            {/* {subwayPosition.map((item, index) => (
              <Marker position={item} key={index} />
            ))} */}
            {/* <Marker position={{lat: 37, lng: 127}} onClick={() => console.log("클릭됨")} /> */}
          </GoogleMap>
        </DeckGL>
      </APIProvider>
    </>
  );
}
