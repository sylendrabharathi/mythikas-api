import { DataTypes } from 'sequelize';
import {sequelize} from './../db/Sequelize';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';
import Standard from './StandardModel';
import Subject from './SubjectModel';
import LessonSection from './LessonSectionModel';

const Lesson = sequelize.define('Lesson', {
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
    standardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'standard_id',
        references: {key: 'id', model: Standard}
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'subject_id',
        references: {key: 'id', model: Subject}
    },
    syllabus: {
        type: DataTypes.ENUM('CBSE', 'ICSE', 'STATE_BOARD'),
        allowNull: false,
        field: 'syllabus'
    },
    ...timeStamp

}, {
    tableName: table.lesson
    // Other model options go here
});


Lesson.hasOne(Standard);
Lesson.hasOne(Subject);

// Lesson.hasMany(LessonSection);

export default Lesson;
