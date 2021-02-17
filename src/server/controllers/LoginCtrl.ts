import appCtrl from "./AppCtrl";
import loginService from './../services/LoginService';
import { Request, Response } from "express";

class LoginCtrl {
    async userLogin(req: Request, res: Response) {
        appCtrl.renderResponse(res, loginService.userLogin(req));
    }
}

export default new LoginCtrl();