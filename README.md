# FALRUI – website

Site estático em HTML, CSS e JavaScript simples. Sem build, sem dependências, sem npm.

## Ver o site

Abrir `index.html` no browser (duplo clique), ou usar o Live Server do VS Code.
Para publicar, copiar a pasta inteira para qualquer alojamento web.

## Estrutura

```
index.html                página inicial
empresa/ solucoes/ projetos/ qualidade/ contactos/ privacidade/   (cada uma com index.html)
css/main.css              estilos (inclui as fontes Inter, em fonts/)
js/main.js                menu, hero, filtro de projetos, lightbox, formulário
robots.txt  sitemap.xml
```

## Onde editar

- **Contactos e rodapé**: aparecem repetidos em cada `index.html` (cabeçalho, rodapé e barra móvel são iguais em todas as páginas). Pesquisar e substituir `+351 262 990 870` / `geral@falrui.pt`.
- **Projetos**: cada projeto é um bloco `<li class="project">` em `projetos/index.html` (e os destacados em `index.html`). Para preencher solução, ano ou descrição, usar os atributos `data-solucao`, `data-ano`, `data-descricao` do `<button class="pcard">`.
- **Imagens**: estão ligadas ao site atual (www.falrui.pt). Para usar ficheiros próprios, colocá-los numa pasta `img/` e trocar o `src`. As fotografias de 2023/10 do site atual têm só 640px; preferir imagens com 1600px ou mais.
- **Hero**: as fotografias rodam a partir dos blocos `<div class="slide">` em `index.html`.
- Blocos **“A confirmar pela FALRUI”** são espaços por preencher.

## Formulário

Em `js/main.js`, a constante `formEndpoint` está vazia: o formulário valida os campos mas **não envia nada** e avisa o utilizador. Para o ligar, colocar o URL de um serviço que aceite POST (Formspree, Netlify Forms, função própria).
