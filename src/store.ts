import { create } from "zustand";
import { FlyToInterpolator, MapViewState } from "deck.gl";

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

const useStationStore = create<StationStore>((set) => ({
  station: "",
  setStation: (station) => set(() => ({ station }))
}))

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

const useSearchStore = create<SearchStore>((set) => ({
  search: "",
  setSearch: (search) => set(() => ({ search }))
}))

export { useStationStore, useViewStateStore, useSearchStore }