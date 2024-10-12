import cors from 'cors';
import express, {Application} from 'express';
import ip from 'ip';

export class App {
    private readonly app: Application;
    private readonly APPLICATION_RUNNING = 'Application is running on';
    private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server';

    constructor(
        private readonly port: string | number = process.env.SERVER_PORT ||
            3000,
    ) {
        this.app = express();
        this.middleware();
        this.routes();
    }

    listen(): void {
        this.app.listen(this.port);
        console.info(
            `${this.APPLICATION_RUNNING}: ${ip.address()}: ${this.port}`,
        );
    }

    private middleware(): void {
        this.app.use(cors({origin: '*'}));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use('/myshop', (req, res) => {});
        this.app.get('/', (req, res) => {
            res.status(200).send({message: 'app'});
        });
        this.app.all('*', (req, res) => {
            res.status(400).send({message: this.ROUTE_NOT_FOUND});
        });
    }
}
