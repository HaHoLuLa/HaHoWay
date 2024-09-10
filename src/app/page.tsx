import subway from "./assets/subwayStations.json";

export default function Index() {
  const data = subway.DATA;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>역명</th>
            <th>노선명</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.bldn_nm}</td>
              <td>{item.route}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
