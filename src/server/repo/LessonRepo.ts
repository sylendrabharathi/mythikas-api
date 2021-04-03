import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import { sequelize } from './../db/Sequelize';
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

    async getLessonsByStudentAndStandardAndSubject(standardId: number, syllabus: string, subjectId?: number) {
        const records = sequelize.query(`select l.id as id, l."name" as name, s."name" as subject, 
        s2.name as standard, sections as sections, l.syllabus as syllabus
        from ${table.lesson} l
        left join (
            select ls.lesson_id as lessonId , json_agg(
                json_build_object(
                    'id', ls.id,
                    'name', ls."name",
                    'label', ls."label",
                    'description', ls.description,
                    'url', ls.url,
                    'tag', ls.tag,
                    'updatedBy', ut.first_name
                ) 
            ) sections from ${table.lessonSection} ls 
            inner join ${table.userTeacher} ut on ut.id = ls.updated_by 
            where ls.status = true
            group by ls.lesson_id 
        ) c on c.lessonId = l.id 
        inner join ${table.subject} s ON s.id = l.subject_id and s.status = true
        inner join ${table.standard} s2 on s2.id = l.standard_id and s2.status = true
        where l.status = true and l.standard_id = :standardId and 
        l.syllabus = :syllabus and ((:subjectId is NULL ) OR (l.subject_id = :subjectId));`, {
            type: QueryTypes.SELECT,
            replacements: {
                standardId, syllabus, subjectId
            }

        });
        
        return records;
    }

    async getLessonsByStudentAndSubjectId(standardId: number, syllabus: string, subjectId?: number) {
        const records = sequelize.query(`select json_build_object(
            'id', l.id,
            'name', l."name",
            'subject', s."name",
            'sections', sections
        ) from ${table.lesson} l
        left join (
            select ls.lesson_id as lessonId , json_agg(
                json_build_object(
                    'id', ls.id,
                    'name', ls."name",
                    'label', ls."label",
                    'description', ls.description,
                    'url', ls.url,
                    'tag', ls.tag,
                    'updatedBy', ut.first_name
                ) 
            ) sections from ${table.lessonSection} ls 
            inner join ${table.userTeacher} ut on ut.id = ls.updated_by 
            where ls.status = true
            group by ls.lesson_id 
        ) c on c.lessonId = l.id 
        inner join ${table.subject} s ON s.id = l.subject_id and s.status = true
        where l.status = true and l.standard_id = :standardId and 
        l.syllabus = :syllabus and l.subject_id = :subjectId;`, {
            type: QueryTypes.SELECT,
            replacements: {
                standardId, syllabus, subjectId
            }

        });
        
        return records;
    }
}

const lessonRepo = new LessonRepo();

export default lessonRepo;