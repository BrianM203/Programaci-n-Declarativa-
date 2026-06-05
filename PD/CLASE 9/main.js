const API_KEY = 'bf13ba5990be694f1aa461d56f055dfd';
const CITY = 'Toluca';
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=es`;

const mostrarclima = (data) => {
    const { name, main, weather } = data;

    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return `
        <h2>${name}</h2>
        <img src="${iconUrl}" alt="${weather[0].description}">
        <div class="temp-main">${Math.round(main.temp)} °C</div>
        <p class="description">${weather[0].description.replace("muy nuboso", "muy nublado")}</p>
        <div class="temp-range">
            <span>Min: ${Math.round(main.temp_min)} °C</span> |
            <span>Máx: ${Math.round(main.temp_max)} °C</span>
        </div>
    `;
};

let ciudadActual = CITY;

const obtenerClima = (ciudad) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

    const contenedor = document.getElementById('climaCard');
    contenedor.innerHTML = "<p>Cargando clima...</p>";

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Ciudad no encontrada");
            return response.json();
        })
        .then(data => {
            contenedor.innerHTML = mostrarclima(data);
        })
        .catch(error => {
            contenedor.innerHTML = `<p>Error: ${error.message}</p>`;
        });
};


document.getElementById('selectorCiudad').addEventListener('change', (e) => {
    ciudadActual = e.target.value;
    obtenerClima(ciudadActual);
});


obtenerClima(ciudadActual);