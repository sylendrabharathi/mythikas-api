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

    async findAllByActiveAndLessonId(lessonId: number) {
        const records = sequelize.query(`select * from ${table.lessonSection} where status = true and lesson_id = :lessonId`, {
            type: QueryTypes.SELECT,
            replacements: {lessonId},
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

    async getSectionsByLessonIdForStudent(lessonId: number, studentId: number) {
        const records = sequelize.query(`select ls.*, lw.status as completedStatus from lesson_section ls
        left join lesson_watching lw on lw.section_id = ls.id and lw.student_id = :studentId
        where ls.status = true and ls.lesson_id = :lessonId;`, {
            type: QueryTypes.SELECT,
            replacements: {
                lessonId,
                studentId
            }

        });
        
        return records;
        
    }
}

const lessonSectionRepo = new LessonSectionRepo();

export default lessonSectionRepo;