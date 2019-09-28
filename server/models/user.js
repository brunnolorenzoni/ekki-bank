module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
    });
  
    User.associate = (models) => {
        User.hasOne(models.Account, {
            foreignKey: 'user_id',
            as: 'account',
        });
    }
  
    return User;
};