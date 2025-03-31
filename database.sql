CREATE DATABASE IF NOT EXISTS food_delivery;

USE food_delivery;

-- Menu table to store food items
CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255)
);

-- Cart table to store added items for the user
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    food_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (food_id) REFERENCES menu(id)
);

-- Orders table to store placed orders
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
