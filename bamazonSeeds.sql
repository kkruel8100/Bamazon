-- Database schema:
-- CREATE TABLE products (
--   item_id INT NOT NULL AUTO_INCREMENT,
--   product_name VARCHAR(100) NULL,
--   department_name VARCHAR(100) NULL,
--   price DECIMAL(10,2) NOT NULL,
--   stock_quantity INT NOT NULL, 
--   PRIMARY KEY (item_id)
-- );

USE bamazon;

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beet Powder", "Grocery", 34.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kind Bars Variety Pack", "Grocery", 18.22, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bicycle Lock", "Sports", 24.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soccer Ball", "Sports", 9.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sony Digital Camera", "Electronics", 125, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HP Elite Tower", "Electronics", 1080, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black and Decker Tool Set", "Tools", 80.50, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bosch Drill", "Tools", 65, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Philips Electronic Toothbrush", "Health and Beauty", 125, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Remington Electronic Shaver", "Health and Beauty", 40.85, 30);
