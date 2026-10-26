# FALRUI – website

Site estático em HTML, CSS e JavaScript simples. Sem build, sem dependências, sem npm.

## Ver o site

Abrir `index.html` no browser (duplo clique), ou usar o Live Server do VS Code.
Para publicar, copiar a pasta inteira para qualquer alojamento web.

## Estrutura

```
index.html                página inicial
empresa/ projetos/ qualidade/ contactos/ privacidade/   (cada uma com index.html)
css/main.css              estilos (tipografia Helvetica Neue com Arial de reserva; sem ficheiros de fontes)
js/main.js                menu, mapa de obras, lightbox, formulário
robots.txt  sitemap.xml
```

## Onde editar

- **Contactos e rodapé**: aparecem repetidos em cada `index.html` (cabeçalho, rodapé e barra móvel são iguais em todas as páginas). Pesquisar e substituir `+351 262 990 870` / `geral@falrui.pt`.
- **Projetos**: cada obra é uma linha `<li class="vao">` em `projetos/index.html` (as 8 primeiras também em `index.html`). Para preencher solução, ano ou descrição, usar os atributos `data-solucao`, `data-ano`, `data-descricao` do `<button class="vao-row">`; `data-prev` e `data-full` são as imagens de pré-visualização e ampliação.
- **Imagens**: estão ligadas ao site atual (www.falrui.pt). Para usar ficheiros próprios, colocá-los numa pasta `img/` e trocar o `src`. As fotografias de 2023/10 do site atual têm só 640px; preferir imagens com 1600px ou mais.
- **Hero e secções com fotografia**: em `index.html`, a imagem do hero está em `.hero-photo`; os fundos das secções “Os nossos projetos” e “Peça um orçamento” estão na variável `--bg` do `style` da própria secção.
- Blocos **“A confirmar pela FALRUI”** são espaços por preencher.

## Formulário

Em `js/main.js`, a constante `formEndpoint` está vazia: o formulário valida os campos mas **não envia nada** e avisa o utilizador. Para o ligar, colocar o URL de um serviço que aceite POST (Formspree, Netlify Forms, função própria).
