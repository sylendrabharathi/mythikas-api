import appCtrl from './AppCtrl';
import lessonSectionService from '../services/LessonSectionService';
import { Request, Response } from 'express';

class LessonSectionCtrl {

	async getLessonSections(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonSectionService.getLessonSections(req));
	}

	async getLessonSectionById(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonSectionService.getLessonSectionById(req));
	}

	async saveLessonSection(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonSectionService.saveLessonSection(req));
	}

	async updateLessonSection(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonSectionService.updateLessonSection(req));
	}

	async getActiveLessonSection(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonSectionService.getActiveLessonSections(req));
	}

	async getInActiveLessonSections(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonSectionService.getInActiveLessonSections(req));
	}

	async changeLessonSectionStatus(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonSectionService.changeLessonSectionStatus(req));
	}

	async getLessonSectionsByLessonId(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonSectionService.getLessonSectionsByLessonId(req));
	}
}

const lessonSectionCtrl = new LessonSectionCtrl();
export default lessonSectionCtrl;