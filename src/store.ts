// 프로젝트에서 쓰일 전역 상태들을 정의

import { create } from "zustand";
import { FlyToInterpolator, MapViewState } from "deck.gl";

// 각 상태의 타입 인터페이스 정의
interface StationStore {
  station: string;
  setStation: (station: string) => void;
}

interface ViewState {
  initialViewState: MapViewState,
  setInitialViewState: (initialViewState: MapViewState) => void;
  // setInitialViewState: (updater: (prevState: MapViewState) => MapViewState) => void;
}

interface SearchStore {
  search: string;
  setSearch: (station: string) => void;
}

/**
 * 역의 정보를 저장 공유하기 위한 상태
 */
const useStationStore = create<StationStore>((set) => ({
  station: "",
  setStation: (station) => set(() => ({ station }))
}))

/**
 * 지도의 처음 뷰를 관리하기 위한 상태
 */
const useViewStateStore = create<ViewState>((set) => ({
  initialViewState: {
    latitude: 37.5665,
    longitude: 126.978,
    zoom: 11,
    maxZoom: 17,
    minZoom: 11,
    transitionDuration: "auto",
    transitionInterpolator: new FlyToInterpolator({ speed: 3 }),
  },
  setInitialViewState: (initialViewState) => set(() => ({ initialViewState }))
  // setInitialViewState: (updater) => set((state) => ({
  //   initialViewState: updater(state.initialViewState), // 기존 상태를 함수형으로 업데이트
  // })),
}))

/**
 * 검색 정보를 공유하기 위한 상태
 */
const useSearchStore = create<SearchStore>((set) => ({
  search: "",
  setSearch: (search) => set(() => ({ search }))
}))

export { useStationStore, useViewStateStore, useSearchStore }