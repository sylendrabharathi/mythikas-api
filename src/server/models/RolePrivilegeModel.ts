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
        field: 'role_id',
        references: {key: 'id', model: Role}
    },
    privilegeId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'privilege_id',
        references: {key: 'id', model: Privilege}
    },
    status: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BOOLEAN,
        field: 'status',
        defaultValue: false

    },
    ...timeStamp

}, {
    tableName: table.rolePrivilege
    // Other model options go here
});

RolePrivilege.belongsTo(Role);
RolePrivilege.belongsTo(Privilege);

export default RolePrivilege;
