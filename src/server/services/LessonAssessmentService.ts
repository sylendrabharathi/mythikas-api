import responseUtil from '../utils/ResponseUtil';
import LessonAssessment from '../models/LessonAssessmentModel';
import LessonAssessmentRepo from '../repo/LessonAssessmentRepo';
import utils from '../utils/Utils';
import { Op } from 'sequelize';
import { Request } from 'express';

class LessonAssessmentService {

    getLessonAssessments(req: Request) {
        return LessonAssessmentRepo.getLessonAssessments().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get Questions', utils.formErrorObj(err)));
        })
    }

    getLessonAssessmentById(req: Request) {
        return LessonAssessmentRepo.getLessonAssessmentById(req.params.id).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get Question by id', utils.formErrorObj(err)));
        })
    }

    saveLessonAssessment(req: Request) {
        const lessonAssessment = LessonAssessment.build(req.body);
        return lessonAssessment.save().then(val => {
            return responseUtil.formSuccessResponse('Question saved successfully', val.toJSON());
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'Error in Question saving', utils.formErrorObj(err)))
        })
    }

    async updateLessonAssessment(req: Request) {
        return LessonAssessmentRepo.getLessonAssessmentById(req.params.id).then(val => {
            return LessonAssessment.update(
                { ...req.body },
                { returning: true, where: { id: req.params.id } }
            ).then(res => {
                return responseUtil.formSuccessResponse('Question updated successfully', res);
            }).catch(err => {
                console.log('err = ', err);
                return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'Error in Question updating', utils.formErrorObj(err)))
            })
        }).catch(err => {
            console.log('err = ', err);
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get Question by id', utils.formErrorObj(err)));
        })
    }

    changeLessonAssessmentStatus(req: Request) {
        return LessonAssessment.update(
            { status: req.params.status },
            { where: { id: req.params.id } }
        ).then(res => {
            return responseUtil.formSuccessResponse(`Question ${req.params.status !== 'false' ? 'activated' : 'deleted'} successfully`, res);
        }).catch(err => {
            console.log('err = ', err);
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'Error in Question status updating', utils.formErrorObj(err)))
        })
    }

    getActiveLessonAssessments(req: Request) {
        return LessonAssessmentRepo.getActiveLessonAssessments().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get active Questions', err));
        })
    }

    getInActiveLessonAssessments(req: Request) {
        return LessonAssessmentRepo.getInActiveLessonAssessments().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get inactive LessonAssessments', err));
        })
    }

    getActiveLessonAssessmentsByLessonId(req: Request) {
        return LessonAssessmentRepo.getActiveLessonAssessmentsByLessonId(req.params.lessonId).then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get active Questions', err));
        })
    }
}

const lessonAssessmentService = new LessonAssessmentService();

export default lessonAssessmentService;