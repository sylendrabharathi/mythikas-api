import { DataTypes } from 'sequelize';
import {sequelize} from './../db/Sequelize';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';
import Lesson from './LessonModel';
import LessonQuestion from './LessonQuestionModel';

const LessonSection = sequelize.define('LessonSection', {
    // Model attributes are defined here
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {key: 'id', model: Lesson}
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tag: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    label: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ...timeStamp

}, {
    tableName: table.lessonSection,
    underscored: true
    // Other model options go here
});


export default LessonSection;
