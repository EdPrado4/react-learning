import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({ personsList }) => {
  return(
    personsList.map(
      person => <p key={person.id}> {person.name} {person.number}</p>
    )
  )
}

const Filter = ({ text, onChange }) => <p>{text} <input onChange={onChange} /> </p>

const PersonForm = ({ text, value, onChange }) => {
  return (
    <p>
      {text}
      <input value={value}
             onChange={onChange} />
    </p>)
}

const Button = ({ text, onClick} ) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const PersonHook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then( response => {
        setPersons(response.data)
      } )
  }

  useEffect(PersonHook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleQuery = (event) => {
    setQuery(event.target.value)
  }

  const filterPerson = (query) =>{
    const filtered = persons.filter( ({ name }) => name.startsWith(query) )
    return [].concat(filtered)
}

  const addPerson = (event) => {
    event.preventDefault()
    const updatedPersons = [
      ...persons,
      {
        name: newName,
        number: newNumber,
        id: persons.length +1
      }
    ]
    if ( newName === '' || newNumber === '') {
      alert('You must provide a non-empty name and number')
      return
    }
    if (persons.find( person => person.name === newName ))
      alert(`${newName} is already added to phonebook`)
    else
       setPersons(updatedPersons)

    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Filter text='filter shown with' onChange={handleQuery}/>
        <PersonForm text='Name:' value={newName} onChange={handleNameChange} />
        <PersonForm text='Number:' value={newNumber} onChange={handleNumberChange} />
        <h3>Add a new Person</h3>
        <Button text='Add' onClick={addPerson} />
      </form>
      <h3>Numbers</h3>
          {query ? <Persons personsList={filterPerson(query)}/> : <Persons personsList={persons}/>}
    </div>
  )
}

export default App