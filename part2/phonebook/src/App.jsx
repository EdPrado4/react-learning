import { useState, useEffect } from 'react'
import PersonServices from './backend/personHandler'

const Persons = ({ personsList, onDelete }) => {
  return(
    personsList.map(
      person =>
        <p key={person.id}>
          {person.name}
          {person.number}
          <Button text='delete' onClick={() => onDelete(person)} />
        </p>
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
    PersonServices
    .getAllPersons()
    .then( allPersons => setPersons(allPersons))
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
    const newPerson = {
        name: newName,
        number: newNumber,
        id: (persons.length +1).toString()
      }

    if ( newName === '' || newNumber === '') {
      alert('You must provide a non-empty name and number')
      return
    }
    const duplicateEntry = persons.find( person => person.name === newName )
    if (duplicateEntry){
      if (duplicateEntry.number !== newNumber) {
        if (window.confirm(`${newName} is already added to phonebook. Replace old number with new number?`)){
          const updatedPerson = {...duplicateEntry, number:newNumber}
          PersonServices
            .updateNumber(updatedPerson)
            .then( () => PersonHook() )

          }
        }
        else
          alert(`${newName} is already added to phonebook with the same number!`)
      }
    else
      PersonServices
        .addPerson(newPerson)
        .then( () => PersonHook() )
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = deletedPerson => {
    if (window.confirm(`The following action will delete ${deletedPerson.name},  continue?`)){
      PersonServices
        .deletePerson(deletedPerson.id)
        .then( () => PersonHook() )
      }
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
          {query ? <Persons personsList={filterPerson(query)} onDelete={deletePerson}/> : <Persons personsList={persons} onDelete={deletePerson}/>}
    </div>
  )
}

export default App