import responseUtil from '../utils/ResponseUtil';
import LessonQuestion from '../models/LessonQuestionModel';
import lessonQuestionRepo from '../repo/LessonQuestionRepo';
import utils from '../utils/utils';
import { Op } from 'sequelize';
import { Request } from 'express';

class LessonQuestionService {

    getLessonQuestions(req: Request) {
        return lessonQuestionRepo.getLessonQuestions().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Questions', utils.formErrorObj(err));
        })
    }

    getLessonQuestionById(req: Request) {
        return lessonQuestionRepo.getLessonQuestionById(req.params.id).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Question by id', utils.formErrorObj(err));
        })
    }

    saveLessonQuestion(req: Request) {
        const lessonQuestion = LessonQuestion.build(req.body);
        return lessonQuestion.save().then(val => {
            return responseUtil.formSuccessResponse('Question saved successfully', val.toJSON());
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in Question saving', utils.formErrorObj(err))
        })
    }

    async updateLessonQuestion(req: Request) {
        return lessonQuestionRepo.getLessonQuestionById(req.params.id).then(val => {
            return LessonQuestion.update(
                { ...req.body },
                { returning: true, where: { id: req.params.id } }
            ).then(res => {
                return responseUtil.formSuccessResponse('Question updated successfully', res);
            }).catch(err => {
                console.log('err = ', err);
                return responseUtil.formBadRequestResponse(err.toString(), 'Error in Question updating', utils.formErrorObj(err))
            })
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Question by id', utils.formErrorObj(err));
        })
    }

    changeLessonQuestionStatus(req: Request) {
        return LessonQuestion.update(
            { status: req.params.status },
            { where: { id: req.params.id } }
        ).then(res => {
            return responseUtil.formSuccessResponse(`Question ${req.params.status !== 'false' ? 'activated' : 'deleted'} successfully`, res);
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in Question status updating', utils.formErrorObj(err))
        })
    }

    getActiveLessonQuestions(req: Request) {
        return lessonQuestionRepo.getActiveLessonQuestions().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get active Questions', err);
        })
    }

    getInActiveLessonQuestions(req: Request) {
        return lessonQuestionRepo.getInActiveLessonQuestions().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get inactive LessonQuestions', err);
        })
    }

    getActiveLessonQuestionsBySectionId(req: Request) {
        return lessonQuestionRepo.getActiveLessonQuestionsBySectionId(req.params.sectionId).then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get active Questions', err);
        })
    }
}

const lessonQuestionService = new LessonQuestionService();

export default lessonQuestionService;