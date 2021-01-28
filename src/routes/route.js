const router = require('express').Router();

function subjectRoutes() {
    const subjectCtrl = require('../controllers/subject.controller');
    const subject = '/subject';
    router.get(`${subject}/list`, subjectCtrl.getSubjects);
    router.get(`${subject}/:id`, subjectCtrl.getSubjectById);
    router.post(`${subject}`, subjectCtrl.saveSubject);
    router.put(`${subject}/:id`, subjectCtrl.updateSubject);
    router.put(`${subject}/:id/:status`, subjectCtrl.changeSubjectStatus);
    router.get(`${subject}/list/active`, subjectCtrl.getActiveSubjects);
    router.get(`${subject}/list/inactive`, subjectCtrl.getInActiveSubjects);
}

function init() {
    console.log('Initiating Routes...');
    //Middle ware that is specific to this router
    router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now());
        next();
    });

    // router.get('')

    subjectRoutes();
}

init();

module.exports = router;

