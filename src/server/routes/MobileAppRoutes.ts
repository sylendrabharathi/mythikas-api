import * as express from 'express';
import MobileAppCtrl from './../controllers/MobileAppCtrl';

const router = express.Router();

class MobileAppRoutes {

    constructor(){
        this.loginRoutes();
        this.getLessonRoutes();
    }

    loginRoutes() {
        router.post('/studentLogin', MobileAppCtrl.login);
    }

    getLessonRoutes() {
        router.get('/student/:studentId/lessons', MobileAppCtrl.getLessonsByStudentAndStandard);
    }
}

new MobileAppRoutes();
export default router;