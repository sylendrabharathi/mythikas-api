import {Sequelize} from 'sequelize';
import config  from './../config/AppConfig';
// const sequelize = new Sequelize("sqlite::memory:");

import Subject from './../models/SubjectModel';

class DBCONFIG {

    sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
        host: config.db.host,
        dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    });
    getSequelize() {
        return this.sequelize;
    }

    connectDB() {
        const seq = this.getSequelize();
        try {
            
            seq.authenticate();
            Subject.sync();
            // seq.models = {}
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

export default new DBCONFIG();

