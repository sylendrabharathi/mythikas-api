import { Request, Response } from 'express';
import appCtrl from './AppCtrl';
import MobileAppService from './../services/MobileAppService';
class MobileAppCtrl {

    async login(req: Request, res: Response) {
		appCtrl.renderResponse(res, MobileAppService.login(req));
	}

	async getLessonsByStudentAndStandard(req: Request, res: Response) {
		appCtrl.renderResponse(res, MobileAppService.getLessonsByStudentAndStandard(req));
	}

	async getLessonSectionFullDetailBySectionId(req: Request, res: Response) {
		appCtrl.renderResponse(res, MobileAppService.getLessonSectionFullDetailBySectionId(req));
	}

	async getRelatedLessons(req: Request, res: Response) {
		appCtrl.renderResponse(res, MobileAppService.getRelatedLessonsByStudentAndLesson(req));
	}

	async upsertLessonWatching(req: Request, res: Response) {
		appCtrl.renderResponse(res, MobileAppService.upsertLastWatching(req));
	}

	async getLastWatchingByStudentAndStandard(req: Request, res: Response) {
		appCtrl.renderResponse(res, MobileAppService.getLastWatchingByStudentAndStandard(req));
	}
}

export default new MobileAppCtrl();