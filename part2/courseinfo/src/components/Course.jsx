const Header = ({ title }) => {
    return (
        <>
        <h2>{title}</h2>
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

const Content = ({ parts }) => {
    return(
      <>
        {
          parts.map( part =>
          <Part key={part.id} parts={part}/> )
        }
      </>
    )
  }

const Total = ({ parts }) => {
    return (
      <>
        <p><b>Total of { parts.reduce(
          (sum, part) => sum + part.exercises, 0 )} exercises
          </b></p>
      </>
    )
  }

const Course = ({ course }) => {
    return (
      <div>
        <Header title={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
}

export default Course

