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
    standardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {key: 'id', model: Standard}
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {key: 'id', model: Subject}
    },
    syllabus: {
        type: DataTypes.ENUM('CBSE', 'ICSE', 'STATE_BOARD'),
        allowNull: false
    },
    ...timeStamp

}, {
    tableName: table.lesson,
    underscored: true
    // Other model options go here
});

Lesson.belongsTo(Standard, {as: 'standard', foreignKey: 'standard_id'});
Lesson.belongsTo(Subject, {as: 'subject', foreignKey: 'subject_id'});

export default Lesson;
