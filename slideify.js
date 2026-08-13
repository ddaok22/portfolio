/* 문서(.content) → 가로 슬라이드 덱으로 재조립 (좌 텍스트 / 우 목업)
   크롬 렌더 시 실행되어 DOM을 슬라이드 구조로 바꾼 뒤 print-to-pdf. */
(function () {
  var PHASES = ['문제 정의', '해결 전략', '실험 및 디자인', '결과 및 성과'];
  var content = document.querySelector('.content');
  var deck = document.createElement('div');
  deck.className = 'deck';

  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function slide(cls, inner) { var s = el('<section class="slide ' + cls + '"></section>'); s.innerHTML = inner; return s; }
  function paragraphsOf(item) { return [].filter.call(item.children, function (c) { return c.tagName === 'P'; }).map(function (p) { return p.outerHTML; }).join(''); }
  function itemHead(item) { var n = item.querySelector('.h .n'), b = item.querySelector('.h b'); return { n: n ? n.textContent : '', b: b ? b.textContent : '' }; }
  function visualOf(item) { return item.querySelector('.shot, .fig'); }
  function leadsHTML(sec) { return sec.leads.map(function (l) { return '<p>' + l + '</p>'; }).join(''); }

  // ── 표지 (가로 2단) ──
  deck.appendChild(el(
    '<section class="cover2">' +
      '<div class="cv-main">' +
        '<div class="cv-eyebrow">PORTFOLIO · AX PRODUCT DESIGN</div>' +
        '<h1 class="cv-name">차윤건</h1>' +
        '<div class="cv-role">HR SaaS 프로덕트 디자이너</div>' +
        '<p class="cv-desc">레퍼런스 체크를 시작으로 진단·분석 플랫폼까지<br>HR SaaS를 도메인으로 작업해오고 있습니다.</p>' +
      '</div>' +
      '<div class="cv-side">' +
        '<div class="cv-meta">' +
          '<div><span>담당</span><b>프로덕트 디자인 · 리딩</b></div>' +
          '<div><span>도메인</span><b>HR SaaS · 인재 검증·채용</b></div>' +
          '<div><span>기간</span><b>2019 – 최근</b></div>' +
        '</div>' +
        '<div class="cv-toc">' +
          '<div class="cv-toc-item"><span class="cn">01</span><b>진단 플랫폼 사업화</b></div>' +
          '<div class="cv-toc-item"><span class="cn">02</span><b>평가 변별력 확보</b></div>' +
          '<div class="cv-toc-item"><span class="cn">03</span><b>제품 개발 AX 전환</b></div>' +
        '</div>' +
      '</div>' +
    '</section>'));

  function collectSections(doc) {
    var secs = [], cur = null;
    [].forEach.call(doc.children, function (ch) {
      if (ch.matches('h2.sec')) { cur = { title: ch.textContent.trim(), id: ch.id, leads: [], items: [], others: [] }; secs.push(cur); }
      else if (cur) {
        if (ch.matches('.lead')) cur.leads.push(ch.textContent.trim());
        else if (ch.matches('.item')) cur.items.push(ch);
        else cur.others.push(ch);
      }
    });
    return secs;
  }

  function splitItemSlide(title, intro, item) {
    var h = itemHead(item), v = visualOf(item);
    var left = '<div class="s-eyebrow">' + title + '</div>' +
      (intro ? '<p class="s-lead">' + intro + '</p>' : '') +
      '<h3 class="s-h">' + (h.n ? '<span class="s-num">' + h.n + '</span>' : '') + h.b + '</h3>' +
      '<div class="s-body">' + paragraphsOf(item) + '</div>';
    var s = slide('slide-split', '<div class="s-left">' + left + '</div><div class="s-right"><div class="s-visual"></div></div>');
    if (v) s.querySelector('.s-visual').appendChild(v.cloneNode(true));
    return s;
  }
  function cardOf(item) {
    var h = itemHead(item);
    return '<div class="s-card"><div class="s-card-h">' + (h.n ? '<span class="n">' + h.n + '</span>' : '') + '<b>' + h.b + '</b></div>' + paragraphsOf(item) + '</div>';
  }
  function cardsSlide(title, intro, items) {
    var cols = items.length >= 4 ? 'c4' : (items.length === 1 ? 'c1' : 'c3');
    return slide('slide-full',
      '<div class="s-eyebrow">' + title + '</div>' +
      (intro ? '<p class="s-lead">' + intro + '</p>' : '') +
      '<div class="s-cards ' + cols + '">' + items.map(cardOf).join('') + '</div>');
  }

  [].forEach.call(content.querySelectorAll('article.doc'), function (doc) {
    var dnum = doc.getAttribute('data-doc');
    var secs = collectSections(doc);

    if (dnum === '0') {
      var by = {}; secs.forEach(function (s) { by[s.id.split('-').pop()] = s; });
      var h1 = doc.querySelector('.doc-top h1').textContent;
      var desc = doc.querySelector('.doc-top .desc').textContent;
      var ov = by.overview, pr = by.products, ro = by.role, why = by.why;
      var plist = pr && pr.others.filter(function (o) { return o.matches('.plist'); })[0];
      var arc = ro && ro.others.filter(function (o) { return o.matches('.arc'); })[0];
      var strengths = why && why.others.filter(function (o) { return o.matches('.strengths'); })[0];
      // 슬라이드 1: 소개 + 프로덕트
      var s1 = slide('slide-split',
        '<div class="s-left"><div class="s-eyebrow">OVERVIEW</div>' +
        '<h3 class="s-h">' + h1 + '</h3><p class="s-lead">' + desc + '</p>' +
        '<div class="s-body">' + (ov ? leadsHTML(ov) : '') + '</div></div>' +
        '<div class="s-right"><div class="s-eyebrow">' + (pr ? pr.title : '프로덕트') + '</div><div class="s-wrap plist-wrap"></div></div>');
      if (plist) s1.querySelector('.plist-wrap').appendChild(plist.cloneNode(true));
      deck.appendChild(s1);
      // 슬라이드 2: 역할 + 다뤄온 범위
      var s2 = slide('slide-split',
        '<div class="s-left"><div class="s-eyebrow">' + (ro ? ro.title : '역할') + '</div>' +
        '<div class="s-body">' + (ro ? leadsHTML(ro) : '') + '</div><div class="s-wrap arc-wrap"></div></div>' +
        '<div class="s-right"><div class="s-eyebrow">' + (why ? why.title : '다뤄온 문제의 범위') + '</div><div class="s-wrap str-wrap"></div></div>');
      if (arc) s2.querySelector('.arc-wrap').appendChild(arc.cloneNode(true));
      if (strengths) s2.querySelector('.str-wrap').appendChild(strengths.cloneNode(true));
      deck.appendChild(s2);
      return;
    }

    // ── 프로젝트 ──
    var eyebrow = doc.querySelector('.doc-top .eyebrow').textContent.trim();
    var ph1 = doc.querySelector('.doc-top h1').textContent;
    var pdesc = doc.querySelector('.doc-top .desc').textContent;
    var kws = [].map.call(doc.querySelectorAll('.kws .kw'), function (k) { return k.textContent.trim(); });
    var agenda = PHASES.map(function (p, i) { return '<div class="ag"><span class="agn">0' + (i + 1) + '</span><b>' + p + '</b></div>'; }).join('');
    deck.appendChild(slide('slide-split slide-title',
      '<div class="s-left"><div class="s-eyebrow">' + eyebrow + '</div>' +
      '<h2 class="s-title-big">' + ph1 + '</h2><p class="s-lead">' + pdesc + '</p>' +
      '<div class="s-kws">' + kws.map(function (k) { return '<span>' + k + '</span>'; }).join('') + '</div></div>' +
      '<div class="s-right"><div class="s-agenda">' + agenda + '</div></div>'));

    secs.forEach(function (sec) {
      var suffix = sec.id.split('-').pop();
      var intro = sec.leads[0] || '';
      if (suffix === 'pain' || suffix === 'design') {
        sec.items.forEach(function (it, i) {
          if (visualOf(it)) deck.appendChild(splitItemSlide(sec.title, i === 0 ? intro : '', it));
          else deck.appendChild(cardsSlide(sec.title, i === 0 ? intro : '', [it]));
        });
      } else if (suffix === 'hypo') {
        deck.appendChild(cardsSlide(sec.title, intro, sec.items));
      } else if (suffix === 'result') {
        var shot = sec.others.filter(function (o) { return o.matches('.shot'); })[0];
        var kpis = sec.others.filter(function (o) { return o.matches('.kpis'); })[0];
        if (shot) {
          var s = slide('slide-split',
            '<div class="s-left"><div class="s-eyebrow">' + sec.title + '</div>' +
            '<div class="s-body">' + leadsHTML(sec) + '</div><div class="s-wrap kpi-wrap"></div></div>' +
            '<div class="s-right"><div class="s-visual"></div></div>');
          if (kpis) s.querySelector('.kpi-wrap').appendChild(kpis.cloneNode(true));
          s.querySelector('.s-visual').appendChild(shot.cloneNode(true));
          deck.appendChild(s);
        } else {
          var s2 = slide('slide-split',
            '<div class="s-left"><div class="s-eyebrow">' + sec.title + '</div>' +
            '<div class="s-body">' + leadsHTML(sec) + '</div></div>' +
            '<div class="s-right"><div class="s-wrap kpi-wrap kpi-big"></div></div>');
          if (kpis) s2.querySelector('.kpi-wrap').appendChild(kpis.cloneNode(true));
          deck.appendChild(s2);
        }
        deck.appendChild(cardsSlide(sec.title + ' · 세부 성과', '', sec.items));
      } else if (sec.items.length) {
        deck.appendChild(cardsSlide(sec.title, intro, sec.items));
      }
    });
  });

  content.replaceWith(deck);

  // 목업/카드 묶음이 슬라이드 높이보다 크면 비율 유지 축소(잘림 방지)
  [].forEach.call(deck.querySelectorAll('.slide-split'), function (slide) {
    var cs = window.getComputedStyle(slide);
    var cap = slide.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - 30;
    if (cap <= 0) return;
    [].forEach.call(slide.querySelectorAll('.s-visual, .s-wrap'), function (box) {
      var h = box.getBoundingClientRect().height;
      if (h > cap) {
        var sc = Math.max(0.5, cap / h);
        box.style.height = cap + 'px';
        box.style.transformOrigin = 'center center';
        box.style.transform = 'scale(' + sc + ')';
      }
    });
  });

  // 슬라이드 하단 페이지 번호
  var all = [].slice.call(deck.querySelectorAll('.slide, .cover2'));
  var total = all.length;
  all.forEach(function (s, i) {
    if (s.classList.contains('cover2')) return;
    var n = String(i + 1); if (n.length < 2) n = '0' + n;
    var t = String(total); if (t.length < 2) t = '0' + t;
    s.appendChild(el('<div class="s-foot"><span>차윤건 · 포트폴리오</span><span>' + n + ' / ' + t + '</span></div>'));
  });
})();
