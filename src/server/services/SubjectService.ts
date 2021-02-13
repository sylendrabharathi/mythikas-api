import responseUtil from '../utils/ResponseUtil';
import Subject from '../models/SubjectModel';
import subjectRepo from '../repo/SubjectRepo';
import utils from '../utils/utils';
import { Op } from 'sequelize';
import { Request } from 'express';

class SubjectService {

    getSubjects(req: Request) {
        return subjectRepo.getSubjects().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get subjects', utils.formErrorObj(err));
        })
    }

    getSubjectById(req: Request) {
        return subjectRepo.getSubjectById(req.params.id).then(val => {
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get subject by id', utils.formErrorObj(err));
        })
    }

    saveSubject(req: Request) {
        const subject = Subject.build(req.body);
        return subject.save().then(val => {
            return responseUtil.formSuccessResponse('Subject saved successfully', val.toJSON());
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in subject saving', utils.formErrorObj(err))
        })
    }

    async updateSubject(req: Request) {
        return subjectRepo.getSubjectById(req.params.id).then(val => {
            return Subject.update(
                { ...req.body },
                { returning: true, where: { id: req.params.id } }
            ).then(res => {
                return responseUtil.formSuccessResponse('Subject updated successfully', res);
            }).catch(err => {
                console.log('err = ', err);
                return responseUtil.formBadRequestResponse(err.toString(), 'Error in subject updating', utils.formErrorObj(err))
            })
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get subject by id', utils.formErrorObj(err));
        })
    }

    changeSubjectStatus(req: Request) {
        return Subject.update(
            { status: req.params.status },
            { where: { id: req.params.id } }
        ).then(res => {
            return responseUtil.formSuccessResponse(`Subject ${req.params.status !== 'false' ? 'activated' : 'deleted'} successfully`, res);
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in subject status updating', utils.formErrorObj(err))
        })
    }

    getActiveSubjects(req: Request) {
        return subjectRepo.getActiveSubjects().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get active subjects', err);
        })
    }

    getInActiveSubjects(req: Request) {
        return subjectRepo.getInActiveSubjects().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get inactive subjects', err);
        })
    }
}

const subjectService = new SubjectService();

export default subjectService;