const models = require('../models');

exports.getUserContacts = async (req, res) => {

    const idUser = req.params.idUser;

    if(!idUser){
        return res.status(400).json({"message": "no params specified"});
    }

    models.Contact.findAll({
        where: {
            user_id: idUser
        },
        attributes: {
            exclude: ['createdAt']
        }, 
        include: [
            { 
                model: models.User, 
                as: "user_contact",
                attributes: { exclude: ["createdAt", "updatedAt", "phone"] }
            }
        ]
    })
    .then(contacts => {
        if(contacts.length){
            res.status(200).send(contacts)
        } else {
            res.status(200).json({"message": "Nenhum contato encontrado"});
        }
    }).catch(err => res.status(400).json({"message": "Erro ao encontrar contatos", "err": err}));

};

exports.getOneContact = (req, res) => {

    const idUser = req.params.idUser;
    const idContact = req.params.idContact;

    if(!idUser && !idContact){
        return res.status(400).json({"message": "no params specified"});
    }

    models.Contact.findOne({
        where: {
            user_id: idUser,
            contact_id: idContact
        },
        attributes: {
            exclude: ['createdAt']
        }, 
        include: [
            { 
                model: models.User, 
                as: "user_contact",
                where: {
                    id: idContact
                },
                attributes: { exclude: ["createdAt", "updatedAt", "phone"] }
            }
        ]
    })
    .then(contact => {
        if(contact){
            res.status(200).send(contact)
        } else {
            res.status(200).json({"message": "contato não encontrado"});
        }
    }).catch(err => res.status(400).json({"message": "Erro ao encontrar contatos", "err": err}));
};

const existThisUserInContactsList = async (idUser, cpf) => {  

    return await models.Contact.findOne({ 
        where: { 
            user_id: idUser 
        },
        attributes: {
            exclude: ['createdAt']
        }, 
        include: [
            { 
                model: models.User, 
                as: "user_contact",
                where: { cpf },
                attributes: { exclude: ["createdAt", "updatedAt", "phone"] }
            }
        ]
    });

}

const existThisUserInDatabase = async (cpf) => {

    return await models.User.findOne({ 
        where: { cpf }
    });

}

const isNotYou = async (idUser, cpf) => {

    return await models.User.findOne({ 
        where: { id: idUser }
    }).then(user => {
        if(user.cpf === cpf){
            return true;
        } else {
            return false;
        }
    });

}


exports.addContact = async (req, res) => {

    const idUser = req.params.idUser;

    if(!idUser && req.body.cpf){
        return res.status(400).json({"message": "no params specified"});
    }

    const existUserToAdd = await existThisUserInDatabase(req.body.cpf)
    if(!existUserToAdd){
        res.status(400).json({"message": "user not exist"});
    }

    if(await existThisUserInContactsList(idUser, req.body.cpf)){
        res.status(400).json({"message": "user already exist in you contact list"});
    }

    if(await isNotYou(idUser, req.body.cpf)){
        res.status(400).json({"message": "Você não pode se adicionar"});
    }
    
    models.Contact.create({
        contact_id: existUserToAdd.id,
        user_id: idUser
    }).then(contact => {
        res.status(200).json({"message": "contato cadastrado com sucesso"});
    }).catch(err => res.status(400).json({"message": "Erro ao cadastrar contato", "err": err}));
    
};

exports.deleteContact = (req, res) => {

    const idUser = req.params.idUser;
    const idContact = req.params.idContact;

    if(!idUser && !idContact){
        return res.status(400).json({"message": "no params specified"});
    }

    models.Contact.findOne({
        where: {
            id: idContact,
            user_id: idUser
        }
    }).then(contact => {
        if(contact){
            contact.destroy({ force: true }).then(() => {
                res.status(200).json({"message": "contato deletado com sucesso"});   
            });
        } else {
            res.status(400).json({"message": "contato não encontrado"});   
        }
    }).catch(err => res.status(400).json({"message": "Erro ao deletar contato", "err": err}));


};