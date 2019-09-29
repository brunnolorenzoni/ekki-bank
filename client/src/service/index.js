import axios from 'axios';

export const getUser = async (idUser) => {

    return await axios.get('http://localhost:3001/api/user/' + idUser)
    .then(response => response.data)
    .catch(error => error.response)
}

export const getAccount = async (idUser) => {

    return await axios.get('http://localhost:3001/api/user/' + idUser + '/account')
    .then(response => response.data)
    .catch(error => error.response)
}

export const getTransactions = async (idUser) => {

    return await axios.get('http://localhost:3001/api/user/' + idUser + '/transactions/')
    .then(response => response.data)
    .catch(error => error.response)
}

export const getContacts = async (idUser) => {

    return await axios.get('http://localhost:3001/api/user/' + idUser + '/contacts/')
    .then(response => response.data)
    .catch(error => error.response)
}

export const setTransaction = async (data) => {

    return await axios.post('http://localhost:3001/transaction/', data)
    .then(response => response.data)
    .catch(error => error.response)
}


