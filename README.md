# FALRUI – website

Site estático multipágina (Vite, HTML/CSS/JS sem framework), em português de Portugal.

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/
```

## Onde editar

| O quê | Ficheiro |
|---|---|
| Contactos, morada, redes sociais | `src/data/site.js` |
| Projetos (nome, local, tipo, imagem, solução, ano, descrição) | `src/data/projects.js` |
| Endpoint do formulário de orçamento | `src/data/form.js` |
| Cabeçalho, rodapé, bloco de chamada para ação | `src/partials/` |
| Texto de cada página | `index.html`, `empresa/`, `solucoes/`, `projetos/`, `qualidade/`, `contactos/`, `privacidade/` |
| Estilos | `src/css/main.css` |

Os blocos marcados como **“A confirmar pela FALRUI”** são espaços por preencher.
As imagens dos projetos estão ligadas ao site atual (www.falrui.pt); substituir por ficheiros próprios em `public/img/` e atualizar `img` em `projects.js`.

## Formulário

Sem endpoint em `src/data/form.js` o formulário valida os campos mas **não envia nada** e avisa o utilizador. Para o ligar, colocar o URL de um serviço que aceite POST (Formspree, Netlify Forms, função própria).
