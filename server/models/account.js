module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('account', {
        balance_value: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: false,
            defaultValue: 1000,
        },
        limit_value: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: false,
            defaultValue: 500,
        },
    });
  
    Account.associate = (models) => {
        Account.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
    }
  
    return Account;
};