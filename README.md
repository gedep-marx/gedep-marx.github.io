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
<div class="calendario" data-encontros="2026-10-31"></div>
```

O calendário abre no mês do próximo encontro e marca cada data com uma estrela; a lista abaixo dele mostra só as datas que ainda não passaram. Sem data futura, o calendário mostra o mês atual e a lista mostra o último encontro. Para marcar um novo encontro, acrescente a data no fim da lista.

## Ver localmente

A busca carrega as páginas por `fetch`, então abra por um servidor, não pelo arquivo:

```bash
python3 -m http.server 8000
```

e acesse http://localhost:8000.

## Publicação

O GitHub Pages serve a branch `main`, pasta raiz. Cada push na `main` publica em cerca de um minuto.

O app anterior (Next.js com banco Neon e formulário de envio) está no histórico, até o commit `2923a96`.

## Melhorias futuras

### Calendário lido do Google Agenda

Hoje as datas ficam fixas em `data-encontros` e cada mudança pede um commit. A ideia é ler os encontros de uma agenda pública do Google Agenda, para atualizar pelo celular e o site refletir na hora.

- Ler pela API do Google Calendar (`calendars/{id}/events?singleEvents=true&timeMin=...`). Ela aceita chamadas do navegador vindas de `resende-g.github.io`. O link `.ics` público não serve: o Google não libera a leitura dele por outro site (sem CORS).
- O que falta: o ID de uma agenda pública (com "ver todos os detalhes do evento") e uma chave de API num projeto pessoal do Google Cloud, com a Calendar API ativada e a chave restrita ao endereço `resende-g.github.io/*` e só a essa API. A chave fica visível no código da página, o que é normal nesse uso; a restrição limita quem pode usá-la.
- Com isso dá para mostrar horário, tema (título do evento) e local, seguir eventos que se repetem toda semana e pôr um botão para os membros assinarem a agenda.
- Manter `data-encontros` como reserva caso a API falhe.
