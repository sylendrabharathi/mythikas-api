const { Sequelize } = require('sequelize');
const config = require('./../config/config');
// const sequelize = new Sequelize("sqlite::memory:");

const Subject = require('./../models/subject');

class DBCONFIG {
    getSequelize() {
        return new Sequelize(config.db.database, config.db.username, config.db.password, {
            host: config.db.host,
            dialect: config.db.dialect /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
        });
    }

    connectDB() {
        const seq = this.getSequelize();
        try {
            
            seq.authenticate();
            Subject.sync();
            seq.models = {}
            console.log('DB is Connected');
            return {error: null, status: 1};
        } catch (error) {
            console.log(error);
            return {error, status: 0};
        }
    }

    sync() {

    }
}

const dbCon = new DBCONFIG();
module.exports = dbCon;

