import appCtrl from './AppCtrl';
import lessonSectionService from '../services/LessonSectionService';
import { Request, Response } from 'express';
import * as Formidable from 'formidable';
import * as multer from 'multer';

const upload = multer({ dest: 'uploads/' });

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

	uploadFile(req: Request, res: Response) {

		try {
			appCtrl.renderResponse(res, lessonSectionService.uploadSectionFile(req));
		} catch(e) {
			console.log(e);
			res.status(500);
			res.send(e);
		}

	}
}

const lessonSectionCtrl = new LessonSectionCtrl();
export default lessonSectionCtrl;