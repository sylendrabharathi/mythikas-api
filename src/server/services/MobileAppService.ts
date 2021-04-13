import { Request } from "express";
import StudentRepo from './../repo/StudentParentRepo';
import utils from '../utils/Utils';
import passwordUtil from "../utils/PasswordUtil";
import responseUtil, { AppResponse } from '../utils/ResponseUtil';

import studentRepo from './../repo/StudentParentRepo';
import lessonRepo from './../repo/LessonRepo';
import LessonWatching from "../models/LessonWatchingModel";

class MobileAppService {

    async login(req: Request) {
        return StudentRepo.login(req.body.phoneNumber, passwordUtil.encryptText(req.body.password)).then(val => {
            if (!val || !val.length) {
                return responseUtil.formBadRequestResponse('not found', 'Invalid Credential', null);
            }
            return responseUtil.formSuccessResponse('LoggedIn Successfully', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in login', utils.formErrorObj(err));
        });
    }
    async getLessonsByStudentAndStandard(req: Request): Promise<AppResponse> {
        const students = await studentRepo.findStudentParentById(req.params.studentId);
        if (!students || !students.length) {
            return Promise.reject(responseUtil.formNotFoundResponse('not found', 'Invalid Credential', null));
        }

        const student: any = students[0];
        const records = await lessonRepo.getLessonsByStudentAndStandardAndSubject
            (student.standard_id, student.syllabus, req.query.subjectId ? parseInt(req.query.subjectId.toString()) : null);
        return Promise.resolve(responseUtil.formSuccessResponse('', records));

    }

    async getLessonSectionFullDetailBySectionId(req: Request): Promise<AppResponse> {
       
        const records = await lessonRepo.getLessonSectionFullDetailBySectionId(parseInt(req.params.sectionId.toString()));
        return Promise.resolve(responseUtil.formSuccessResponse('', records));

    }

    async getRelatedLessonsByStudentAndLesson(req: Request): Promise<AppResponse> {
        const students = await studentRepo.findStudentParentById(req.params.studentId);
        if (!students || !students.length) {
            return Promise.reject(responseUtil.formNotFoundResponse('not found', 'Invalid Credential', null));
        }

        const lesson = await lessonRepo.getLessonById(req.params.lessonId);
        if(!lesson) {
            return Promise.reject(responseUtil.formNotFoundResponse('not found', 'Invalid Credential', null));
        }

        const l: any = lesson.toJSON();
        console.log('l = ', l);
        
        const student: any = students[0];
        const records = await lessonRepo.getRelatedLessonsByStudentAndStandardAndSubject
            (student.standard_id, student.syllabus, parseInt(l.subjectId.toString()), l.tag, l.id);
        return Promise.resolve(responseUtil.formSuccessResponse('', records));

    }

    async upsertLastWatching(req: Request): Promise<AppResponse> {
        const lessonWatching = LessonWatching.build(req.body);
        return lessonWatching.save().then(val => {
            return responseUtil.formSuccessResponse('Lesson saved successfully', val.toJSON());
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in Lesson saving', utils.formErrorObj(err))
        })
    }

    async getLastWatchingByStudentAndStandard(req: Request): Promise<AppResponse> {
        const students = await studentRepo.findStudentParentById(req.params.studentId);
        if (!students || !students.length) {
            return Promise.reject(responseUtil.formNotFoundResponse('not found', 'Invalid Credential', null));
        }

        const student: any = students[0];
        const records = await lessonRepo.getLastWatchingByStudentAndStandardAndSubject
            (student.standard_id, student.syllabus, req.query.subjectId ? parseInt(req.query.subjectId.toString()) : null);
        return Promise.resolve(responseUtil.formSuccessResponse('', records));

    }

}

export default new MobileAppService();