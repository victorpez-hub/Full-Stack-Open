import { useState } from 'react'
import contactService from '../services/contactos'

const Filter = (props) => {

  const [find, setFind] = useState('')

  const handleFilterChange = ((event) => {
    setFind(event.target.value)
  })

  //* Uso el metodo filter para buscar en el array persons. Dichos elementos que cuadren en la busqueda lo guardaré en la variable listadoFiltrado
  const listadoFiltrado = props.persons.filter(person => {
    //* Similiar a for each, person es cada elemento/objeto del array
    //* Lo convierto en minusculas y miro si contiene un texto, si es asi guardo el elemento/objeto en la variable encontrado
    const encontrado = person.name.toLowerCase().includes(find)
    //* Lo devuelvo, aunque como es un for each hare el return al final de TODO el ciclo. Al final la variable listadoFiltrado tendra todos los objetos/elementos que concuerden con la busqueda
    return encontrado
  })
  //* Por defecto si el metodo filter no encuentra nada contiene el array completo
  //console.log('listadoFiltrado', listadoFiltrado)

  const borrarContacto = (nombre, id) => {
    if (confirm(`¿Estas seguro de borrar el contacto de ${nombre}?`)) {
      contactService
        .borrar(id)
        // Con lo devuelto del metodo, es decir, el contacto borrado
        .then(() => {
          //En el listado voy a modificarlo de la siguiente manera
          props.setPersons((prevPersons) =>
            // prevPersons es el listado actual (incluido el que he borrado porque aun no se ha actualizado)
            prevPersons
              //Busco el que he borrado con filter
              .filter(person =>
                //devuelvo todos aquellos que id distinto al que he borrado, de esta forma el listado sera el mismo de la BBDD, es dicir, sin el contacto que acabo de borrar
                person.id !== id));
        })
    }
  }

  return (
    <>
      <p>Filtrar agenda por el texto:
        <input value={find} onChange={handleFilterChange} />
      </p>
      <h2>Contactos</h2>
      {listadoFiltrado.map((value) => (
        <div key={value.id}>
          <span> <b>Nombre:</b> {value.name} <b>Teléfono:</b> {value.number}</span>
          <button type="submit" onClick={() => borrarContacto(value.name, value.id)}>Borrar</button>
          <br />
        </div>
      ))}
    </>
  )
}
export default Filter

//! Se ejecuta inmediatamente cuando React renderiza el componente, en lugar de esperar a que el botón sea pulsado. Esto ocurre porque estás llamando a la función directamente en lugar de pasarla como una referencia.
////<button type="submit" onClick={borrarContacto(value.id)}>Borrar</button>
//*Debes envolver la llamada a borrarContacto en una función anónima para que se ejecute solo cuando el botón sea pulsado.
//<button type="button" onClick={() => borrarContacto(value.id)}>Borrar</button>