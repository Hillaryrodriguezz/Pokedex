import { sql } from '../database/db.js';
import { INTEGER, STRING } from 'sequelize';

export const pokemons = sql.define('pokemons', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pokemonName: {
        type: STRING,
        allowNull: false
    },
    image: {
        type: STRING,
        allowNull: false
    }
});
