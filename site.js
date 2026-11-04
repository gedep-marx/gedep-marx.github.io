// Calendário: lê as datas de data-encontros e mostra o mês do próximo encontro.
const calendario = document.querySelector("[data-encontros]");
if (calendario) {
  const iso = (d) => d.toLocaleDateString("sv"); // AAAA-MM-DD no fuso local
  const datas = calendario.dataset.encontros.trim().split(/\s+/).filter(Boolean).sort();
  const hoje = iso(new Date());
  const proximas = datas.filter((d) => d >= hoje);
  const [ano, mes] = (proximas[0] || hoje).split("-").map(Number);
  const primeiro = new Date(ano, mes - 1, 1);
  const dia = new Date(ano, mes - 1, 1 - primeiro.getDay());
  const nomeMes = primeiro.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const semana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

  let linhas = "";
  do {
    linhas += "<tr>";
    for (let i = 0; i < 7; i++) {
      const fora = dia.getMonth() !== mes - 1;
      const encontro = datas.includes(iso(dia));
      linhas += `<td class="${fora ? "fora" : ""} ${encontro ? "encontro" : ""}">${dia.getDate()}${encontro ? '<span class="oculto">, encontro</span>' : ""}</td>`;
      dia.setDate(dia.getDate() + 1);
    }
    linhas += "</tr>";
  } while (dia.getMonth() === mes - 1);

  calendario.innerHTML = `<table>
    <caption>${nomeMes[0].toUpperCase() + nomeMes.slice(1)}</caption>
    <thead><tr>${semana.map((s) => `<th scope="col" aria-label="${s}">${s[0].toUpperCase()}</th>`).join("")}</tr></thead>
    <tbody>${linhas}</tbody>
  </table>`;

  const formato = { weekday: "long", day: "numeric", month: "long" };
  const quando = (d) => `<time datetime="${d}">${new Date(`${d}T12:00`).toLocaleDateString("pt-BR", formato)}</time>`;
  const ultimo = datas.filter((d) => d < hoje).at(-1);
  document.querySelector(".lista-encontros").innerHTML = proximas.length
    ? proximas.map((d) => `<li>${quando(d)}</li>`).join("")
    : `${ultimo ? `<li>Último encontro: ${quando(ultimo)}</li>` : ""}<li>Próxima data em breve no Instagram @gedep.marx</li>`;
}

// Busca: procura o termo no texto das páginas do site (sem acento, sem maiúscula).
const busca = document.querySelector(".busca");
const paginas = ["index.html", "discurso.html", "registros.html", "producao.html"];
const normaliza = (s) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
let indice;

busca.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const termo = busca.q.value.trim();
  const caixa = busca.querySelector(".resultados");
  caixa.replaceChildren();
  caixa.hidden = !termo;
  if (!termo) return;

  try {
    indice ??= await Promise.all(paginas.map(async (url) => {
      const doc = new DOMParser().parseFromString(await (await fetch(url)).text(), "text/html");
      const texto = doc.querySelector("main").textContent.replace(/\s+/g, " ").normalize("NFC");
      return { url, titulo: doc.title, texto };
    }));
  } catch {
    caixa.append(Object.assign(document.createElement("p"), { textContent: "Não foi possível carregar a busca. Tente de novo." }));
    return;
  }

  const alvo = normaliza(termo);
  for (const { url, titulo, texto } of indice) {
    const i = normaliza(texto).indexOf(alvo);
    if (i < 0) continue;
    const achado = texto.slice(i, i + termo.length);
    const link = document.createElement("a");
    link.href = `${url}#:~:text=${encodeURIComponent(achado)}`;
    const trecho = document.createElement("span");
    trecho.append(`…${texto.slice(Math.max(0, i - 60), i)}`, Object.assign(document.createElement("mark"), { textContent: achado }), `${texto.slice(i + termo.length, i + termo.length + 60)}…`);
    link.append(Object.assign(document.createElement("strong"), { textContent: titulo }), trecho);
    caixa.append(link);
  }
  if (!caixa.children.length) {
    caixa.append(Object.assign(document.createElement("p"), { textContent: `Nada encontrado para “${termo}”.` }));
  }
});

busca.q.addEventListener("input", () => {
  if (!busca.q.value) busca.querySelector(".resultados").hidden = true;
});

document.addEventListener("click", (evento) => {
  if (!busca.contains(evento.target)) busca.querySelector(".resultados").hidden = true;
});
