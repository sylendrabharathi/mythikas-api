import { DataTypes, NOW } from 'sequelize';
import {sequelize} from './../db/Sequelize';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';
import StudentParent from './StudentParentModel';
import Lesson from './LessonModel';
import LessonAssessment from './LessonAssessmentModel';

const AssessmentTest = sequelize.define('AssessmentTest', {
    // Model attributes are defined here
    studentId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {key: 'id', model: StudentParent}
    },
    lessonAssessmentId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {key: 'id', model: LessonAssessment}
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
    tableName: table.assessmentTest,
    underscored: true
    // Other model options go here
});

export default AssessmentTest;