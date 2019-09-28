const models = require('../models');

exports.getUserContacts = async (req, res) => {
    res.status(200).json({"message": "Return User Contatos"});
};

exports.getOneContact = (req, res) => {
    res.status(200).json({"message": "Get specific user contact"});
};

exports.addContact = (req, res) => {
    res.status(200).json({"message": "add contact"});
};

exports.deleteContact = (req, res) => {
    res.status(200).json({"message": "delete contact"});
};