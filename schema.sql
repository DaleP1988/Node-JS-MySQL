DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR (45) NULL,
  department_name VARCHAR (45) NULL,
  price  DECIMAL (10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("liri", "Electronics", "150.00", "150");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Not Quite Trivial Pursuit Game", "Electronics/Software", "200.00", "150");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("canned tuna", "Grocery", "3.00", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yoga Pants", "Womens Apparell", "50.00", "100");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pilates Mat", "Fitness Equipment", "50.00", "150");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Tennis Shoes", "Womens Footwear", "150.00", "150");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Windex", "Household Cleaning", "9.00", "50");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fage Yogurt", "Grocery", "1.50", "150");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sewing Machine", "Sewing and Craft Supplies", "500.00", "10");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Craft Giltter", "Stationary", "5.00", "50");


