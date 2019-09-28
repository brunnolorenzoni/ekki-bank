const Sequelize = require('sequelize');
const env = require('../config/env');


const sequelize = new Sequelize(env.database, env.username, env.password);

const models = {}

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
