import axios from 'axios';

export const getUser = async (idUser) => {

    var request = await axios.get('http://localhost:3001/api/user/' + idUser)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error.response;
    })

    return request;
}

export const getAccount = async (idUser) => {

    var request = await axios.get('http://localhost:3001/api/user/' + idUser + '/account')
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error.response;
    })

    return request;
}


export const getTransactions = async (idUser) => {

    var request = await axios.get('http://localhost:3001/api/user/' + idUser + '/transactions/')
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error.response;
    })

    return request;
}

export const getContacts = async (idUser) => {

    var request = await axios.get('http://localhost:3001/api/user/' + idUser + '/contacts/')
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error.response;
    })

    return request;
}


