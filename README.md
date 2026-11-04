# GEDEP — Grupo de Estudos em Direito e Economia Política

Site do GEDEP (Faculdade de Direito da UFBA), publicado pelo GitHub Pages. HTML, CSS e JavaScript puros: não há build, banco nem dependências.

## Arquivos

- `index.html` — início: quem somos, como atuamos, contato, mapa e calendário
- `discurso.html` — Carta de Princípios
- `registros.html` e `producao.html` — em construção
- `estilo.css` — todo o visual
- `site.js` — calendário e busca
- `img/` — imagens recortadas do layout feito no Canva

## Atualizar os encontros

No `index.html`, edite o atributo `data-encontros` (datas `AAAA-MM-DD` separadas por espaço):

```html
<div class="calendario" data-encontros="2026-11-19 2026-11-26"></div>
```

O calendário abre no mês do próximo encontro e marca cada data com uma estrela; a lista abaixo dele mostra só as datas que ainda não passaram.

## Ver localmente

A busca carrega as páginas por `fetch`, então abra por um servidor, não pelo arquivo:

```bash
python3 -m http.server 8000
```

e acesse http://localhost:8000.

## Publicação

O GitHub Pages serve a branch `main`, pasta raiz. Cada push na `main` publica em cerca de um minuto.

O app anterior (Next.js com banco Neon e formulário de envio) está no histórico, até o commit `2923a96`.
