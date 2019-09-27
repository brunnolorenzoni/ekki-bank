const db = require('../config/db.config.js');
const User = require('../models/userModel');

exports.getUser = (req, res) => {

    const idUser = req.params.id;

    User.findByPk(idUser)
    .then(user => {
        if(user){
            res.status(200).send(user)
        } else {
            res.status(200).json({"message": "Conta não encontrada"});
        }
    })
    .catch(err => res.status(400).json({"message": "Erro ao encontrar usuario", "err": err})
    );

};

exports.findUserByCPF = (req, res) => {
    res.status(200).json({"message": "Return User By CPF"});
};