import appCtrl from './AppCtrl';
import assessmentTestService from '../services/AssessmentTestService';
import { Request, Response } from 'express';

class AssessmentTestCtrl {

	async getAssessmentTests(req: Request, res: Response) {
		appCtrl.renderResponse(res, assessmentTestService.getAssessmentTests(req));
	}

	async getAssessmentTestsByStudentId(req: Request, res: Response) {
		appCtrl.renderResponse(res, assessmentTestService.getAssessmentTestsByStudentId(req));
	}

    async getAssessmentTestsByLessonAssessmentId(req: Request, res: Response) {
		appCtrl.renderResponse(res, assessmentTestService.getAssessmentTestsByLessonAssessmentId(req));
	}

    async getAssessmentTestByStudentIdAndLessonAssessmentId(req: Request, res: Response) {
		appCtrl.renderResponse(res, assessmentTestService.getAssessmentTestByStudentIdAndLessonAssessmentId(req));
	}

	async saveAssessmentTest(req: Request, res: Response) {
		appCtrl.renderResponse(res, assessmentTestService.saveAssessmentTest(req));
	}
	
}

const assessmentTestCtrl = new AssessmentTestCtrl();
export default assessmentTestCtrl;