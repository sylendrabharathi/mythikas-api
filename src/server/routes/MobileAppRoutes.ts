import * as express from 'express';
import MobileAppCtrl from './../controllers/MobileAppCtrl';

const router = express.Router();

class MobileAppRoutes {

    constructor(){
        this.loginRoutes();
        this.getLessonRoutes();
        this.getSectionRoutes();
    }

    loginRoutes() {
        router.post('/studentLogin', MobileAppCtrl.login);
    }

    getLessonRoutes() {
        router.get('/student/:studentId/lessons', MobileAppCtrl.getLessonsByStudentAndStandard);
    }

    getSectionRoutes() {
        router.get('/section/:sectionId/detail', MobileAppCtrl.getLessonSectionFullDetailBySectionId);
    }
}

new MobileAppRoutes();
export default router;