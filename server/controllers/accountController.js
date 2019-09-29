const models = require('../models');


exports.getUserAccount = (req, res) => {

    const idUser = req.params.idUser;

    models.Account.findOne({ 
        where: { 
            user_id: idUser 
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    .then(accounts => {
        if(accounts){
            res.status(200).send(accounts)
        }
        else {
            res.status(400).json({"message": "Contas do usaurio " + idUser + " não encontrada"});
        }
        
    }).catch(err => res.status(400).json({"message": "Erro ao encontrar contas", "err": err}));
    
};
