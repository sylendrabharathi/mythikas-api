import { DataTypes } from 'sequelize';
import {sequelize} from './../db/Sequelize';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';
import Role from './RoleModel';
import Standard from './StandardModel';
import Subject from './SubjectModel';

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
        allowNull: false  
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false,
        // field: 'gender'
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'student_parent_unique'
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { isEmail: true}
        // field: 'emailId'
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        // field: 'dateOfBirth'
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        // field: 'password'
    },
    parentFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
        // field: 'otherFirstName'
    },
    parentLastName: {
        type: DataTypes.STRING,
        allowNull: false,
        // field: 'otherLastName'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    standardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {key: 'id', model: Standard}
    },
    promoCode: {
        type: DataTypes.STRING,
        allowNull: true,
        // field: 'otherLastName'
    },
    syllabus: {
        type: DataTypes.STRING,
        allowNull: false,
        // field: 'otherLastName'
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ...timeStamp

}, {
    tableName: table.studentParent,
    underscored: true
    // Other model options go here
});


export default StudentParent;
