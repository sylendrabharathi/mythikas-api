import { Sequelize } from 'sequelize';
import config from './../config/AppConfig';
// const sequelize = new Sequelize("sqlite::memory:");
import { sequelize } from './Sequelize';
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
import LessonAssessment from '../models/LessonAssessmentModel';
import LessonWatching from '../models/LessonWatchingModel';
import PasswordUtil from '../utils/PasswordUtil';

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
            // LessonAssessment.sync();
            // LessonWatching.sync();
            console.log('DB is Connected');
            return { error: null, status: 1 };
        } catch (error) {
            console.log(error);
            return { error, status: 0 };
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
        this.initPrivileges();
        this.initRolePrivileges();
    }

    async initRoles() {
        console.log('Adding Roles.....');

        const roles = [
            { id: 1, name: 'Admin', description: '' },
            { id: 2, name: 'Teacher', description: '' }
        ];
        for (const role of roles) {
            const roleIns = await Role.build(role);
            roleIns.save().then(val => {

            }, err => {
                console.log('role add error = ', err);

            })
        }

    }

    async initPrivileges() {
        console.log('Adding Privileges.....');

        const dashboards = [
            { id: 1, code: 'VDAS', description: 'View Dashboard', status: true, group: 'DASHBOARD' }
        ];

        const subjects = [
            { id: 2, code: 'VSUB', description: 'View Subject(s)', status: true, group: 'SUBJECT' },
            { id: 3, code: 'MSUB', description: 'Add/Edit Subject', status: true, group: 'SUBJECT' },
            { id: 4, code: 'DSUB', description: 'Delete Subject', status: true, group: 'SUBJECT' }
        ];

        const standards = [
            { id: 5, code: 'VSTA', description: 'View Standard(s)', status: true, group: 'STANDARD' },
            { id: 6, code: 'MSTA', description: 'Add/Edit Standard', status: true, group: 'STANDARD' },
            { id: 7, code: 'DSTA', description: 'Delete Standard', status: true, group: 'STANDARD' }
        ];

        const lessons = [
            { id: 8, code: 'VLES', description: 'View Lesson(s)', status: true, group: 'LESSON' },
            { id: 9, code: 'MLES', description: 'Add/Edit Lesson', status: true, group: 'LESSON' },
            { id: 10, code: 'DLES', description: 'Delete Lesson', status: true, group: 'LESSON' }
        ];

        const students = [
            { id: 11, code: 'VSTU', description: 'View Student(s)', status: true, group: 'STUDENT' },
            { id: 12, code: 'MSTU', description: 'Add/Edit Student', status: true, group: 'STUDENT' },
            { id: 13, code: 'DSTU', description: 'Delete Student', status: true, group: 'STUDENT' }
        ];

        const users = [
            { id: 14, code: 'VUST', description: 'View User/Teacher(s)', status: true, group: 'USER/TEACHER' },
            { id: 15, code: 'MUST', description: 'Add/Edit User/Teacher', status: true, group: 'USER/TEACHER' },
            { id: 16, code: 'DUST', description: 'Delete User/Teacher', status: true, group: 'USER/TEACHER' }
        ];

        const rolePrivileges = [
            { id: 17, code: 'VROP', description: 'View Role & Privilege(s)', status: true, group: 'ROLE & PRIVILEGE' },
            { id: 18, code: 'MROP', description: 'Add/Edit Role & Privilege', status: true, group: 'ROLE & PRIVILEGE' }
        ];

        const privileges = [...dashboards, ...subjects, ...standards, ...lessons, ...students, ...users, ...rolePrivileges];

        for (const privilege of privileges) {
            const privilegeIns = Privilege.build(privilege);
            privilegeIns.save().then(val => {

            }).catch(err => {
                console.log('error in add privilege = ', err);

            });
        }
    }

    async initUser() {
        console.log('Adding Users....');

        const users = [
            {
                id: 1, firstName: 'Admin', lastName: '', gender: 'M',
                phoneNumber: '9597035766', emailId: 'admin@mythikas.com',
                roleId: 1, password: PasswordUtil.encryptText('Welcome@321')
            }
        ];
        for (const user of users) {
            const userIns = UserTeacher.build(user);
            userIns.save().then(val => {

            }).catch(err => {
                console.log('error in add user = ', err);

            });
        }
    }

    async initRolePrivileges() {
        console.log('Adding Role/Prvileges...');

        const admin = [
            { privilegeId: 1, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 2, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 3, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 4, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 5, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 6, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 7, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 8, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 9, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 10, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 11, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 12, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 13, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 14, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 15, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 16, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 17, roleId: 1, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 18, roleId: 1, status: true, createdBy: 1, updatedBy: 1 }
        ];

        const teacher = [
            { privilegeId: 1, roleId: 2, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 2, roleId: 2, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 3, roleId: 2, status: false, createdBy: 1, updatedBy: 1 },
            { privilegeId: 4, roleId: 2, status: false, createdBy: 1, updatedBy: 1 },
            { privilegeId: 5, roleId: 2, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 6, roleId: 2, status: false, createdBy: 1, updatedBy: 1 },
            { privilegeId: 7, roleId: 2, status: false, createdBy: 1, updatedBy: 1 },
            { privilegeId: 8, roleId: 2, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 9, roleId: 2, status: false, createdBy: 1, updatedBy: 1 },
            { privilegeId: 10, roleId: 2, status: false, createdBy: 1, updatedBy: 1 },
            { privilegeId: 11, roleId: 2, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 12, roleId: 2, status: false, createdBy: 1, updatedBy: 1 },
            { privilegeId: 13, roleId: 2, status: false, createdBy: 1, updatedBy: 1 },
            { privilegeId: 14, roleId: 2, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 15, roleId: 2, status: false, createdBy: 1, updatedBy: 1 },
            { privilegeId: 16, roleId: 2, status: false, createdBy: 1, updatedBy: 1 },
            { privilegeId: 17, roleId: 2, status: true, createdBy: 1, updatedBy: 1 },
            { privilegeId: 18, roleId: 2, status: false, createdBy: 1, updatedBy: 1 }
        ];

        const rolePrivileges = [...admin, ...teacher];

        for(const rp of rolePrivileges) {
            const rpIns = RolePrivilege.build(rp);
            rpIns.save().then(val => {

            }).catch(err => {
                console.log('error in add Role Privilege = ', err);

            });
        }
    }
}

export default new DBCONFIG();

