import responseUtil from '../utils/ResponseUtil';
import StudentParent from '../models/StudentParentModel';
import studentParentRepo from '../repo/StudentParentRepo';
import utils from '../utils/Utils';
import { Request } from 'express';
import passwordUtil from '../utils/PasswordUtil';

class StudentParentService {

    getStudentParents(req: Request) {
        return studentParentRepo.getStudentParents().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Students', utils.formErrorObj(err));
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
            
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Student by id', utils.formErrorObj(err));
        })
    }

    saveStudentParent(req: Request) {
        req.body.password = passwordUtil.encryptText(req.body.password);
        const studentParent = StudentParent.build(req.body);
        return studentParent.save().then(val => {
            console.log('save success');
            
            return responseUtil.formSuccessResponse('Student saved successfully', val.toJSON());
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in Student saving', utils.formErrorObj(err))
        })
    }

    async updateStudentParent(req: Request) {
        return studentParentRepo.getStudentParentById(req.params.id).then(val => {
            return StudentParent.update(
                { ...req.body },
                { returning: true, where: { id: req.params.id } }
            ).then(res => {
                return responseUtil.formSuccessResponse('Student updated successfully', res);
            }).catch(err => {
                console.log('err = ', err);
                return responseUtil.formBadRequestResponse(err.toString(), 'Error in Student updating', utils.formErrorObj(err))
            })
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Student by id', utils.formErrorObj(err));
        })
    }

    changeStudentParentStatus(req: Request) {
        return StudentParent.update(
            { status: req.params.status },
            { where: { id: req.params.id } }
        ).then(res => {
            return responseUtil.formSuccessResponse(`Student ${req.params.status !== 'false' ? 'activated' : 'deleted'} successfully`, res);
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in Student status updating', utils.formErrorObj(err))
        })
    }

    getActiveStudentParents(req: Request) {
        return studentParentRepo.getActiveStudentParents().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get active Students', err);
        })
    }

    getInActiveStudentParents(req: Request) {
        return studentParentRepo.getInActiveStudentParents().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get inactive Students', err);
        })
    }

    changeStudentParentApproval(req: Request) {
        return StudentParent.update(
            { isApproved: req.params.isApproved },
            { where: { id: req.params.id } }
        ).then(res => {
            return responseUtil.formSuccessResponse(`Student registration ${req.params.isApproved !== 'false' ? 'Approved' : 'Denied'} successfully`, res);
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in Student approval updating', utils.formErrorObj(err))
        })
    }
}

const studentParentService = new StudentParentService();

export default studentParentService;