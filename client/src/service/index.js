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

    var request = await axios.get('http://localhost:3001/api/user/' + idUser + '/accounts')
    .then(function (response) {
        return response.data[0];
    })
    .catch(function (error) {
        return error.response;
    })

    return request;
}
