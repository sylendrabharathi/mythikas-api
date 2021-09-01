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

    async getAssessmentTestsByStudentIdAndLessonId(studentId, lessonId) {
        const records = sequelize.query(`select id, name, description, assessmentType, assessmentTests,
            case 
             when jsonb_array_length(assessmentTests) > 0 then 'DONE'
             else 'NOT DONE'
            end as status
            from (select la.id as id, la.name as name, 
            la.description as description,
            la.assessment_type as assessmentType,
            jsonb_agg(distinct jsonb_build_object(
                'date', at."date",
                'questionAnswers', at."question_answers",
                'totalMarks', at."total_marks",
                'studentMarks', at."student_marks"
                )
            ) as assessmentTests
            from ${table.lessonAssessment} la
            left join ${table.assessmentTest} at on at.lesson_assessment_id = la.id and at.student_id = :studentId
            where la.lesson_id = :lessonId
            group by la.id) as assessment;`, {
            type: QueryTypes.SELECT,
            replacements: {studentId, lessonId}
        });

        return records;
    }

    async getAssessmentTestsByTypeAndStudentIdAndLessonId(assessmentType, studentId, lessonId) {
        const records = sequelize.query(`select id, name, description, assessmentType, questions, assessmentTests,
            case 
             when jsonb_array_length(assessmentTests) > 0 then 'DONE'
             else 'NOT DONE'
            end as status
            from (select la.id as id, la.name as name, 
            la.description as description,
            la.assessment_type as assessmentType,
            la.questions as questions,
            COALESCE(
                jsonb_agg(distinct jsonb_build_object(
                    'date', at."date",
                    'questionAnswers', at."question_answers",
                    'totalMarks', at."total_marks",
                    'studentMarks', at."student_marks"
                    )
                ) FILTER (WHERE at."date" IS NOT NULL), '[]'
            ) as assessmentTests
            from ${table.lessonAssessment} la
            left join ${table.assessmentTest} at on at.lesson_assessment_id = la.id and at.student_id = :studentId
            where la.lesson_id = :lessonId and la.assessment_type = :assessmentType
            group by la.id) as assessment;`, {
            type: QueryTypes.SELECT,
            replacements: {assessmentType, studentId, lessonId}
        });

        return records;
    }
}

const assessmentTestRepo = new AssessmentTestRepo();

export default assessmentTestRepo;