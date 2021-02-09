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
            // seq.sync({force: true});
            // this.sync();
            // this.initDB();
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

    initDB() {
        console.log('Initialize DB Requirements ...');
        
        this.initRoles();
        this.initUser();
    }

    async initRoles() {
        console.log('Adding Roles.....');
        
        const roles = [
            {id: 1, name: 'Admin', description: ''},
            {id: 2, name: 'Teacher', description: ''}
        ];
        for(const role of roles) {
            const roleIns = await Role.build(role);
            roleIns.save().then(val => {

            }, err => {
                console.log('role add error = ', err);
                
            })
        }

    }

    async initUser() {
        console.log('Adding Users....');
        
        const users = [
            {id: 1, firstName: 'Admin', lastName: '', gender: 'M',
                phoneNumber: '9597035766', emailId: 'admin@mythikas.com',
                role: 1}
        ];
        for(const user of users) {
            const userIns = UserTeacher.build(user);
            userIns.save().then(val => {

            }).catch(err => {
                console.log('error in add user = ', err);
                
            })
        }
    }
}

export default new DBCONFIG();

