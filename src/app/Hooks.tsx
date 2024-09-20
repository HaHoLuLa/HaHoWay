"use client"
import subway from "./assets/subwayStations.json"
import { LineLayer, ScatterplotLayer } from "deck.gl";
import type { Color, Station, Line } from "@/types";
import { useStationStore } from "@/store";

/**
 * 노선을 간단하게 그리기 위한 훅
 * @param lineNum 데이터 호선의 이름
 * @param color 호선의 색깔
 * @returns LineLayer 객체를 반환
 */
export const useLine = (lineNum: string[], color: Color): LineLayer => {
  const line = subway.DATA.filter((item) => lineNum.some((num) => item.route.startsWith(num)));
  const lineData = line.map((item, index) => {
    const nextItem = line[index + 1];

    return {
      sourcePosition: [parseFloat(item.lot), parseFloat(item.lat)],
      targetPosition: nextItem
        ? [parseFloat(nextItem.lot), parseFloat(nextItem.lat)]
        : [parseFloat(item.lot), parseFloat(item.lat)],
    } as Line;
  });
  const lineLayer = new LineLayer({
    id: `${lineNum}-layer`,
    data: lineData,
    getSourcePosition: (d: Line) => d.sourcePosition,
    getTargetPosition: (d: Line) => d.targetPosition,
    getColor: [color[0], color[1], color[2], color[3] || 255],
    getWidth: 5,
  });

  return lineLayer
}

/**
 * 노선의 역을 찍기 위한 훅
 * @param lineNum 데이터 호선의 이름
 * @returns ScatterplotLayer 반환
 */
export const useMarker = (lineNum: string[], color: Color) => {
  const { station, setStation } = useStationStore();
  const line = subway.DATA.filter((item) => lineNum.some((num) => item.route.startsWith(num)));
  const lineData = line.map((item) => ({
    line: item.route,
    name: item.bldn_nm,
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lot),
  } as Station));

  const scatterplotLayer = new ScatterplotLayer<Station>({
    id: `${lineNum}-stations`,
    data: lineData,
    getPosition: (d: Station) => [d.lng, d.lat],
    // getRadius: 25, // Radius in meters
    getFillColor: [255, 255, 255, 255],
    getLineColor: [color[0], color[1], color[2], color[3] || 255],
    pickable: true,
    stroked: true,
    radiusMinPixels: 7,
    radiusMaxPixels: 25,
    lineWidthMinPixels: 3,
    lineWidthMaxPixels: 10,
    onClick: (pickingInfo, event) => {
      const { name } = pickingInfo.object
      setStation(name);
    },
  });

  return scatterplotLayer;
}