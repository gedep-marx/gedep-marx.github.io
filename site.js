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
