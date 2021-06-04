import { DataTypes, ModelCtor, NOW } from 'sequelize';
import {sequelize} from './../db/Sequelize';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';
import Role from './RoleModel';

const UserTeacher: ModelCtor<any> = sequelize.define('UserTeacher', {
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
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {key: 'id', model: Role}
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ...timeStamp

}, {
    tableName: table.userTeacher,
    underscored: true
    // Other model options go here
});

UserTeacher.belongsTo(Role, {as: 'role', foreignKey: 'role_id'});

UserTeacher.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

export default UserTeacher;
