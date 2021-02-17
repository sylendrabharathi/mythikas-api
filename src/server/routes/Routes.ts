import * as express from 'express';
import SubjectCtrl from './../controllers/SubjectCtrl';
import StandardCtrl from './../controllers/StandardCtrl';
import LessonCtrl from '../controllers/LessonCtrl';
import LessonQuestionCtrl from '../controllers/LessonQuestionCtrl';
import LessonSectionCtrl from '../controllers/LessonSectionCtrl';
import StudentParentCtrl from '../controllers/StudentParentCtrl';
import UserTeacherCtrl from '../controllers/UserTeacherCtrl';
import RoleCtrl from '../controllers/RoleCtrl';
import LoginCtrl from '../controllers/LoginCtrl';

const router = express.Router();

class AppRoutes {

    constructor() {
        router.use(function timeLog(req: express.Request, res: express.Response, next: express.NextFunction) {
            console.log('Time: ', Date.now());
            next();
        });
        this.lessonRoutes();
        this.lessonQuestionRoutes();
        this.lessonSectionRoutes();
        this.roleRoutes();
        this.studentParentRoutes();
        this.userTeacherRoutes();
        this.subjectRoutes();
        this.standardRoutes();
        this.loginRoutes();
    }
    
    subjectRoutes() {
        const subject = '/subject';
        router.get(`${subject}/list`, SubjectCtrl.getSubjects);
        router.get(`${subject}/:id`, SubjectCtrl.getSubjectById);
        router.post(`${subject}`, SubjectCtrl.saveSubject);
        router.put(`${subject}/:id`, SubjectCtrl.updateSubject);
        router.put(`${subject}/:id/:status`, SubjectCtrl.changeSubjectStatus);
        router.get(`${subject}/list/active`, SubjectCtrl.getActiveSubjects);
        router.get(`${subject}/list/inactive`, SubjectCtrl.getInActiveSubjects);
    }

    standardRoutes() {
        const standard = '/standard';
        router.get(`${standard}/list`, StandardCtrl.getStandards);
        router.get(`${standard}/:id`, StandardCtrl.getStandardById);
        router.post(`${standard}`, StandardCtrl.saveStandard);
        router.put(`${standard}/:id`, StandardCtrl.updateStandard);
        router.put(`${standard}/:id/:status`, StandardCtrl.changeStandardStatus);
        router.get(`${standard}/list/active`, StandardCtrl.getActiveStandard);
        router.get(`${standard}/list/inactive`, StandardCtrl.getInActiveStandards);
    }

    lessonRoutes() {
        const lesson = '/lesson';
        router.get(`${lesson}/list`, LessonCtrl.getLessons);
        router.get(`${lesson}/:id`, LessonCtrl.getLessonById);
        router.post(`${lesson}`, LessonCtrl.saveLesson);
        router.put(`${lesson}/:id`, LessonCtrl.updateLesson);
        router.put(`${lesson}/:id/:status`, LessonCtrl.changeLessonStatus);
        router.get(`${lesson}/list/active`, LessonCtrl.getActiveLesson);
        router.get(`${lesson}/list/inactive`, LessonCtrl.getInActiveLessons);
        router.post(`${lesson}/list/filter`, LessonCtrl.filterLessonList);
    }

    lessonQuestionRoutes() {
        const lessonQuestion = '/lessonQuestion';
        router.get(`${lessonQuestion}/list`, LessonQuestionCtrl.getLessonQuestions);
        router.get(`${lessonQuestion}/:id`, LessonQuestionCtrl.getLessonQuestionById);
        router.post(`${lessonQuestion}`, LessonQuestionCtrl.saveLessonQuestion);
        router.put(`${lessonQuestion}/:id`, LessonQuestionCtrl.updateLessonQuestion);
        router.put(`${lessonQuestion}/:id/:status`, LessonQuestionCtrl.changeLessonQuestionStatus);
        router.get(`${lessonQuestion}/list/active`, LessonQuestionCtrl.getActiveLessonQuestion);
        router.get(`${lessonQuestion}/list/inactive`, LessonQuestionCtrl.getInActiveLessonQuestions);
    }

    lessonSectionRoutes() {
        const lessonSection = '/lessonSection';
        router.get(`${lessonSection}/list`, LessonSectionCtrl.getLessonSections);
        router.get(`${lessonSection}/:id`, LessonSectionCtrl.getLessonSectionById);
        router.post(`${lessonSection}`, LessonSectionCtrl.saveLessonSection);
        router.put(`${lessonSection}/:id`, LessonSectionCtrl.updateLessonSection);
        router.put(`${lessonSection}/:id/:status`, LessonSectionCtrl.changeLessonSectionStatus);
        router.get(`${lessonSection}/list/active`, LessonSectionCtrl.getActiveLessonSection);
        router.get(`${lessonSection}/list/inactive`, LessonSectionCtrl.getInActiveLessonSections);
        router.get(`${lessonSection}/:lessonId/list`, LessonSectionCtrl.getLessonSectionsByLessonId);
    }

    studentParentRoutes() {
        const studentParent = '/studentParent';
        router.get(`${studentParent}/list`, StudentParentCtrl.getStudentParents);
        router.get(`${studentParent}/:id`, StudentParentCtrl.getStudentParentById);
        router.post(`${studentParent}`, StudentParentCtrl.saveStudentParent);
        router.put(`${studentParent}/:id`, StudentParentCtrl.updateStudentParent);
        router.put(`${studentParent}/:id/:status`, StudentParentCtrl.changeStudentParentStatus);
        router.get(`${studentParent}/list/active`, StudentParentCtrl.getActiveStudentParent);
        router.get(`${studentParent}/list/inactive`, StudentParentCtrl.getInActiveStudentParents);
    }

    userTeacherRoutes() {
        const userTeacher = '/userTeacher';
        router.get(`${userTeacher}/list`, UserTeacherCtrl.getUserTeachers);
        router.get(`${userTeacher}/:id`, UserTeacherCtrl.getUserTeacherById);
        router.post(`${userTeacher}`, UserTeacherCtrl.saveUserTeacher);
        router.put(`${userTeacher}/:id`, UserTeacherCtrl.updateUserTeacher);
        router.put(`${userTeacher}/:id/:status`, UserTeacherCtrl.changeUserTeacherStatus);
        router.get(`${userTeacher}/list/active`, UserTeacherCtrl.getActiveUserTeacher);
        router.get(`${userTeacher}/list/inactive`, UserTeacherCtrl.getInActiveUserTeachers);
    }

    roleRoutes() {
        const role = '/role';
        router.get(`${role}/list`, RoleCtrl.getRoles);
        router.get(`${role}/:id`, RoleCtrl.getRoleById);
        router.post(`${role}`, RoleCtrl.saveRole);
        router.put(`${role}/:id`, RoleCtrl.updateRole);
        router.put(`${role}/:id/:status`, RoleCtrl.changeRoleStatus);
        router.get(`${role}/list/active`, RoleCtrl.getActiveRole);
        router.get(`${role}/list/inactive`, RoleCtrl.getInActiveRoles);
    }

    loginRoutes() {
        router.post('/userLogin', LoginCtrl.userLogin)
    }
}

new AppRoutes();
export default router;

