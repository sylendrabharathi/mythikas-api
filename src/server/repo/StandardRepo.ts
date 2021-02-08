import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
class StandardRepo {

    getStandards() {
        const records = sequelize.query(`select * from ${table.standard}`, {
            type: QueryTypes.SELECT
        });

        return records;
    }

    async getStandardById(id) {
        const records = sequelize.query(`select * from ${table.standard} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT
        });

        return records;
    }

    getActiveStandards() {
        const records = sequelize.query(`select * from ${table.standard} where status = true`, {
            type: QueryTypes.SELECT
        });

        return records;
    }

    getInActiveStandards() {
        const records = sequelize.query(`select * from ${table.standard} where status = false`, {
            type: QueryTypes.SELECT
        });

        return records;
    }
}

const standardRepo = new StandardRepo();

export default standardRepo;