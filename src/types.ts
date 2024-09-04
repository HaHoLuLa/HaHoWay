export type Color = [r: number, g: number, b: number, a?: number]
export type Station = {
  name: string,
  lat: number,
  lng: number
}
export type Line = {
  sourcePosition: [number, number],
  targetPosition: [number, number]
}