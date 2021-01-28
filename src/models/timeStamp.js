const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const timeStamp = {
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}

module.exports = timeStamp;