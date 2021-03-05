import { DataTypes } from 'sequelize';
import {sequelize} from './../db/Sequelize';

import table from '../db/Table';
import timeStamp from './TimeStamp';

const Privilege = sequelize.define('Privilege', {
    // Model attributes are defined here
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    group: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: table.privilege,
    underscored: true
    // Other model options go here
});

export default Privilege;
