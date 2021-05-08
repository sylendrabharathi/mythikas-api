import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import SectionTest from '../models/SectionTestModel';
class SectionTestRepo {

    async getSectionTests() {
        const records = sequelize.query(`select * from ${table.sectionTest}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: SectionTest.build()
        });

        return records;
    }

    async getSectionTestsByStudentId(studentId) {
        const records = sequelize.query(`select * from ${table.sectionTest} where student_id = :studentId`, {
            replacements: {studentId},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: SectionTest.build()
        });

        return records;
    }

    async getSectionTestsByLessonSectionId(lessonSectionId) {
        const records = sequelize.query(`select * from ${table.sectionTest} where lesson_section_id = :lessonSectionId`, {
            replacements: {lessonSectionId},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: SectionTest.build()
        });

        return records;
    }

    async getSectionTestsByLessonId(lessonId) {
        const records = sequelize.query(`select * from ${table.sectionTest} where lesson_id = :lessonId`, {
            replacements: {lessonId},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: SectionTest.build()
        });

        return records;
    }

    async getSectionTestByStudentIdAndLessonSectionIdAndLessonId(studentId, lessonSectionId, lessonId) {
        const records = sequelize.query(`select * from ${table.sectionTest} where student_id = :studentId and lesson_section_id = :lessonSectionId and lesson_id = :lessonId`, {
            replacements: {studentId, lessonSectionId, lessonId},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: SectionTest.build()
        });

        return records;
    }
}

const sectionTestRepo = new SectionTestRepo();

export default sectionTestRepo;