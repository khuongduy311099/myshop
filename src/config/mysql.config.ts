import dotenv from 'dotenv';
import mysql, {PoolOptions} from 'mysql2/promise';

dotenv.config();
export const connection = () => {
    const access: PoolOptions = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) || 3306,
        connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
    };
    const conn = mysql.createPool(access);

    return conn;
};
