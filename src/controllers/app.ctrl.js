class AppCtrl {

    renderResponse(res, val) {
        val.then(obj => {
            this.renderJSON(res, obj);
        }).catch(err => {
            this.renderError(res, err.status, err);
        });

    }

    renderJSON(res, obj) {
        res.json(obj);
    }

    renderError(res, status, obj) {
        res.status(status).json(obj);
    }
}

const appCtrl = new AppCtrl();

module.exports = appCtrl;