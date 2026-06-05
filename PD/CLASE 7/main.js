/* alert("HOLA");

let a = 0;
for(let i = 0; i <10; i++){
    a +=i;
}

console.log(a);

alert(a); */

const Alumnos = [
  { Nombre: 'Juan', Edad: 19, Promedio: 8.5 },

  {
    Nombre: 'Brian',
    Edad: 22,
    Promedio: 8.5,
  },

  {
    Nombre: 'Kenia',
    Edad: 20,
    Promedio: 8.5,
  },

  {
    Nombre: 'Miguel',
    Edad: 17,
    Promedio: 8.5,
  },
]

/*alert(Alumnos); */
alert(Alumnos[0].Nombre)

console.log(Alumnos)

//
console.log(
  Alumnos.filter(alumno => alumno.Edad < 18)
    .map(alumno => `${alumno.Nombre} Es menor de edad y tiene: ${alumno.Edad}`)
    .join('\n')
)

//2
console.log(
  Alumnos.filter(alumno => alumno.Edad == 20)
    .map(alumno => `${alumno.Nombre} tiene 20 años`)
    .join('\n')
)
