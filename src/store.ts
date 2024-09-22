import { create } from "zustand";
import { FlyToInterpolator, MapViewState } from "deck.gl";

interface StationStore {
  station: string;
  setStation: (station: string) => void;
}

interface ViewState {
  initialViewState: MapViewState,
  setInitialViewState: (initialViewState: MapViewState) => void;
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
}))

const useSearchStore = create<SearchStore>((set) => ({
  search: "",
  setSearch: (search) => set(() => ({ search }))
}))

export { useStationStore, useViewStateStore, useSearchStore }