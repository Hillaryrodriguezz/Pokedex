import sequelize from 'sequelize';

export const sql = new sequelize("pokemon", "root", "hillary1234", {
    dialect: 'mysql',
    host: 'localhost',
    port: 3308
});