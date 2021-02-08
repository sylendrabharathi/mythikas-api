import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/AppConfig';
import db from '../db/DbConfig';
import {sequelize} from './Models';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';

const Subject = sequelize.define('Subject', {
    // Model attributes are defined here
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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

export default Subject;
