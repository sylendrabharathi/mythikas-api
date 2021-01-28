class Utils {
    formErrorObj(err) {
        const errObj = {};
        err.errors.map(er => {
            errObj[er.path] = er.message;
        });
        return errObj;
    }
}

const utils = new Utils();

module.exports = utils;