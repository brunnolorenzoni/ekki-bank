const models = require('../models');

exports.getUser = (req, res) => {

    const idUser = req.params.id;

    if(!idUser){
        return res.status(400).json({"message": "no params specified"});
    }

    models.User.findByPk(idUser, {
        attributes: {
            exclude: ['phone', 'createdAt', 'updatedAt']
        }
    })
    .then(user => {
        if(user){
            res.status(200).send(user)
        } else {
            res.status(400).json({"message": "Conta não encontrada"});
        }
    }).catch(err => res.status(400).json({"message": "Erro ao encontrar usuario", "err": err}));

};

exports.findUserByCPF = (req, res) => {
    const cpf = req.body.cpf;

    if(!cpf){
        return res.status(400).json({"message": "no body cpf specified"});
    }

    models.User.findOne({
        where: { 
            cpf: cpf
        },
        attributes: {
            exclude: ['phone', 'createdAt', 'updatedAt']
        }
    }).then(user => {
        if(user){
            res.status(200).send(user)
        } else {
            res.status(400).json({"message": "Não encontrado"});
        }
    }).catch(err => res.status(400).json({"message": "Erro ao encontrar usuario", "err": err}));

    
};