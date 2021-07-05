import { Response } from "express";

import responseUtil, {AppResponse} from './../utils/ResponseUtil';

class AppCtrl {

    renderResponse(res:Response, val: Promise<AppResponse>) {
        val.then(obj => {
            if(obj.status === 200) {
                this.renderJSON(res, obj);
                return;
            }
            this.renderError(res, obj.status || 400, obj);
        }, (e) => {
            this.renderError(res, e.status || 400, e);

        }).catch(err => {
            console.log("[ERROR]", err);
            var e = err.toString();
            if ((typeof err) === "object") e = JSON.stringify(err);
            var internalError = responseUtil.formInternalErrorResponse(e);
            this.renderError(res, internalError.status, internalError);
        });
    }

    renderJSON(res: Response, obj: any) {
        res.json(obj);
    }

    renderError(res, status, obj) {
        res.status(status).json(obj);
    }
}

export default new AppCtrl();