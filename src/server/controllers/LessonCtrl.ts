import appCtrl from './AppCtrl';
import lessonService from '../services/LessonService';
import { Request, Response } from 'express';

class LessonCtrl {

	async getLessons(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonService.getLessons(req));
	}

	async getLessonById(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonService.getLessonById(req));
	}

	async saveLesson(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonService.saveLesson(req));
	}

	async updateLesson(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonService.updateLesson(req));
	}

	async getActiveLesson(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonService.getActiveLessons(req));
	}

	async getInActiveLessons(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonService.getInActiveLessons(req));
	}

	async changeLessonStatus(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonService.changeLessonStatus(req));
	}
}

const lessonCtrl = new LessonCtrl();
export default lessonCtrl;