const { Account } = require('../models');

exports.getUserAccount = (req, res) => {

    const idUser = req.params.idUser;

    Account.findOne({ 
        where: { 
            user_id: idUser 
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    .then(account => {
        if(account){
            res.status(200).send(account)
        } else {
            res.status(400).json({"message": "Conta do usaurio não encontrada."});
        }
        
    }).catch(err => res.status(400).json({"message": "Erro ao encontrar conta.", "err": err}));
    
};
