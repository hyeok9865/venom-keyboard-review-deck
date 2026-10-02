# 베놈 키보드 상품리뷰 조사 — HTML Slide Deck

Geonworks VENOM HE(60HE / 80HE / 87HE) 키보드의 실제 사용자 리뷰 23건을 수집·분석한 발표용 슬라이드 덱입니다.

## 구성
- `index.html` — reveal.js 기반 14장 슬라이드 덱
- `css/theme.css` — 다크 테마
- `js/deck.js` — anime.js 애니메이션 · Chart.js 인터랙티브 차트 · 카운터 · 커버 캔버스
- `assets/charts/` — matplotlib로 생성한 정적 차트 5종
- `data/` — 원본 CSV 및 차트 생성 스크립트
- `verify/` — Playwright 자동 검증 리포트 및 스크린샷

## 시각화 스택
- **reveal.js 4.6** (CDN) — 프레젠테이션
- **anime.js 3.2** — 등장 애니메이션, 숫자 카운터, 파티클 캔버스
- **Chart.js 4.4** — 리뷰 출처 분포 인터랙티브 차트
- **matplotlib 3.11** — 감성 분석 / 가격 / 지연시간 / 레이더 / 도넛 차트

## 로컬 실행
정적 사이트이므로 아무 정적 서버로 열면 됩니다.

```bash
# Python
python -m http.server 8080
# 또는 Node
npx serve .
```

브라우저에서 `http://localhost:8080` 접속. `index.html`을 직접 열어도 동작합니다.

## 검증
`verify/report.json` — reveal 준비 상태, 슬라이드 수, 로드된 라이브러리, 콘솔/페이지 에러, 깨진 이미지, 실패 요청을 자동 점검한 결과.

## 데이터 출처
네이버 블로그, 번개장터·글로벌번개장터, YouTube(boardzy)·RTINGS·퀘이사존, 쿠팡, GeekNews. 전체 URL은 상위 `venom_keyboard_reviews.csv` 및 `venom_keyboard_reviews.html` 참고.

## 고지
- 공개 리뷰를 수집·요약한 참고용 자료이며 특정 구매를 권유하지 않습니다.
- 가격·재고·평점은 게시 시점 기준으로 실시간 변동합니다.
- 쿠팡 파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있습니다.
