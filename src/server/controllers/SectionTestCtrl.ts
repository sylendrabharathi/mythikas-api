import appCtrl from './AppCtrl';
import sectionTestService from '../services/SectionTestService';
import { Request, Response } from 'express';

class SectionTestCtrl {

	async getSectionTests(req: Request, res: Response) {
		appCtrl.renderResponse(res, sectionTestService.getSectionTests(req));
	}

	async getSectionTestsByStudentId(req: Request, res: Response) {
		appCtrl.renderResponse(res, sectionTestService.getSectionTestsByStudentId(req));
	}

    async getSectionTestsByLessonSectionId(req: Request, res: Response) {
		appCtrl.renderResponse(res, sectionTestService.getSectionTestsByLessonSectionId(req));
	}

    async getSectionTestsByLessonId(req: Request, res: Response) {
		appCtrl.renderResponse(res, sectionTestService.getSectionTestsByLessonId(req));
	}

    async getSectionTestByStudentIdAndLessonSectionIdAndLessonId(req: Request, res: Response) {
		appCtrl.renderResponse(res, sectionTestService.getSectionTestByStudentIdAndLessonSectionIdAndLessonId(req));
	}

	async saveSectionTest(req: Request, res: Response) {
		appCtrl.renderResponse(res, sectionTestService.saveSectionTest(req));
	}
	
}

const sectionTestCtrl = new SectionTestCtrl();
export default sectionTestCtrl;