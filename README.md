## HaHoWay

2학기 캡스톤디자인 시간, 공공데이터포털의 데이터를 가져와서 프로젝트를 만들어야하는 과제가 주어졌다.

따라서 [지하철 실시간 도착 정보](https://data.seoul.go.kr/dataList/OA-12764/A/1/datasetView.do;jsessionid=6F8F1F0EB9B0D28B9758B8A1488A133C.new_portal-svr-11)를 이용한 지하철 도착 정보 앱을 구상하였다.

### 사용한 패키지 목록

메인
- Next
- React

데이터 페칭
- Axios
- SWR

상태관리
- Zustand

CSS
- PostCSS
- TailwindCSS

문법
- ESLint
- TypeScript

지도
- deck.gl
- vis.gl

기타
- es-hangul

### 설치 방법

깃허브에서 프로젝트를 클론하거나 zip으로 다운한다.
```bash
git clone https://github.com/HaHoLuLa/HaHoWay.git
```

디렉토리로 이동 후
```bash
cd hahoway
```

아래 명령어로 필요한 패키지들을 다운한다.
```bash
npm install
```

.env 파일로 필요한 환경변수들을 적는다.
```bash
NEXT_PUBLIC_MAP_API_KEY=<구글지도_api_키>
NEXT_PUBLIC_SUBWAY_API_KEY=<서울시_공공데이터포털_키>
NEXT_PUBLIC_SUBWAY_API_KEY_2=<필요시_하나더_공공데이터포털_키>
```

마지막으로 다음 명령어를 통해 실행한다.
```bash
npm run dev
```