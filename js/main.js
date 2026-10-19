// FALRUI – comportamento do site (menu, mapa de obras, lightbox, formulário).
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
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.1 });
    revealEls.forEach((el) => io.observe(el));
  }
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

// Mapa de obras: pré-visualização ao passar o rato / focar, filtro e lightbox
const rows = [...document.querySelectorAll('.vao-row')];
if (rows.length) {
  const pv = document.getElementById('pv-img');
  const setPreview = (r) => {
    rows.forEach((x) => x.classList.toggle('on', x === r));
    if (!pv) return;
    pv.src = r.dataset.prev;
    pv.alt = `Fotografia do projeto ${r.dataset.nome}, ${r.dataset.local}`;
    document.getElementById('pv-ref').textContent = 'Obra ' + r.dataset.ref;
    document.getElementById('pv-nome').textContent = r.dataset.nome;
    document.getElementById('pv-meta').textContent = [r.dataset.local, r.dataset.tipoLabel].join(' · ');
  };
  if (pv) setPreview(rows[0]);
  rows.forEach((r) => { r.addEventListener('mouseenter', () => setPreview(r)); r.addEventListener('focus', () => setPreview(r)); });

  const filters = document.querySelector('.filters');
  const count = document.getElementById('count');
  if (filters) filters.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    filters.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    const f = b.dataset.filter;
    let n = 0, first = null;
    rows.forEach((r) => { const li = r.closest('.vao'); const show = f === 'all' || r.dataset.tipoLabel === f; li.hidden = !show; if (show) { n++; first ||= r; } });
    if (count) count.textContent = `${n} ${n === 1 ? 'obra' : 'obras'}`;
    if (first) setPreview(first);
  });

  const lb = document.getElementById('lightbox');
  if (lb) {
    let cur = 0;
    const visible = () => rows.filter((r) => !r.closest('.vao').hidden);
    const show = (r) => {
      const img = lb.querySelector('#lb-img');
      img.src = r.dataset.full;
      img.alt = `Fotografia do projeto ${r.dataset.nome}, ${r.dataset.local}`;
      lb.querySelector('#lb-ref').textContent = 'Obra ' + r.dataset.ref + ' · ' + r.dataset.tipoLabel;
      lb.querySelector('#lb-nome').textContent = r.dataset.nome;
      lb.querySelector('#lb-meta').textContent = [r.dataset.local, r.dataset.ano, r.dataset.solucao && `Solução: ${r.dataset.solucao}`, r.dataset.descricao].filter(Boolean).join(' · ');
    };
    const step = (d) => { const v = visible(); cur = (cur + d + v.length) % v.length; show(v[cur]); };
    rows.forEach((r) => r.addEventListener('click', () => { cur = Math.max(0, visible().indexOf(r)); show(r); lb.showModal(); }));
    lb.querySelector('.prev').addEventListener('click', () => step(-1));
    lb.querySelector('.next').addEventListener('click', () => step(1));
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });
  }
}

// Formulário de orçamento
const form = document.getElementById('quote-form');
if (form) {
  const status = document.getElementById('form-status');
  const btn = form.querySelector('button[type=submit]');
  const perfil = new URLSearchParams(location.search).get('perfil');
  if (perfil && form.elements.perfil) form.elements.perfil.value = perfil;

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
