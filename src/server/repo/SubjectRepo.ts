import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
class SubjectRepo {

    getSubjects() {
        const records = sequelize.query(`select * from ${table.subject}`, {
            type: QueryTypes.SELECT
        });

        return records;
    }

    async getSubjectById(id) {
        const records = sequelize.query(`select * from ${table.subject} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT
        });

        return records;
    }

    getActiveSubjects() {
        const records = sequelize.query(`select * from ${table.subject} where status = true`, {
            type: QueryTypes.SELECT
        });

        return records;
    }

    getInActiveSubjects() {
        const records = sequelize.query(`select * from ${table.subject} where status = false`, {
            type: QueryTypes.SELECT
        });

        return records;
    }
}

const subjectRepo = new SubjectRepo();

export default subjectRepo;