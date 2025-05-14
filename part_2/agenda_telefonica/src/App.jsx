import { useState, useEffect } from 'react'
import ListadoFiltrado from './components/Filter.jsx'
import Formulario from './components/Form.jsx'
////import axios from 'axios'
import contactService from './services/contactos'

const App = () => {
  //Listado de la agenda
  const [persons, setPersons] = useState([])
  const hook = () => {
    contactService.getAll().then(returnedContacts =>
      setPersons(returnedContacts)
    )

    /*
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
    */
  }
  useEffect(hook, [])
  return (
    <div>
      <Formulario persons={persons} setPersons={setPersons} />
      {/*persons.map((value, indice) => <p key={indice}> <b>Nombre:</b> {value.name} <b>Teléfono:</b> {value.number}</p>)*/}
      <ListadoFiltrado persons={persons} setPersons = {setPersons} />
    </div>
  )
}
export default App