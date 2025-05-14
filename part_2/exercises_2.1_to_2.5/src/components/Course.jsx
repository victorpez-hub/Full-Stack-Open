const Course = (props) => {
    return (
        <>
            {props.courses.map((course) => {

                const total = course.parts.reduce((sum, part) => {
                    //console.log('Acumulador', sum, "siguiente objeto", part)
                    return sum + part.exercises
                }, 0)
                //console.log('total', total)


                return (
                    <>
                        <h1>{course.name}</h1>
                        {course.parts.map((part) => {
                            return (
                                <>
                                    <p key={part.id}>{part.name} {part.exercises}</p>
                                </>
                            )
                        })}
                        <p>
                            <b>Numero total de ejercicios = {total} </b>
                        </p>
                    </>
                )
            })}
        </>
    )
}
export default Course