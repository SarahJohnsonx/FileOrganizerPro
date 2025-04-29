let customRules = JSON.parse(localStorage.getItem('customRules')) || [];

document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    renderCustomRules();
});

document.getElementById('addRuleBtn').addEventListener('click', addCustomRule);
document.getElementById('saveSettings').addEventListener('click', saveSettings);
document.getElementById('resetSettings').addEventListener('click', resetSettings);

function addCustomRule() {
    const ruleDiv = document.createElement('div');
    ruleDiv.className = 'custom-rule';
    ruleDiv.innerHTML = `
        <input type="text" placeholder="Category name" class="category-input">
        <input type="text" placeholder="Extensions (comma separated)" class="extensions-input">
        <button type="button" class="remove-rule" onclick="removeRule(this)">Remove</button>
    `;
    
    document.getElementById('customRules').appendChild(ruleDiv);
}

function removeRule(button) {
    button.parentElement.remove();
}

function renderCustomRules() {
    const customRulesDiv = document.getElementById('customRules');
    customRulesDiv.innerHTML = '';
    
    customRules.forEach(rule => {
        const ruleDiv = document.createElement('div');
        ruleDiv.className = 'custom-rule';
        ruleDiv.innerHTML = `
            <input type="text" placeholder="Category name" class="category-input" value="${rule.category}">
            <input type="text" placeholder="Extensions (comma separated)" class="extensions-input" value="${rule.extensions.join(', ')}">
            <button type="button" class="remove-rule" onclick="removeRule(this)">Remove</button>
        `;
        customRulesDiv.appendChild(ruleDiv);
    });
}

function saveSettings() {
    // Save custom rules
    const rules = [];
    document.querySelectorAll('.custom-rule').forEach(ruleDiv => {
        const category = ruleDiv.querySelector('.category-input').value.trim();
        const extensionsText = ruleDiv.querySelector('.extensions-input').value.trim();
        
        if (category && extensionsText) {
            const extensions = extensionsText.split(',').map(ext => ext.trim().toLowerCase());
            rules.push({ category, extensions });
        }
    });
    
    customRules = rules;
    localStorage.setItem('customRules', JSON.stringify(customRules));
    
    // Save other settings
    const settings = {
        createSubfolders: document.getElementById('createSubfolders').checked,
        preserveStructure: document.getElementById('preserveStructure').checked
    };
    localStorage.setItem('organizationSettings', JSON.stringify(settings));
    
    alert('Settings saved successfully!');
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('organizationSettings')) || {
        createSubfolders: true,
        preserveStructure: false
    };
    
    document.getElementById('createSubfolders').checked = settings.createSubfolders;
    document.getElementById('preserveStructure').checked = settings.preserveStructure;
}

function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        localStorage.removeItem('customRules');
        localStorage.removeItem('organizationSettings');
        customRules = [];
        renderCustomRules();
        loadSettings();
        alert('Settings reset to default!');
    }
}