# 오늘의 작업 과정 (Worklog) — 2026-10-02

이 문서는 2026-10-02 하루 동안 진행한 **전체 과정**을 순서대로 기록합니다. 각 단계의 입력, 실행, 산출물, 문제와 해결을 남겨 재현 가능하게 합니다.

- 원천 스킬 저장소: https://github.com/NomaDamas/k-skill
- 작업 워크스페이스: `C:\Users\user\Desktop\skillTest`
- 최종 배포: **https://hyeok9865.github.io/venom-keyboard-review-deck/**
- 리포지토리: https://github.com/hyeok9865/venom-keyboard-review-deck

---

## 0. 한눈에 보는 타임라인

| # | 단계 | 핵심 작업 | 산출물 | 상태 |
|---:|---|---|---|---|
| 1 | k-skill 설치 | 쇼핑·중고 9개 + 리뷰 5개, 프로젝트 스코프 | `.opencode/skills/` 14개 | 완료 |
| 2 | 랙돌 간식 리서치 | 간식 가성비 후보 조사 | `ragdoll_cat_snacks.csv` | 완료 |
| 3 | 베놈 키보드 리서치 | 리뷰 23건 수집 | `venom_keyboard_reviews.csv` | 완료 |
| 4 | 시각화(대시보드) | HTML+SVG 시각화 | `venom_keyboard_reviews.html` | 완료 |
| 5 | 보고서 | 11섹션 리포트 | `venom_keyboard_review_report.md` | 완료 |
| 6 | 슬라이드 덱 | 계획→구현→검증 | reveal.js 14장 | 완료 |
| 7 | 배포 | gh → GitHub Pages | 라이브 URL | 완료 |

---

## 1. k-skill 스킬 설치 (프로젝트 스코프)

### 1.1 리포지토리 클론
```powershell
git clone --depth 1 https://github.com/NomaDamas/k-skill.git "$env:LOCALAPPDATA\Temp\opencode\k-skill"
```

### 1.2 '쇼핑중고거래' 범위 확인
- 요청: "k-skill에서 쇼핑중고거래만 프로젝트 스코프로 설치"
- 확인 결과: **'쇼핑중고거래'라는 단일 폴더는 없음**. 쇼핑 7개 + 중고거래 2개로 분리되어 있었음.
- 사용자 선택으로 **9개 설치**, 이후 리뷰조사용 **5개 추가 설치 → 총 14개**.

### 1.3 설치 위치
```
C:\Users\user\Desktop\skillTest\.opencode\skills\
```
OpenCode 프로젝트 스코프 규칙(`.opencode/skills/<name>/SKILL.md`)을 따름.

### 1.4 설치된 스킬 (14개)
쇼핑(7): `coupang-product-search`, `naver-shopping-search`, `danawa-price-search`, `daiso-product-search`, `market-kurly-search`, `olive-young-search`, `ohou-today-deal`

중고거래(2): `bunjang-search`, `daangn-used-goods-search`

리뷰조사(5): `naver-blog-research`, `naver-news-search`, `geeknews-search`, `consumer-price-safety-search`, `store-longevity-radar`

### 1.5 설치 검증
- 각 스킬 디렉터리에 `SKILL.md` 존재 확인 (14/14)
- 복사 방식: k-skill 클론 → `.opencode\skills\` 로 재귀 복사

---

## 2. 랙돌 고양이 간식 리서치

### 2.1 시도한 프로그램 경로와 결과
| 경로 | 결과 |
|---|---|
| naver/coupang 프록시 API | HTTP 404 |
| danawa helper | `beautifulsoup4` 없음 + `pip` 없음 |
| bunjang-cli | Playwright 브라우저 미설치 |
| daangn helper | Remix JSON 파싱 실패(Exception) |

### 2.2 대안
동일 사이트(쿠팡·네이버쇼핑/SSG·마켓컬리·다나와·중고)를 웹 검색으로 조사해 후보 9~10건 정리.

### 2.3 산출물
- `ragdoll_cat_snacks.csv` (컬럼: 순위, 상품명, 브랜드, 구성, 참고가격, 개당단가, 판매처, 매핑스킬, 리뷰신호, 랙돌포인트, URL, 조회일, 비고)
- 랙돌 포인트: 장모종 음수량(묽은 저나트륨), 하루 1~2개 제한, 중고 대용량은 미개봉·유통기한 확인

---

## 3. 베놈 키보드 리뷰 리서치

### 3.1 스킬 활용
- `naver-blog-research` 정상 동작
  - 검색 3회: "베놈 키보드 리뷰", "베놈60HE 단점 후기", "베놈 87HE 리뷰"
  - 원문 6건 정독
- 주의: Windows 콘솔이 cp949라 JSON 출력이 깨져 `PYTHONIOENCODING=utf-8` 지정 + 파일 저장 후 파싱으로 해결
- `geeknews-search`: 관련 게시물 0건(개발/테크 뉴스 중심, 부적합)
- `bunjang-search`/`coupang-product-search` 가격·중고시세 보강

### 3.2 감성 분석 집계
- 긍정(총 40): 조립/커스텀 자유도 10, 8K/응답속도 8, 래피드트리거/브레이킹 7, 저소음 5, RGB 4, 마감 2, 가성비 2, 손목 2
- 부정(총 18): 60% 배열 적응 4, 키캡 호환 4, 비용 과다 4, 도터보드 파손/조립난도 3, 설정/매뉴얼 1, 통울림 1, ABS 번들 1

### 3.3 산출물
- `venom_keyboard_reviews.csv` (23행, 출처 URL 포함)

---

## 4. 시각화 — 리뷰 대시보드 (HTML+SVG)

- 환경에 matplotlib/pandas/numpy가 없어 **외부 의존성 없는 자체 완결형 HTML+SVG**로 제작.
- 구성: 핵심 스펙 카드, 긍정/부정 막대, 비용 막대, 출처 분포, 원문 23건 테이블.
- 산출물: `venom_keyboard_reviews.html`

---

## 5. 조사 보고서

- `venom_keyboard_review_report.md`
- 목차: 요약 / 배경 / 방법·범위 / 제품 개요 / 성능 지표 / 리뷰 분석 / 대표 사례 / 가이드 / 결론 / 한계 / 참고자료(22건)

---

## 6. 슬라이드 덱 (계획 → 구현 → 검증 → 배포)

### 6.1 계획
- 사용자 요구: anime.js·matplotlib 등 rich 시각화, Google Flow 이미지, 계획 우선 + 검증 루프, GitHub Pages 배포
- 환경 점검 후 질문으로 확정:
  - 이미지: Flow 자동화 시도 + CSS/SVG 폴백
  - 슬라이드: reveal.js (CDN)
  - 배포: 사용자가 `gh auth login`

### 6.2 Python/시각화 환경 구축
```
python -m ensurepip --upgrade        # pip 26.2.1 설치
python -m pip install matplotlib numpy
# matplotlib 3.11.2, numpy 2.5.3
```
> manim은 ffmpeg/cairo/LaTeX 의존으로 비현실적 → matplotlib + 웹 스택으로 대체.

### 6.3 Google Flow 이미지 시도 (컴퓨터유즈)
- `orca` computer-use로 Chrome(로그인 상태) 자동화
- Flow 온보딩·쿠키 동의·프로젝트 진입까지 성공
- 프롬프트 입력 단계에서 **한글 IME가 영문을 한글 자모로 변환** + 포커스/주소창 문제로 실패
- → 승인된 **CSS/SVG + matplotlib 폴백** 적용

### 6.4 차트 생성 (matplotlib, 다크 테마, Malgun Gothic)
- `posneg.png` (긍정/부정), `price.png` (비용), `latency.png` (지연시간), `radar.png` (레이더), `sources.png` (도넛)

### 6.5 덱 구현
- `index.html` (reveal.js 14장) + `css/theme.css` + `js/deck.js`
- anime.js: 카운터·등장 애니메이션·커버 파티클 캔버스
- Chart.js: 리뷰 출처 분포 인터랙티브 차트

### 6.6 검증 루프
- Playwright Chromium 설치 후 자체 정적 서버 + 헤드리스 검증
- 점검: 라이브러리 로드, 슬라이드 수(14), 콘솔/페이지 에러(0), 깨진 이미지(0), 실패 요청(0)
- 스크린샷 14장 육안 확인 → `<noscript>` 폴백 추가 → 재검증
- 배포 후 **프로덕션 URL 재검증**까지 통과
- 결과: `verify/report.json`, `verify/REPORT.md`

---

## 7. GitHub 배포

```powershell
gh auth login                                   # hyeok9865
git init -b main
git add -A; git commit -m "..."
gh repo create venom-keyboard-review-deck --public --source=. --remote=origin --push
gh api --method POST repos/hyeok9865/venom-keyboard-review-deck/pages \
  --input pages.json                            # source: main / "/"
```
- 이후 오늘 산출물을 `research/`로 추가 커밋·푸시.

---

## 8. 현재 파일 목록 (repo)

| 경로 | 크기(B) | 설명 |
|---|---:|---|
| `index.html` | 18,186 | reveal.js 슬라이드 덱 (14장) |
| `css/theme.css` | 6,236 | 다크 테마 |
| `js/deck.js` | 6,100 | anime.js·Chart.js·카운터 |
| `README.md` | 2,730 | 개요·링크·산출물 |
| `assets/charts/posneg.png` | 106,231 | 감성 분석 차트 |
| `assets/charts/price.png` | 93,873 | 비용 차트 |
| `assets/charts/latency.png` | 62,989 | 지연시간 차트 |
| `assets/charts/radar.png` | 194,287 | 레이더 차트 |
| `assets/charts/sources.png` | 119,100 | 출처 도넛 |
| `data/reviews.csv` | 8,564 | 리뷰 원자료 |
| `data/make_charts.py` | 7,214 | matplotlib 차트 생성 스크립트 |
| `research/venom_keyboard_reviews.csv` | 8,564 | 리뷰 원자료(사본) |
| `research/venom_keyboard_reviews.html` | 19,821 | 리뷰 대시보드 |
| `research/venom_keyboard_review_report.md` | 13,390 | 조사 보고서 |
| `research/ragdoll_cat_snacks.csv` | 4,269 | 랙돌 간식 조사 |
| `verify/report.json` | 239 | 자동 검증 결과 |
| `verify/REPORT.md` | 1,529 | 검증 리포트 |
| `verify/verify.mjs` | - | 로컬 검증 스크립트 |
| `verify/verify-live.mjs` | - | 프로덕션 검증 스크립트 |

> 워크스페이스 원본에는 `.env`(API 키)가 있으나 **보안상 GitHub에 업로드하지 않음**.

---

## 9. 실행 환경 / 도구

| 도구 | 버전 |
|---|---|
| OS | win32 |
| Node.js | v24.21.0 |
| npm | 11.19.0 |
| Python | 3.14.7 (pip 26.2.1) |
| matplotlib | 3.11.2 |
| numpy | 2.5.3 |
| git | 2.55.0 |
| gh | 2.100.0 |
| orca | 1.4.199 |
| CDN | jsdelivr, Google Fonts |

---

## 10. 문제와 해결

| 문제 | 원인 | 해결 |
|---|---|---|
| 프록시 API 404 | k-skill-proxy 미제공 경로 | 로컬 실행/웹 검색으로 대체 |
| `pip` 없음 | Python 번들 미포함 | `python -m ensurepip --upgrade` |
| 한글 JSON 깨짐 | Windows 콘솔 cp949 | `PYTHONIOENCODING=utf-8` + 파일 경유 |
| Flow 입력 실패 | 한글 IME + 포커스 불안정 | CSS/SVG + matplotlib 폴백 |
| gh 미로그인 | 인증 없음 | 사용자 `gh auth login` 후 진행 |
| 스크린샷 카운터 근사치 | 캡처 타이밍 | 실제 재생 영향 없음 |

---

## 11. 검증 결과

- 로컬 자동검증: `ok: true` (14장, 에러 0, 깨진 이미지 0)
- 프로덕션 재검증: `ok: true`
- 두 Pages URL HTTP 200 확인

---

## 12. 링크

- 슬라이드 덱: https://hyeok9865.github.io/venom-keyboard-review-deck/
- 리뷰 대시보드: https://hyeok9865.github.io/venom-keyboard-review-deck/research/venom_keyboard_reviews.html
- 보고서: https://github.com/hyeok9865/venom-keyboard-review-deck/blob/main/research/venom_keyboard_review_report.md
- 리포지토리: https://github.com/hyeok9865/venom-keyboard-review-deck
- 과정 HTML: https://hyeok9865.github.io/venom-keyboard-review-deck/process.html

---

*본 문서는 실제 작업 로그를 정리한 것으로, 커밋 이력과 함께 과정을 재현할 수 있습니다.*
