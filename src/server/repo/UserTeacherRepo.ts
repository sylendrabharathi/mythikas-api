import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import UserTeacher from '../models/UserTeacherModel';
import Role from '../models/RoleModel';
class UserTeacherRepo {

    async getUserTeachers() {
        const records = sequelize.query(`select * from ${table.userTeacher}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: UserTeacher.build()
        });

        return records;
    }

    async getUserTeacherById(id) {
        const record = UserTeacher.findOne({
            where: {
                id
            },
            include: {
                model: Role,
                as: 'role'
            }
        })

        return record;
    }

    async getActiveUserTeachers() {
        const records = UserTeacher.findAll({
            where: {
                status: true
            },
            include: {
                model: Role,
                as: 'role'
            },
        });

        return records;
    }

    async getInActiveUserTeachers() {
        const records = UserTeacher.findAll({
            where: {
                status: false
            },
            include: {
                model: Role,
                as: 'role'
            },
        })

        return records;
    }

    async userLogin(username: string, password: string) {
        const record = sequelize.query(`select * from ${table.userTeacher} ut where (ut.email_id = :username or ut.phone_number = :username) and ut."password" = :password`, {
            replacements: {
                username,
                password
            },
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: UserTeacher.build()
        });


        return record;
    }

    async getUserRolePrivileges(id) {
        const record = sequelize.query(`select * from ${table.userTeacher} ut inner join role_privilege rp on rp.role_id = ut.role_id
        inner join privilege p on p.id = rp.privilege_id
        where ut.id = :id`, {
            replacements: {
                id
            },
            type: QueryTypes.SELECT
        });


        return record;
    }
}

const userTeacherRepo = new UserTeacherRepo();

export default userTeacherRepo;