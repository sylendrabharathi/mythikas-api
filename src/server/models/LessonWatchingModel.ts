import { DataTypes, NOW } from 'sequelize';
import {sequelize} from './../db/Sequelize';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';
import StudentParent from './StudentParentModel';
import Lesson from './LessonModel';
import LessonSection from './LessonSectionModel';

const LessonWatching = sequelize.define('RolePrivilege', {
    // Model attributes are defined here
    studentId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {key: 'id', model: StudentParent}
    },
    lessonId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {key: 'id', model: Lesson}
    },
    sectionId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {key: 'id', model: LessonSection}
    },
    status: {
        allowNull: false,
        type: DataTypes.ENUM('IN-PROGRESS', 'DONE'),
        defaultValue: 'IN-PROGRESS'

    },
    startedOn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW
    },
    lastWatchedOn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW
    },
    watchedSeconds: {
        type: DataTypes.INTEGER,
        allowNull: true
    }


}, {
    tableName: table.lessonWatching,
    underscored: true
    // Other model options go here
});

export default LessonWatching;