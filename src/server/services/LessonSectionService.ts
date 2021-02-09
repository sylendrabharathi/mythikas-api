import responseUtil from '../utils/ResponseUtil';
import LessonSection from '../models/LessonSectionModel';
import lessonSectionRepo from '../repo/LessonSectionRepo';
import utils from '../utils/utils';
import { Op } from 'sequelize';
import { Request } from 'express';

class LessonSectionService {

    getLessonSections(req: Request) {
        return lessonSectionRepo.getLessonSections().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get LessonSections', utils.formErrorObj(err));
        })
    }

    getLessonSectionById(req: Request) {
        return lessonSectionRepo.getLessonSectionById(req.params.id).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get LessonSection by id', utils.formErrorObj(err));
        })
    }

    saveLessonSection(req: Request) {
        const lessonSection = LessonSection.build(req.body);
        return lessonSection.save().then(val => {
            return responseUtil.formSuccessResponse('LessonSection saved successfully', val.toJSON());
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in LessonSection saving', utils.formErrorObj(err))
        })
    }

    async updateLessonSection(req: Request) {
        return lessonSectionRepo.getLessonSectionById(req.params.id).then(val => {
            return LessonSection.update(
                { ...req.body },
                { returning: true, where: { id: req.params.id } }
            ).then(res => {
                return responseUtil.formSuccessResponse('LessonSection updated successfully', res);
            }).catch(err => {
                console.log('err = ', err);
                return responseUtil.formBadRequestResponse(err.toString(), 'Error in LessonSection updating', utils.formErrorObj(err))
            })
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get LessonSection by id', utils.formErrorObj(err));
        })
    }

    changeLessonSectionStatus(req: Request) {
        return LessonSection.update(
            { status: req.params.status },
            { where: { id: req.params.id } }
        ).then(res => {
            return responseUtil.formSuccessResponse('LessonSection status updated successfully', res);
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in LessonSection status updating', utils.formErrorObj(err))
        })
    }

    getActiveLessonSections(req: Request) {
        return lessonSectionRepo.getActiveLessonSections().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get active LessonSections', err);
        })
    }

    getInActiveLessonSections(req: Request) {
        return lessonSectionRepo.getInActiveLessonSections().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get inactive LessonSections', err);
        })
    }
}

const lessonSectionService = new LessonSectionService();

export default lessonSectionService;