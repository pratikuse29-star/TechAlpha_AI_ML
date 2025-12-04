// Current state
let currentPath = [];
let currentData = folderData;

// DOM Elements
const contentGrid = document.getElementById('content-grid');
const breadcrumbEl = document.getElementById('breadcrumb');
const backBtn = document.getElementById('back-btn');
const homeBtn = document.getElementById('home-btn');

// Initialize
function init() {
    renderContent(currentData);
    updateBreadcrumb();
    updateButtons();
}

// Render content based on data
function renderContent(data) {
    contentGrid.innerHTML = '';

    // Convert object to array for sorting (folders first)
    const items = Object.entries(data).map(([name, info]) => ({ name, ...info }));
    items.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'folder' ? -1 : 1;
    });

    if (items.length === 0) {
        contentGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">This folder is empty.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = `card ${item.type}`;
        card.onclick = () => handleItemClick(item);

        const iconClass = item.type === 'folder' ? 'fa-folder' : getFileIcon(item.name);

        card.innerHTML = `
            <i class="fa-solid ${iconClass}"></i>
            <div class="card-name">${item.name}</div>
            <div class="card-type">${item.type === 'folder' ? 'Folder' : 'File'}</div>
        `;

        // Add animation delay for staggered effect
        card.style.animation = `fadeIn 0.5s ease-out forwards`;

        contentGrid.appendChild(card);
    });
}

// Handle item click
function handleItemClick(item) {
    if (item.type === 'folder') {
        currentPath.push(item.name);
        currentData = item.children;
        renderContent(currentData);
        updateBreadcrumb();
        updateButtons();
    } else {
        // For files, we can't really "open" them in this static setup without a backend or correct relative paths
        // But we can try to open them if they are in the same directory structure relative to index.html
        // Since index.html is in TechAlpha_Web, and the files are in parent folders...
        // We need to construct the path relative to TechAlpha_Web.
        // ../Python_Basic/variable.py

        const relativePath = '../' + currentPath.join('/') + '/' + item.name;
        window.open(relativePath, '_blank');
    }
}

// Get icon based on file extension
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    switch (ext) {
        case 'py': return 'fa-python';
        case 'js': return 'fa-js';
        case 'html': return 'fa-html5';
        case 'css': return 'fa-css3-alt';
        case 'txt': return 'fa-file-lines';
        case 'pdf': return 'fa-file-pdf';
        case 'jpg':
        case 'png':
        case 'jpeg': return 'fa-image';
        default: return 'fa-file';
    }
}

// Update Breadcrumb
function updateBreadcrumb() {
    let html = '<span onclick="navigateTo(-1)">Home</span>';

    currentPath.forEach((folder, index) => {
        html += ` <i class="fa-solid fa-chevron-right" style="font-size: 0.8rem; margin: 0 0.5rem;"></i> `;
        if (index === currentPath.length - 1) {
            html += `<span>${folder}</span>`;
        } else {
            html += `<span onclick="navigateTo(${index})">${folder}</span>`;
        }
    });

    breadcrumbEl.innerHTML = html;
}

// Navigate to specific level in path
window.navigateTo = function (index) {
    if (index === -1) {
        currentPath = [];
        currentData = folderData;
    } else {
        // Reconstruct path up to index
        const newPath = currentPath.slice(0, index + 1);

        // Traverse data to find the correct children
        let tempData = folderData;
        for (const folder of newPath) {
            tempData = tempData[folder].children;
        }

        currentPath = newPath;
        currentData = tempData;
    }

    renderContent(currentData);
    updateBreadcrumb();
    updateButtons();
};

// Update Buttons state
function updateButtons() {
    backBtn.disabled = currentPath.length === 0;
}

// Event Listeners
backBtn.onclick = () => {
    if (currentPath.length > 0) {
        navigateTo(currentPath.length - 2);
    }
};

homeBtn.onclick = () => {
    navigateTo(-1);
};

// Start
init();
