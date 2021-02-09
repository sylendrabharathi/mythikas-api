import {Sequelize} from 'sequelize';
import config  from './../config/AppConfig';
// const sequelize = new Sequelize("sqlite::memory:");
import {sequelize} from './Sequelize';
import Subject from './../models/SubjectModel';
import Standard from '../models/StandardModel';
import Role from '../models/RoleModel';
import Privilege from '../models/PrivilegeModel';
import RolePrivilege from '../models/RolePrivilegeModel';
import UserTeacher from '../models/UserTeacherModel';
import StudentParent from '../models/StudentParentModel';
import Lesson from '../models/LessonModel';
import LessonSection from '../models/LessonSectionModel';
import LessonQuestion from '../models/LessonQuestionModel';

class DBCONFIG {

    
    getSequelize() {
        return sequelize;
    }

    connectDB() {
        const seq = this.getSequelize();
        try {
            
            seq.authenticate();
            seq.sync({force: true});
            this.sync();
            console.log('DB is Connected');
            return {error: null, status: 1};
        } catch (error) {
            console.log(error);
            return {error, status: 0};
        }
    }

    sync() {
        Role.sync();
        Privilege.sync();
        UserTeacher.sync();
        RolePrivilege.sync();
        Subject.sync();
        Standard.sync();
        StudentParent.sync();
        Lesson.sync();
        LessonSection.sync();
        LessonQuestion.sync();
    }
}

export default new DBCONFIG();

