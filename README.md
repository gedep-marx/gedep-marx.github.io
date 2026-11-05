# GEDEP — Grupo de Estudos em Direito e Economia Política

Site do GEDEP (Faculdade de Direito da UFBA), publicado pelo GitHub Pages. HTML, CSS e JavaScript puros: não há build, banco nem dependências.

## Arquivos

- `index.html` — início: quem somos, como atuamos, contato, mapa e calendário
- `discurso.html` — Carta de Princípios
- `registros.html` e `producao.html` — em construção
- `estilo.css` — todo o visual
- `site.js` — busca
- `img/` — imagens recortadas do layout feito no Canva

## Atualizar os encontros

Os encontros vêm da agenda pública `gedepmarx@gmail.com` no Google Agenda, incorporada no `index.html`. Crie ou edite o evento lá (pelo celular, inclusive) e ele aparece no site na hora, sem commit. Para o título, use o tema do encontro; para o local, a sala.

Abaixo da agenda há um link para quem quiser seguir a agenda no próprio Google Agenda.

## Ver localmente

A busca carrega as páginas por `fetch`, então abra por um servidor, não pelo arquivo:

```bash
python3 -m http.server 8000
```

e acesse http://localhost:8000.

## Publicação

O site fica em https://gedep-marx.github.io/. O GitHub Pages serve a branch `main`, pasta raiz. Cada push na `main` publica em cerca de um minuto.

O app anterior (Next.js com banco Neon e formulário de envio) está no histórico, até o commit `2923a96`.

## Melhorias futuras

### Calendário com o visual do layout

A agenda incorporada usa o visual do Google. Para voltar ao calendário do layout do Canva (grade preta, estrela nos dias de encontro) sem perder a atualização na hora, dá para ler os eventos pela API do Google Calendar e desenhar o calendário no site.

- Ler `calendars/gedepmarx@gmail.com/events?singleEvents=true&timeMin=...`. A API aceita chamadas feitas pelo navegador a partir do site. O link `.ics` público não serve: o Google não libera a leitura dele por outro site (sem CORS).
- O que falta: uma chave de API num projeto do Google Cloud da conta do GEDEP, com a Calendar API ativada e a chave restrita ao endereço `gedep-marx.github.io/*` e só a essa API. A chave fica visível no código da página, o que é normal nesse uso; a restrição limita quem pode usá-la.
- O calendário próprio que existia antes está no histórico (commit `2a8366e`, em `site.js` e `estilo.css`) e pode ser reaproveitado.
