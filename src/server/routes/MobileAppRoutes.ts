import * as express from 'express';
import MobileAppCtrl from './../controllers/MobileAppCtrl';

const router = express.Router();

class MobileAppRoutes {

    constructor(){
        this.loginRoutes();
    }

    loginRoutes() {
        router.post('/studentLogin', MobileAppCtrl.login);
    }
}

new MobileAppRoutes();
export default router;