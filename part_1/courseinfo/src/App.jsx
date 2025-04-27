const App = () => {
  //+ Los {} definen objetos y los [] arrays 
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log("Header ", props)
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  console.log("Content ", props)
  return (
    <>
      <Part name={props.parts[0].name} ej={props.parts[0].exercises} />
      <Part name={props.parts[1].name} ej={props.parts[1].exercises} />
      <Part name={props.parts[2].name} ej={props.parts[2].exercises} />
    </>
  )
}

const Part = (props) => {
  console.log("Part ", props)
  return (
    <p>{props.name} {props.ej}</p>
  )
}


const Total = (props) => {
  console.log("Total ", props)
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

export default App