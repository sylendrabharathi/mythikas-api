import { Request } from "express";
import StudentRepo from './../repo/StudentParentRepo';
import utils from '../utils/Utils';
import passwordUtil from "../utils/PasswordUtil";
import responseUtil, { AppResponse } from '../utils/ResponseUtil';

import studentRepo from './../repo/StudentParentRepo';
import lessonRepo from './../repo/LessonRepo';
import LessonWatching from "../models/LessonWatchingModel";
import LessonSectionRepo from "../repo/LessonSectionRepo";
import LessonWatchingRepo from "../repo/LessonWatchingRepo";
import assessmentTestRepo from "../repo/AssessmentTestRepo";

class MobileAppService {

    async login(req: Request) {
        return StudentRepo.login(req.body.phoneNumber, passwordUtil.encryptText(req.body.password)).then(val => {
            if (!val || !val.length) {
                return responseUtil.formBadRequestResponse('not found', 'Invalid Credential', null);
            }
            return responseUtil.formSuccessResponse('LoggedIn Successfully', val);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in login', utils.formErrorObj(err)));
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
       
        const records = await lessonRepo.getLessonSectionFullDetailBySectionId(parseInt(req.params.sectionId.toString()), 
                parseInt(req.headers.userid.toString()));
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
        return LessonWatching.upsert(
            { ...req.body },
            { returning: true}
        ).then(val => {
            return responseUtil.formSuccessResponse('Lesson saved successfully', val[0]);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'Error in Lesson saving', utils.formErrorObj(err)))
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

    async getLessonSectionsByLessonIdForStudent(req: Request): Promise<AppResponse> {
        const records = await LessonSectionRepo.getSectionsByLessonIdForStudent(parseInt(req.params.lessonId.toString()), 
        parseInt(req.headers.userid.toString()));

        return Promise.resolve(responseUtil.formSuccessResponse('', records));
    }

    async getLessonDetailsByStudentIdAndLessonId(req: Request): Promise<AppResponse> {
        const studentId = parseInt(req.params.studentId);
        const lessonId = parseInt(req.params.lessonId);

        const lesson = await lessonRepo.getLessonById(lessonId);
        if(!lesson) {
            return Promise.reject(responseUtil.formNotFoundResponse('not found', 'Invalid Credential', null));
        }

        var result = lesson.toJSON();

        const lessonWatch = await LessonWatchingRepo.getLastWatchingHistoryByStudentIdAndLessonId(studentId, lessonId);
        if (lessonWatch && lessonWatch.length) {
            result["watchStatus"] = lessonWatch[0]["status"];
            result["sections"] = lessonWatch[0]["sections"];
        }

        const assessmentTests = await assessmentTestRepo.getAssessmentTestsByStudentIdAndLessonId(studentId, lessonId);
        result["assessmentTests"] = assessmentTests;

        return Promise.resolve(responseUtil.formSuccessResponse('', result));
    }

}

export default new MobileAppService();