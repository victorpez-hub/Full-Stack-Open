import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

//* Trae toda la informacion del JSON
const getAll = () => {
    console.log('getAll')
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//* Añade informacion JSON mediante el metodo HTTP Post
const create = newObject => {
    console.log('create')
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

//* Actualiza la informacion JSON mediante el metodo HTTP Put
const update = (id, newObject) => {
    console.log('update')
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const borrar = (id) =>{
    console.log('borrar')
    const request = axios.delete(`${baseUrl}/${id}`)
    //* Devuelvo el contacto que he borrado
    return request.then(response => response.data)
}
export default {getAll,create,update,borrar}