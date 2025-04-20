const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const organizeBtn = document.getElementById('organizeBtn');
const results = document.getElementById('results');
const resultsList = document.getElementById('resultsList');

let selectedFiles = [];

uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    selectedFiles = Array.from(files);
    
    if (selectedFiles.length > 0) {
        uploadArea.innerHTML = `
            <h3>${selectedFiles.length} files selected</h3>
            <p>Ready to organize</p>
        `;
        organizeBtn.disabled = false;
    }
}

organizeBtn.addEventListener('click', organizeFiles);

function organizeFiles() {
    const categories = {};
    
    selectedFiles.forEach(file => {
        const category = getFileCategory(file.name);
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(file.name);
    });
    
    showResults(categories);
}

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

function showResults(categories) {
    resultsList.innerHTML = '';
    
    for (const [category, files] of Object.entries(categories)) {
        const categoryItem = document.createElement('li');
        categoryItem.innerHTML = `
            <strong>${category.toUpperCase()}</strong> (${files.length} files)
            <ul style="margin-left: 20px;">
                ${files.map(file => `<li>${file}</li>`).join('')}
            </ul>
        `;
        resultsList.appendChild(categoryItem);
    }
    
    results.style.display = 'block';
}