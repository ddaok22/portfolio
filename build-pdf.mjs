// 포트폴리오 PDF(가로 슬라이드 덱) 빌드
// index.html 본문/목업을 그대로 가져와 slideify.js가 크롬 DOM에서 좌 텍스트 / 우 목업
// 가로 슬라이드로 재조립 → 헤드리스 크롬으로 portfolio.pdf 렌더.
import fs from 'fs';

const src = fs.readFileSync('work.html', 'utf8');
const css = src.match(/<style>([\s\S]*?)<\/style>/)[1];
const articles = src.match(/<main class="content">([\s\S]*?)<\/main>/)[1];
const slideify = fs.readFileSync('slideify.js', 'utf8');

const overrides = `
  /* ===== 가로 슬라이드 덱 오버라이드 ===== */
  @page { size: A4 landscape; margin: 0; }
  @media print { @page { size: A4 landscape; margin: 0; } }
  html { scroll-behavior: auto; }
  body { background: #fff; margin: 0; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

  .slide, .cover2 { position: relative; width: 297mm; height: 208.5mm; box-sizing: border-box;
    overflow: hidden; background: #fff; break-after: page; page-break-after: always; break-inside: avoid; letter-spacing: -0.01em; }
  .deck > :last-child { break-after: auto; page-break-after: auto; }
  .slide { padding: 14mm 18mm; display: flex; flex-direction: column; justify-content: center; }
  .slide-split { display: grid; grid-template-columns: 0.92fr 1.08fr; gap: 13mm; width: 100%; align-items: center; }
  .slide-full { display: flex; flex-direction: column; justify-content: center; }
  .s-left { min-width: 0; } .s-right { min-width: 0; display: flex; flex-direction: column; justify-content: center; }

  .s-eyebrow { font-size: 8.5pt; letter-spacing: .16em; text-transform: uppercase; color: var(--faint); font-weight: 800; margin: 0 0 5mm; }
  .s-lead { font-size: 10.5pt; line-height: 1.7; color: var(--muted); margin: 0 0 5mm; }
  .s-h { font-size: 18pt; font-weight: 800; letter-spacing: -.03em; line-height: 1.16; margin: 0 0 4mm; }
  .s-h .s-num { color: var(--faint); font-weight: 800; margin-right: 3mm; }
  .s-title-big { font-size: 29pt; font-weight: 800; letter-spacing: -.035em; line-height: 1.08; margin: 0 0 4mm; }
  .slide-full .s-title-big { font-size: 22pt; }
  .s-body p { font-size: 10pt; line-height: 1.68; color: var(--muted); margin: 0 0 2.6mm; }
  .s-body p:last-child { margin-bottom: 0; }
  .s-body p strong { color: var(--fg); font-weight: 650; }

  .s-visual { width: 100%; }
  .s-visual .shot, .s-visual .fig { margin: 0 !important; width: 100%; box-shadow: var(--shadow2); }
  .s-right .shot .stage { padding: 16px; }

  /* 좌측 KPI(세로 스택) */
  .kpi-wrap { margin-top: 5mm; }
  .kpi-wrap .kpis { grid-template-columns: 1fr; gap: 4mm; margin: 0; }
  .kpi-big .kpis .stat { padding: 5mm 6mm; }
  .kpi-big .kpis .v { font-size: 20pt; }

  /* 우측 소개 카드류 */
  .s-wrap .plist { margin-top: 4mm; gap: 3.5mm; }
  .s-wrap .arc { margin-top: 4mm; gap: 3.5mm; }
  .s-wrap .strengths { grid-template-columns: 1fr 1fr; margin-top: 4mm; gap: 3.5mm; }

  /* 카드형(해결전략 / 세부 성과) */
  .s-cards { display: grid; gap: 6mm; margin-top: 7mm; align-self: center; width: 100%; }
  .s-cards.c1 { grid-template-columns: 1fr; max-width: 210mm; }
  .s-cards.c2 { grid-template-columns: repeat(2, 1fr); max-width: 185mm; }
  .s-cards.c3 { grid-template-columns: repeat(3, 1fr); }
  .s-cards.c4 { grid-template-columns: repeat(2, 1fr); max-width: 220mm; }
  .s-card { border: 1px solid var(--border); border-radius: 13px; background: var(--card); padding: 6mm 6.5mm; }
  .s-card .s-card-h { display: flex; align-items: baseline; gap: 3mm; margin-bottom: 3mm; }
  .s-card .s-card-h .n { font-size: 9pt; font-weight: 800; color: var(--faint); font-variant-numeric: tabular-nums; }
  .s-card .s-card-h b { font-size: 12.5pt; font-weight: 750; letter-spacing: -.01em; }
  .s-card p { font-size: 10pt; line-height: 1.62; color: var(--muted); margin: 0 0 2mm; }
  .s-card p:last-child { margin: 0; }
  .s-card p strong { color: var(--fg); font-weight: 650; }

  /* 프로젝트 타이틀 슬라이드 */
  .s-kws { display: flex; flex-wrap: wrap; gap: 2mm; margin-top: 7mm; }
  .s-kws span { font-size: 9pt; font-weight: 600; color: var(--muted); background: var(--subtle); border: 1px solid var(--border); border-radius: 999px; padding: 1.6mm 3.6mm; }
  .s-agenda { display: flex; flex-direction: column; }
  .s-agenda .ag { display: flex; align-items: baseline; gap: 5mm; padding: 4.4mm 0; border-bottom: 1px solid var(--border); }
  .s-agenda .ag:last-child { border-bottom: 0; }
  .s-agenda .ag .agn { font-size: 10pt; font-weight: 800; color: var(--faint); width: 8mm; font-variant-numeric: tabular-nums; }
  .s-agenda .ag b { font-size: 14pt; font-weight: 700; letter-spacing: -.02em; }

  /* 슬라이드 하단 푸터 */
  .s-foot { position: absolute; left: 18mm; right: 18mm; bottom: 8mm; display: flex; justify-content: space-between;
    font-size: 8pt; color: var(--faint); letter-spacing: .02em; }

  /* 표지 (가로 2단) */
  .cover2 { display: grid; grid-template-columns: 1.25fr 1fr; }
  .cover2 .cv-main { background: #1c1c1f; color: #fafafa; padding: 30mm; display: flex; flex-direction: column; justify-content: center; }
  .cover2 .cv-side { background: #232327; color: #fafafa; padding: 30mm 26mm; display: flex; flex-direction: column; justify-content: center; }
  .cv-eyebrow { font-size: 10pt; letter-spacing: .2em; color: #86868e; font-weight: 700; }
  .cv-name { font-size: 46pt; font-weight: 800; letter-spacing: -.045em; margin: 11mm 0 0; line-height: 1; }
  .cv-role { font-size: 15pt; color: #d2d2d9; margin-top: 6mm; font-weight: 600; letter-spacing: -.02em; }
  .cv-desc { font-size: 11.5pt; color: #a7a7ae; line-height: 1.7; margin: 8mm 0 0; }
  .cv-meta { display: flex; flex-direction: column; gap: 5mm; border-bottom: 1px solid #3b3b42; padding-bottom: 8mm; margin-bottom: 8mm; }
  .cv-meta > div { display: flex; flex-direction: column; gap: 2mm; }
  .cv-meta span { font-size: 8pt; letter-spacing: .12em; color: #7c7c84; text-transform: uppercase; font-weight: 700; }
  .cv-meta b { font-size: 11pt; color: #fafafa; font-weight: 650; letter-spacing: -.01em; }
  .cv-toc-item { display: flex; align-items: baseline; gap: 5mm; padding: 3.6mm 0; border-bottom: 1px solid #303035; }
  .cv-toc-item:last-child { border-bottom: 0; }
  .cv-toc-item .cn { font-size: 10pt; font-weight: 800; color: #7c7c84; width: 8mm; font-variant-numeric: tabular-nums; }
  .cv-toc-item b { font-size: 13pt; font-weight: 700; letter-spacing: -.02em; }
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
<main class="content">${articles}</main>
<script>${slideify}</script>
</body>
</html>`;

fs.writeFileSync('portfolio-print.html', html);
console.log('portfolio-print.html 생성 (' + (html.length / 1024).toFixed(0) + 'KB)');
