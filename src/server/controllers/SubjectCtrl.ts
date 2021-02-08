import appCtrl from './AppCtrl';
import subjectService from '../services/SubjectService';
import { Request, Response } from 'express';

class SubjectCtrl {

	async getSubjects(req: Request, res: Response) {
		appCtrl.renderResponse(res, subjectService.getSubjects(req));
	}

	async getSubjectById(req: Request, res: Response) {
		appCtrl.renderResponse(res, subjectService.getSubjectById(req));
	}

	async saveSubject(req: Request, res: Response) {
		appCtrl.renderResponse(res, subjectService.saveSubject(req));
	}

	async updateSubject(req: Request, res: Response) {
		appCtrl.renderResponse(res, subjectService.updateSubject(req));
	}

	async getActiveSubjects(req: Request, res: Response) {
		appCtrl.renderResponse(res, subjectService.getActiveSubjects(req));
	}

	async getInActiveSubjects(req: Request, res: Response) {
		appCtrl.renderResponse(res, subjectService.getInActiveSubjects(req));
	}

	async changeSubjectStatus(req: Request, res: Response) {
		appCtrl.renderResponse(res, subjectService.changeSubjectStatus(req));
	}
}

const subjectCtrl = new SubjectCtrl();
export default subjectCtrl;