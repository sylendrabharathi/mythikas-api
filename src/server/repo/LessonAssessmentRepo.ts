import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import LessonAssessment from '../models/LessonAssessmentModel';
class LessonAssessmentRepo {

    async getLessonAssessments() {
        const records = sequelize.query(`select * from ${table.lessonAssessment}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonAssessment.build()
        });

        return records;
    }

    async getLessonAssessmentById(id) {
        const records = sequelize.query(`select * from ${table.lessonAssessment} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonAssessment.build()
        });

        return records;
    }

    async getActiveLessonAssessments() {
        const records = sequelize.query(`select * from ${table.lessonAssessment} where status = true`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonAssessment.build()
        });

        return records;
    }

    async getInActiveLessonAssessments() {
        const records = sequelize.query(`select * from ${table.lessonAssessment} where status = false`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonAssessment.build()
        });

        return records;
    }

    async getActiveLessonAssessmentsByLessonId(lessonId) {
        const records = sequelize.query(`select * from ${table.lessonAssessment} where status = true and lesson_id = :lessonId`, {
            replacements: {lessonId},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonAssessment.build()
        });

        return records;
    }
}

const lessonAssessmentRepo = new LessonAssessmentRepo();

export default lessonAssessmentRepo;