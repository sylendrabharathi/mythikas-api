import responseUtil from '../utils/ResponseUtil';
import LessonWatching from '../models/LessonWatchingModel';
import lessonWatchingRepo from '../repo/LessonWatchingRepo';
import utils from '../utils/Utils';
import { Op } from 'sequelize';
import { Request } from 'express';

class LessonWatchingService {

    getLastWatchingHistoryByStudentId(req: Request) {
        let studentId = parseInt(req.params.studentId);

        return lessonWatchingRepo.getLastWatchingHistoryByStudentId(studentId).then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in fetch Lesson Watching history', utils.formErrorObj(err));
        })
    }
}

const lessonWatchingService = new LessonWatchingService();

export default lessonWatchingService;