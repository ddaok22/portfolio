// 포트폴리오 PDF 문서 빌드
// index.html의 본문/목업을 그대로 추출 → 웹 UI 제거 + 표지 + A4 문서 레이아웃으로 재구성한
// portfolio-print.html 생성. 이후 헤드리스 크롬으로 portfolio.pdf 렌더.
import fs from 'fs';

const src = fs.readFileSync('index.html', 'utf8');
const css = src.match(/<style>([\s\S]*?)<\/style>/)[1];
const articles = src.match(/<main class="content">([\s\S]*?)<\/main>/)[1];

const cover = `
<section class="cover">
  <div class="cv-top">
    <div class="cv-eyebrow">PORTFOLIO · AX PRODUCT DESIGN</div>
    <h1 class="cv-name">차윤건</h1>
    <div class="cv-role">HR SaaS 프로덕트 디자이너</div>
    <p class="cv-desc">레퍼런스 체크를 시작으로 진단·분석 플랫폼까지<br>HR SaaS 제품을 확장해왔습니다.</p>
  </div>
  <div class="cv-bottom">
    <div class="cv-meta">
      <div><span>담당</span><b>프로덕트 디자인 · 리딩</b></div>
      <div><span>도메인</span><b>HR SaaS · 인재 검증·채용</b></div>
      <div><span>기간</span><b>2019 – 최근</b></div>
    </div>
    <div class="cv-toc">
      <div class="cv-toc-item"><span class="cn">01</span><b>확장형 진단 플랫폼</b><i>진단 Core 모듈화 · 데이터 연결</i></div>
      <div class="cv-toc-item"><span class="cn">02</span><b>평가의 변별력을 높이다</b><i>점수 → 순위 기반 평가 전환</i></div>
      <div class="cv-toc-item"><span class="cn">03</span><b>디자인–개발 AX</b><i>AI 기반 워크플로우 구축</i></div>
    </div>
  </div>
</section>`;

const overrides = `
  /* ===== PDF 문서 전용 오버라이드 ===== */
  html { scroll-behavior: auto; }
  body { background: #fff; }
  .doc { display: block !important; }
  /* 화면 미리보기용 문서 폭(인쇄 시엔 @page 여백이 지배) */
  .content { max-width: 726px; margin: 0 auto; padding: 40px 26px 70px; }
  .printfoot { display: none; }

  /* 표지 (다크 · 리터럴 컬러 고정) */
  .cover {
    break-after: page; page-break-after: always;
    background: #1c1c1f; color: #fafafa;
    min-height: 258mm; padding: 34mm 24mm 26mm;
    display: flex; flex-direction: column;
    letter-spacing: -0.01em;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .cv-eyebrow { font-size: 11pt; letter-spacing: .22em; color: #86868e; font-weight: 700; }
  .cv-name { font-size: 52pt; font-weight: 800; letter-spacing: -.045em; margin: 13mm 0 0; line-height: 1; }
  .cv-role { font-size: 16pt; color: #d2d2d9; margin-top: 7mm; font-weight: 600; letter-spacing: -.02em; }
  .cv-desc { font-size: 12.5pt; color: #a7a7ae; line-height: 1.72; margin: 9mm 0 0; }
  .cv-bottom { margin-top: auto; }
  .cv-meta { display: flex; gap: 12mm; border-top: 1px solid #3b3b42; border-bottom: 1px solid #3b3b42; padding: 6mm 0; margin-bottom: 9mm; }
  .cv-meta > div { display: flex; flex-direction: column; gap: 2.5mm; }
  .cv-meta span { font-size: 8pt; letter-spacing: .12em; color: #7c7c84; text-transform: uppercase; font-weight: 700; }
  .cv-meta b { font-size: 10.5pt; color: #fafafa; font-weight: 650; letter-spacing: -.01em; }
  .cv-toc-item { display: flex; align-items: baseline; gap: 5mm; padding: 3.6mm 0; border-bottom: 1px solid #303035; }
  .cv-toc-item:last-child { border-bottom: 0; }
  .cv-toc-item .cn { font-size: 10pt; font-weight: 800; color: #7c7c84; font-variant-numeric: tabular-nums; width: 8mm; flex-shrink: 0; }
  .cv-toc-item b { font-size: 13pt; font-weight: 700; letter-spacing: -.02em; }
  .cv-toc-item i { margin-left: auto; font-style: normal; font-size: 10pt; color: #9a9aa2; text-align: right; }

  @media print {
    /* 표지 다음 각 프로젝트를 새 페이지로 (인트로 포함) */
    .content { max-width: none; margin: 0; padding: 0; }
    .doc:first-of-type { break-before: auto; }
    .cover { min-height: 0; height: 260mm; }
    .printfoot { display: block !important; }
    /* 카드 리스트는 페이지 경계에서 자유롭게 흐르게(개별 카드는 원본 CSS에서 이미 atomic).
       컨테이너 통째로 다음 페이지로 밀려 큰 여백이 생기던 문제 해결 */
    .plist, .arc, .strengths, .jlist, .cmp, .dists, .barcmp, .grid2,
    .ranklist, .barsopt, .kws, .kpis { break-inside: auto; }
    /* 섹션 제목이 페이지 하단에 홀로 남지 않도록 뒤 문단과 함께 */
    h2.sec { break-after: avoid; }
    .lead { orphans: 2; widows: 2; }
  }
`;

const html = `<!doctype html>
<html lang="ko" data-theme="light">
<head>
<meta charset="utf-8">
<title>차윤건 포트폴리오</title>
<meta name="robots" content="noindex, nofollow">
<style>${css}
${overrides}</style>
</head>
<body>
${cover}
<main class="content">${articles}</main>
<div class="printfoot">차윤건 · 포트폴리오 · HR SaaS 프로덕트 디자인</div>
</body>
</html>`;

fs.writeFileSync('portfolio-print.html', html);
console.log('portfolio-print.html 생성 완료 (' + (html.length / 1024).toFixed(0) + 'KB)');
