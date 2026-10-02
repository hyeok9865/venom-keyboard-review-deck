# 검증 리포트 (Verification Loop)

- 검증 도구: Playwright (Chromium headless) + 자체 정적 서버
- 대상: `venom-deck/index.html` (reveal.js 14장)
- 검증 항목: 라이브러리 로드, 슬라이드 수, 콘솔/페이지 에러, 깨진 이미지, 실패 요청, 슬라이드별 스크린샷
- 결과: **PASS**

## 자동 검증 결과 (`verify/report.json`)

| 항목 | 결과 |
|---|---|
| reveal.js 준비 | ✅ true |
| 총 슬라이드 | 14 |
| anime.js 로드 | ✅ |
| Chart.js 로드 | ✅ |
| 깨진 이미지 | 0 / 4 |
| 콘솔 에러 | 0 |
| 페이지 에러 | 0 |
| 실패 요청 | 0 |
| 캡처 슬라이드 | 14 / 14 |
| 종합 | **ok: true** |

## 육안 검증 (스크린샷)

`verify/shots/slide-01.png` ~ `slide-14.png` 확인 완료.

- 표지: 그라디언트 타이틀 + 파티클 캔버스 정상
- 성능 지표: 카운터/레이더 정상 (카운터는 애니메이션 진행 중 캡처되어 최종값 근사치로 보일 수 있음)
- 데이터 개요: Chart.js 수평 막대 정상
- 감성 분석/가격/지연시간: matplotlib PNG 정상 렌더
- 가이드: 표 + 카드 정상

## 발견 및 조치

| 이슈 | 심각도 | 조치 |
|---|---|---|
| JS 비활성 환경에서 `.anim` 숨김 | 낮음 | `<noscript>` 폴백 스타일 추가 |
| 일부 슬라이드 하단 여백 | 낮음 | 허용 (덱 특성) |
| 카운터 스크린샷 타이밍 | 없음 | 실제 재생에는 영향 없음 |

## 재현 방법

```bash
cd <pw-verify>
node verify.mjs   # DECK 경로 상수 참조
```
