const Account = require('../models/accountModel');


exports.getUserAccounts = (req, res) => {

    const idUser = req.params.idUser;

    Account.findAll({ where: { id_user: idUser }})
    .then(accounts => {
        if(accounts){
            res.status(200).send(accounts)
        }
        else {
            res.status(200).json({"message": "Contas do usaurio " + idUser + " não encontrada"});
        }
        
    })
    .catch(err => res.status(400).json({"message": "Erro ao encontrar contas", "err": err}));
    
};

exports.getOneAccount = (req, res) => {
    const idUser = req.params.idUser;
    const idAccount = req.params.idAccount;
    
    Account.findOne({ where: { id_user: idUser, id_account: idAccount }})
    .then(account => {
        if(account){
            res.status(200).send(account);
        }
        else {
            res.status(200).json({"message": "Conta " + idAccount + " do usuario " + idUser + " não encontrada"});
        }
    })
    .catch(err => res.status(400).json({"message": "Erro ao encontrar conta", "err": err}));
};

