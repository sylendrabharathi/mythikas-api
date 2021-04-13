import appCtrl from './AppCtrl';
import lessonAssessmentService from '../services/LessonAssessmentService';
import { Request, Response } from 'express';

class LessonAssessmentCtrl {

	async getLessonAssessments(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonAssessmentService.getLessonAssessments(req));
	}

	async getLessonAssessmentById(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonAssessmentService.getLessonAssessmentById(req));
	}

	async saveLessonAssessment(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonAssessmentService.saveLessonAssessment(req));
	}

	async updateLessonAssessment(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonAssessmentService.updateLessonAssessment(req));
	}

	async getActiveLessonAssessment(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonAssessmentService.getActiveLessonAssessments(req));
	}

	async getInActiveLessonAssessments(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonAssessmentService.getInActiveLessonAssessments(req));
	}

	async changeLessonAssessmentStatus(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonAssessmentService.changeLessonAssessmentStatus(req));
	}

	async getActiveLessonAssessmentsByLessonId(req: Request, res: Response) {
		appCtrl.renderResponse(res, lessonAssessmentService.getActiveLessonAssessmentsByLessonId(req));
	}

}

const lessonAssessmentCtrl = new LessonAssessmentCtrl();
export default lessonAssessmentCtrl;