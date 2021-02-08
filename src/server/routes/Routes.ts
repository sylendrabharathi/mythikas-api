import * as express from 'express';
import SubjectCtrl from './../controllers/SubjectCtrl';
import StandardCtrl from './../controllers/StandardCtrl';
const router = express.Router();

class AppRoutes {

    constructor() {
        router.use(function timeLog(req: express.Request, res: express.Response, next: express.NextFunction) {
            console.log('Time: ', Date.now());
            next();
        });
        this.subjectRoutes();
        this.standardRoutes();
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

    standardRoutes() {
        const standard = '/standard';
        router.get(`${standard}/list`, StandardCtrl.getStandards);
        router.get(`${standard}/:id`, StandardCtrl.getStandardById);
        router.post(`${standard}`, StandardCtrl.saveStandard);
        router.put(`${standard}/:id`, StandardCtrl.updateStandard);
        router.put(`${standard}/:id/:status`, StandardCtrl.changeStandardStatus);
        router.get(`${standard}/list/active`, StandardCtrl.getActiveStandard);
        router.get(`${standard}/list/inactive`, StandardCtrl.getInActiveStandards);
    }
}

new AppRoutes();
export default router;

