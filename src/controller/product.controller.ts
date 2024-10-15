import {Request, Response} from 'express';
import {FieldPacket, OkPacket, ResultSetHeader, RowDataPacket} from 'mysql';
import {connection} from '../config/mysql.config';
import {HttpResponse} from '../domain/response';
import {Code} from '../enum/code.enum';
import {Status} from '../enum/status.enum';
import {Product} from '../inteface/product';
import {QUERY} from '../queries/product.query';

type ResultSet = [
    (
        | OkPacket
        | ResultSetHeader
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket[]
    ),
    FieldPacket[],
];

export const getProducts = async (
    req: Request,
    res: Response,
): Promise<void> => {
    console.info(
        `[${new Date().toLocaleString()}] Incoming ${req.method}${
            req.originalUrl
        } Request from ${req.rawHeaders[1]}`,
    );
    try {
        const pool = await connection();
        const result = await pool.query(QUERY.SELECT_PRODUCTS);

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, 'Product retrived', result[0]),
        );
    } catch (error) {
        console.log(error);

        res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(
                Code.INTERNAL_SERVER_ERROR,
                Status.INTERNAL_SERVER_ERROR,
                'An error occurred',
            ),
        );
    }
};

export const getProduct = async (
    req: Request,
    res: Response,
): Promise<void> => {
    console.info(
        `[${new Date().toLocaleString()}] Incoming ${req.method}${
            req.originalUrl
        } Request from ${req.rawHeaders[1]}`,
    );
    try {
        const pool = await connection();
        const result = await pool.query(QUERY.SELECT_PRODUCT, [
            req.params.product_id,
        ]);

        if ((result[0] as Array<ResultSet>).length > 0)
            res.status(Code.OK).send(
                new HttpResponse(
                    Code.OK,
                    Status.OK,
                    'Product retrived',
                    result[0],
                ),
            );
        else {
            res.status(Code.NOT_FOUND).send(
                new HttpResponse(
                    Code.NOT_FOUND,
                    Status.NOT_FOUND,
                    'Product not found',
                ),
            );
        }
    } catch (error) {
        console.error(error);

        res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(
                Code.INTERNAL_SERVER_ERROR,
                Status.INTERNAL_SERVER_ERROR,
                'An error occurred',
            ),
        );
    }
};

export const createProduct = async (
    req: Request,
    res: Response,
): Promise<void> => {
    console.info(
        `[${new Date().toLocaleString()}] Incoming ${req.method}${
            req.originalUrl
        } Request from ${req.rawHeaders[1]}`,
    );

    let product: Product = {...req.body};
    try {
        const pool = await connection();
        const result = await pool.query(
            QUERY.INSERT_PRODUCT,
            Object.values(product),
        );

        product = {
            id: (result[0] as ResultSetHeader).insertId,
            ...req.body,
        };

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, 'Product retrived', product),
        );
    } catch (error) {
        res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(
                Code.INTERNAL_SERVER_ERROR,
                Status.INTERNAL_SERVER_ERROR,
                'An error occurred',
            ),
        );
    }
};

export const updateProduct = async (
    req: Request,
    res: Response,
): Promise<void> => {
    console.info(
        `[${new Date().toLocaleString()}] Incoming ${req.method}${
            req.originalUrl
        } Request from ${req.rawHeaders[1]}`,
    );

    let product: Product = {...req.body};

    try {
        const pool = await connection();
        const result = await pool.query(QUERY.SELECT_PRODUCT, [
            req.params.product_id,
        ]);

        if ((result[0] as Array<ResultSet>).length > 0) {
            await pool.query(QUERY.UPDATE_PRODUCT, [
                ...Object.values(product),
                req.params.product_id,
            ]);

            res.status(Code.OK).send(
                new HttpResponse(Code.OK, Status.OK, 'Product updated', {
                    ...product,
                    id: req.params.product_id,
                }),
            );
        } else {
            res.status(Code.NOT_FOUND).send(
                new HttpResponse(
                    Code.NOT_FOUND,
                    Status.NOT_FOUND,
                    'Product not found',
                ),
            );
        }
    } catch (error) {
        console.error(error);

        res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(
                Code.INTERNAL_SERVER_ERROR,
                Status.INTERNAL_SERVER_ERROR,
                'An error occurred',
            ),
        );
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response,
): Promise<void> => {
    console.info(
        `[${new Date().toLocaleString()}] Incoming ${req.method}${
            req.originalUrl
        } Request from ${req.rawHeaders[1]}`,
    );

    let product: Product = {...req.body};

    try {
        const pool = await connection();
        const result = await pool.query(QUERY.DELETE_PRODUCT, [
            req.params.product_id,
        ]);

        if ((result[0] as Array<ResultSet>).length > 0) {
            res.status(Code.OK).send(
                new HttpResponse(Code.OK, Status.OK, 'Product deleted', {
                    ...product,
                    id: req.params.product_id,
                }),
            );
        } else {
            res.status(Code.NOT_FOUND).send(
                new HttpResponse(
                    Code.NOT_FOUND,
                    Status.NOT_FOUND,
                    'Product not found',
                ),
            );
        }
    } catch (error) {
        console.error(error);

        res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(
                Code.INTERNAL_SERVER_ERROR,
                Status.INTERNAL_SERVER_ERROR,
                'An error occurred',
            ),
        );
    }
};
