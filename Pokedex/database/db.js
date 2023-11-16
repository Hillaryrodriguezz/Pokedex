import sequelize from 'sequelize';

export const sql = new sequelize("pokemon", "root", "", {
    dialect: 'mysql',
    host: 'localhost',
    port: 3308,
});