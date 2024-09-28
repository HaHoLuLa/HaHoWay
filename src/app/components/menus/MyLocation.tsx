"use client";

import { useViewStateStore } from "@/store";
import type { HandleClose, Location } from "@/types";

export default function MyLocation({
  location,
  handleClose,
}: {
  location: Location;
  handleClose: HandleClose;
}) {
  const { initialViewState, setInitialViewState } = useViewStateStore();

  return (
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
  );
}
