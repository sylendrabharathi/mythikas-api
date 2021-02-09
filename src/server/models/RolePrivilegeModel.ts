import { DataTypes } from 'sequelize';
import {sequelize} from './../db/Sequelize';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';
import Role from './RoleModel';
import Privilege from './PrivilegeModel';

const RolePrivilege = sequelize.define('RolePrivilege', {
    // Model attributes are defined here
    roleId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {key: 'id', model: Role}
    },
    privilegeId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {key: 'id', model: Privilege}
    },
    status: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false

    },
    ...timeStamp

}, {
    tableName: table.rolePrivilege,
    underscored: true
    // Other model options go here
});

export default RolePrivilege;
