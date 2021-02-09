import responseUtil from '../utils/ResponseUtil';
import Lesson from '../models/LessonModel';
import lessonRepo from '../repo/LessonRepo';
import utils from '../utils/utils';
import { Op } from 'sequelize';
import { Request } from 'express';

class LessonService {

    getLessons(req: Request) {
        return lessonRepo.getLessons().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Lessons', utils.formErrorObj(err));
        })
    }

    getLessonById(req: Request) {
        return lessonRepo.getLessonById(req.params.id).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Lesson by id', utils.formErrorObj(err));
        })
    }

    saveLesson(req: Request) {
        const lesson = Lesson.build(req.body);
        return lesson.save().then(val => {
            return responseUtil.formSuccessResponse('Lesson saved successfully', val.toJSON());
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in Lesson saving', utils.formErrorObj(err))
        })
    }

    async updateLesson(req: Request) {
        return lessonRepo.getLessonById(req.params.id).then(val => {
            return Lesson.update(
                { ...req.body },
                { returning: true, where: { id: req.params.id } }
            ).then(res => {
                return responseUtil.formSuccessResponse('Lesson updated successfully', res);
            }).catch(err => {
                console.log('err = ', err);
                return responseUtil.formBadRequestResponse(err.toString(), 'Error in Lesson updating', utils.formErrorObj(err))
            })
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Lesson by id', utils.formErrorObj(err));
        })
    }

    changeLessonStatus(req: Request) {
        return Lesson.update(
            { status: req.params.status },
            { where: { id: req.params.id } }
        ).then(res => {
            return responseUtil.formSuccessResponse('Lesson status updated successfully', res);
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in Lesson status updating', utils.formErrorObj(err))
        })
    }

    getActiveLessons(req: Request) {
        return lessonRepo.getActiveLessons().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get active Lessons', err);
        })
    }

    getInActiveLessons(req: Request) {
        return lessonRepo.getInActiveLessons().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get inactive Lessons', err);
        })
    }
}

const lessonService = new LessonService();

export default lessonService;