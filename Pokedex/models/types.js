import { INTEGER, STRING } from 'sequelize';
import { sql } from '../database/db.js';

export const types = sql.define('types', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    typeName: {
        type: STRING,
        allowNull: false
    },
});