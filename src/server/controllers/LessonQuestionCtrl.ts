import appCtrl from './AppCtrl';
import lessonQuestionService from '../services/LessonQuestionService';
import { Request, Response } from 'express';

class LessonQuestionCtrl {

	async getLessonQuestions(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonQuestionService.getLessonQuestions(req));
	}

	async getLessonQuestionById(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonQuestionService.getLessonQuestionById(req));
	}

	async saveLessonQuestion(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonQuestionService.saveLessonQuestion(req));
	}

	async updateLessonQuestion(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonQuestionService.updateLessonQuestion(req));
	}

	async getActiveLessonQuestion(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonQuestionService.getActiveLessonQuestions(req));
	}

	async getInActiveLessonQuestions(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonQuestionService.getInActiveLessonQuestions(req));
	}

	async changeLessonQuestionStatus(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonQuestionService.changeLessonQuestionStatus(req));
	}
}

const lessonQuestionCtrl = new LessonQuestionCtrl();
export default lessonQuestionCtrl;