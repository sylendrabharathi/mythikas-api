import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import Standard from '../models/StandardModel';
class StandardRepo {

    async getStandards() {
        const records = sequelize.query(`select * from ${table.standard}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Standard.build()
        });

        return records;
    }

    async getStandardById(id) {
        const records = sequelize.query(`select * from ${table.standard} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Standard.build()
        });

        return records;
    }

    async getActiveStandards() {
        const records = sequelize.query(`select * from ${table.standard} where status = true`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Standard.build()
        });

        return records;
    }

    async getInActiveStandards() {
        const records = sequelize.query(`select * from ${table.standard} where status = false`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Standard.build()
        });

        return records;
    }
}

const standardRepo = new StandardRepo();

export default standardRepo;