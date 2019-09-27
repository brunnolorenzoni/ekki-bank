const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db.config');

const User = db.define('user', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    cpf: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updateAt: {
        type: DataTypes.DATE
    },
},{
    timestamps: false
})

module.exports = User;