import responseUtil from '../utils/ResponseUtil';
import SectionTest from '../models/SectionTestModel';
import sectionTestRepo from '../repo/SectionTestRepo';
import utils from '../utils/Utils';
import { Op } from 'sequelize';
import { Request } from 'express';

class SectionTestService {

    getSectionTests(req: Request) {
        return sectionTestRepo.getSectionTests().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Sections', utils.formErrorObj(err));
        })
    }

    getSectionTestsByStudentId(req: Request) {
        return sectionTestRepo.getSectionTestsByStudentId(req.params.studentId).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Section Tests by studentId', utils.formErrorObj(err));
        })
    }

    getSectionTestsByLessonSectionId(req: Request) {
        return sectionTestRepo.getSectionTestsByLessonSectionId(req.params.lessonSectionId).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Section Tests by lessonSectionId', utils.formErrorObj(err));
        })
    }

    getSectionTestsByLessonId(req: Request) {
        return sectionTestRepo.getSectionTestsByLessonId(parseInt(req.params.lessonId)).then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in Section Tests by lessonId', err);
        })
    }

    getSectionTestByStudentIdAndLessonSectionIdAndLessonId(req: Request) {
        let studentId = parseInt(req.query?.studentId[0]);
        let lessonSectionId = parseInt(req.query?.lessonSectionId[0]);
        let lessonId = parseInt(req.query?.lessonId[0]);
        return sectionTestRepo.getSectionTestByStudentIdAndLessonSectionIdAndLessonId(studentId, lessonSectionId, lessonId).then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in Section Tests by studentId, lessonSectionId, lessonId', err);
        })
    }

    saveSectionTest(req: Request) {
        //calculate marks
        if (req.body.questionAnswers) {
            //initialize totalMarks and studentMarks
            if (!req.body.totalMarks) req.body.totalMarks = 0;
            if (!req.body.studentMarks) req.body.studentMarks = 0;

            req.body.questionAnswers.forEach(q => {
                //define mark if not
                if (!q.mark) q.mark = 1;
                //sum total marks
                req.body.totalMarks += q.mark;

                //sum student marks
                if (q.answer == q.studentAnswer) {
                    req.body.studentMarks += q.mark;
                }
            });
        }
       
        const sectionTest = SectionTest.build(req.body);

        return sectionTest.save().then(val => {
            return responseUtil.formSuccessResponse('Section Test saved successfully', val.toJSON());
        }).catch(err => {
            if (err.toString().includes("SequelizeUniqueConstraintError")) {
                return this.updateStudentParent(req);
            }
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in Section Test saving', utils.formErrorObj(err))
        })
    }
   
    async updateStudentParent(req: Request) {
        return SectionTest.update(
            { ...req.body },
            { returning: true, where: { studentId: req.body.studentId, lessonSectionId: req.body.lessonSectionId, lessonId: req.body.lessonId } }
        ).then(res => {
            return responseUtil.formSuccessResponse('Section Test saved successfully', res);
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in Section Test saving', utils.formErrorObj(err))
        })
    }

}

const sectionTestService = new SectionTestService();

export default sectionTestService;