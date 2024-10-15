export const QUERY = {
    SELECT_PRODUCTS: 'SELECT * FROM Product LIMIT 50',
    SELECT_PRODUCT: 'SELECT * FROM Product WHERE product_id = ?',
    INSERT_PRODUCT:
        'INSERT INTO Product (product_id, sku, name, import_price, count, description) VALUES (?, ?, ?, ?, ?, ?)',
    UPDATE_PRODUCT:
        'UPDATE Product SET product_id = ? , sku = ?, name = ?, import_price = ?, count = ?, description = ?',
    DELETE_PRODUCT: 'DELETE FROM Product WHERE product_id = ?',
};
