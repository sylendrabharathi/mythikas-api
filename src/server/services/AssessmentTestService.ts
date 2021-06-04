import responseUtil from '../utils/ResponseUtil';
import AssessmentTest from '../models/AssessmentTestModel';
import assessmentTestRepo from '../repo/AssessmentTestRepo';
import utils from '../utils/Utils';
import { Op } from 'sequelize';
import { Request } from 'express';

class AssessmentTestService {

    getAssessmentTests(req: Request) {
        return assessmentTestRepo.getAssessmentTests().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get Assessment Tests', utils.formErrorObj(err)));
        })
    }

    getAssessmentTestsByStudentId(req: Request) {
        return assessmentTestRepo.getAssessmentTestsByStudentId(req.params.studentId).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get Assessment Tests by studentId', utils.formErrorObj(err)));
        })
    }

    getAssessmentTestsByLessonAssessmentId(req: Request) {
        return assessmentTestRepo.getAssessmentTestsByLessonAssessmentId(req.params.lessonAssessmentId).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get Assessment Tests by lessonSectionId', utils.formErrorObj(err)));
        })
    }

    getAssessmentTestByStudentIdAndLessonAssessmentId(req: Request) {
        let studentId = parseInt(req.query?.studentId[0]);
        let lessonAssessmentId = parseInt(req.query?.lessonAssessmentId[0]);
        return assessmentTestRepo.getAssessmentTestByStudentIdAndLessonAssessmentId(studentId, lessonAssessmentId).then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in Assessment Tests by studentId, lessonAssessmentId', err));
        })
    }

    saveAssessmentTest(req: Request) {
        //calculate marks
        if (req.body.questionAnswers) {
            //initialize totalMarks and studentMarks
            if (!req.body.totalMarks) req.body.totalMarks = 0;
            if (!req.body.studentMarks) req.body.studentMarks = 0;

            req.body.questionAnswers.forEach(q => {
                //define mark if not
                if (!q.mark) q.mark = 1;
                //sum total marks
                req.body.totalMarks += q.mark;

                //sum student marks
                if (q.answer == q.studentAnswer) {
                    req.body.studentMarks += q.mark;
                }
            });
        }
       
        const assessmentTest = AssessmentTest.build(req.body);

        return assessmentTest.save().then(val => {
            return responseUtil.formSuccessResponse('Assessment Test saved successfully', val.toJSON());
        }).catch(err => {
            if (err.toString().includes("SequelizeUniqueConstraintError")) {
                return this.updateAssessmentTest(req);
            }
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'Error in Assessment Test saving', utils.formErrorObj(err)))
        })
    }
   
    async updateAssessmentTest(req: Request) {
        return AssessmentTest.update(
            { ...req.body },
            { returning: true, where: { studentId: req.body.studentId, lessonAssessmentId: req.body.lessonAssessmentId } }
        ).then(res => {
            return responseUtil.formSuccessResponse('Assessment Test saved successfully', res);
        }).catch(err => {
            console.log('err = ', err);
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'Error in Assessment Test saving', utils.formErrorObj(err)))
        })
    }

}

const assessmentTestService = new AssessmentTestService();

export default assessmentTestService;