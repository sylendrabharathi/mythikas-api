import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import UserTeacher from '../models/UserTeacherModel';
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
        const records = sequelize.query(`select * from ${table.userTeacher} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: UserTeacher.build()
        });

        return records;
    }

    async getActiveUserTeachers() {
        const records = sequelize.query(`select * from ${table.userTeacher} where status = true`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: UserTeacher.build()
        });

        return records;
    }

    async getInActiveUserTeachers() {
        const records = sequelize.query(`select * from ${table.userTeacher} where status = false`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: UserTeacher.build()
        });

        return records;
    }
}

const userTeacherRepo = new UserTeacherRepo();

export default userTeacherRepo;