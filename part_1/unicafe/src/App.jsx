import { useState } from 'react'

const App = () => {
  const Positivos = () => (
    setGood(good + 1)
  )

  const Neutral = () => (
    setNeutral(neutral + 1)
  )

  const Negativo = () => (
    setBad(bad + 1)
  )

  //* Guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Valoranos</h1>
      <Button metodo={Positivos} text="Positivos" />
      <Button metodo={Neutral} text="Neutral" />
      <Button metodo={Negativo} text="Negativo" />
      <Statistics pos={good} neu={neutral} neg={bad} />
    </div>
  )
}
//+ Button es el componente React y button es el boton HTML
const Button = (props) => {
  return (
    <button onClick={props.metodo} >{props.text}</button>
  )
}
const Statistics = (props) => {
  console.log('props', props)
  const reseñasTotales = (props.pos + props.neg + props.neu)
  console.log('reseñasTotales', reseñasTotales)
  if (reseñasTotales != 0) {
    return (
      <table>
        <Dato name="Positiva" value={props.pos} />
        <Dato name="Neutra" value={props.neu} />
        <Dato name="Negativa" value={props.neg} />
        <Dato name="Total" value={reseñasTotales} />
        <Dato name="Media" value= {`${(props.pos - props.neg) / reseñasTotales} %`} />
      </table>
    )
  } else {
    return <p>No hay datos todavía</p>
  }
}
const Dato = (props) => {
  console.log("props ", props)
  return (
    <tbody>
      <tr>
        <td>{props.name}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

export default App