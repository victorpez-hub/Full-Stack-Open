import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  function getRandomInt() {
    let numero
    //* El 8 no esta incluido
    numero = Math.floor(Math.random() * 8);
    setSelected(numero)
    return numero
  }

  //! Acordarse de que el nombre metodo y props.metodo tiene que ser el mismo
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Button metodo={getRandomInt} />
      <Votacion posicion={selected} anecdotas={anecdotes} />
    </div>
  )
}
const Button = (props) => {
  return (
    <button onClick={props.metodo}>Ver reseña</button>
  )
}

const Votacion = (props) => {

  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  //* Segun el ejemplo en la web con el array copia no se podia porque al renderizar de nuevo el componente se perdia la informacion, no se si el array se referia a que habia que guardarlo en el componente App, pero el enunciado decia que en el componente. Como hemos visto en otras lecciones el useState, y que es lo mas recomendado para guardar estados, he decidido implementarlo

  function Votar() {
    setVotes(preVotes => ({
      //* Recuperamos el objeto en el ultimo estado que tenia
      ...preVotes,
      //* En la posicion concreta cuando hemos votado le sumamos 1
      [props.posicion]: preVotes[props.posicion] + 1
    }))
    //* React se actualiza de forma asincrona, es decir, que no lo hace justo inmediatamente despues, de las formas que hemos vista si queremos que sea justo intantaneamente despues debemos tener una copia del objeto que estamos usando y modificarlo en el momento por nuestra cuenta. Para este caso no es necesario 
    //// copy[props.posicion] += 1
    // console.log(`Posicion ${props.posicion} ; votes`, copy)
  }

  //* La diferencia entre un componente y esto (funcion) es que el componente devuelve HTML
  //* Esto en concreto es una variable que dentro tiene una funcion anonima
  const Popular = (ranking) => {
    
    let posicionMayor,valorMayor = 0
    Object.keys(ranking).forEach(key => {
      if(ranking[key] > valorMayor){
        valorMayor = votes[key]
        posicionMayor = key
        //console.log("Clave", key,"Valor", votes[key])
      }
    });
    return (
      posicionMayor
    )
  }

  return (
    <>
      <button onClick={Votar}>Votar</button>
      <p>Esta reseña tiene {votes[props.posicion]} votos </p>
      <h1>Anecdota con mayor votación</h1>
      <p>Anecdota con mayor votación = {props.anecdotas[Popular(votes)]}</p>
    </>
  )
}

export default App