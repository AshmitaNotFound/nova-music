/* NOVA V2 enhancer. Loads AFTER script.js and never edits its logic. It only:
   1. tags glyph buttons with data-icon so style.css can draw Lucide icons (script.js still writes ▶ / ❚❚ / 🔂 as text)
   2. sets the accent colour from the selected album
   3. wires the new Listen Together buttons, header/mobile nav highlight, card keyboard access, page reveal
   4. powers Library tabs: Recently played (localStorage) and a mirrored Queue */
(() => {
  const d = document, root = d.documentElement;
  const $ = (s, r = d) => r.querySelector(s), $$ = (s, r = d) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  root.classList.add('js');

  /* 1. Glyph -> icon. Re-runs when script.js rewrites a button (play <-> pause, repeat all <-> repeat one). */
  const ICONS = { '▶': 'play', '⏯': 'play', '⏸': 'pause', '❚❚': 'pause', '⏮': 'skip-back', '⏭': 'skip-forward', '🔀': 'shuffle', '🔁': 'repeat', '🔂': 'repeat-1', '🔊': 'volume', '🔉': 'volume', '🔈': 'volume', '☷': 'list', '⌕': 'search' };
  const ICON_TARGETS = 'button,.track-play,.volume-area span,.search-icon,.main-queue-btn span,.search-toggle span';
  const iconify = () => $$(ICON_TARGETS).forEach(el => {
    if (el.children.length) return;
    const t = el.textContent.replace(/\uFE0F/g, '').trim();
    if (ICONS[t]) { if (el.dataset.icon !== ICONS[t]) el.dataset.icon = ICONS[t]; }
    else if (t && el.dataset.icon) delete el.dataset.icon;
  });
  let raf;
  new MutationObserver(m => {
    if (m.every(x => x.target.id === 'currentTime' || x.target.id === 'duration')) return; // skip the 4x/sec time updates
    cancelAnimationFrame(raf); raf = requestAnimationFrame(iconify);
  }).observe(d.body, { childList: true, subtree: true });
  iconify();

  /* 2. Album atmosphere. Paradise uses your existing Golden Hour gold instead of pink. */
  const ACCENTS = { 'desi heats': '#F9627D', 'midnight city': '#7C6CF6', 'paradise': '#FFB347', 'ocean dreams': '#22D3EE' };
  const onColor = hex => { // pick readable text colour for the accent
    const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
    return (.2126 * r + .7152 * g + .0722 * b) > .3 ? '#0b0b10' : '#fff';
  };
  const titleEl = $('#selectedAlbumTitle');
  const syncAccent = () => {
    const hex = ACCENTS[(titleEl?.textContent || '').trim().toLowerCase()] || '#8B5CF6';
    root.style.setProperty('--accent', hex);
    root.style.setProperty('--on-accent', onColor(hex));
  };
  if (titleEl) { new MutationObserver(syncAccent).observe(titleEl, { childList: true, characterData: true, subtree: true }); syncAccent(); }

  /* 3. New buttons reuse your hidden #listenTogetherBtn, so all room logic stays in script.js. */
  $$('[data-open-listen]').forEach(b => b.addEventListener('click', () => {
    $('#listenTogetherBtn')?.click();
    if (b.dataset.openListen === 'join') setTimeout(() => $('#roomCodeInput')?.focus(), 60);
  }));
  $('#v2AlbumPlay')?.addEventListener('click', () => $('.song-card.selected .card-play, .song-card .card-play')?.click());

  // Album cards are clickable articles in script.js; make them keyboard-reachable too.
  $$('.song-card').forEach(c => c.addEventListener('keydown', e => {
    if (e.target === c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); c.click(); }
  }));

  // One reveal per block, once.
  const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); } }), { threshold: .12 });
  $$('[data-rv]').forEach(el => rv.observe(el));

  // Header + mobile nav highlight (script.js's own spy only knew home/songs/player/team).
  const groups = [$$('.v2-link'), $$('.v2-bottom a')];
  const ALIAS = { 'album-tracks': 'songs', team: 'together' };
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const id = ALIAS[e.target.id] || e.target.id;
    groups.forEach(g => { // each nav keeps its last highlight when the current section has no link in it
      const hit = g.filter(a => a.getAttribute('href') === '#' + id);
      if (hit.length) g.forEach(a => a.classList.toggle('on', hit.includes(a)));
    });
  }), { rootMargin: '-40% 0px -55% 0px' });
  ['home', 'songs', 'album-tracks', 'liked-songs', 'player', 'together', 'team'].forEach(id => { const s = d.getElementById(id); if (s) spy.observe(s); });

  /* 4. Library tabs */
  const tabs = $$('.v2-tabs [role=tab]');
  const panels = { liked: '#likedSongsList', recent: '#recentList', queue: '#libQueue' };
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.setAttribute('aria-selected', String(x === t)));
    Object.entries(panels).forEach(([k, sel]) => { $(sel).hidden = k !== t.dataset.tab; });
  }));

  // Recently played: recorded each time playback actually starts (#playerCard gains .playing).
  const KEY = 'novaRecent', recentEl = $('#recentList');
  let recent = []; try { recent = JSON.parse(localStorage.getItem(KEY)) || []; } catch { recent = []; }
  const saveRecent = () => { try { localStorage.setItem(KEY, JSON.stringify(recent)); } catch { /* storage unavailable */ } };
  const renderRecent = () => {
    recentEl.innerHTML = recent.length ? recent.map((r, n) => `
      <div class="liked-song" role="button" tabindex="0" data-r="${n}">
        <span class="liked-number">${String(n + 1).padStart(2, '0')}</span>
        <img class="liked-cover" src="${esc(r.c)}" alt="">
        <span class="liked-song-info"><strong>${esc(r.t)}</strong><small>${esc(r.ar)}</small></span>
        <span class="liked-album-name">${esc(r.a)}</span>
        <span class="track-play" data-icon="play"></span>
      </div>`).join('') : `<div class="liked-empty"><div class="liked-empty-heart">♪</div><h3>Nothing played yet</h3><p>Songs you play will show up here.</p></div>`;
  };
  const recordRecent = () => {
    const album = (titleEl?.textContent || '').trim();
    const rows = $$('#albumSongList .album-track');
    const i = rows.findIndex(r => r.classList.contains('active'));
    if (i < 0 || !album) return;
    const entry = { a: album, i, t: $('#songTitle')?.textContent.trim(), ar: $('#artistName')?.textContent.trim(), c: $('#albumCover')?.getAttribute('src') };
    recent = [entry, ...recent.filter(r => !(r.a === album && r.i === i))].slice(0, 20);
    saveRecent(); renderRecent();
  };
  const playRecent = n => {
    const r = recent[n]; if (!r) return;
    $$('.song-card').find(c => $('h3', c)?.textContent.trim().toLowerCase() === r.a.toLowerCase())?.click(); // selects album, renders its rows
    $(`#albumSongList .album-track[data-track-index="${r.i}"]`)?.click();                                      // then plays the track
  };
  recentEl.addEventListener('click', e => { const row = e.target.closest('[data-r]'); if (row) playRecent(+row.dataset.r); });
  recentEl.addEventListener('keydown', e => { if (e.key === 'Enter') e.target.closest('[data-r]')?.click(); });
  const card = $('#playerCard'); let wasPlaying = false;
  if (card) new MutationObserver(() => { const now = card.classList.contains('playing'); if (now && !wasPlaying) recordRecent(); wasPlaying = now; }).observe(card, { attributes: true, attributeFilter: ['class'] });
  renderRecent();

  // Queue tab mirrors #queueList; clicks are forwarded so script.js does the actual playback.
  const q = $('#queueList'), lq = $('#libQueue');
  const mirror = () => { lq.innerHTML = q.innerHTML || `<div class="liked-empty"><h3>Queue is empty</h3></div>`; };
  if (q && lq) {
    new MutationObserver(mirror).observe(q, { childList: true }); mirror();
    lq.addEventListener('click', e => { const it = e.target.closest('.queue-item'); if (it) $(`#queueList .queue-item[data-track-index="${it.dataset.trackIndex}"]`)?.click(); });
  }
})();
