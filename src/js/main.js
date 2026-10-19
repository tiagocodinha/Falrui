import '../css/main.css';
import { site } from '../data/site.js';
import { formEndpoint } from '../data/form.js';

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
