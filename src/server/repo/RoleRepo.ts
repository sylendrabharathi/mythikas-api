import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import Role from '../models/RoleModel';
class RoleRepo {

    async getRoles() {
        const records = sequelize.query(`select * from ${table.role}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Role.build()
        });

        return records;
    }

    async getRoleById(id) {
        const records = sequelize.query(`select * from ${table.role} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Role.build()
        });

        return records;
    }

    async getActiveRoles() {
        const records = sequelize.query(`select * from ${table.role} where status = true`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Role.build()
        });

        return records;
    }

    async getInActiveRoles() {
        const records = sequelize.query(`select * from ${table.role} where status = false`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Role.build()
        });

        return records;
    }
}

const roleRepo = new RoleRepo();

export default roleRepo;