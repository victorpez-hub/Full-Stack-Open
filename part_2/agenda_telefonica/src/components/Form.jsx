import { useState } from 'react'
////import axios from 'axios'
//Axios es una biblioteca cliente HTTP basada en promesas diseñada para realizar solicitudes web de manera eficiente en aplicaciones JavaScript, incluyendo React
import contactService from '../services/contactos'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    if (message.includes("correctamente")) {
        return (
            <div className="alta">
                {message}
            </div>
        )
    } else if (message.includes("Error:")) {
        return (
            <div className="error">
                {message}
            </div>
        )
    }

}

const Form = (props) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [message, setMessage] = useState(null)

    const addContacto = (event) => {
        //Evitamos renderizar
        event.preventDefault()
        //*Lo que hacemos es crear otro array pero con el nombre nuevo al final, no lo modificamos directamente
        if (!NombreDuplicado(newName) && !NumeroDuplicado(newNumber)) {
            const contactObject = {
                name: newName,
                number: newNumber,
            }
            console.log(message)
            contactService
                .create(contactObject)
                .then(returnedNote => {
                    props.setPersons(props.persons.concat(returnedNote))
                    setNewName("")
                    setNumber("")
                })
            setMessage(`El contacto de ${contactObject.name} - ${contactObject.number}  fue creado correctamente`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)

            console.log('Se añade nuevo contacto: ', newName)
        } else if (NombreDuplicado(newName) && !NumeroDuplicado(newNumber)) {
            if (confirm(`¿Estas seguro de cambiar el nº del contacto ${newName} a ${newNumber}?`)) {
                const contactObject = {
                    name: newName,
                    number: newNumber,
                }

                console.log('props.persons: ', props.persons.find(contacto => contacto.name === newName).id)
                const contactToUpdate = props.persons.find(contacto => contacto.name === newName);

                contactService
                    .update(contactToUpdate.id, contactObject)
                    .then(returnedNote => {
                        props.setPersons(props.persons.map(contacto => contacto.id !== contactToUpdate ? contacto : returnedNote))
                        setNewName("")
                        setNumber("")
                    })
                    .catch(error => {
                        setMessage(`Error: La nota '${contactToUpdate.name}' ya fue eliminada del servidor`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                    props.setPersons(props.persons.filter(n => n.id !== contactToUpdate.id))
            }
        } else if (NombreDuplicado(newName) && NumeroDuplicado(newNumber)) {
            alert(`El contacto ${newName} ya existe en la agenda`)
        }
    }

    //Controlamos el cambio de estado porque si no, no podriamos modificar el input
    const handleNoteChange = (event) => {
        //console.log(event.target.value)
        //console.log('Escribiendo en el formulario')
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        //console.log(event.target.value)
        //console.log('Escribiendo en el formulario')
        setNumber(event.target.value)
    }

    //+ Usa llaves {} si necesitas más de una línea de código. 
    //+ Usa paréntesis () (o sin nada) para una expresión simple y retorno implícito, sin necesidad de escribir return ni llaves
    const NombreDuplicado = (txt) => {
        let duplicado = false
        props.persons.map((value) => {
            if (value.name === txt) {
                duplicado = true
            }
        })
        return duplicado
    }

    const NumeroDuplicado = (txt) => {
        let duplicado = false
        props.persons.map((value) => {
            if (value.number === txt) {
                duplicado = true
            }
        })
        return duplicado
    }

    return (
        <>
            <Notification message={message} />
            <h1>Agenda</h1>
            <form onSubmit={addContacto}>
                <div>
                    Nombre: <input value={newName} onChange={handleNoteChange} />
                </div>
                <div>
                    Número: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">Añadir</button>
                </div>
            </form>
        </>
    )
}
export default Form