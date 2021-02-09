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
        allowNull: false,
        field: 'name'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'description'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'status'
    },
    lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'lesson_id',
        references: {key: 'id', model: Lesson}
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'url'
    },
    tag: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'tag'
    },
    label: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'label'
    },
    ...timeStamp

}, {
    tableName: table.lessonSection
    // Other model options go here
});

LessonSection.belongsTo(Lesson);

export default LessonSection;
