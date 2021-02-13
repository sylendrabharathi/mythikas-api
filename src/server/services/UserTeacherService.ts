import responseUtil from '../utils/ResponseUtil';
import UserTeacher from '../models/UserTeacherModel';
import userTeacherRepo from '../repo/UserTeacherRepo';
import utils from '../utils/utils';
import { Request } from 'express';

class UserTeacherService {

    getUserTeachers(req: Request) {
        return userTeacherRepo.getUserTeachers().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get users', utils.formErrorObj(err));
        })
    }

    getUserTeacherById(req: Request) {
        return userTeacherRepo.getUserTeacherById(req.params.id).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get user by id', utils.formErrorObj(err));
        })
    }

    saveUserTeacher(req: Request) {
        const userTeacher = UserTeacher.build(req.body);
        return userTeacher.save().then(val => {
            return responseUtil.formSuccessResponse('User saved successfully', val.toJSON());
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in user saving', utils.formErrorObj(err))
        })
    }

    async updateUserTeacher(req: Request) {
        return userTeacherRepo.getUserTeacherById(req.params.id).then(val => {
            return UserTeacher.update(
                { ...req.body },
                { returning: true, where: { id: req.params.id } }
            ).then(res => {
                return responseUtil.formSuccessResponse('User updated successfully', res);
            }).catch(err => {
                console.log('err = ', err);
                return responseUtil.formBadRequestResponse(err.toString(), 'Error in user updating', utils.formErrorObj(err))
            })
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get user by id', utils.formErrorObj(err));
        })
    }

    changeUserTeacherStatus(req: Request) {
        return UserTeacher.update(
            { status: req.params.status },
            { where: { id: req.params.id } }
        ).then(res => {
            return responseUtil.formSuccessResponse(`User ${req.params.status !== 'false' ? 'activated' : 'deleted'} successfully`, res);
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in userTeacher status updating', utils.formErrorObj(err))
        })
    }

    getActiveUserTeachers(req: Request) {
        return userTeacherRepo.getActiveUserTeachers().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get active userTeachers', err);
        })
    }

    getInActiveUserTeachers(req: Request) {
        return userTeacherRepo.getInActiveUserTeachers().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get inactive userTeachers', err);
        })
    }
}

const userTeacherService = new UserTeacherService();

export default userTeacherService;