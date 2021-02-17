import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import Lesson from '../models/LessonModel';
import Standard from '../models/StandardModel';
import Subject from '../models/SubjectModel';

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
        const record = Lesson.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Standard,
                    as: 'standard'
                },
                {
                    model: Subject,
                    as: 'subject'
                }
            ]
        });

        return record;
    }

    async getActiveLessons() {
        const records = Lesson.findAll({
            where: {
                status: true
            },
            include: [
                {
                    model: Standard,
                    as: 'standard'
                },
                {
                    model: Subject,
                    as: 'subject'
                }
            ]
        });

        return records;
    }

    async getInActiveLessons() {
        const records = Lesson.findAll({
            where: {
                status: false
            },
            include: [
                {
                    model: Standard,
                    as: 'standard'
                },
                {
                    model: Subject,
                    as: 'subject'
                }
            ]
        });

        return records;
    }

    async filterLessonList(filterObj: any) {
        const records = Lesson.findAll({
            where: {
                ...filterObj
            },
            include: [
                {
                    model: Standard,
                    as: 'standard'
                },
                {
                    model: Subject,
                    as: 'subject'
                }
            ]
        });

        return records;
    }
}

const lessonRepo = new LessonRepo();

export default lessonRepo;