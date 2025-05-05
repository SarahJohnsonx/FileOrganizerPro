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
    if (!files || files.length === 0) {
        showError('No files selected');
        return;
    }
    
    // Check file size limit (10MB per file)
    const maxSize = 10 * 1024 * 1024;
    const oversizedFiles = Array.from(files).filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
        showError(`Files too large (max 10MB): ${oversizedFiles.map(f => f.name).join(', ')}`);
        return;
    }
    
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
    try {
        if (selectedFiles.length === 0) {
            showError('No files to organize');
            return;
        }
        
        organizeBtn.disabled = true;
        organizeBtn.textContent = 'Organizing...';
        
        const categories = {};
        
        selectedFiles.forEach(file => {
            const category = getFileCategory(file.name);
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(file.name);
        });
        
        showResults(categories);
        
    } catch (error) {
        showError('Failed to organize files: ' + error.message);
    } finally {
        organizeBtn.disabled = false;
        organizeBtn.textContent = 'Organize Files';
    }
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

function showError(message) {
    const errorDiv = document.getElementById('errorMessage') || createErrorDiv();
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function createErrorDiv() {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'errorMessage';
    errorDiv.style.cssText = `
        background: #ff6b6b;
        color: white;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        display: none;
    `;
    document.querySelector('.container main').insertBefore(errorDiv, document.querySelector('.upload-area'));
    return errorDiv;
}