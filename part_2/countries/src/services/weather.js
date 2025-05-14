import axios from 'axios'
let apiKey = import.meta.env.VITE_API_KEY
const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?`

//* Trae toda la informacion del JSON
const getWeather = (lat, long) => {
    //console.log('getWeather')
    console.log(import.meta.env)
    console.log('apiKey', apiKey)
    let getURL = `${baseUrl}lat=${lat}&lon=${long}&appid=${apiKey}`
    console.log('URL', getURL)
    const request = axios.get(getURL)
    request.then(response => console.log('response', response.data.list[0]))
    return request.then(response => response.data.list[0])
}

const KelvinsToCelsius = (kelvins) => (kelvins - 273.15).toFixed(2);

export default { getWeather, KelvinsToCelsius }