-- Create database
CREATE DATABASE IF NOT EXISTS email_app;
USE email_app;

-- Table: user_info
CREATE TABLE IF NOT EXISTS user_info (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Table: login
CREATE TABLE IF NOT EXISTS login (
    user_id INT PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);

-- Table: emails
CREATE TABLE IF NOT EXISTS emails (
    email_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    recipient_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user_info(user_id),
    FOREIGN KEY (recipient_id) REFERENCES user_info(user_id)
);
