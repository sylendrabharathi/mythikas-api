import { DataTypes } from 'sequelize';
import {sequelize} from './../db/Sequelize';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';
import Role from './RoleModel';

const StudentParent = sequelize.define('StudentParent', {
    // Model attributes are defined here
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        // field: 'firstName'
        
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        // field: 'lastName'
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        // field: 'gender'
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // field: 'phoneNumber'
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // field: 'emailId'
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        // field: 'dateOfBirth'
    },
    role: {
        type: DataTypes.ENUM('STUDENT', 'PARENT'),
        allowNull: false,
        // field: 'role'
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        // field: 'password'
    },
    otherFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
        // field: 'otherFirstName'
    },
    otherLastName: {
        type: DataTypes.STRING,
        allowNull: false,
        // field: 'otherLastName'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    ...timeStamp

}, {
    tableName: table.studentParent,
    underscored: true
    // Other model options go here
});


export default StudentParent;
