export const QUERY = {
    SELECT_PRODUCTS: 'SELECT * FROM PRODUCT LIMIT 50',
    SELECT_PRODUCT: 'SELECT * FROM PRODUCT WHERE product_id = ?',
    INSERT_PRODUCT:
        'INSERT INTO PRODUCT ( sku, name, import_price, count, description) VALUES (?, ?, ?, ?, ?)',
    UPDATE_PRODUCT:
        'UPDATE PRODUCT SET  sku = ?, name = ?, import_price = ?, count = ?, description = ? WHERE product_id = ?',
    DELETE_PRODUCT: 'DELETE FROM PRODUCT WHERE product_id = ?',
};
