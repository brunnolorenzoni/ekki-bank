module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('contact', {
        contact_id: {
            type: DataTypes.INTEGER ,
            allowNull: false,
        },
    });
  
    Contact.associate = (models) => {
        Contact.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user_owner',
        });

        Contact.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user_contact',
        });
    }
  
    return Contact;
};