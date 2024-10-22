import {DataSource, Repository} from 'typeorm';
import {Product} from '../entity/product';

export class ProductRepository extends Repository<Product> {
    constructor(private readonly dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }

    async findAllProducts(): Promise<Product[]> {
        return await this.find(); // Fetch all products
    }

    async findProductById(product_id: number): Promise<Product | null> {
        return await this.findOne({where: {product_id}}); // Fetch a product by ID
    }

    async createProduct(productData: Partial<Product>): Promise<Product> {
        const product = this.create(productData); // Create a new product instance
        return await this.save(product); // Save the product
    }

    async updateProduct(
        product_id: number,
        productData: Partial<Product>,
    ): Promise<Product | null> {
        const product = await this.findOne({
            where: {product_id},
        });
        if (product) {
            this.merge(product, productData); // Merge new data into the existing product
            return await this.save(product); // Save the updated product
        }
        return null; // Return null if the product doesn't exist
    }

    async deleteProduct(product_id: number): Promise<Product | null> {
        const product = await this.findOne({where: {product_id}});
        if (product) {
            await this.remove(product); // Remove the product
            return product; // Return the deleted product
        }
        return null; // Return null if the product doesn't exist
    }
}
