import type { Color } from "@/types"

export const line1Color: Color = [33, 81, 158]
export const line2Color: Color = [75, 165, 87]
export const line3Color: Color = [224, 130, 56]
export const line4Color: Color = [73, 162, 221]
export const line5Color: Color = [146, 110, 168]
export const line6Color: Color = [194, 168, 64]
export const line7Color: Color = [118, 127, 37]
export const line8Color: Color = [210, 52, 107]
export const line9Color: Color = [187, 176, 149]
export const 인천1호선Color: Color = [125, 155, 202]
export const 인천2호선Color: Color = [233, 166, 96]
export const 경강선Color: Color = [34, 83, 160]
export const 경의중앙선Color: Color = [137, 194, 165]
export const 경춘선Color: Color = [65, 138, 115]
export const 공항철도Color: Color = [63, 142, 204]
export const 서해선Color: Color = [154, 194, 67]
export const 수인분당선Color: Color = [241, 192, 65]
export const 신분당선Color: Color = [194, 41, 64]
export const 신림선Color: Color = [110, 136, 197]
export const 우이신설선Color: Color = [185, 196, 98]
export const 김포골드라인Color: Color = [167, 136, 45]
export const 에버라인선Color: Color = [108, 169, 66]
export const 의정부경전철Color: Color = [235, 135, 50]
export const gtxAColor: Color = [146, 101, 143]
export const subwayColors: Record<string, Color> = {
  "1001": line1Color,
  "1002": line2Color,
  "1003": line3Color,
  "1004": line4Color,
  "1005": line5Color,
  "1006": line6Color,
  "1007": line7Color,
  "1008": line8Color,
  "1009": line9Color,
  "1061": 경의중앙선Color,
  "1063": 경의중앙선Color,
  "1065": 공항철도Color,
  "1067": 경춘선Color,
  "1075": 수인분당선Color,
  "1077": 신분당선Color,
  "1092": 우이신설선Color,
  "1093": 서해선Color,
  "1094": 신림선Color,
  "1081": 경강선Color,
  "1032": gtxAColor,
};
export const lineColors: Record<string, Color> = {
  "1호선": line1Color,
  "장항선": line1Color,
  "경부선": line1Color,
  "경인선": line1Color,
  "경원선": line1Color,
  "광명행": line1Color,
  "서동탄행": line1Color,
  "2호선": line2Color,
  "신설동행": line2Color,
  "까치산행": line2Color,
  "3호선": line3Color,
  "일산선": line3Color,
  "4호선": line4Color,
  "안산선": line4Color,
  "진접선": line4Color,
  "과천선": line4Color,
  "5호선": line5Color,
  "마천행": line5Color,
  "6호선": line6Color,
  "7호선": line7Color,
  "8호선": line8Color,
  "별내선": line8Color,
  "9호선": line9Color,
  "9호선(연장)": line9Color,
  "인천1호선": 인천1호선Color,
  "인천2호선": 인천2호선Color,
  "경강선": 경강선Color,
  "경의중앙선": 경의중앙선Color,
  "중앙선": 경의중앙선Color,
  "중경원선": 경의중앙선Color,
  "신촌행": 경의중앙선Color,
  "경춘선": 경춘선Color,
  "공항철도1호선": 공항철도Color,
  "서해선": 서해선Color,
  "수인선": 수인분당선Color,
  "분당선": 수인분당선Color,
  "신분당선": 신분당선Color,
  "신분당선(연장)": 신분당선Color,
  "신림선": 신림선Color,
  "우이신설선": 우이신설선Color,
  "김포골드라인": 김포골드라인Color,
  "에버라인선": 에버라인선Color,
  "의정부선": 의정부경전철Color,
  "수도권 광역급행철도": gtxAColor,
}