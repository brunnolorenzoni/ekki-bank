const models = require('../models');
const { Op } = require('sequelize');


exports.transferToContact = async (req, res) => {

}

const startTransaction = async(fromUser, toUser, amount, release_limit) => {

    return await models.sequelize.transaction( async t => {
        
        const t1 = await fromUser.account.update({
            balance_value: (parseFloat(fromUser.account.balance_value) - parseFloat(amount))
        }, {transaction: t});

        const t2 = await toUser.account.update({
            balance_value: (parseFloat(toUser.account.balance_value) + parseFloat(amount))
        }, {transaction: t});

        if(release_limit){

            const limitUsed = Math.abs(fromUser.account.balance_value);

            const t3 = await fromUser.account.update({
                balance_value: 0
            }, {transaction: t});

            const t4 = await fromUser.account.update({
                limit_value: fromUser.account.limit_value - limitUsed
            }, {transaction: t});
            
        }

        const t5 = await models.Transaction.create({
            amount: amount,
            status: 1,
            from_user_id: fromUser.id,
            to_user_id: toUser.id
        }, {transaction: t});

    })
    .then(result => {
        return true;
    }).catch(err => {
        return false
    });

}

const cancelLastTransaction = async(lastTransaction) => {

    
    return await models.sequelize.transaction( async t => {
        const t1 = await lastTransaction.update({
            status: 0
        }, {transaction: t});

        const t2 = await models.Transaction.create({
            amount: lastTransaction.amount,
            status: 1,
            from_user_id: lastTransaction.from_user_id,
            to_user_id: lastTransaction.to_user_id
        }, {transaction: t});
    })
    .then(result => {
        return true;
    }).catch(err => {
        return false
    });

}

exports.transferToFavored = async (req, res) => {

    //to_user: CPF
    //from_user: ID
    const { to_user, fom_user, amount, release_limit } = req.body;

    if(parseFloat(amount) <= 0){
        return res.status(400).json({"message": "Valor invalido"});
    }
    
    const UserTo = await models.User.findOne({ 
        where: { cpf: to_user },
        include: ['account']
    });
    if(!UserTo){
        return res.status(400).json({"message": "user TO not exist"});
    }

    const UserFrom = await models.User.findOne({ 
        where: { id: fom_user },
        include: ['account']
    });
    if(!UserFrom){
        return res.status(400).json({"message": "user FROM not exist"});
    }

    if(parseFloat(amount) > parseFloat(UserFrom.account.balance_value)){
        const balanceWithLimit = parseFloat(UserFrom.account.limit_value) + parseFloat(UserFrom.account.balance_value);
        const hasLimit = balanceWithLimit - parseFloat(amount);
        if(hasLimit < 0){
            return res.status(400).json({"message": "Você não tem saldo e nem limite suficiente para realizar a operação"});
        } else {
            if(!release_limit){
                return res.status(400).json({"message": "Você deseja usar o limite?"});
            }
        }
    }

    const lastTransaction = await models.Transaction.findOne({ 
        where: {
            to_user_id: UserTo.id,
            from_user_id: UserFrom.id,
            amount: amount,
        }, 
        limit: 1, 
        order: [['createdAt', 'DESC']] 
    });


    if(lastTransaction){
        const hasBeen2Minutes = ((new Date().getTime() - lastTransaction.createdAt.getTime()) > 120000);
        if(!hasBeen2Minutes){
            console.log("CANCELA A ULTIMA")
            if(await cancelLastTransaction(lastTransaction)){
                return res.status(200).json({"message": "Trnasferencia realziada com sucesso"});
            } else {
                return res.status(400).json({"message": "Erro na trnasferencia"});
            }
        }
    }
    

    
    if(await startTransaction(UserFrom, UserTo, amount, release_limit)){
        return res.status(200).json({"message": "Trnasferencia realziada com sucesso"});
    } else {
        return res.status(400).json({"message": "Erro na trnasferencia"});
    }
    
};

exports.getAllTransactions = (req, res) => {

    const idUser = req.params.idUser;

    models.Transaction.findAll({
        where: {
          [Op.or]: [
            { from_user_id: idUser },
            { to_user_id: idUser }]
          ,
        },
        order: [['createdAt', 'DESC']],
        include: ['from', 'to',],
    }).then(transactions => {
        if(transactions.length){
            res.status(200).send(transactions)
        } else {
            res.status(400).json({"message": "Nenhuma transferencia encontrada"});
        }
    }).catch(err => res.status(400).json({"message": "Erro ao encontrar Transferencia", "err": err}));
};

exports.getOneTransaction = (req, res) => {

    const idUser = req.params.idUser;
    const idTransaction = req.params.idTransaction;

    if(!idUser && !idTransaction){
        return res.status(400).json({"message": "no params specified"});
    }

    models.Transaction.findByPk(idTransaction, {
        include: ['from', 'to',],
    })
    .then(transaction => {
        if(transaction){
            res.status(200).send(transaction)
        } else {
            res.status(400).json({"message": "Transferencia não encontrada"});
        }
    }).catch(err => res.status(400).json({"message": "Erro ao encontrar Transferencia", "err": err}));
};