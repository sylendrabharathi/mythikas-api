import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import Privilege from '../models/PrivilegeModel';
class PrivelegeRepo {

    async getPrivileges() {
        const records = sequelize.query(`select * from ${table.privilege}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Privilege.build()
        });

        return records;
    }

    async getPrivilegeById(id) {
        const records = sequelize.query(`select * from ${table.privilege} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Privilege.build()
        });

        return records;
    }

    async getActivePrivileges() {
        const records = sequelize.query(`select * from ${table.privilege} where status = true`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Privilege.build()
        });

        return records;
    }

    async getInActivePrivileges() {
        const records = sequelize.query(`select * from ${table.privilege} where status = false`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Privilege.build()
        });

        return records;
    }
}

const privilegeRepo = new PrivelegeRepo();

export default privilegeRepo;