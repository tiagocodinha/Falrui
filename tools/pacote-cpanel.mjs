// Gera deploy/new-v1/ pronto a enviar para o cPanel (www.falrui.pt/new-v1/), sem indexação.
// Uso: node tools/pacote-cpanel.mjs  e depois criar o .zip com o CONTEÚDO de deploy/new-v1 (incluindo o .htaccess).
// No Windows, NÃO usar 'tar -a' (cria um tar com extensão .zip e o cPanel recusa-o): usar PowerShell com System.IO.Compression.ZipFile.
import fs from 'node:fs';
import path from 'node:path';

const out = 'deploy/new-v1';
const keep = ['index.html', 'empresa', 'projetos', 'qualidade', 'contactos', 'privacidade', 'css', 'js', 'favicon.ico', 'favicon.png'];
const ROBOTS = 'noindex, nofollow, noarchive, nosnippet, noimageindex';

fs.rmSync(out, { recursive: true, force: true });
for (const k of keep) fs.cpSync(k, path.join(out, k), { recursive: true });

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
for (const f of walk(out).filter((x) => x.endsWith('.html'))) {
  let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/\s*<meta name="robots"[^>]*>/g, '');
  h = h.replace(/\s*<link rel="canonical"[^>]*>/g, '');
  h = h.replace(/\s*<meta property="og:[^>]*>/g, '');
  h = h.replace('<meta charset="utf-8">', `<meta charset="utf-8">\n  <meta name="robots" content="${ROBOTS}">\n  <meta name="googlebot" content="noindex, nofollow">`);
  fs.writeFileSync(f, h);
}

fs.writeFileSync(path.join(out, '.htaccess'), `# Versão em teste: não indexar e não listar pastas
<IfModule mod_headers.c>
  Header set X-Robots-Tag "${ROBOTS}"
</IfModule>
Options -Indexes
DirectoryIndex index.html
`);
console.log('Pacote gerado em', out);
