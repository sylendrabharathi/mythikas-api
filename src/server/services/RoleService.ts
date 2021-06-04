import responseUtil from '../utils/ResponseUtil';
import Role from '../models/RoleModel';
import RolePrivilege from '../models/RolePrivilegeModel';
import roleRepo from '../repo/RoleRepo';
import rolePrivilegeRepo from '../repo/RolePrivilegeRepo';
import utils from '../utils/Utils';
import { Op } from 'sequelize';
import { Request } from 'express';

class RoleService {

    getRoles(req: Request) {
        return roleRepo.getRoles().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get roles', utils.formErrorObj(err)));
        })
    }

    getRoleById(req: Request) {
        return roleRepo.getRoleById(req.params.id).then(val => {
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get role by id', utils.formErrorObj(err)));
        })
    }

    saveRole(req: Request) {
        const role = Role.build(req.body);
        return role.save().then(val => {
            return responseUtil.formSuccessResponse('Role saved successfully', val.toJSON());
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'Error in role saving', utils.formErrorObj(err)))
        })
    }

    async updateRole(req: Request) {
        return roleRepo.getRoleById(req.params.id).then(val => {
            return Role.update(
                { ...req.body },
                { returning: true, where: { id: req.params.id } }
            ).then(res => {
                return responseUtil.formSuccessResponse('Role updated successfully', res);
            }).catch(err => {
                console.log('err = ', err);
                return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'Error in role updating', utils.formErrorObj(err)))
            })
        }).catch(err => {
            console.log('err = ', err);
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get role by id', utils.formErrorObj(err)));
        })
    }

    changeRoleStatus(req: Request) {
        return Role.update(
            { status: req.params.status },
            { where: { id: req.params.id } }
        ).then(res => {
            return responseUtil.formSuccessResponse('Role status updated successfully', res);
        }).catch(err => {
            console.log('err = ', err);
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'Error in role status updating', utils.formErrorObj(err)))
        })
    }

    getActiveRoles(req: Request) {
        return roleRepo.getActiveRoles().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get active roles', err));
        })
    }

    getInActiveRoles(req: Request) {
        return roleRepo.getInActiveRoles().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get inactive roles', err));
        })
    }

    async getRolePriviligesByRoleId(req: Request) {
        return rolePrivilegeRepo.getRolePrivilegeByRoleId(req.params.roleId).then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in get getRolePriviligesByRoleId', err));
        })
    }

    async updateRolePrivileges(req: Request) {
        const records = req.body;        
        for(const r of records) {
            const rp = RolePrivilege.build(r);
            const s = await RolePrivilege.update(
                { ...r },
                { returning: true, where: { roleId: r.roleId, privilegeId: r.privilegeId } }
            );
            
        }

        return responseUtil.formSuccessResponse('', 'Role & Privilege(s) updated successfully');
    }
}

const roleService = new RoleService();

export default roleService;