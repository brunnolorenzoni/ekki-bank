module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('contact', {
        contact_id: {
            type: DataTypes.INTEGER ,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()'),
        },
    },{
        timestamps: false,
    });
  
    Contact.associate = (models) => {
        Contact.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user_owner',
            onDelete: 'CASCADE',
        });
        
        Contact.belongsTo(models.User, {
            foreignKey: 'contact_id',
            as: 'user_contact',
            onDelete: 'CASCADE',
        }); 
    }
  
    return Contact;
};