-- Create DB
CREATE DATABASE IF NOT EXISTS `fcc_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Create Testuser
CREATE USER 'fcc'@'localhost' IDENTIFIED BY 'fccpassword';
GRANT ALL PRIVILEGES ON fcc_db.* TO 'fcc'@'localhost';