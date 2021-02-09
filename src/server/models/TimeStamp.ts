import { Sequelize, DataTypes, NOW } from 'sequelize';
import {sequelize} from './../db/Sequelize';
import UserTeacher from './UserTeacherModel';

const timeStamp =  {
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: 'created_by',
        references: {key: 'id', model: UserTeacher}
        
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: 'updated_by',
        references: {key: 'id', model: UserTeacher}
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW,
        field: 'updated_at'
    }
};

// timeStamp.belongsTo(UserTeacher, {foreignKey: 'created_by'});
// timeStamp.belongsTo(UserTeacher, {foreignKey: 'updated_by'});


export default timeStamp;