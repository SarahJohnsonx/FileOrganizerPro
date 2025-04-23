const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', upload.array('files'), (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const results = files.map(file => ({
            originalName: file.originalname,
            size: file.size,
            category: getFileCategory(file.originalname),
            path: file.path
        }));

        res.json({ success: true, files: results });
    } catch (error) {
        res.status(500).json({ error: 'Upload failed' });
    }
});

function getFileCategory(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    
    const categoryMap = {
        'images': ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'],
        'documents': ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'],
        'videos': ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'],
        'audio': ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma'],
        'archives': ['zip', 'rar', '7z', 'tar', 'gz'],
        'code': ['js', 'html', 'css', 'py', 'java', 'cpp', 'c', 'php']
    };
    
    for (const [category, extensions] of Object.entries(categoryMap)) {
        if (extensions.includes(ext)) {
            return category;
        }
    }
    
    return 'others';
}

app.listen(PORT, () => {
    console.log(`FileOrganizerPro server running on port ${PORT}`);
});