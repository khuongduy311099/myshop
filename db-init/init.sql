create database if not exists myshopdb;
use myshopdb;
drop table if exists products;

CREATE TABLE Product (
product_id INT PRIMARY KEY AUTO_INCREMENT,
sku VARCHAR(255) NOT NULL,
name VARCHAR(255) NOT NULL,
import_price INT NOT NULL,
count INT NOT NULL,
description TEXT
);

INSERT INTO Product (sku, name, import_price, count, description)
VALUES
('SKU001', 'Product 1', 100, 50, 'This is a description for Product 1.'),
('SKU002', 'Product 2', 150, 30, 'This is a description for Product 2.'),
('SKU003', 'Product 3', 200, 20, 'This is a description for Product 3.'),
('SKU004', 'Product 4', 250, 40, 'This is a description for Product 4.'),
('SKU005', 'Product 5', 300, 10, 'This is a description for Product 5.');
