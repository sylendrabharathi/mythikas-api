import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import LessonSection from '../models/LessonSectionModel';
class LessonSectionRepo {

    async getLessonSections() {
        const records = sequelize.query(`select * from ${table.lessonSection}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonSection.build()
        });

        return records;
    }

    async getLessonSectionById(id) {
        const records = sequelize.query(`select * from ${table.lessonSection} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonSection.build()
        });

        return records;
    }

    async getActiveLessonSections() {
        const records = sequelize.query(`select * from ${table.lessonSection} where status = true`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonSection.build()
        });

        return records;
    }

    async getInActiveLessonSections() {
        const records = sequelize.query(`select * from ${table.lessonSection} where status = false`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonSection.build()
        });

        return records;
    }
}

const lessonSectionRepo = new LessonSectionRepo();

export default lessonSectionRepo;