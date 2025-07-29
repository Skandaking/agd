-- SQL script to create the first administrator user for AGD Website
-- Database: agd_website
-- 
-- This script creates the initial administrator account
-- Default password is 'admin123' (you should change this after first login)
-- The password is hashed using PHP's password_hash() function with PASSWORD_DEFAULT

USE agd_website;

-- Insert the first administrator user
INSERT INTO `users` (
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
    'admin@agd.gov.mw',                           -- email
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',  -- password hash for 'admin123'
    'System Administrator',                        -- full_name
    'administrator',                              -- role
    1,                                           -- is_active (true)
    0,                                           -- login_attempts
    NULL,                                        -- locked_until
    NULL,                                        -- last_login
    NOW(),                                       -- created_at
    NOW()                                        -- updated_at
);

-- Verify the user was created
SELECT 
    id, 
    email, 
    full_name, 
    role, 
    is_active, 
    created_at 
FROM users 
WHERE email = 'admin@agd.gov.mw';

-- Instructions:
-- 1. Run this script in your MySQL/MariaDB database
-- 2. Login with email: admin@agd.gov.mw
-- 3. Login with password: admin123
-- 4. IMPORTANT: Change the password immediately after first login for security
-- 
-- To generate a new password hash in PHP, use:
-- echo password_hash('your_new_password', PASSWORD_DEFAULT);
--
-- Alternative SQL to create additional users:
-- INSERT INTO `users` (`email`, `password`, `full_name`, `role`, `is_active`) 
-- VALUES ('user@agd.gov.mw', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Regular User', 'user', 1); 