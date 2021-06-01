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
    
}

export default new LessonWatchingRepo();