module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('account', {
        user_id: {
            type: DataTypes.INTEGER,
            unique: 'user_id'
        },
        balance_value: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: false,
            defaultValue: 1000.00,
        },
        limit_value: {
            type: DataTypes.DECIMAL(16,2),
            allowNull: false,
            defaultValue: 500.00,
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
  
    Account.associate = (models) => {
        Account.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE',
        });
    }
  
    return Account;
};