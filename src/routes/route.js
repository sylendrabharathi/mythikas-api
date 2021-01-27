const router = require('express').Router();


function studentRoutes() {
    const studentCtrl = require('../controllers/student.controller');
    const student = '/student';
    router.get(`${student}/list`, studentCtrl.getStudents);
    router.get(`${student}/:id`, studentCtrl.getStudentById);
    router.post(`${student}`, studentCtrl.createStudent);
    router.put(`${student}/:id`, studentCtrl.updateStudentById);
    router.delete(`${student}/:id`, studentCtrl.deleteStudent);
}

function subjectRoutes() {
    const subjectCtrl = require('../controllers/subject.controller');
    const subject = '/subject';
    router.get(`${subject}/list`, subjectCtrl.getSubjects);
    router.get(`${subject}/:id`, subjectCtrl.getSubjectById);
    router.post(`${subject}`, subjectCtrl.saveSubject);
    router.put(`${subject}/:id`, subjectCtrl.updateSubject);
    router.delete(`${subject}/:id`, subjectCtrl.deleteSubject);
}

function init() {
    console.log('Initiating Routes...');
    //Middle ware that is specific to this router
    router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now());
        next();
    });

    // router.get('')

    studentRoutes();
    subjectRoutes();
}

init();

module.exports = router;

