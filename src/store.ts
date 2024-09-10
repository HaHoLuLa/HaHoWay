import { create } from "zustand";

interface StationStore {
  station: string;
  setStation: (station: string) => void;
}

const useStationStore = create<StationStore>((set) => ({
  station: "",
  setStation: (station) => set(() => ({ station }))
}))

export { useStationStore }