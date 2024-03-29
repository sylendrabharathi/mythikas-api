import * as express from 'express';
import MobileAppCtrl from './../controllers/MobileAppCtrl';

const router = express.Router();

class MobileAppRoutes {

    constructor(){
        this.loginRoutes();
        this.getLessonRoutes();
        this.getSectionRoutes();
    }

    loginRoutes() {
        router.post('/studentLogin', MobileAppCtrl.login);
        router.post('/studentSignUp', MobileAppCtrl.signUpStudentParent);
    }

    getLessonRoutes() {
        router.get('/student/:studentId/lessons', MobileAppCtrl.getLessonsByStudentAndStandard);
        router.get('/student/:studentId/:lessonId/relatedLessons', MobileAppCtrl.getRelatedLessons);
        router.post('/lesson/watching', MobileAppCtrl.upsertLessonWatching);
        router.get('/student/:studentId/lastWatching', MobileAppCtrl.getLastWatchingByStudentAndStandard);
        router.get('/student/:studentId/watchHistory', MobileAppCtrl.getLastWatchingHistoryByStudentId);
        router.get('/student/:studentId/lesson/:lessonId/details', MobileAppCtrl.getLessonDetailsByStudentIdAndLessonId);
        router.get('/lesson/:lessonId/assessment/:assessmentType', MobileAppCtrl.getAssessmentTestsByStudentIdAndLessonId);
        router.get('/lesson/:lessonId/section/:sectionId', MobileAppCtrl.getSectionTestByIdAndStudentIdAndLessonId);
        router.get('/student/:studentId/achievements', MobileAppCtrl.getAchievementsByStudentId);
    }

    getSectionRoutes() {
        router.get('/section/:sectionId/detail', MobileAppCtrl.getLessonSectionFullDetailBySectionId);
        router.get('/lessonSection/:lessonId/list', MobileAppCtrl.getLessonSectionsByLessonIdForStudent);
    }
}

new MobileAppRoutes();
export default router;