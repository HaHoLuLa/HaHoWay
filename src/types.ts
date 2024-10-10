// 프로젝트에 필요한 타입들을 정의

/**
 * deck.gl 라이브러리를 위한 Color 타입
 * 
 * rgba 형식
 */
export type Color = [r: number, g: number, b: number, a?: number]

/**
 * 데이터 정렬을 위한 Station 타입
 */
export type Station = {
  line?: string, // 호선
  name: string, // 역사명
  lat: number, // 위도
  lng: number // 경도
}

/**
 * lineLayer로 노선을 그리기 위한 타입
 */
export type Line = {
  sourcePosition: [longitude: number, latitude: number], // 이전 역의 경도, 위도
  targetPosition: [longitude: number, latitude: number] // 다음 역의 경도, 위도
}

/**
 * 공공 데이터 포털의 형식
 */
export type ErrorMessage = {
  status: number;
  code: string;
  message: string;
  link: string;
  developerMessage: string;
  total: number;
};

/**
 * 공공 데이터 포털의 형식
 */
export type RealtimeArrival = {
  beginRow: null | string;
  endRow: null | string;
  curPage: null | string;
  pageRow: null | string;
  totalCount: number;
  rowNum: number;
  selectedCount: number;
  subwayId: string; // 노선 코드
  subwayNm: null | string;
  updnLine: string;
  trainLineNm: string;
  subwayHeading: null | string;
  statnFid: string;
  statnTid: string;
  statnId: string;
  statnNm: string;
  trainCo: null | string;
  trnsitCo: string;
  ordkey: string;
  subwayList: string;
  statnList: string;
  btrainSttus: string;
  barvlDt: string;
  btrainNo: string;
  bstatnId: string;
  bstatnNm: string;
  recptnDt: string;
  arvlMsg2: string; // 도착 정보
  arvlMsg3: string;
  arvlCd: string;
  lstcarAt: string;
};

/**
 * 공공 데이터 포털에서 받아오는 데이터 타입 정의
 */
export type SubwayData = {
  errorMessage: ErrorMessage;
  realtimeArrivalList: RealtimeArrival[];
};

/**
 * 역사의 위치 정보 JSON의 타입
 */
export type SubwayDataJson = {
  bldn_id: string;
  route: string; // 호선
  lot: string; // 위도
  bldn_nm: string; // 역사명
  lat: string; // 경도
  real: string; // 실제 표시 호선
}

/**
 * 위도 경도
 */
export type Location = {
  lat: number;
  lng: number;
}

/**
 * 닫기 이벤트 함수 타입
 */
export type HandleClose = () => void;