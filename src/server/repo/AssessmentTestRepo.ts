import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import AssessmentTest from '../models/AssessmentTestModel';
class AssessmentTestRepo {

    async getAssessmentTests() {
        const records = sequelize.query(`select * from ${table.assessmentTest}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: AssessmentTest.build()
        });

        return records;
    }

    async getAssessmentTestsByStudentId(studentId) {
        const records = sequelize.query(`select * from ${table.assessmentTest} where student_id = :studentId`, {
            replacements: {studentId},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: AssessmentTest.build()
        });

        return records;
    }

    async getAssessmentTestsByLessonAssessmentId(lessonAssessmentId) {
        const records = sequelize.query(`select * from ${table.assessmentTest} where lesson_assessment_id = :lessonAssessmentId`, {
            replacements: {lessonAssessmentId},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: AssessmentTest.build()
        });

        return records;
    }

    async getAssessmentTestByStudentIdAndLessonAssessmentId(studentId, lessonAssessmentId) {
        const records = sequelize.query(`select * from ${table.assessmentTest} where student_id = :studentId and lesson_assessment_id = :lessonAssessmentId`, {
            replacements: {studentId, lessonAssessmentId},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: AssessmentTest.build()
        });

        return records;
    }
}

const assessmentTestRepo = new AssessmentTestRepo();

export default assessmentTestRepo;