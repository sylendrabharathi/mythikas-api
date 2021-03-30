import appCtrl from './AppCtrl';
import standardService from '../services/StandardService';
import { Request, Response } from 'express';

class StandardCtrl {

	async getStandards(req: Request, res: Response) {
		const p = null;
		p.log = 'p'
		appCtrl.renderResponse(res, standardService.getStandards(req));
	}

	async getStandardById(req: Request, res: Response) {
		appCtrl.renderResponse(res, standardService.getStandardById(req));
	}

	async saveStandard(req: Request, res: Response) {
		appCtrl.renderResponse(res, standardService.saveStandard(req));
	}

	async updateStandard(req: Request, res: Response) {
		appCtrl.renderResponse(res, standardService.updateStandard(req));
	}

	async getActiveStandard(req: Request, res: Response) {
		appCtrl.renderResponse(res, standardService.getActiveStandards(req));
	}

	async getInActiveStandards(req: Request, res: Response) {
		appCtrl.renderResponse(res, standardService.getInActiveStandards(req));
	}

	async changeStandardStatus(req: Request, res: Response) {
		appCtrl.renderResponse(res, standardService.changeStandardStatus(req));
	}
}

const standardCtrl = new StandardCtrl();
export default standardCtrl;