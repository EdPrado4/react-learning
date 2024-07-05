import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return(
    <button onClick={onClick} >
      {text}
    </button>
  )
}

const selectRandom = (min, max, current) => {
  const rand = Math.floor(Math.random() * (max - min)) + min
  if (current === rand)
    return selectRandom(min, max, rand)
  return rand
}

const TopAnecdote = ({ mostVoted, anecdote }) => {
  if (mostVoted === 0) return <p>No popular anecdotes yet</p>
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
    </>
  )

}

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

  const initialVotes = new Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes ]  = useState(initialVotes)

  const handleVote = (index) => {
        const updatedVotes = [...votes]
        updatedVotes[index] += 1
        setVotes(updatedVotes)
  }

  const popular = Math.max(...votes)
  const indexPopular = votes.indexOf(popular)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button text='vote' onClick={() => handleVote(selected)} />
      <Button text='next anecdote' onClick={() => setSelected(selectRandom(0, anecdotes.length, selected))} />
      <p>has {votes[selected]} votes</p>
      <TopAnecdote mostVoted={popular} anecdote={anecdotes[indexPopular]}/>
    </div>
  )
}

export default App