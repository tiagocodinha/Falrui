// FALRUI – comportamento do site (menu, hero, lightbox, formulário).
// Configuração editável:
const site = { email: 'geral@falrui.pt', phone: '+351 262 990 870', phoneHref: 'tel:+351262990870' };
// URL do serviço que recebe os pedidos do formulário (Formspree, Netlify Forms, função própria...).
// Enquanto estiver vazio, o formulário valida os campos mas NÃO envia nada e avisa o utilizador.
const formEndpoint = '';


const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Entrada suave das secções ao fazer scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  if (reduced || !('IntersectionObserver' in window)) revealEls.forEach((el) => el.classList.add('in'));
  else {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  }
}

// Hero: rotação de fotografias de projetos (com pausa; desligada se o utilizador preferir menos movimento)
const hero = document.querySelector('.hero');
if (hero) {
  const slides = [...hero.querySelectorAll('.slide')];
  const dotsBox = hero.querySelector('.dots');
  const cap = hero.querySelector('.hero-cap');
  const pauseBtn = hero.querySelector('.pause');
  let i = 0, timer = null, playing = !reduced;
  const dots = slides.map((_, n) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'dot'; b.setAttribute('aria-label', `Fotografia ${n + 1} de ${slides.length}`);
    b.addEventListener('click', () => { go(n); if (playing) restart(); });
    dotsBox.appendChild(b); return b;
  });
  const go = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
    dots.forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
    cap.innerHTML = `<strong></strong> <span></span>`;
    cap.firstChild.textContent = slides[i].dataset.nome;
    cap.lastChild.textContent = slides[i].dataset.local === slides[i].dataset.nome ? '' : '· ' + slides[i].dataset.local;
  };
  const stop = () => { clearInterval(timer); timer = null; };
  const restart = () => { stop(); timer = setInterval(() => go(i + 1), 6500); };
  const setPlaying = (p) => { playing = p; p ? restart() : stop(); pauseBtn.textContent = p ? 'Pausar' : 'Reproduzir'; pauseBtn.setAttribute('aria-pressed', String(!p)); };
  pauseBtn.addEventListener('click', () => setPlaying(!playing));
  go(0); setPlaying(playing);
  if (slides.length < 2) { dotsBox.hidden = true; pauseBtn.hidden = true; }
}

// Lightbox de projetos
const lb = document.getElementById('lightbox');
if (lb) {
  const cards = [...document.querySelectorAll('.pcard')];
  let cur = 0;
  const visible = () => cards.filter((c) => !c.closest('.project').hidden);
  const show = (c) => {
    const img = c.querySelector('img');
    lb.querySelector('#lb-img').src = img.currentSrc || img.src;
    lb.querySelector('#lb-img').alt = img.alt;
    lb.querySelector('#lb-tipo').textContent = c.dataset.tipoLabel;
    lb.querySelector('#lb-nome').textContent = c.dataset.nome;
    lb.querySelector('#lb-meta').textContent = [c.dataset.local, c.dataset.ano, c.dataset.solucao && `Solução: ${c.dataset.solucao}`, c.dataset.descricao].filter(Boolean).join(' · ');
  };
  const step = (d) => { const v = visible(); cur = (cur + d + v.length) % v.length; show(v[cur]); };
  cards.forEach((c) => c.addEventListener('click', () => { cur = Math.max(0, visible().indexOf(c)); show(c); lb.showModal(); }));
  lb.querySelector('.prev').addEventListener('click', () => step(-1));
  lb.querySelector('.next').addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });
}

// Menu móvel
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
if (toggle && menu) {
  const set = (open) => { menu.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); };
  toggle.addEventListener('click', () => set(!menu.classList.contains('open')));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) { set(false); toggle.focus(); } });
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
}

// Filtro de projetos
const filters = document.querySelector('.filters');
if (filters) {
  const items = [...document.querySelectorAll('.project')];
  const count = document.getElementById('count');
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    filters.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    const f = b.dataset.filter;
    let n = 0;
    items.forEach((li) => { const show = f === 'all' || li.dataset.tipo === f; li.hidden = !show; if (show) n++; });
    if (count) count.textContent = `${n} ${n === 1 ? 'projeto' : 'projetos'}`;
  });
}

// Formulário de orçamento
const form = document.getElementById('quote-form');
if (form) {
  const status = document.getElementById('form-status');
  const btn = form.querySelector('button[type=submit]');
  const show = (kind, html) => { status.hidden = false; status.className = `status ${kind}`; status.innerHTML = html; status.focus(); };
  const setErr = (el, msg) => {
    const box = form.querySelector(`#${el.id}-err`);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (box) box.textContent = msg || '';
  };

  const validate = () => {
    let first = null;
    const bad = (el, m) => { setErr(el, m); first ||= el; };
    const f = form.elements;
    f.nome.value.trim() ? setErr(f.nome, '') : bad(f.nome, 'Indique o seu nome.');
    const email = f.email.value.trim(), tel = f.telefone.value.trim();
    if (!email && !tel) { bad(f.email, 'Indique um email ou um telefone.'); setErr(f.telefone, ''); }
    else {
      email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? bad(f.email, 'O email não parece válido.') : setErr(f.email, '');
      tel && !/^[+\d][\d\s().-]{6,}$/.test(tel) ? bad(f.telefone, 'O telefone não parece válido.') : setErr(f.telefone, '');
    }
    f.tipo.value ? setErr(f.tipo, '') : bad(f.tipo, 'Escolha o tipo de projeto.');
    f.mensagem.value.trim().length >= 10 ? setErr(f.mensagem, '') : bad(f.mensagem, 'Descreva brevemente o projeto (mínimo 10 caracteres).');
    f.consent.checked ? setErr(f.consent, '') : bad(f.consent, 'É necessário aceitar o tratamento dos dados para enviar o pedido.');
    first?.focus();
    return !first;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (form.elements.website.value) return; // honeypot
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent('Pedido de orçamento')}&body=${encodeURIComponent(form.elements.mensagem.value)}`;
    if (!formEndpoint) {
      show('error', `O envio automático ainda não está ativo neste site e o seu pedido <strong>não foi enviado</strong>. Pode contactar-nos por <a href="${mailto}">email</a> ou pelo telefone <a href="${site.phoneHref}">${site.phone}</a>.`);
      return;
    }
    btn.disabled = true;
    show('busy', 'A enviar o pedido…');
    try {
      const res = await fetch(formEndpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      show('ok', '<strong>Pedido enviado.</strong> Entraremos em contacto através dos dados que indicou.');
    } catch {
      show('error', `Não foi possível enviar o pedido. Tente novamente ou contacte-nos por <a href="${mailto}">email</a> ou <a href="${site.phoneHref}">${site.phone}</a>.`);
    } finally { btn.disabled = false; }
  });
}
