import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import Lesson from '../models/LessonModel';
class LessonRepo {

    async getLessons() {
        const records = sequelize.query(`select * from ${table.lesson}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Lesson.build()
        });

        return records;
    }

    async getLessonById(id) {
        const records = sequelize.query(`select * from ${table.lesson} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Lesson.build()
        });

        return records;
    }

    async getActiveLessons() {
        const records = sequelize.query(`select * from ${table.lesson} where status = true`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Lesson.build()
        });

        return records;
    }

    async getInActiveLessons() {
        const records = sequelize.query(`select * from ${table.lesson} where status = false`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: Lesson.build()
        });

        return records;
    }
}

const lessonRepo = new LessonRepo();

export default lessonRepo;