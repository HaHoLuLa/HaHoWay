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

export default function LineMap({
  layers,
  location,
}: {
  layers: LayersList;
  location: { lat: number; lng: number };
}) {
  const { initialViewState } = useViewStateStore();
  
  const [user, setUser] = useState<ScatterplotLayer>();

  const applyViewStateConstraints = (viewState: MapViewState): any => ({
    ...viewState,
    longitude: Math.min(127.855699, Math.max(126.345945, viewState.longitude)),
    latitude: Math.min(38.179692, Math.max(36.648304, viewState.latitude)),
  });

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
          layers={[user, ...layers]}
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
