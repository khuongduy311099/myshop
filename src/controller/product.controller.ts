import {Request, Response} from 'express';
import {HttpResponse} from '../domain/response';
import {Code} from '../enum/code.enum';
import {Status} from '../enum/status.enum';
import {Product} from '../infrastructure/entity/product';
import {ProductRepository} from '../infrastructure/repository/product';
import AppDataSource from '../infrastructure/datasource/datasource';

const productRepository = new ProductRepository(AppDataSource);

export const getProducts = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const products = await productRepository.findAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);

        res.status(500).json({message: 'An error occurred'});
    }
};

export const getProduct = async (
    req: Request,
    res: Response,
): Promise<void> => {
    console.info(
        `[${new Date().toLocaleString()}] Incoming ${req.method} ${
            req.originalUrl
        } Request from ${req.rawHeaders[1]}`,
    );

    try {
        const product = await productRepository.findProductById(
            +req.params.product_id,
        ); // Fetch product by ID

        if (product) {
            res.status(Code.OK).send(
                new HttpResponse(
                    Code.OK,
                    Status.OK,
                    'Product retrieved',
                    product,
                ),
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

export const createProduct = async (
    req: Request,
    res: Response,
): Promise<void> => {
    console.info(
        `[${new Date().toLocaleString()}] Incoming ${req.method} ${
            req.originalUrl
        } Request from ${req.rawHeaders[1]}`,
    );

    const productData: Partial<Product> = req.body; // Assuming req.body has the necessary fields

    try {
        const savedProduct = await productRepository.createProduct(productData); // Create and save the product

        res.status(Code.CREATED).send(
            new HttpResponse(
                Code.CREATED,
                Status.CREATED,
                'Product created',
                savedProduct,
            ),
        );
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

export const updateProduct = async (
    req: Request,
    res: Response,
): Promise<void> => {
    console.info(
        `[${new Date().toLocaleString()}] Incoming ${req.method} ${
            req.originalUrl
        } Request from ${req.rawHeaders[1]}`,
    );

    const productData: Partial<Product> = req.body;

    try {
        const updatedProduct = await productRepository.updateProduct(
            +req.params.product_id,
            productData,
        ); // Update product

        if (updatedProduct) {
            res.status(Code.OK).send(
                new HttpResponse(
                    Code.OK,
                    Status.OK,
                    'Product updated',
                    updatedProduct,
                ),
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
        `[${new Date().toLocaleString()}] Incoming ${req.method} ${
            req.originalUrl
        } Request from ${req.rawHeaders[1]}`,
    );

    try {
        const deletedProduct = await productRepository.deleteProduct(
            +req.params.product_id,
        ); // Delete product

        if (deletedProduct) {
            res.status(Code.OK).send(
                new HttpResponse(Code.OK, Status.OK, 'Product deleted', {
                    id: deletedProduct.product_id,
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
