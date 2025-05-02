# FileOrganizerPro

A web-based file organization tool that automatically categorizes and organizes your files based on file types and custom rules.

## Features
- **Automatic file categorization** - Sorts files into predefined categories (Images, Documents, Videos, Audio, etc.)
- **Custom organization rules** - Create your own categories with specific file extensions
- **Web-based interface** - Easy-to-use drag & drop interface
- **Multiple file type support** - Handles all common file formats
- **Local file organization** - Organize files directly on your system
- **Settings management** - Persistent configuration and custom rules

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/FileOrganizerPro.git
cd FileOrganizerPro
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and go to `http://localhost:3000`

## Usage

### Web Interface
1. Visit the home page to drag and drop files for categorization preview
2. Go to Settings page to configure custom rules and organization preferences
3. Upload files through the interface to see how they would be organized

### API Endpoints

**Upload Files:**
```
POST /upload
Content-Type: multipart/form-data
```

**Organize Directory:**
```
POST /organize
Content-Type: application/json
Body: { "targetPath": "/path/to/directory" }
```

## File Categories

Default categories include:
- **Images**: jpg, jpeg, png, gif, bmp, svg, webp
- **Documents**: pdf, doc, docx, txt, rtf, odt  
- **Videos**: mp4, avi, mov, wmv, flv, webm, mkv
- **Audio**: mp3, wav, flac, aac, ogg, wma
- **Archives**: zip, rar, 7z, tar, gz
- **Code**: js, html, css, py, java, cpp, c, php

## Development

For development with auto-restart:
```bash
npm run dev
```

## License
MIT