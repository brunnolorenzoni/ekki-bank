module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('transaction', {
        amount: DataTypes.DECIMAL(16, 2),
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
        timestamp: true
    });
  
    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, {
            foreignKey: 'from_user_id',
            as: 'from',
        });
    
        Transaction.belongsTo(models.User, {
            foreignKey: 'to_user_id',
            as: 'to',
        });
    };
  
    return Transaction;
};