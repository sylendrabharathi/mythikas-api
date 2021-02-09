import appCtrl from './AppCtrl';
import studentParentService from '../services/StudentParentService';
import { Request, Response } from 'express';

class StudentParentCtrl {

	async getStudentParents(req: Request, res: Response) {
		appCtrl.renderResponse(res, studentParentService.getStudentParents(req));
	}

	async getStudentParentById(req: Request, res: Response) {
		appCtrl.renderResponse(res, studentParentService.getStudentParentById(req));
	}

	async saveStudentParent(req: Request, res: Response) {
		appCtrl.renderResponse(res, studentParentService.saveStudentParent(req));
	}

	async updateStudentParent(req: Request, res: Response) {
		appCtrl.renderResponse(res, studentParentService.updateStudentParent(req));
	}

	async getActiveStudentParent(req: Request, res: Response) {
		appCtrl.renderResponse(res, studentParentService.getActiveStudentParents(req));
	}

	async getInActiveStudentParents(req: Request, res: Response) {
		appCtrl.renderResponse(res, studentParentService.getInActiveStudentParents(req));
	}

	async changeStudentParentStatus(req: Request, res: Response) {
		appCtrl.renderResponse(res, studentParentService.changeStudentParentStatus(req));
	}
}

const studentParentCtrl = new StudentParentCtrl();
export default studentParentCtrl;