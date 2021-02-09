import { Sequelize, DataTypes, NOW } from 'sequelize';
import {sequelize} from './../db/Sequelize';
import UserTeacher from './UserTeacherModel';

const timeStamp =  {
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // defaultValue: 1,
        references: {key: 'id', model: UserTeacher}
        
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // defaultValue: 1,
        references: {key: 'id', model: UserTeacher}
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW
    }
};

// timeStamp.belongsTo(UserTeacher, {foreignKey: 'created_by'});
// timeStamp.belongsTo(UserTeacher, {foreignKey: 'updated_by'});


export default timeStamp;