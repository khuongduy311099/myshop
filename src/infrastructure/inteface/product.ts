export interface IProduct {
    product_id?: number; // Optional since it's auto-generated on insert
    sku: string; // Stock keeping unit, unique identifier
    name: string; // Product name
    import_price: number; // Product import price (cost)
    count: number; // Quantity in stock
    description?: string; // Optional field, description of the product
    category_id: number; // Foreign key to `Category`
}
