import { Sequelize, DataTypes, QueryTypes } from 'sequelize';
import { sequelize } from './../db/Sequelize';
import table from "../db/Table";

class LessonWatchingRepo {

    async getLastWatchingHistoryByStudentId(studentId: number) {
        const records = sequelize.query(`select lessonId, lessonName, sections, jsonb_array_length(sections) as sectionsLength, doneCount,
            case jsonb_array_length(sections)
             when doneCount then 'DONE'
             else 'IN-PROGRESS'
            end as status 
            from (select lw.lesson_id as lessonId,
            les.name as lessonName,
            jsonb_agg(distinct jsonb_build_object(
                'id', ls.id,
                'name', ls."name",
                'url', ls."url",
                'tag', ls."tag",
                'label', ls."label",
                'description', ls."description",
                'watchedSeconds', lw."watched_seconds"
                )
            ) as sections,
            count(distinct(lw.section_id, lw.status)) filter (where lw.status = 'DONE') as doneCount
            from ${table.lessonWatching} lw
            inner join ${table.lessonSection} ls on ls.lesson_id = lw.lesson_id and ls.id = lw.section_id
            inner join ${table.lesson} les on les.id = lw.lesson_id
            where lw.student_id = :studentId 
            group by lw.lesson_id, les.name) as history
            group by lessonId, lessonName, sections, doneCount;`, {
            type: QueryTypes.SELECT,
            replacements: {
                studentId
            }
        }); 
        
        return records;
    }
    
    async getLastWatchingHistoryByStudentIdAndLessonId(studentId: number, lessonId: number) {
        const records = sequelize.query(`select lessonId, lessonName, sections, jsonb_array_length(sections) as sectionsLength, doneCount,
            case jsonb_array_length(sections)
             when doneCount then 'DONE'
             else 'IN-PROGRESS'
            end as status 
            from (select lw.lesson_id as lessonId,
            les.name as lessonName,
            jsonb_agg(distinct jsonb_build_object(
                'id', ls.id,
                'name', ls."name",
                'url', ls."url",
                'tag', ls."tag",
                'label', ls."label",
                'description', ls."description"
                )
            ) as sections,
            count(distinct(lw.section_id, lw.status)) filter (where lw.status = 'DONE') as doneCount
            from ${table.lessonWatching} lw
            left join ${table.lessonSection} ls on ls.lesson_id = lw.lesson_id
            left join ${table.lesson} les on les.id = lw.lesson_id
            where lw.student_id = :studentId and lw.lesson_id = :lessonId
            group by lw.lesson_id, les.name) as history
            group by lessonId, lessonName, sections, doneCount;`, {
            type: QueryTypes.SELECT,
            replacements: {
                studentId, lessonId
            }
        });
        
        return records;
    }
    
    async getAchievementsByStudentId(studentId) {
        const records = sequelize.query(`select lessonId as "lessonId", lessonName as "lessonName", subjectName as "subjectName",
            sections as "sections", sectionTests as "sectionTests", 
            preAssessmentTests as "preAssessmentTests", postAssessmentTests as "postAssessmentTests"
            from (select lessonId, lessonName, subjectName, sections, sectionTests, preAssessmentTests,
            postAssessmentTests, jsonb_array_length(sections) as sectionsLength, jsonb_array_length(sectionTests) as sectionTestsLength
            from (select lw.lesson_id as lessonId,
            les.name as lessonName,
            sub.name as subjectName,
            COALESCE(
                jsonb_agg(distinct jsonb_build_object(
                    'id', ls.id,
                    'name', ls."name",
                    'url', ls."url",
                    'tag', ls."tag",
                    'label', ls."label",
                    'description', ls."description"
                    )
                ) FILTER (WHERE ls.id IS NOT NULL), '[]'
            ) as sections,
            COALESCE(
                jsonb_agg(distinct jsonb_build_object(
                    'sectionId', st."lesson_section_id",
                    'date', st."date",
                    'question_answers', st."question_answers",
                    'totalMarks', st."total_marks",
                    'studentMarks', st."student_marks"
                    )
                ) FILTER (WHERE st."date" IS NOT NULL), '[]'
            ) as sectionTests,
            COALESCE(
                jsonb_agg(distinct jsonb_build_object(
                    'assessmentId', pt."lesson_assessment_id",
                    'date', pt."date",
                    'question_answers', pt."question_answers",
                    'totalMarks', pt."total_marks",
                    'studentMarks', pt."student_marks"
                    )
                ) FILTER (WHERE pt."date" IS NOT NULL), '[]'
            ) as preAssessmentTests,
            COALESCE(
                jsonb_agg(distinct jsonb_build_object(
                    'assessmentId', pot."lesson_assessment_id",
                    'date', pot."date",
                    'question_answers', pot."question_answers",
                    'totalMarks', pot."total_marks",
                    'studentMarks', pot."student_marks"
                    )
                ) FILTER (WHERE pot."date" IS NOT NULL), '[]'
            ) as postAssessmentTests
            from ${table.lessonWatching} lw
            left join ${table.lessonSection} ls on ls.lesson_id = lw.lesson_id
            left join ${table.sectionTest} st on st.student_id = lw.student_id and st.lesson_id = lw.lesson_id
            left join ${table.lesson} les on les.id = lw.lesson_id
            left join ${table.subject} sub on sub.id = les.subject_id
            left join ${table.lessonAssessment} pre on pre.lesson_id = lw.lesson_id and pre.assessment_type = 'pre'
            left join ${table.lessonAssessment} post on post.lesson_id = lw.lesson_id and post.assessment_type = 'post'
            left join ${table.assessmentTest} pt on pt.student_id = lw.student_id and pt.lesson_assessment_id = pre.id
            left join ${table.assessmentTest} pot on pot.student_id = lw.student_id and pot.lesson_assessment_id = post.id
            where lw.student_id = :studentId and lw.status = 'DONE'
            group by lw.lesson_id, les.name, sub.name) as history
            group by lessonId, lessonName, subjectName, sections, sectionTests, preAssessmentTests, postAssessmentTests) as achievement
            where achievement.sectionsLength = achievement.sectionTestsLength;`, {
            type: QueryTypes.SELECT,
            replacements: {studentId}
        });

        return records;
    }
    
}

export default new LessonWatchingRepo();