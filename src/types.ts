export type Color = [r: number, g: number, b: number, a?: number]
export type Station = {
  line?: string,
  name: string,
  lat: number,
  lng: number
}
export type Line = {
  sourcePosition: [longitude: number, latitude: number],
  targetPosition: [longitude: number, latitude: number]
}
export type ErrorMessage = {
  status: number;
  code: string;
  message: string;
  link: string;
  developerMessage: string;
  total: number;
};
export type RealtimeArrival = {
  beginRow: null | string;
  endRow: null | string;
  curPage: null | string;
  pageRow: null | string;
  totalCount: number;
  rowNum: number;
  selectedCount: number;
  subwayId: string;
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
  arvlMsg2: string;
  arvlMsg3: string;
  arvlCd: string;
  lstcarAt: string;
};

export type SubwayData = {
  errorMessage: ErrorMessage;
  realtimeArrivalList: RealtimeArrival[];
};


export type SubwayDataJson = {
  bldn_id: string;
  route: string;
  lot: string;
  bldn_nm: string;
  lat: string;
  real: string;
}
