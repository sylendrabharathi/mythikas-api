import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import LessonQuestion from '../models/LessonQuestionModel';
class LessonQuestionRepo {

    async getLessonQuestions() {
        const records = sequelize.query(`select * from ${table.lessonQuestion}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonQuestion.build()
        });

        return records;
    }

    async getLessonQuestionById(id) {
        const records = sequelize.query(`select * from ${table.lessonQuestion} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonQuestion.build()
        });

        return records;
    }

    async getActiveLessonQuestions() {
        const records = sequelize.query(`select * from ${table.lessonQuestion} where status = true`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonQuestion.build()
        });

        return records;
    }

    async getInActiveLessonQuestions() {
        const records = sequelize.query(`select * from ${table.lessonQuestion} where status = false`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: LessonQuestion.build()
        });

        return records;
    }
}

const lessonQuestionRepo = new LessonQuestionRepo();

export default lessonQuestionRepo;