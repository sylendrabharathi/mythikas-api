import appCtrl from './AppCtrl';
import subjectService from './../services/SubjectService';

class SubjectCtrl {

	async getSubjects(req, res) {
		appCtrl.renderResponse(res, subjectService.getSubjects(req));
	}

	async getSubjectById(req, res) {
		appCtrl.renderResponse(res, subjectService.getSubjectById(req));
	}

	async saveSubject(req, res) {
		appCtrl.renderResponse(res, subjectService.saveSubject(req));
	}

	async updateSubject(req, res) {
		appCtrl.renderResponse(res, subjectService.updateSubject(req));
	}

	async getActiveSubjects(req, res) {
		appCtrl.renderResponse(res, subjectService.getActiveSubjects(req));
	}

	async getInActiveSubjects(req, res) {
		appCtrl.renderResponse(res, subjectService.getInActiveSubjects(req));
	}

	async changeSubjectStatus(req, res) {
		appCtrl.renderResponse(res, subjectService.changeSubjectStatus(req));
	}
}

const subjectCtrl = new SubjectCtrl();
export default subjectCtrl;