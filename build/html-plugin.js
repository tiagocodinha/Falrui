// Plugin Vite: gera HTML estático (o conteúdo não depende de JavaScript).
//   <!--include:header--> <!--include:footer--> <!--include:cta-->
//   <!--projects:filters--> <!--projects:all--> <!--projects:featured-->
//   {{phone}} {{phoneHref}} {{email}} {{address}} {{mapUrl}} {{founded}} {{legalName}}
import { readFileSync } from 'node:fs';
import { site } from '../src/data/site.js';
import { projects, tipos, featured } from '../src/data/projects.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const partial = (n) => readFileSync(new URL(`../src/partials/${n}.html`, import.meta.url), 'utf8');

const card = (p, eager) => `
<li class="project" data-tipo="${esc(p.tipo)}">
  <button type="button" class="pcard" aria-haspopup="dialog" data-nome="${esc(p.nome)}" data-local="${esc(p.local)}" data-tipo-label="${esc(p.tipo)}" data-ano="${esc(p.ano || '')}" data-solucao="${esc(p.solucao || '')}" data-descricao="${esc(p.descricao || '')}">
    <img src="${esc(p.img)}" alt="${esc(p.alt || `Fotografia do projeto ${p.nome}, ${p.local}`)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async" width="1200" height="800">
    <span class="pmeta">
      <span class="tag">${esc(p.tipo)}</span>
      <strong>${esc(p.nome)}</strong>
      <span class="ploc">${esc(p.local)}${p.ano ? ' · ' + esc(p.ano) : ''}</span>
    </span>
    <span class="sr">Ver ampliado</span>
  </button>
</li>`;

const norm = (path) => path.replace(/\?.*$/, '').replace(/index\.html$/, '') || '/';

export default function falruiHtml() {
  return {
    name: 'falrui-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const here = norm(ctx.path);
        const header = partial('header').replace(/<a href="([^"#]+)"([^>]*)>/g, (m, href, rest) => {
          const on = href === '/' ? here === '/' : here.startsWith(href);
          return on && !rest.includes('btn') ? `<a href="${href}"${rest} aria-current="page">` : m;
        });
        const subs = {
          '<!--include:header-->': header,
          '<!--include:footer-->': partial('footer'),
          '<!--include:cta-->': partial('cta'),
          '<!--projects:filters-->': ['Todos', ...tipos]
            .map((t, i) => `<button type="button" class="chip" data-filter="${i ? esc(t) : 'all'}" aria-pressed="${i === 0}">${esc(t)}</button>`)
            .join(''),
          '<!--projects:all-->': projects.map((p, i) => card(p, i < 3)).join(''),
          '<!--projects:featured-->': featured.map((s) => card(projects.find((p) => p.slug === s))).join(''),
        };
        for (const [k, v] of Object.entries(subs)) html = html.split(k).join(v);
        html = html.replace('</head>', '  <script>document.documentElement.classList.add("js")</script>\n</head>');
        const vars = {
          phone: site.phone, phoneHref: site.phoneHref, email: site.email, mapUrl: site.mapUrl,
          founded: site.founded, address: site.address.join('<br>'), legalName: site.legalName,
        };
        return html.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));
      },
    },
  };
}
