import db from './../db/DbConfig';
import table from '../db/Table';
import { Sequelize, DataTypes, QueryTypes, Model } from 'sequelize';

import { sequelize } from './../db/Sequelize';
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
        const records = sequelize.query(`select sp.*,
            s.name as standard_name
            from ${table.studentParent} sp
            inner join ${table.standard} s on s.id = sp.standard_id 
            where sp.id = :id
            group by sp.id, s.name`, {
            replacements: { id },
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

    async login(phoneNumber: string, password: string) {
        const records = sequelize.query(`select sp.*,
            s.name as standard_name
            from ${table.studentParent} sp
            inner join ${table.standard} s on s.id = sp.standard_id 
            where sp.status = true and sp.is_approved = true and sp.phone_number = :phoneNumber and password = :password
            group by sp.id, s.name`, {
            type: QueryTypes.SELECT,
            replacements: { phoneNumber, password },
            mapToModel: true,
            instance: StudentParent.build()
        });

        return records;
    }

    async findStudentParentById(id) {
        const records = sequelize.query(`select * from ${table.studentParent} where id = :id`, {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

        return records;
    }
}

const studentParentRepo = new StudentParentRepo();

export default studentParentRepo;