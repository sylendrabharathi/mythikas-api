import responseUtil from '../utils/ResponseUtil';
import StudentParent from '../models/StudentParentModel';
import studentParentRepo from '../repo/StudentParentRepo';
import utils from '../utils/utils';
import { Op } from 'sequelize';
import { Request } from 'express';

class StudentParentService {

    getStudentParents(req: Request) {
        return studentParentRepo.getStudentParents().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get StudentParents', utils.formErrorObj(err));
        })
    }

    getStudentParentById(req: Request) {
        return studentParentRepo.getStudentParentById(req.params.id).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get StudentParent by id', utils.formErrorObj(err));
        })
    }

    saveStudentParent(req: Request) {
        const studentParent = StudentParent.build(req.body);
        return studentParent.save().then(val => {
            console.log('save success');
            
            return responseUtil.formSuccessResponse('StudentParent saved successfully', val.toJSON());
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in StudentParent saving', utils.formErrorObj(err))
        })
    }

    async updateStudentParent(req: Request) {
        return studentParentRepo.getStudentParentById(req.params.id).then(val => {
            return StudentParent.update(
                { ...req.body },
                { returning: true, where: { id: req.params.id } }
            ).then(res => {
                return responseUtil.formSuccessResponse('StudentParent updated successfully', res);
            }).catch(err => {
                console.log('err = ', err);
                return responseUtil.formBadRequestResponse(err.toString(), 'Error in StudentParent updating', utils.formErrorObj(err))
            })
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get StudentParent by id', utils.formErrorObj(err));
        })
    }

    changeStudentParentStatus(req: Request) {
        return StudentParent.update(
            { status: req.params.status },
            { where: { id: req.params.id } }
        ).then(res => {
            return responseUtil.formSuccessResponse('StudentParent status updated successfully', res);
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in StudentParent status updating', utils.formErrorObj(err))
        })
    }

    getActiveStudentParents(req: Request) {
        return studentParentRepo.getActiveStudentParents().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get active StudentParents', err);
        })
    }

    getInActiveStudentParents(req: Request) {
        return studentParentRepo.getInActiveStudentParents().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get inactive StudentParents', err);
        })
    }
}

const studentParentService = new StudentParentService();

export default studentParentService;