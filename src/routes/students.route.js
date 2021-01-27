const router = require('express').Router();

const studentCtrl = require('../controllers/student.controller');

router.get(studentCtrl.getStudents);
router.get(studentCtrl.getStudentById);
router.post(studentCtrl.createStudent);
router.patch(studentCtrl.updateStudentById);
router.delete(studentCtrl.deleteStudent);

module.exports = router;