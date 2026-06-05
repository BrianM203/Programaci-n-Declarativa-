const tabla = document.getElementById("tabla");
const modal = document.getElementById("modal");
const cerrar = document.getElementById("cerrar");

const nombre = document.getElementById("nombre");
const info = document.getElementById("info");
const buscador = document.getElementById("buscador");

let elementos = [];

// COLOR POR TIPO
function obtenerClase(tipo){
  if(tipo.includes("noble")) return "gas";
  if(tipo.includes("nonmetal")) return "no-metal";
  if(tipo.includes("metalloid")) return "metalloid";
  if(tipo.includes("metal")) return "metal";
  return "metal";
}

// BLOQUES s p d f
function obtenerBloque(el){
  const n = el.number;

  if(n === 1 || n === 2 || (n >= 3 && n <= 4)) return "s";
  if(n >= 57 && n <= 71) return "f";
  if(n >= 89 && n <= 103) return "f";
  if((n >= 21 && n <= 30) || (n >= 39 && n <= 48) || (n >= 72 && n <= 80) || (n >= 104 && n <= 112)) return "d";
  return "p";
}

// API
fetch("https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json")
  .then(res => res.json())
  .then(data => {

    elementos = data.elements;
    render(elementos);

  });

// RENDER
function render(lista){
  tabla.innerHTML = "";

  lista.forEach(el => {

    const div = document.createElement("div");
    div.classList.add("elemento");

    div.classList.add(obtenerClase(el.category.toLowerCase()));
    div.classList.add(obtenerBloque(el));

    div.textContent = el.symbol;

    div.style.gridColumn = el.xpos;
    div.style.gridRow = el.ypos;

    div.addEventListener("click", () => {

      nombre.textContent = el.name;

      info.innerHTML = `
        <b>Nombre:</b> ${el.name} <br>
        <b>Símbolo:</b> ${el.symbol} <br>
        <b>Número atómico:</b> ${el.number} <br>
        <b>Masa:</b> ${el.atomic_mass} <br>
        <b>Tipo:</b> ${el.category} <br>
        <b>Estado:</b> ${el.phase} <br>
        <b>Descubridor:</b> ${el.discovered_by || "Desconocido"} <br>
        <b>Año:</b> ${el.year || "N/A"}
      `;

      modal.style.display = "block";
    });

    tabla.appendChild(div);
  });
}

// BUSCADOR
buscador.addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();

  const filtrados = elementos.filter(el =>
    el.name.toLowerCase().includes(texto) ||
    el.symbol.toLowerCase().includes(texto)
  );

  render(filtrados);
});

// FILTROS
function filtrar(tipo){
  if(tipo === "todos") return render(elementos);

  const filtrados = elementos.filter(el =>
    obtenerClase(el.category.toLowerCase()) === tipo
  );

  render(filtrados);
}

// CERRAR MODAL
cerrar.onclick = () => modal.style.display = "none";

window.onclick = e => {
  if(e.target === modal){
    modal.style.display = "none";
  }
};