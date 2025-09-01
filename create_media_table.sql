-- Create media table for AGD system
CREATE TABLE IF NOT EXISTS media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    alt_text VARCHAR(500) NULL,
    description TEXT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'photo',
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_mime VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT NOT NULL DEFAULT 0,
    width INT NULL,
    height INT NULL,
    duration INT NULL COMMENT 'Duration in seconds for video/audio files',
    status ENUM('active', 'archived') NOT NULL DEFAULT 'active',
    tags TEXT NULL COMMENT 'Comma-separated list of tags',
    usage_count INT NOT NULL DEFAULT 0 COMMENT 'Number of times this media is used',
    created_by INT NOT NULL,
    updated_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_file_mime (file_mime),
    INDEX idx_created_at (created_at),
    INDEX idx_created_by (created_by),
    INDEX idx_updated_by (updated_by),
    
    CONSTRAINT fk_media_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_media_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE RESTRICT
);

-- Insert some sample media items for testing (optional)
INSERT INTO media (
    title, alt_text, description, category, file_name, file_url, 
    file_mime, file_size_bytes, width, height, status, tags, 
    created_by, updated_by
) VALUES 
(
    'AGD Logo', 
    'Official Accountant General\'s Department logo', 
    'The official logo of the Accountant General\'s Department used in official documents and presentations.',
    'logo',
    'agd-logo.png',
    '/images/agd.png',
    'image/png',
    45632,
    512,
    512,
    'active',
    'logo, official, branding',
    1,
    1
),
(
    'Sierra Leone Flag', 
    'Flag of Sierra Leone', 
    'Official flag of Sierra Leone used in government documents.',
    'photo',
    'sierra-leone-flag.jpg',
    '/flag.jpg',
    'image/jpeg',
    128945,
    800,
    600,
    'active',
    'flag, sierra leone, national',
    1,
    1
);

-- Add some useful indexes for better performance
CREATE INDEX idx_media_search ON media (title, alt_text, description);
CREATE INDEX idx_media_file_type ON media (file_mime, category);

-- Update usage_count function (example trigger)
-- This would increment usage_count when media is referenced
DELIMITER //
CREATE TRIGGER increment_media_usage 
    AFTER INSERT ON news 
    FOR EACH ROW
BEGIN
    IF NEW.image_url IS NOT NULL THEN
        UPDATE media 
        SET usage_count = usage_count + 1 
        WHERE file_url = NEW.image_url;
    END IF;
END //
DELIMITER ;

-- Create similar triggers for other tables that reference media files
DELIMITER //
CREATE TRIGGER increment_media_usage_events
    AFTER INSERT ON events 
    FOR EACH ROW
BEGIN
    IF NEW.image_url IS NOT NULL THEN
        UPDATE media 
        SET usage_count = usage_count + 1 
        WHERE file_url = NEW.image_url;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER increment_media_usage_press_releases
    AFTER INSERT ON press_releases 
    FOR EACH ROW
BEGIN
    IF NEW.image_url IS NOT NULL THEN
        UPDATE media 
        SET usage_count = usage_count + 1 
        WHERE file_url = NEW.image_url;
    END IF;
END //
DELIMITER ;
