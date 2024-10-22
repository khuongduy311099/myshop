// src/data-source.ts
import {DataSource} from 'typeorm';

const AppDataSource = new DataSource({
    type: 'mysql', // or the database type you're using (e.g., 'postgres', 'sqlite', etc.)
    host: process.env.DB_HOST, // Your database host
    port: Number(process.env.DB_PORT) || 3306, // Your database port
    username: process.env.DB_USER, // Your database username
    password: process.env.DB_PASSWORD, // Your database password
    database: process.env.DB_NAME, // Your database name
    entities: [__dirname + '/../../infrastructure/entity/*{.ts,.js}'],
    synchronize: true, // Set to false in production
});
export default AppDataSource;
