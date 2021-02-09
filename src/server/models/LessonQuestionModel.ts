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
        allowNull: false,
        field: 'name'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'description'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'status'
    },
    lessonSectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'lesson_section_id',
        references: {key: 'id', model: LessonSection}
    },
    questions: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        field: 'questions'
    },
    ...timeStamp

}, {
    tableName: table.lessonQuestion
    // Other model options go here
});

LessonQuestion.belongsTo(LessonSection);

export default LessonQuestion;
