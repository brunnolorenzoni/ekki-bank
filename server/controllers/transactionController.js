const { Transaction, User, sequelize } = require('../models');
const { Op } = require('sequelize');


exports.transferToContact = async (req, res) => {

}

const registerTransition = async(newTransition) => {
    return await Transaction.create(newTransition);
}

const prepareTransactionFrom = async(account, amount, user_release_limit) => {

    let newBalance = parseFloat(account.balance) - parseFloat(amount);
    return { balance: newBalance };

}
const prepareTransactionTo = async(account, amount) => {

    let newBalance = parseFloat(account.balance) + parseFloat(amount);
    return { balance: newBalance };

}

const startTransaction = async(fromAccount, toAccount, amount, user_release_limit) => {

    const newFromAccountData = await prepareTransactionFrom(fromAccount, amount, user_release_limit);
    const newToAccountData = await prepareTransactionTo(toAccount, amount);

    return await sequelize.transaction( async t => {
        const t1 = await fromAccount.update(newFromAccountData, {transaction: t});
        const t2 = await toAccount.update(newToAccountData, {transaction: t});
        const t3 = await registerTransition({amount: amount, status: 1, from_user_id: fromAccount.id, to_user_id: toAccount.id}).then(() => {}, {transaction: t})
    })
    .then(result => true)
    .catch(err => false);

}

const lastTransactionRule = async(lastTransaction) => {

    return await sequelize.transaction( async t => {
        const t1 = await lastTransaction.update({ status: 0 }, {transaction: t});
        const t2 = await registerTransition({
            amount: lastTransaction.amount, 
            status: 1, from_user_id: 
            lastTransaction.from_user_id, 
            to_user_id: lastTransaction.to_user_id
        }).then(() => {}, {transaction: t})
    })
    .then(result => true)
    .catch(err => false);

}

const hasBeen2Minutes = (dateLastTransaction) => {
    const twoMinutes = 120000;
    return ((new Date().getTime() - dateLastTransaction.getTime()) > twoMinutes);
}

const testAccountHasBalanceLimit = (account, amount) => {

    const balanceWithLimit = parseFloat(account.limit) + parseFloat(account.balance);
    const hasLimit = balanceWithLimit - parseFloat(amount);

    if(hasLimit < 0){
        return false;
    }
    
    return true;

}

const testAccountHasBalance = (account, amount) => {
    if(parseFloat(amount) > parseFloat(account.balance)){
        return false
    }
    return true;
}

exports.transferToFavored = async (req, res) => {

    const { to_user, fom_user, amount, user_release_limit } = req.body;

    //Primeiro olhamos se tem valor
    if(amount && parseFloat(amount) <= 0){
        return res.status(400).json({"message": "Valor inválido. Ele deve ser maior que zero."});
    }
    
    //Procuramos quem está enviando
    const UserFrom = await User.findOne({ 
        where: { id: fom_user },
        include: ['account']
    }).then(user => {
        if(user){ return user }
        res.status(400).json({"message": "Usuario de origem não encontrado"});
    }).catch(err => { res.status(400).json({"message": "Erro ao procurar usario de origem"}); });


    //testamos caso o usuario nao tenha saldo suficiente
    if(await !testAccountHasBalance(UserFrom.account, amount)){
        //testamos se o usuario o tem limite
        if(await !testAccountHasBalanceLimit(UserFrom.account, amount)){
            //caso não tenha limite ele não pode transferir
            return res.status(400).json({"message": "Você não tem saldo e nem limite suficiente para realizar a operação."});
        } else {
            //caso tenha limite... mandada a pergunta
            //user_release_limit vem na requisicao quando o usuario aceita usar o limite
            if(!user_release_limit){
                return res.status(400).json({
                    "message": "Você deseja usar o seu limite?", 
                    "type": "dialog", 
                    "options": [
                        {"label": "Sim", "value": true}, 
                        {"label": "Não", "value": false}
                    ],
                    "key_response": "user_release_limit"
                });
            }
        }
    }

    //Procuramos para quem vamos mandar
    const UserTo = await User.findOne({ 
        where: { cpf: to_user },
        include: ['account']
    })
    .then(user => {
        if(user){ return user; }
        res.status(400).json({"message": "Usuario de origem não encontrado"});
    })
    .catch(err => { res.status(400).json({"message": "Usuario de destino não encontrado"})});;


    //Aqui procuramos alguma transferencia, com os mesmos dados da atual,
    //ordenada pela data de criacao....
    const lastTransaction = await Transaction.findOne({ 
        where: {
            to_user_id: UserTo.id,
            from_user_id: UserFrom.id,
            amount: amount,
        }, 
        limit: 1, 
        order: [['createdAt', 'DESC']] 
    });

    // ... se existir, entaramos aqui ....
    if(lastTransaction){
        // e testamos a regra dos 2 minutos...
        if(await !hasBeen2Minutes(lastTransaction.createdAt)){
            //se entrar aqui, então vamos ter que inicar a operacao da regra
            //cancelar a ultima e deixar só a atual
            if(await lastTransactionRule(lastTransaction)){
                return res.status(200).json({"message": "Transferência realziada com sucesso"});
            } else {
                return res.status(400).json({"message": "Erro na transferência"});
            }
        }
    }
    
    //caso nao tenha entrado na regra dos dois minutos
    //iniciamos uma transaction para transferir o dinheiro
    if(await startTransaction(UserFrom.account, UserTo.account, amount, user_release_limit)){
        return res.status(200).json({"message": "Transferência realziada com sucesso"});
    } else {
        return res.status(400).json({"message": "Erro na trnasferencia"});
    }
};

const groupByDate = (transactions) => {

    let datesObject = {};

    for ( let i in transactions){
        let date = new Date(transactions[i].createdAt);
        let dateKey = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(); 

        if(!datesObject[dateKey]){
            datesObject[dateKey] = {}
        }
        datesObject[dateKey].date = date;

        if(!datesObject[dateKey].registers) {
            datesObject[dateKey].registers = [];
        }

        datesObject[dateKey].registers.push(transactions[i])

    }

    return datesObject;
}

exports.getAllTransactions = (req, res) => {

    const idUser = req.params.idUser;
    const orderBy = req.params.orderBy;

    Transaction.findAll({
        where: {
            [Op.or]: [
                { from_user_id: idUser },
                { to_user_id: idUser }
            ]
        },
        order: [['createdAt', 'DESC']],
        include: ['from', 'to',],
    }).then(transactions => {
        if(transactions.length){
            res.status(200).send(groupByDate(transactions))
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

    Transaction.findByPk(idTransaction, {
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