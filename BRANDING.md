# 차윤건 포트폴리오 — 브랜딩 & 디자인 시스템 (단일 출처)

> 이 문서는 포트폴리오(`index.html` 랜딩 · `work.html` 본체)에서 확립한 디자인 언어의 **정본**이다.
> 후속 개발과 파생 프로젝트는 여기의 토큰·패턴·규칙을 그대로 계승해 브랜딩 일관성을 유지한다.
> 값은 실제 코드에서 추출한 것이며, 코드를 바꾸면 이 문서도 함께 갱신한다.

---

## 1. 컨셉 & 포지셔닝

- **주제**: HR SaaS 도메인 프로덕트 디자이너(차윤건)의 구직용 포트폴리오. "레퍼런스 체크 → 진단·분석 플랫폼"까지 제품을 키워온 3개 프로젝트를 담는다.
- **디자인 철학**: *형태는 기능을 따른다(Form follows function).* 군더더기 없는 무채색 크롬 + 콘텐츠가 주인공.
- **톤**: Framer 스타일 미니멀 모노크롬. 무채색 chrome / 정적인 격자 위 동적 비주얼 쇼케이스(태극 모션).
- **레퍼런스 톤**: shadcn/ui 문서 사이트형 앱 셸(좌 사이드바 · 유리 상단바 · 우 On-This-Page).
- **한 줄 정체성**: "형태가 기능을 따를 수 있도록 만듭니다."

---

## 2. 브랜드 컬러

### 2-1. 모노크롬 크롬(기본 골격)
색은 UI 뼈대에만 쓰고, 채도는 콘텐츠(목업)에만 허용한다.

| 역할 | 랜딩(`index.html`, 다크 고정) | 본체 라이트 | 본체 다크 |
|---|---|---|---|
| 배경 `--bg` | `#1B1B1E` | `#FFFFFF` | `#27272A` |
| 전경 `--fg` | `#FAFAFA` | `#09090B` | `#FAFAFA` |
| 보조 텍스트 `--muted` | `#A7A7AE` | `#71717A` | `#A7A7AE` |
| 흐린 텍스트 `--faint` | `#7C7C84` | `#A1A1AA` | `#7C7C84` |
| 보더 `--border` | `#34343A` | `#E7E7EA` | `#3B3B42` |
| 보더2 `--border2` | `#4A4A52` | `#D9D9DE` | `#4F4F57` |
| 카드 `--card` | `#232327` | `#FFFFFF` | `#303035` |
| subtle/hover | — | `#F7F7F8` / `#F2F2F3` | `#2F2F34` / `#37373C` |

### 2-2. 시그니처 엑센트 — 람다256 그린
- **`--accent: #6ADD88`** (rgb 106,221,136). 브랜드 포인트 컬러. **크롬에서만 소량** 사용(과용 금지).
- 현재 적용처: 랜딩 헤드라인 "Korea**.**" 악센트 점 / 랜딩 태극 모션의 나선 타일 / 본체 브레드크럼 **현재 페이지** 텍스트(`.crumb .cur`, weight 600).
- 계승 규칙: 새 화면의 "현재 위치/활성/포인트" 강조는 이 그린으로 통일. 본문 대량 텍스트·배경에는 쓰지 않는다.

### 2-3. 시맨틱 컬러(목업 = 사업 도메인 전용, 크롬과 분리)
WECRUIT 사업별 브랜드 컬러 체계와 동일. 목업(제품 화면) 안에서만 의미 색으로 사용.

| 의미 | 토큰 | 라이트 | 다크 |
|---|---|---|---|
| 인재 검증 | `--verify` | `#10B981` | `#34D399` |
| 채용 | `--hire` | `#3B82F6` | `#60A5FA` |
| 기업 교육/이탈 | `--exit` | `#F59E0B` | `#FBBF24` |
| 조직문화 | `--culture` | `#8B5CF6` | `#A78BFA` |
| 코드(kw/fn/num) | `--c-kw/fn/num` | `#E11D48 / #7C3AED / #2563EB` | — |

### 2-4. 테마 3-state (본체)
- 라이트: 바 `:root`에 전체 팔레트.
- 시스템 다크: `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }`.
- 명시 다크: `:root[data-theme="dark"] { … }` (토글이 OS를 이김).
- 다크는 순검정 아님 → **차콜 `#27272A`**. 고대비 모드 `.hc`로 muted/border 상향.
- 그림자 `--shadow` / `--shadow2` 테마별 별도 정의.

---

## 3. 타이포그래피

- **서체**: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif`
- **모노**: `ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace` (코드 목업)
- **트래킹**: 본문 `letter-spacing: -0.02em`, 헤드라인 `-0.03 ~ -0.045em`, 아이브로우/대문자 라벨은 `+0.14 ~ 0.2em` + `text-transform: uppercase`.
- **스케일(주요)**: 히어로 `clamp(2.4rem, 5.8vw, 4.1rem)` / 서브 `clamp(15px,1.7vw,18px)` / 섹션 h2 / 본문 13.5~14px / 캡션 11.5~12.5px.
- **웨이트**: 헤드라인 780, 강조 b 650, 라벨 700, 본문 500~600.
- **말투**: 전 문서 **'~습니다'** 통일. 영문 라벨(Domain, Product Designer, Open to work 등)과 한글 혼용은 **의도된 디자인**.

---

## 4. 모션 그래픽 — Canvas 태극 나선 (랜딩 배경)

Stampers `hero-tile-bg`를 바닐라 Canvas 2D로 이식. **정적 타일 격자**의 색/투명도만 바꿔 태극이 회전하는 착시를 만든다(움직이는 파티클 아님).

- **격자**: 타일 `TW=26 × TH=11`, 간격 `GAP=9` → 스텝 `SX=35, SY=20`. `dpr = min(devicePixelRatio, 2)`.
- **태극 나선**: `arm = sin(theta + time − r/SPIRAL)`, `SPIRAL=70`, `TIME_SPEED=0.018`, 중심 오프셋 `OFFSET_X=220`, 반경 `maxR = min(cx,cy)*0.72`, 외곽 페이드 `radialFade = max(0, 1 − (r/maxR)²)`.
- **모노 컬러식**(`MONO=true`): `lum = 150 + 95*n` → `g = round(78 + (lum−78)*radialFade)` → `R=G=g, B=min(255,g+3)`. (`MONO=false`면 청·홍 태극.)
- **람다256 그린 나선 이벤트**(정적 타일 색 변화, 저빈도·저속):
  - 이벤트 없을 때만 카운트 → 초록 사이 빈 간격 보장. 다음 간격 `gNext = 240 + random*340`.
  - 파라미터: `vr(전파속도) 0.30–0.52`, `tight 0.015–0.028`, `band 44–64`, `ang 0.30–0.48`, `r0 = maxR*1.2`.
  - 동시 최대 1개. 바깥→중심으로 말려들어가며 (106,221,136)로 블렌딩 후 소멸.
- **물리**: 마우스 토크(회전 관성) + 고동 파형(pulse). `prefers-reduced-motion` 존중.
- **계승**: 파생 랜딩에서도 이 모노 태극 + 저빈도 그린만 유지. 컬러 태극/고빈도 파티클은 톤 파괴 → 금지.

---

## 5. 커스텀 커서 (랜딩)

- `#cursor`: 20px 흰 원, `mix-blend-mode: difference`, 트레일링(`transition: transform .35s cubic-bezier(.34,1.56,.64,1)`), `z-index:9999`, `pointer-events:none`.
- 데스크톱(fine pointer)에서만 표시. 터치/coarse에서는 숨김.

---

## 6. 레이아웃 / 앱 셸

### 랜딩(`index.html`)
- 풀스크린 히어로. 상단 고정 헤더 `.lhead`(높이 68px, **`z-index:50`** — 히어로 위). 좌: 아바타, 중앙 절대정렬 메타(`.lmeta` 위치/시계/채용가능), 우: 언어 드롭다운.
- 히어로 `max-width:720px`. veil 그라디언트로 좌하단 가독성 확보.

### 본체(`work.html`)
- shadcn 문서형 앱 셸: **좌 풀높이 사이드바**(로고 없음, 접기 토글, 항목 아이콘) + **유리 상단바**(브레드크럼 · 언어 · 테마 · 공유 · PDF) + **우 On-This-Page 스크롤스파이** + 하단 promo.
- **브레드크럼**: `홈 / <현재 페이지>`. 홈=`index.html` 링크(텍스트 "홈", 아이콘 금지). 현재 페이지=`#6ADD88` weight 600. SPA 전환 시 `#crumb`·TOC 동적 갱신.
- 각 꼭지 = **제목 → 본문(`.lead`) → 목업 1개**. 커스텀 미니 다이어그램·좌측 강조바 콜아웃 금지.
- **모바일(≤767px) 상단바**: 우측엔 언어 드롭다운만. 그 왼쪽에 `⋯` 오버플로 메뉴(공유·PDF 수용, 데스크톱은 인라인 버튼). 브레드크럼 현재 페이지는 **문서 전환 드롭다운**(`data-goto`)으로 전환 — 데스크톱은 일반 텍스트 유지. 사이드바는 `☰` 드로어.

---

## 7. UI 컴포넌트 카탈로그

- **버튼**: primary(`--fg` 배경/`--bg` 글자), ghost(보더 + hover `translateY(-2px)`). 아이콘 버튼은 hover 모션 일관.
- **언어 드롭다운**: 랜딩 `.langbtn/.langmenu`(유리 blur, 라디우스 8/11), 본체 `#langBtnP/#langMenuP`. `.on`으로 현재 언어 표시. 바깥 클릭 닫힘.
- **채용가능 배지** `.avail`: pill + 녹색 점 `#34D399` + 펄스 애니(`@keyframes adot`).
- **목업 윈도우** `.win/.wtop/.wbody/.shot`: 제품 화면 컨테이너. `--shadow2`.
- **카드류** `.pcard/.scard/.jcard/.item`: 보더 + 라운드 + subtle 배경.
- **KPI/통계** `.stat`(l/v/s): 라벨·수치·보조. 화살표 `.a`.
- **pill/seg/tab**: 흰 pill + border + shadow, 비선택 `border-transparent`(표준 탭 UI).
- **폼**: 필수값 충족 전 제출 버튼 `disabled` 게이팅 기본.
- **용어사전 툴팁**: 어려운 용어에 점선 밑줄, hover(PC)/tap(모바일) 설명. **ko 전용**(번역 시 문장 교체로 term 소멸 → 비ko 힌트 숨김).
- **페이저** `.pager`: 슬림. 이전=좌측정렬, 다음/처음으로=우측정렬.
- **접근성 위젯**: 글자크기/자간/행간/고대비 조절 + 첫 방문 말풍선 힌트(`.a11y-hint`).
- **모달/토스트**: 신규 모달은 SystemSettings 스타일(portal, `max-w-[440px] rounded-2xl`), 토스트는 sonner 계열. 공유 버튼 = URL 복사 + 토스트.

---

## 8. 텍스트 / 보이스 & 톤

- 전부 **'~습니다'**. 과장·냉소 금지("싸가지없게" 회피), 읽는 사람(채용사) 기분 상하지 않게.
- 프로젝트 제목은 **한눈에 와닿게**: `서비스 통합 플랫폼 개발 / 진단 신뢰도 개선 / 제품 개발 워크플로우 AX 전환`.
- 영문 고유명사·도메인 용어는 원문 유지(HR SaaS, PLG, MCP, LLM, BARS, Rank-order, Figma, Cursor, Design Token, Spec 등).

---

## 9. 다국어(i18n) 아키텍처

- **지원 6개어**: `ko · en · ja · zh · es · fr`. **ko = 원본 그대로**(랜딩·본체 모두). 번역은 나머지 5개어만. → 자세히는 `feedback_i18n_ko_original` 메모리.
- **언어 공유 키**: `localStorage["pf-lang"]` — 랜딩·본체 동일 키로 상태 공유. 브라우저 언어 자동 감지.
- **랜딩**: `data-i18n` 속성 + `I18N` 사전(IIFE). 요소 8종.
- **본체**: `window.__PF_I18N__ = { ko문자열: {en,ja,zh,es,fr} }` (347개) 인라인 주입. 런타임 2-pass:
  1. **SEL 화이트리스트**(중첩 자식 포함 요소 단위 키) — `.recq`, `.stat .v` 등 굵은 단위.
  2. **텍스트-매칭 패스**: 클래스 없어도 leaf 요소의 정규화 텍스트가 사전 키면 번역 → 목업 라벨·`main` 밖 힌트까지 자동 커버(누락 구조적 방지).
  - ko 복원=원본 innerHTML, 비ko=번역 textContent(아이콘 포함 요소는 `setKeepIcon`으로 텍스트만 교체). 브레드크럼/TOC 동적 갱신.
- **번역 원칙**: 고유명사·도메인 약어 미번역, 기호/화살표/숫자 보존, 도메인 용어 언어별 표준화(예: 레퍼런스 체크 → Reference Check/リファレンスチェック/背景调查/Verificación de referencias/Prise de références).
- **빌드 스크립트**(scratchpad): `assemble-i18n.mjs`(5개 언어 파일 → TRANS 주입), `merge-supplement.mjs`(누락 보충 병합).

---

## 10. PDF / 슬라이드 덱

- `build-pdf.mjs`가 **`work.html`**의 `<style>`+`<main>`을 읽어 `slideify.js`로 **가로 A4 슬라이드 덱**(좌 텍스트 / 우 목업) 재조립 → 헤드리스 크롬 렌더 → `portfolio.pdf`.
- 본문 수정 시 매번 `node build-pdf.mjs` 재빌드. 덱은 **한국어 원본**(i18n은 런타임 JS, 정적 HTML 미반영).
- 슬라이드 208.5mm + `break-inside:avoid`로 유령 페이지 방지, 큰 목업 auto-fit 스케일.

---

## 11. 접근성

- 3-state 테마 + 고대비 `.hc`. 글자크기/자간/행간 스케일(목업 px는 고정, 텍스트만 `--fs` 상속).
- `prefers-reduced-motion` 존중(태극·펄스·힌트 애니 정지).
- 포커스 가시 상태, aria-label(홈/닫기/드롭다운), `noindex, nofollow`.

---

## 12. 파일 구조 & 빌드

```
wecruit-portfolio/
├─ index.html          # 랜딩 (다크 고정, 태극 모션, 인라인 CSS/JS)
├─ work.html           # 본체 SPA (3-state 테마, i18n 주입)
├─ build-pdf.mjs       # PDF 덱 빌더 (work.html → portfolio.pdf)
├─ slideify.js         # 가로 슬라이드 재조립 (크롬 DOM)
├─ portfolio.pdf       # 산출물(한국어)
└─ BRANDING.md         # ← 이 문서(정본)
```
- **제약**: 회사 리포 밖 / 회사 도메인 금지 / `noindex` / 로그인 없이 링크 접근. 배포=사용자 Vercel(`https://portfolio-two-lac-3kj8qznufj.vercel.app/`), 원격 `github.com/ddaok22/portfolio`.
- **단일 파일 자기완결**: 외부 CDN 없음, 이미지 등 자산은 base64 인라인. 프로필 사진은 저해상도(120px) 인라인 + 우클릭 차단(다운로드 보호).
- 로컬 미리보기: `python3 -m http.server 4321 --bind 127.0.0.1`.

---

## 13. 브랜딩 계승 체크리스트 (후속/파생 개발)

1. **컬러**: 크롬은 모노 토큰만. 포인트/활성은 `--accent #6ADD88`. 목업 의미색은 verify/hire/exit/culture 유지.
2. **타이포**: Pretendard + 위 스케일·트래킹. 말투 '~습니다'.
3. **모션**: 랜딩은 모노 태극 + 저빈도·저속 그린 나선(정적 타일 방식)만.
4. **레이아웃**: 문서형 앱 셸 3-분할. 제목→본문→목업 1개. 미니 다이어그램 남발 금지.
5. **컴포넌트**: 표준 탭/모달/토스트/폼 게이팅/용어툴팁/페이저 패턴 재사용.
6. **i18n**: ko=원본 불변, 5개어 번역, `pf-lang` 공유, 2-pass 런타임. 새 문자열은 사전에 추가.
7. **테마**: 3-state 토큰 구조 + 고대비. 다크는 차콜.
8. **제약**: 회사 도메인·리포 금지, noindex, 자기완결 단일 파일, 자산 인라인.

관련 메모리: `project_portfolio_site` · `project_design_tone` · `project_brand_colors` · `feedback_i18n_ko_original` · `project_tab_ui_standard` · `project_modal_toast_style`.
