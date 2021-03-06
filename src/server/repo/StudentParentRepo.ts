import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes, Model } from 'sequelize';

import {sequelize} from './../db/Sequelize';
import StudentParent from '../models/StudentParentModel';
class StudentParentRepo {

    async getStudentParents() {
        const records = sequelize.query(`select * from ${table.studentParent}`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: StudentParent.build()
        });

        return records;
    }

    async getStudentParentById(id) {
        const records = sequelize.query(`select * from ${table.studentParent} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: StudentParent.build()
        });

        return records;
    }

    async getActiveStudentParents() {
        const records = sequelize.query(`select * from ${table.studentParent} where status = true`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: StudentParent.build()
        });

        return records;
    }

    async getInActiveStudentParents() {
        const records = sequelize.query(`select * from ${table.studentParent} where status = false`, {
            type: QueryTypes.SELECT,
            mapToModel: true,
            instance: StudentParent.build()
        });

        return records;
    }
}

const studentParentRepo = new StudentParentRepo();

export default studentParentRepo;