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
}

export default new MobileAppCtrl();