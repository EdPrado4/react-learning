import { useState } from 'react'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>

)

function getAvg (good, neutral, bad) {
  return ((good-bad)/(good+bad+neutral))
}


function getPosPercent (good, total) {
  return (good/total)*100 + '%'

}

const StatisticLine = ({ text, value }) => {
  return(
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
  }

const Statistics = ({ good, neutral, bad }) => {
  if ( good+neutral+bad === 0 ) return <p>No feedbacks given</p>
  return(
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
        <StatisticLine text='Good' value={good}/>
        <StatisticLine text='Neutral' value={neutral}/>
        <StatisticLine text='Bad' value={bad}/>
        <StatisticLine text='All' value={good+bad+neutral}/>
        <StatisticLine text='Average' value={getAvg(good, neutral, bad)}/>
        <StatisticLine text='Positive' value={getPosPercent(good, good+bad+neutral)}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text={'Good'} onClick={() => setGood(good + 1)}/>
      <Button text={'Neutral'} onClick={() => setNeutral(neutral + 1)}/>
      <Button text={'Bad'} onClick={() => setBad(bad +1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App