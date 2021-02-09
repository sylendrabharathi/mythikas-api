import { DataTypes } from 'sequelize';
import {sequelize} from './../db/Sequelize';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';
import Role from './RoleModel';

const UserTeacher = sequelize.define('UserTeacher', {
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
    
    
    ...timeStamp

}, {
    tableName: table.userTeacher
    // Other model options go here
});

UserTeacher.hasOne(Role, {foreignKey: 'role'});

export default UserTeacher;
