import responseUtil from '../utils/ResponseUtil';
import UserTeacher from '../models/UserTeacherModel';
import userTeacherRepo from '../repo/UserTeacherRepo';
import rolePrivilegeRepo from '../repo/RolePrivilegeRepo';
import utils from '../utils/Utils';
import passwordUtil from '../utils/PasswordUtil';
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
            if(!val) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get user by id', utils.formErrorObj(err));
        })
    }

    saveUserTeacher(req: Request) {
        req.body.password = passwordUtil.encryptText(req.body.password);
        const userTeacher = UserTeacher.build(req.body);
        return userTeacher.save().then(val => {
            return responseUtil.formSuccessResponse('User saved successfully', val.toJSON());
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in user saving', utils.formErrorObj(err))
        })
    }

    async updateUserTeacher(req: Request) {
        
        const userObj: any = {};
        for(const k in req.body) {
            userObj[k] = req.body[k];
        }
        delete userObj['password'];
        delete userObj['confirmPassword'];
        
        return userTeacherRepo.getUserTeacherById(req.params.id).then(val => {
            const updateObj = { ...val, ...userObj };
            console.log('update obj = ', updateObj);
            
            return UserTeacher.update(
                updateObj,
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

    async getUserRolePrivileges(req: Request) {
        const user = await userTeacherRepo.getUserTeacherById(req.params.id);
        const userObj = user.toJSON();      
        const records: any = await rolePrivilegeRepo.getDistinctPrivileges(user.roleId);        
        userObj.privileges = records && records[0] && records[0].privileges ? records[0].privileges : [];
        return responseUtil.formSuccessResponse('', userObj);
    }
}

const userTeacherService = new UserTeacherService();

export default userTeacherService;