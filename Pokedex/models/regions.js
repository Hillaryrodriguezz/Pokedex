import { sql } from '../database/db.js';
import { INTEGER, STRING } from 'sequelize';

export const regions = sql.define('regions', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    regionName: {
        type: STRING,
        allowNull: false
    },
});