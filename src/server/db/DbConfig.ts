import {Sequelize} from 'sequelize';
import config  from './../config/AppConfig';
// const sequelize = new Sequelize("sqlite::memory:");
import {sequelize} from './Sequelize';
import Subject from './../models/SubjectModel';
import Standard from '../models/StandardModel';

class DBCONFIG {

    
    getSequelize() {
        return sequelize;
    }

    connectDB() {
        const seq = this.getSequelize();
        try {
            
            seq.authenticate();
            this.sync();
            // seq.models = {}
            console.log('DB is Connected');
            return {error: null, status: 1};
        } catch (error) {
            console.log(error);
            return {error, status: 0};
        }
    }

    sync() {
        Subject.sync();
        Standard.sync();
    }
}

export default new DBCONFIG();

