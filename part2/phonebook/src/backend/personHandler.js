import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = person2add => {
    const request = axios.post(baseUrl, person2add)
    return request.then(response => response.data)
}
const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then( response => response.data)
}

const updateNumber = person2update => {
    const request = axios.put(`${baseUrl}/${person2update.id}`, person2update)
    return request.then( response => response.data )
}

export default { getAllPersons, addPerson, deletePerson, updateNumber}