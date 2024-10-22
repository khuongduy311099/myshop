CREATE DATABASE IF NOT EXISTS myshopdb;
USE myshopdb;

-- Drop tables if they exist
DROP TABLE IF EXISTS ORDER_ITEM;
DROP TABLE IF EXISTS `ORDER`;
DROP TABLE IF EXISTS PRODUCT;
DROP TABLE IF EXISTS CATEGORY;

-- Create the CATEGORY table
CREATE TABLE CATEGORY (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create the PRODUCT table
CREATE TABLE PRODUCT (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    import_price INT NOT NULL,
    count INT NOT NULL,
    description TEXT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id)
);

-- Create the ORDER table
CREATE TABLE `ORDER` (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    created_Time DATETIME NOT NULL,
    final_price INT NOT NULL
);

-- Create the ORDER_ITEM table
CREATE TABLE ORDER_ITEM (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_sale_price FLOAT NOT NULL,
    total_price INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES `ORDER`(order_id),
    FOREIGN KEY (product_id) REFERENCES PRODUCT(product_id)
);


-- Insert seed data into the CATEGORY table
INSERT INTO CATEGORY (name, description) VALUES
('Electronics', 'Devices and gadgets'),
('Clothing', 'Apparel and accessories'),
('Furniture', 'Home and office furniture');

-- Insert seed data into the PRODUCT table
INSERT INTO PRODUCT (sku, name, import_price, count, description, category_id) VALUES
('EL001', 'Smartphone', 500, 100, 'Latest model smartphone', 1),
('EL002', 'Laptop', 800, 50, 'High-performance laptop', 1),
('CL001', 'T-shirt', 20, 200, 'Cotton T-shirt', 2),
('FU001', 'Office Chair', 100, 75, 'Ergonomic office chair', 3);

-- Insert seed data into the ORDER table
INSERT INTO `ORDER` (created_Time, final_price) VALUES
('2024-10-10 10:00:00', 540),
('2024-10-11 11:30:00', 1200);

-- Insert seed data into the ORDER_ITEM table
INSERT INTO ORDER_ITEM (order_id, product_id, quantity, unit_sale_price, total_price) VALUES
(1, 1, 1, 540, 540),
(2, 2, 1, 1200, 1200);
