const { Sequelize, DataTypes } = require('sequelize');
const config = require('./../config/config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
const timeStamp = require('./timeStamp');
const table = require('../db/table');

const Subject = sequelize.define('Subject', {
    // Model attributes are defined here
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    ...timeStamp

}, {
    tableName: table.subject
    // Other model options go here
});

module.exports = Subject;
