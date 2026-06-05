const alumnos = [
    { Matricula: '001', Nombre: "Brian", Calificacion: 9.8 },
    { Matricula: '002', Nombre: "Kenia", Calificacion: 9.7 },
    { Matricula: '003', Nombre: "Daniel", Calificacion: 9.5 },
    { Matricula: '004', Nombre: "Jonathan", Calificacion: 9.1 },
    { Matricula: '005', Nombre: "Miguel", Calificacion: 9.5 },
    { Matricula: '006', Nombre: "Omar", Calificacion: 9.5 }
];

const NOTA_MINIMA = 9.0;

// DOM
const boton = document.getElementById('btnProcesar');
const lista = document.getElementById('listaAprobados');
const mensajeVacio = document.getElementById('mensajeVacio');
const titulo = document.getElementById('tituloLista');

// Función de aprobado
const esAprobado = (alumno) => alumno.Calificacion >= NOTA_MINIMA;

// Render HTML con clase aprobados
const aElementoHTML = (alumno) => {
    const clase = esAprobado(alumno) ? "aprobado" : "";

    return `
        <li class="${clase}">
            <b>${alumno.Nombre}</b> - Calificación: ${alumno.Calificacion}
        </li>
    `;
};

// Render principal
const renderizar = (arreglo) => {
    lista.innerHTML = arreglo.map(aElementoHTML).join("");

    if (arreglo.length === 0) {
        mensajeVacio.classList.add("mostrar");
    } else {
        mensajeVacio.classList.remove("mostrar");
    }
};

// Estado
let filtrado = false;

// Inicial
renderizar(alumnos);

// Evento botón
boton.addEventListener('click', () => {
    filtrado = !filtrado;

    const datos = filtrado
        ? alumnos.filter(esAprobado)
        : alumnos;

    renderizar(datos);

    titulo.textContent = filtrado
        ? "Alumnos aprobados"
        : "Todos los alumnos";

    boton.textContent = filtrado
        ? "Mostrar todos"
        : "Mostrar aprobados";
});