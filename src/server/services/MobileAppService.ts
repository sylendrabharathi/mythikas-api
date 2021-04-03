import { Request } from "express";
import StudentRepo from './../repo/StudentParentRepo';
import utils from '../utils/Utils';
import passwordUtil from "../utils/PasswordUtil";
import responseUtil, { AppResponse } from '../utils/ResponseUtil';

import studentRepo from './../repo/StudentParentRepo';
import lessonRepo from './../repo/LessonRepo';

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

}

export default new MobileAppService();