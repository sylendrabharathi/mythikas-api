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
import sectionTestRepo from "../repo/SectionTestRepo";
import { any } from "sequelize/types/lib/operators";

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

    getAssessmentTestsByStudentIdAndLessonId(req: Request) {
        let studentId = parseInt(req.headers.userid.toString());
        let assessmentType = req.params.assessmentType;
        let lessonId = req.params.lessonId;
        return assessmentTestRepo.getAssessmentTestsByTypeAndStudentIdAndLessonId(assessmentType, studentId, lessonId).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get Assessment Tests by studentId and lessonId', utils.formErrorObj(err)));
        })
    }

    getSectionTestByIdAndStudentIdAndLessonId(req: Request) {
        let studentId = parseInt(req.headers.userid.toString());
        let lessonId = req.params.lessonId;
        let sectionId = req.params.sectionId;
        return sectionTestRepo.getSectionTestByIdAndStudentIdAndLessonId(studentId, lessonId, sectionId).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get Section Test by Id and studentId and lessonId', utils.formErrorObj(err)));
        })
    }

    getAchievementsByStudentId(req: Request) {
        let studentId = req.params.studentId;
        return LessonWatchingRepo.getAchievementsByStudentId(studentId).then(vals => {
            if(!vals) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }

            let results = [];

            for (let i = 0; i < vals.length; i++) {
                const val = vals[i];
                
                let stpTotal = 0;
                const stLen = val['sectionTests'].length
                for (let j = 0; j < stLen; j++) {
                    const st = val['sectionTests'][j];
                    
                    const p = (st['studentMarks'] / st['totalMarks']) * 100;
                    stpTotal = stpTotal + p;
                }

                if (stLen) val['sectionTestsPercentage'] = stpTotal / stLen;

                let preAssTotal = 0;
                const ptLen = val['preAssessmentTests'].length
                for (let k = 0; k < ptLen; k++) {
                    const pt = val['preAssessmentTests'][k];
                    
                    const p = (pt['studentMarks'] / pt['totalMarks']) * 100;
                    preAssTotal = preAssTotal + p;
                }

                let postAssTotal = 0;
                const potLen = val['postAssessmentTests'].length
                for (let l = 0; l < potLen; l++) {
                    const pot = val['postAssessmentTests'][l];
                    
                    const p = (pot['studentMarks'] / pot['totalMarks']) * 100;
                    postAssTotal = postAssTotal + p;
                }

                val['sectionTestsPercentage'] = (stLen) ? stpTotal / stLen : 0;
                val['preAssessmentTestsPercentage'] = (ptLen) ? preAssTotal / ptLen : 0;
                val['postAssessmentTestsPercentage'] = (potLen) ? postAssTotal / potLen : 0;

                results.push(val);
            }

            return responseUtil.formSuccessResponse('', results);
        }).catch(err => {
            console.log('err = ', err);
            
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get achievements studentId', utils.formErrorObj(err)));
        })
    }
}

export default new MobileAppService();