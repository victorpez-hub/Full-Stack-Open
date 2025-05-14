import weatherServices from '../services/weather.js'
import { useState, useEffect } from 'react';

const Country = (props) => {
    const [weather, setWeather] = useState(null);

    //* useEffect se utiliza para ejecutar ciertas instrucciones bajo ciertas circunstancias
    // El segundo arumento , [props.filterCountries]) especifica que se ejecuta:
    //! No cuando se renderiza el componente Country, ya que para ello no se deberia poner nada
    //! Tampoco despues del 1º renderizado de Country, que seria con []
    //* Se hace cuando cambia props.filterCountries
    useEffect(() => {
        const country = props.filterCountries[0]
        weatherServices
            .getWeather(country.latlng[0], country.latlng[1])
            .then(returnedWeather => {
                setWeather(returnedWeather)
            });
    }, [props.filterCountries])

    return (
        <>
            {props.filterCountries.map((value, index) => {
                /*
                weatherServices.getWeather(value.latlng[0], value.latlng[1]).then(returnedWeather => {
                    setWeather(returnedWeather)
                })
                
                console.log('props.filterCountries',props.filterCountries)
                */
                return (
                    <div key={index}>
                        <h1>{value.name.common}</h1>
                        <p><b>Capital </b>{value.capital}</p>
                        <p><b>Area </b>{value.area}</p>
                        <p><b>Idiomas: </b></p>
                        <ul>
                            {Object.entries(value.languages).map(([key, idioma]) => (
                                <li key={key}>{idioma}</li>
                            ))}
                        </ul>
                        <h2>Bandera</h2>
                        <img src={Object.values(value.flags)[0]} alt={Object.values(value.flags)[2]} />
                        <h2>Tiempo en {value.name.common}</h2>
                    </div>
                )
            })}
            {weather ? (
                <div>
                    <p><b>Temperatura: </b>{weatherServices.KelvinsToCelsius(weather.main.temp)}°C</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Icono del clima" />
                    <p><b>Viento: </b>{weather.wind.speed} K/H</p>
                </div>
            ) : (<p>Cargando datos del clima...</p>)}
        </>
    )
}

const Display = (props) => {
    if (props.find == "") {
        return <p>Escribe el nombre de un pais para empezar la busqueda</p>
    } else if (props.filterCountries.length == 1) {
        return <Country filterCountries={props.filterCountries} />
    } else {
        return (
            props.filterCountries.map((value, index) => {
                return (
                    <div key={index}>
                        <span>{value.name.common}</span>
                        <button value={value} onClick={() => props.setfilterCountries([value])}>Mostrar</button>
                    </div>
                )
            })
        )
    }
}
export default Display