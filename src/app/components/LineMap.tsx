// 지도 및 노선을 그리기 위한 컴포넌트

"use client";

import {
  APIProvider,
  Map,
  // limitTiltRange,
} from "@vis.gl/react-google-maps";
import { DeckGL, LayersList, MapViewState, ScatterplotLayer } from "deck.gl";
import * as color from "@/variable";
import { useEffect, useState } from "react";
import { useViewStateStore } from "@/store";
import type { Location } from "@/types";

export default function LineMap({
  layers,
  location,
}: {
  layers: LayersList;
  location: Location;
}) {
  const { initialViewState } = useViewStateStore();

  // 사용자 위치 표시 레이어
  const [user, setUser] = useState<ScatterplotLayer>();

  // 노선이 있는 수도권의 지역만 보이도록 경계를 제한
  const applyViewStateConstraints = (viewState: MapViewState): any => ({
    ...viewState,
    longitude: Math.min(127.855699, Math.max(126.345945, viewState.longitude)),
    latitude: Math.min(38.179692, Math.max(36.648304, viewState.latitude)),
  });

  // 프롭으로 받은 위치 상태로 사용자 위치 표시하는 레이어 생성
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

  return (
    <>
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY || "YOUR_API_KEY"}
      >
        <DeckGL
          // 사용자의 위치 레이어와 프롭으로 받은 노선도
          layers={[user, ...layers]}
          controller={{
            dragRotate: false,
          }}
          initialViewState={initialViewState}
          // 지도 경계 제한
          onViewStateChange={({ viewState }: any) =>
            applyViewStateConstraints(viewState)
          }
          // 역 호버 시 역명 표시
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
          {/* 지도 */}
          <Map
            mapId={"1126a248f639ef5c"}
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={0}
          />
        </DeckGL>
      </APIProvider>
    </>
  );
}
