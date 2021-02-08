import { Response } from "express";

import {AppResponse} from './../utils/ResponseUtil';

class AppCtrl {

    renderResponse(res:Response, val: Promise<AppResponse>) {
        val.then(obj => {
            if(obj.status === 200) {
                this.renderJSON(res, obj);
                return;
            }
            this.renderError(res, obj.status, obj);
        }).catch(err => {
            this.renderError(res, err.status, err);
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