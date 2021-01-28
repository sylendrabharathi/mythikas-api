const db = require('./../db/db');
const table = require('./../db/table');
const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const config = require('./../config/config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

class SubjectRepo {

    getSubjects() {
        const records = sequelize.query(`select * from ${table.subject}`, {
            type: QueryTypes.SELECT
        });

        return records;
    }

    async getSubjectById(id) {
        const records = sequelize.query(`select * from ${table.subject} where id = :id`, {
            replacements: {id},
            type: QueryTypes.SELECT
        });

        return records;
    }

    getActiveSubjects() {
        const records = sequelize.query(`select * from ${table.subject} where status = true`, {
            type: QueryTypes.SELECT
        });

        return records;
    }

    getInActiveSubjects() {
        const records = sequelize.query(`select * from ${table.subject} where status = false`, {
            type: QueryTypes.SELECT
        });

        return records;
    }
}

const subjectRepo = new SubjectRepo();

module.exports = subjectRepo;