export type Color = [r: number, g: number, b: number, a?: number]
export type Station = {
  name: string,
  lat: number,
  lng: number
}
export type Line = {
  sourcePosition: [longitude: number, latitude: number],
  targetPosition: [longitude: number, latitude: number]
}
export type SubwayList = {
  beginRow: never,
  endRow: never,
  curPage: never,
  pageRow: never,
  totalCount: number,
  rowNum: number,
  selectedCount: number,
  subwayId: string,
  subwayNm: never,
  updnLine: string,
  trainLineNm: string,
  subwayHeading: never,
  statnFid: string,
  statnTid: string,
  statnId: string,
  statnNm: string,
  trainCo: never,
  trnsitCo: string,
  ordkey: string,
  subwayList: string,
  statnList: string,
  btrainSttus: string,
  barvlDt: string,
  btrainNo: string,
  bstatnId: string,
  bstatnNm: string,
  recptnDt: string,
  arvlMsg2: string,
  arvlMsg3: string,
  arvlCd: string,
  lstcarAt: string
}