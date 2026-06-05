// URL de la API
const API_URL = 'https://jsonplaceholder.typicode.com/users'

// Funciones puras
const tienecorreoBiz = usuario => usuario.email.endsWith('.biz')

const aTarjetaHTML = usuario => `
  <article class="tarjeta">
    <h3>${usuario.name}</h3>
    <p><b>Email:</b> ${usuario.email}</p>
    <p><b>Compañía:</b> ${usuario.company.name}</p>
  </article>
`

// Elementos del DOM
const btnCargar = document.getElementById('btnCargar')
const directorio = document.getElementById('directorios')

// Función para renderizar
const renderizar = htmlString => {
  directorio.innerHTML = htmlString
}

// Evento click cargar datos
btnCargar.addEventListener('click', () => {
  btnCargar.textContent = 'Cargando...'
  btnCargar.disabled = true

  directorio.innerHTML = ''

  fetch(API_URL)
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error('Error en la respuesta de la API')
      }
      return respuesta.json()
    })
    .then(usuarios => {
      const directorioHTML = usuarios.filter(tienecorreoBiz).map(aTarjetaHTML).join('')

      if (!directorioHTML) {
        renderizar('<p>No se encontraron usuarios con correo .biz</p>')
        btnCargar.textContent = 'Sin resultados'
        return
      }

      renderizar(directorioHTML)
      btnCargar.textContent = 'Datos Cargados'
    })
    .catch(error => {
      console.error('Error al cargar los datos:', error)
      renderizar('<p>Error al cargar los datos</p>')
      btnCargar.textContent = 'Error al cargar'
    })
    .finally(() => {
      btnCargar.disabled = false
    })
})
