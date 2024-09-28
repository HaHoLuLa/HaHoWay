"use client";

import subway from "../../assets/subwayStations.json";
import { useSearchStore, useStationStore, useViewStateStore } from "@/store";
import { SubwayDataJson } from "@/types";
import { getChoseong } from "es-hangul";
import * as color from "@/variable";

export default function Search() {
  const { search, setSearch } = useSearchStore();
  const { initialViewState, setInitialViewState } = useViewStateStore()
  const { setStation } = useStationStore()

  const flyToStaion = (station: SubwayDataJson) => {
    setInitialViewState({
      ...initialViewState,
      zoom: 16,
      latitude: parseFloat(station.lat),
      longitude: parseFloat(station.lot),
    });
    setStation(station.bldn_nm);
    setSearch("");
  };

  return (
    <>
      <div className="fixed z-[10000] md:right-0 right-1/2 md:translate-x-0 translate-x-1/2 w-11/12 md:w-1/3 lg:w-1/5 xl:1/6 mt-3 md:mr-3 rounded-[20px] shadow-lg py-2 pl-4 bg-white">
        <input
          className="focus:outline-none w-[95%] px-1"
          placeholder="검색할 역을 입력하세요"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        <div className="max-h-96 overflow-y-auto pr-4">
          {subway.DATA.filter(
            (item) =>
              search !== "" &&
              (getChoseong(item.bldn_nm).includes(search) ||
                item.bldn_nm.includes(search))
          )
            .reduce((acc: SubwayDataJson[], current) => {
              if (
                !acc.some(
                  (item) =>
                    item.bldn_nm === current.bldn_nm &&
                    item.real === current.real
                )
              ) {
                acc.push(current);
              }
              return acc;
            }, [])
            .map((item, index) => (
              <div
                key={index}
                className="hover:bg-gray-100 transition-colors ease-in-out duration-300 flex justify-between last:rounded-b-xl p-1"
                onClick={() => flyToStaion(item)}
              >
                <span>{item.bldn_nm}</span>
                <span
                  style={{
                    color: `rgba(${color.lineColors[item.route][0]}, ${
                      color.lineColors[item.route][1]
                    }, ${color.lineColors[item.route][2]})`,
                  }}
                  className="font-bold"
                >
                  {item.real}
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
