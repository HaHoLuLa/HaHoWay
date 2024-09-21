import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const station = searchParams.get("station") || "서울";

  try {
    const response = await axios.get(
      `http://swopenapi.seoul.go.kr/api/subway/${process.env.NEXT_PUBLIC_SUBWAY_API_KEY}/json/realtimeStationArrival/0/30/${station}`
    );

    // 응답 데이터를 JSON 형식으로 반환
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);

    // 에러 발생 시, 상태 코드 500과 함께 메시지를 반환
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
