import * as express from 'express';
import SubjectCtrl from './../controllers/SubjectCtrl';
const router = express.Router();

class AppRoutes {

    constructor() {
        router.use(function timeLog(req, res, next) {
            console.log('Time: ', Date.now());
            next();
        });
        this.subjectRoutes();
    }
    subjectRoutes() {
        const subject = '/subject';
        router.get(`${subject}/list`, SubjectCtrl.getSubjects);
        router.get(`${subject}/:id`, SubjectCtrl.getSubjectById);
        router.post(`${subject}`, SubjectCtrl.saveSubject);
        router.put(`${subject}/:id`, SubjectCtrl.updateSubject);
        router.put(`${subject}/:id/:status`, SubjectCtrl.changeSubjectStatus);
        router.get(`${subject}/list/active`, SubjectCtrl.getActiveSubjects);
        router.get(`${subject}/list/inactive`, SubjectCtrl.getInActiveSubjects);
    }
}

new AppRoutes();
export default router;

