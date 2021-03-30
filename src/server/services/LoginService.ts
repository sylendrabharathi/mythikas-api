import { Request } from "express";
import userTeacherRepo from "../repo/UserTeacherRepo";
import passwordUtil from "../utils/PasswordUtil";
import responseUtil from '../utils/ResponseUtil';
import utils from '../utils/Utils';

class LoginService {

    userLogin(req: Request) {
        return userTeacherRepo.userLogin(req.body.username, passwordUtil.encryptText(req.body.password)).then(val => {
            console.log('val = ', val);
            
            if(!val[0]) {
                return responseUtil.formBadRequestResponse('not found', 'Invalid Credential', null);
            }
            return responseUtil.formSuccessResponse('LoggedIn Successfully', val[0]);
        }).catch(err => {            
            return responseUtil.formBadRequestResponse(err.toString(), 'error in login', utils.formErrorObj(err));
        });
    }
}

export default new LoginService();