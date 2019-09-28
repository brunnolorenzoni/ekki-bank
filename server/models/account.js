const { Sequelize, DataTypes } = require('sequelize');

const Account = db.define('user_accounts', {
    id_account: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_user: {
        type: DataTypes.INTEGER,
    },
    balance_value: {
        type: DataTypes.DECIMAL(16,2)
    },
    limit_value: {
        type: DataTypes.DECIMAL(16,2)
    },
},{
    timestamps: false
})

module.exports = Account;