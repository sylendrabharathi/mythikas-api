import { Request } from "express";
import StudentRepo from './../repo/StudentParentRepo';
import utils from '../utils/Utils';
import passwordUtil from "../utils/PasswordUtil";
import responseUtil from '../utils/ResponseUtil';

class MobileAppService {

    async login(req: Request) {
        return StudentRepo.login(req.body.phoneNumber, passwordUtil.encryptText(req.body.password)).then(val => {
            if(!val || !val.length) {
                return responseUtil.formBadRequestResponse('not found', 'Invalid Credential', null);
            }
            return responseUtil.formSuccessResponse('LoggedIn Successfully', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in login', utils.formErrorObj(err));
        });
    }

}

export default new MobileAppService();