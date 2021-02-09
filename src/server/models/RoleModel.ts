import { DataTypes } from 'sequelize';
import {sequelize} from './../db/Sequelize';

import table from '../db/Table';
import timeStamp from './TimeStamp';

const Role = sequelize.define('Role', {
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
    }
}, {
    tableName: table.role
    // Other model options go here
});

export default Role;
