import {Router} from 'express';
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from '../controller/product.controller';

const productRoutes = Router();

productRoutes.route('/').get(getProducts).post(createProduct);

productRoutes
    .route('/:product_id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

export default productRoutes;
