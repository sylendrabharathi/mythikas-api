import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import RolePrivilege from '../models/RolePrivilegeModel';
import Role from '../models/RoleModel';
import Privilege from '../models/PrivilegeModel';
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

    async getRolePrivilegeByRoleId(roleId) {
        const records = RolePrivilege.findAll({
            where: {
                roleId
            },
            include: [
                {
                    model: Role,
                    as: 'role'
                },
                {
                    model: Privilege,
                    as: 'privilege'
                }
            ]
        });
        return records;
    }

    async getDistinctPrivileges(roleId) {
        const records = sequelize.query(`select array_agg(distinct p.code) as privileges from ${table.rolePrivilege} rp 
        inner join privilege p on p.id = rp.privilege_id 
        where rp.role_id = :roleId and rp.status = true`, {
            type: QueryTypes.SELECT,
            replacements: {
                roleId
            }
        });

        return records;
    }
}

const rolePrivilegeRepo = new RolePrivilegeRepo();

export default rolePrivilegeRepo;