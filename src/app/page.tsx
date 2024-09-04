import subway from "./assets/subwayStations.json";

export default function Index() {
  const data = subway.DATA;
  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.bldn_nm} | {item.route}
          </li>
        ))}
      </ul>
    </div>
  );
}
