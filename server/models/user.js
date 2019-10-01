module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            get() {
                return this.getDataValue('cpf').substring(0, 3) + this.getDataValue('cpf').substring(3, this.getDataValue('cpf').length).replace(/[0-9]/g, "X")
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("NOW()"),
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updated_at'
        }
    }, {
        timestamps: true,
    });
  
    User.associate = (models) => {
        User.hasOne(models.Account, {
            foreignKey: 'user_id',
            as: 'account',
        });
    }
  
    return User;
};