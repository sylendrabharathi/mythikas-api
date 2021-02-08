import { Sequelize, DataTypes, NOW } from 'sequelize';

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
        defaultValue: NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW
    }
}

export default timeStamp;