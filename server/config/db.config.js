const env = require('./env.js');
const Sequelize = require('sequelize');

const db = new Sequelize(env.database, env.username, env.password, {

    host: env.host,
    dialect: env.dialect,
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

module.exports = db;