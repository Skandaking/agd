# Uploads Directory

This directory contains uploaded files for the AGD portal.

## Structure

- `documents/` - Document files (PDF, Word, Excel, etc.)
- `news/` - News article images (if not using Cloudinary)
- `events/` - Event images (if not using Cloudinary) 
- `press-releases/` - Press release images (if not using Cloudinary)
- `gallery/` - Gallery images (if not using Cloudinary)

## Notes

- Document files are always stored locally in this directory
- Image files may be stored here or in Cloudinary depending on configuration
- All files are served directly by Next.js from the public folder
- Uploaded files are excluded from git by the .gitignore file
