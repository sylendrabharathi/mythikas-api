import { Response } from "express";

class AppCtrl {

    renderResponse(res:Response, val: any) {
        val.then(obj => {
            this.renderJSON(res, obj);
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