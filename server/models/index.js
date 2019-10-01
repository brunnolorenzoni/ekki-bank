const Sequelize = require('sequelize');
const env = require('../config/env');


const sequelize = new Sequelize(env.database, env.username, env.password, {
  dialect: env.dialect
});

const models = {
  User: sequelize.import('./User'),
  Account: sequelize.import('./Account'),
  Contact: sequelize.import('./Contact'),
  Transaction: sequelize.import('./Transaction')
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
