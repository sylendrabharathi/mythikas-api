import { DataTypes } from 'sequelize';
import {sequelize} from '../db/Sequelize';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';
import Lesson from './LessonModel';

const LessonAssessment = sequelize.define('LessonAssessment', {
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
        type: DataTypes.STRING,
        allowNull: true
    },
    assessmentType: {
        type: DataTypes.ENUM('post', 'pre'),
        allowNull: false
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
    questions: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
    },
    ...timeStamp
}, {
    tableName: table.lessonAssessment,
    underscored: true
    // Other model options go here
});

export default LessonAssessment;
