const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Part = (props) => {
  const name = props.parts.name
  const exercises = props.parts.exercises
  return (
    <>
    <p>{name} {exercises}</p>
    </>
  )

}

const Content = (props) => {
  return(
    <>
      <Part parts={props.parts[0]}/>
      <Part parts={props.parts[1]}/>
      <Part parts={props.parts[2]}/>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
  title: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of react',
      exercises: 10
    },
    {
      name :'Using props to pass data',
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
      <Header course={course.title}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App