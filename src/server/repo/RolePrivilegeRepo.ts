import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import RolePrivilege from '../models/RolePrivilegeModel';
class RolePrivilegeRepo {

    async getRolePrivileges() {
        const records = sequelize.query(`select * from ${table.rolePrivilege}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: RolePrivilege.build()
        });

        return records;
    }

    async getRolePrivilegeById(id) {
        const records = sequelize.query(`select * from ${table.rolePrivilege} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: RolePrivilege.build()
        });

        return records;
    }

    async getActiveRolePrivileges() {
        const records = sequelize.query(`select * from ${table.rolePrivilege} where status = true`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: RolePrivilege.build()
        });

        return records;
    }

    async getInActiveRolePrivileges() {
        const records = sequelize.query(`select * from ${table.rolePrivilege} where status = false`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: RolePrivilege.build()
        });

        return records;
    }
}

const rolePrivilegeRepo = new RolePrivilegeRepo();

export default rolePrivilegeRepo;