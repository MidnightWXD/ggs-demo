import 'dotenv/config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
        dialectOptions: {
            decimalNumbers: true,
        },
    }
);

export default sequelize;