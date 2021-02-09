import { DataTypes } from 'sequelize';
import {sequelize} from '../db/Sequelize';

// const sequelize = db.getSequelize();
import timeStamp from './TimeStamp';
import table from '../db/Table';
import LessonSection from './LessonSectionModel';

const LessonQuestion = sequelize.define('LessonQuestion', {
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
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    lessonSectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {key: 'id', model: LessonSection}
    },
    questions: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
    },
    ...timeStamp

}, {
    tableName: table.lessonQuestion,
    underscored: true
    // Other model options go here
});


export default LessonQuestion;
