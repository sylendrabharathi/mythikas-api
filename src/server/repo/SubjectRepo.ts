import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import Subject from '../models/SubjectModel';
class SubjectRepo {

    async getSubjects() {
        const records = sequelize.query(`select * from ${table.subject}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Subject.build()
        });

        return records;
    }

    async getSubjectById(id) {
        const records = sequelize.query(`select * from ${table.subject} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Subject.build()
        });

        return records;
    }

    async getActiveSubjects() {
        const records = sequelize.query(`select * from ${table.subject} where status = true`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Subject.build()
        });

        return records;
    }

    async getInActiveSubjects() {
        const records = sequelize.query(`select * from ${table.subject} where status = false`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Subject.build()
        });

        return records;
    }
}

const subjectRepo = new SubjectRepo();

export default subjectRepo;