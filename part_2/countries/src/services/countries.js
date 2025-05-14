import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

//* Trae toda la informacion del JSON
const getAll = () => {
    //console.log('getAll')
    const request = axios.get(`${baseUrl}/api/all`)
    //request.then(response => console.log('responseCountry', response.data))
    return request.then(response => response.data)
}

//* Actualiza la informacion JSON mediante el metodo HTTP Put
const getOne = (name) => {
    //console.log('getOne')
    const request = axios.get(`${baseUrl}/api/name/${name}`, name)
    request.then(response => console.log('responseCountry', response.data))
    return request.then(response => response.data)
}

export default { getAll, getOne }