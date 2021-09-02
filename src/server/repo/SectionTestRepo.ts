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

    async getSectionTestsByTypeAndStudentIdAndLessonId(studentId, lessonId) {
        const records = sequelize.query(`select id, name, description, questions, sectionTests,
            case 
             when jsonb_array_length(sectionTests) > 0 then 'DONE'
             else 'NOT DONE'
            end as status
            from (select ls.id as id, ls.name as name, 
            ls.description as description,
            lq.id as lessonQuestionId,
            lq.questions as questions,
            COALESCE(
                jsonb_agg(distinct jsonb_build_object(
                    'date', st."date",
                    'questionAnswers', st."question_answers",
                    'totalMarks', st."total_marks",
                    'studentMarks', st."student_marks"
                    )
                ) FILTER (WHERE st."date" IS NOT NULL), '[]'
            ) as sectionTests
            from ${table.lessonSection} ls
            left join ${table.lessonQuestion} lq on lq.lesson_section_id = ls.id
            left join ${table.sectionTest} st on st.lesson_section_id = ls.id and st.student_id = :studentId
            where ls.lesson_id = :lessonId
            group by ls.id, lq.id) as section;`, {
            type: QueryTypes.SELECT,
            replacements: {studentId, lessonId}
        });

        return records;
    }
}

const sectionTestRepo = new SectionTestRepo();

export default sectionTestRepo;