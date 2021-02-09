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
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'gender'
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'phone_number'
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email_id'
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'date_of_birth'
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'role'
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'password'
    },
    otherFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'other_first_name'
    },
    otherLastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'other_last_name'
    },
       
    ...timeStamp

}, {
    tableName: table.studentParent
    // Other model options go here
});


export default StudentParent;
