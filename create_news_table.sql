-- SQL script to create the news table for AGD Website
-- Database: agd_website

USE agd_website;

-- First, ensure the users table exists with proper structure
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `role` enum('user','administrator') NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `login_attempts` int(11) NOT NULL DEFAULT 0,
  `locked_until` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_role` (`role`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create the news table with proper foreign key constraints
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `excerpt` text NOT NULL,
  `content` longtext NOT NULL,
  `category` varchar(100) NOT NULL DEFAULT 'announcement',
  `status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
  `author` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `published_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `views` int(11) NOT NULL DEFAULT 0,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `slug` varchar(255) DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `reading_time_minutes` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_slug` (`slug`),
  KEY `idx_status` (`status`),
  KEY `idx_category` (`category`),
  KEY `idx_featured` (`featured`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_published_at` (`published_at`),
  KEY `idx_created_by` (`created_by`),
  KEY `idx_updated_by` (`updated_by`),
  CONSTRAINT `fk_news_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_news_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert a default administrator user if it doesn't exist
INSERT IGNORE INTO `users` (
    `email`, 
    `password`, 
    `full_name`, 
    `role`, 
    `is_active`, 
    `login_attempts`, 
    `locked_until`, 
    `last_login`, 
    `created_at`, 
    `updated_at`
) VALUES (
    'admin@agd.gov.mw',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',  -- password: admin123
    'System Administrator',
    'administrator',
    1,
    0,
    NULL,
    NULL,
    NOW(),
    NOW()
);

-- Verify the tables were created successfully
SHOW TABLES LIKE 'users';
SHOW TABLES LIKE 'news';

-- Show the structure of both tables
DESCRIBE users;
DESCRIBE news;

-- Show any existing users
SELECT id, email, full_name, role, is_active FROM users; 