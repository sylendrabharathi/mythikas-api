import appCtrl from './AppCtrl';
import roleService from '../services/RoleService';
import { Request, Response } from 'express';

class RoleCtrl {

	async getRoles(req: Request, res: Response) {
		appCtrl.renderResponse(res, roleService.getRoles(req));
	}

	async getRoleById(req: Request, res: Response) {
		appCtrl.renderResponse(res, roleService.getRoleById(req));
	}

	async saveRole(req: Request, res: Response) {
		appCtrl.renderResponse(res, roleService.saveRole(req));
	}

	async updateRole(req: Request, res: Response) {
		appCtrl.renderResponse(res, roleService.updateRole(req));
	}

	async getActiveRole(req: Request, res: Response) {
		appCtrl.renderResponse(res, roleService.getActiveRoles(req));
	}

	async getInActiveRoles(req: Request, res: Response) {
		appCtrl.renderResponse(res, roleService.getInActiveRoles(req));
	}

	async changeRoleStatus(req: Request, res: Response) {
		appCtrl.renderResponse(res, roleService.changeRoleStatus(req));
	}

	async getRolePrivilegesByRoleId(req: Request, res: Response) {
		appCtrl.renderResponse(res, roleService.getRolePriviligesByRoleId(req));
	}

	async updateRolePrivileges(req: Request, res: Response) {		
		appCtrl.renderResponse(res, roleService.updateRolePrivileges(req));
	}
}

const roleCtrl = new RoleCtrl();
export default roleCtrl;