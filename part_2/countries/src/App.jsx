import { useState, useEffect } from 'react'
import countrieServices from './services/countries'
import Display from './components/Display.jsx'

function App() {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])
  const [find, setFind] = useState('')

  

  const handleBuscadorChange = (event) => {
    const nameToFind = event.target.value.toLowerCase()
    setFind(event.target.value)
    //console.log(nameToFind)
    setFilterCountries(countries.filter(country => {
      let encontrado = []
      if (country.name.common.toLowerCase().includes(nameToFind)) {
        encontrado = country
        //console.log(encontrado)
        return country
      }
    }))
  }


  const hook = () => {
    countrieServices.getAll().then(returnedCuntries =>
      setCountries(returnedCuntries)
    )
  }

  useEffect(hook, [])

  return (
    <>
      <div>Buscador de países
        <input onChange={handleBuscadorChange} />
      </div>
      <Display find = {find} filterCountries = {filterCountries} setfilterCountries = {setFilterCountries} />
    </>
  )
}
//<input value={newName} onChange={handleNoteChange} />
export default App
