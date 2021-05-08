import { DataTypes, NOW } from 'sequelize';
import {sequelize} from './../db/Sequelize';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';
import StudentParent from './StudentParentModel';
import Lesson from './LessonModel';
import LessonSection from './LessonSectionModel';

const SectionTest = sequelize.define('SectionTest', {
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
    lessonSectionId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {key: 'id', model: LessonSection}
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW
    },
    questionAnswers: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
    },
    totalMarks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    studentMarks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

}, {
    tableName: table.sectionTest,
    underscored: true
    // Other model options go here
});

export default SectionTest;