import {App} from './app';
import AppDataSource from './infrastructure/datasource/datasource';

const start = async () => {
    // Initialize the data source
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    const app = new App();
    app.listen();
};

start();
