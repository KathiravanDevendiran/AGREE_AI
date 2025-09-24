// ===== ADMIN DASHBOARD JAVASCRIPT =====

// Sample data
const sampleData = {
    farmers: [
        { id: 'F001', name: 'Rajesh Kumar', location: 'Tamil Nadu', fields: 3, area: '12.5 acres', status: 'Active' },
        { id: 'F002', name: 'Priya Sharma', location: 'Karnataka', fields: 2, area: '8.3 acres', status: 'Active' },
        { id: 'F003', name: 'Amit Patel', location: 'Maharashtra', fields: 5, area: '20.1 acres', status: 'Inactive' },
        { id: 'F004', name: 'Sunita Devi', location: 'Punjab', fields: 4, area: '15.7 acres', status: 'Active' },
        { id: 'F005', name: 'Ravi Reddy', location: 'Tamil Nadu', fields: 1, area: '5.2 acres', status: 'Active' }
    ],
    fields: [
        { id: 'FLD001', name: 'North Field A', farmer: 'Rajesh Kumar', crop: 'Rice', area: '4.2 acres', status: 'healthy', soilMoisture: '65%', lastIrrigation: '2 days ago' },
        { id: 'FLD002', name: 'South Field B', farmer: 'Priya Sharma', crop: 'Wheat', area: '3.8 acres', status: 'warning', soilMoisture: '35%', lastIrrigation: '5 days ago' },
        { id: 'FLD003', name: 'East Field C', farmer: 'Amit Patel', crop: 'Cotton', area: '6.5 acres', status: 'critical', soilMoisture: '20%', lastIrrigation: '8 days ago' },
        { id: 'FLD004', name: 'West Field D', farmer: 'Sunita Devi', crop: 'Sugarcane', area: '7.2 acres', status: 'healthy', soilMoisture: '70%', lastIrrigation: '1 day ago' }
    ],
    alerts: [
        { id: 'ALT001', type: 'Pest Alert', message: 'Brown planthopper detected in Karnataka rice fields', severity: 'high', date: '2024-01-15', affected: '1,234 farmers' },
        { id: 'ALT002', type: 'Weather Warning', message: 'Heavy rainfall expected in Maharashtra', severity: 'medium', date: '2024-01-14', affected: '2,567 farmers' },
        { id: 'ALT003', type: 'Disease Alert', message: 'Leaf blight spreading in Punjab wheat fields', severity: 'high', date: '2024-01-13', affected: '890 farmers' },
        { id: 'ALT004', type: 'Market Update', message: 'Rice prices increased by 12% in Tamil Nadu', severity: 'low', date: '2024-01-12', affected: '3,456 farmers' }
    ],
    subsidies: [
        { id: 'SUB001', farmer: 'Rajesh Kumar', type: 'Seed Subsidy', amount: '₹15,000', appliedDate: '2024-01-10', status: 'approved' },
        { id: 'SUB002', farmer: 'Priya Sharma', type: 'Fertilizer Subsidy', amount: '₹8,500', appliedDate: '2024-01-12', status: 'pending' },
        { id: 'SUB003', farmer: 'Amit Patel', type: 'Equipment Subsidy', amount: '₹45,000', appliedDate: '2024-01-08', status: 'disbursed' },
        { id: 'SUB004', farmer: 'Sunita Devi', type: 'Crop Insurance', amount: '₹12,000', appliedDate: '2024-01-14', status: 'pending' },
        { id: 'SUB005', farmer: 'Ravi Reddy', type: 'Seed Subsidy', amount: '₹6,500', appliedDate: '2024-01-11', status: 'rejected' }
    ]
};

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    populateData();
    setupEventListeners();
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
});

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.admin-sidebar li').forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.id.replace('nav-', 'section-');
            showSection(sectionId);
            
            // Update active nav
            document.querySelectorAll('.admin-sidebar li').forEach(li => li.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Search and filter functionality
    setupSearchAndFilters();
    
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        if(confirm('Are you sure you want to logout?')) {
            window.location.href = 'login.html';
        }
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if(targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('fade-in');
        
        // Load section-specific data
        loadSectionData(sectionId);
    }
}

function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'section-farmers':
            populateFarmersTable();
            break;
        case 'section-fields':
            populateFieldsGrid();
            break;
        case 'section-alerts':
            populateAlertsList();
            break;
        case 'section-subsidies':
            populateSubsidiesTable();
            break;
        case 'section-weather':
            updateWeatherData();
            break;
    }
}

function populateData() {
    populateFarmersTable();
    populateFieldsGrid();
    populateAlertsList();
    populateSubsidiesTable();
}

function populateFarmersTable() {
    const tbody = document.getElementById('farmersTableBody');
    if(!tbody) return;
    
    tbody.innerHTML = sampleData.farmers.map(farmer => `
        <tr>
            <td>${farmer.id}</td>
            <td>${farmer.name}</td>
            <td>${farmer.location}</td>
            <td>${farmer.fields}</td>
            <td>${farmer.area}</td>
            <td><span class="field-status ${farmer.status.toLowerCase()}">${farmer.status}</span></td>
            <td>
                <button onclick="editFarmer('${farmer.id}')" class="btn-small">Edit</button>
                <button onclick="viewFarmer('${farmer.id}')" class="btn-small">View</button>
                <button onclick="deleteFarmer('${farmer.id}')" class="btn-small btn-danger">Delete</button>
            </td>
        </tr>
    `).join('');
}

function populateFieldsGrid() {
    const grid = document.getElementById('fieldsGrid');
    if(!grid) return;
    
    grid.innerHTML = sampleData.fields.map(field => `
        <div class="field-card">
            <h4>${field.name}</h4>
            <p><strong>Farmer:</strong> ${field.farmer}</p>
            <p><strong>Crop:</strong> ${field.crop}</p>
            <p><strong>Area:</strong> ${field.area}</p>
            <p><strong>Soil Moisture:</strong> ${field.soilMoisture}</p>
            <p><strong>Last Irrigation:</strong> ${field.lastIrrigation}</p>
            <div class="mt-2">
                <span class="field-status ${field.status}">${field.status.charAt(0).toUpperCase() + field.status.slice(1)}</span>
            </div>
            <div class="mt-2">
                <button onclick="viewFieldDetails('${field.id}')" class="btn-small">View Details</button>
                <button onclick="irrigateField('${field.id}')" class="btn-small">Irrigate</button>
            </div>
        </div>
    `).join('');
}

function populateAlertsList() {
    const list = document.getElementById('alertsList');
    if(!list) return;
    
    list.innerHTML = sampleData.alerts.map(alert => `
        <div class="alert-item ${alert.severity === 'high' ? '' : alert.severity}">
            <div class="alert-header">
                <h4>${alert.type}</h4>
                <span class="alert-date">${alert.date}</span>
            </div>
            <p>${alert.message}</p>
            <div class="alert-footer">
                <span><strong>Affected:</strong> ${alert.affected}</span>
                <div>
                    <button onclick="editAlert('${alert.id}')" class="btn-small">Edit</button>
                    <button onclick="broadcastAlert('${alert.id}')" class="btn-small">Broadcast</button>
                    <button onclick="resolveAlert('${alert.id}')" class="btn-small">Resolve</button>
                </div>
            </div>
        </div>
    `).join('');
}

function populateSubsidiesTable() {
    const tbody = document.getElementById('subsidiesTableBody');
    if(!tbody) return;
    
    tbody.innerHTML = sampleData.subsidies.map(subsidy => `
        <tr>
            <td>${subsidy.id}</td>
            <td>${subsidy.farmer}</td>
            <td>${subsidy.type}</td>
            <td>${subsidy.amount}</td>
            <td>${subsidy.appliedDate}</td>
            <td><span class="field-status ${subsidy.status}">${subsidy.status.charAt(0).toUpperCase() + subsidy.status.slice(1)}</span></td>
            <td>
                <button onclick="processSubsidy('${subsidy.id}')" class="btn-small">Process</button>
                <button onclick="viewSubsidy('${subsidy.id}')" class="btn-small">View</button>
            </td>
        </tr>
    `).join('');
}

function setupSearchAndFilters() {
    // Farmer search
    const farmerSearch = document.getElementById('farmerSearch');
    if(farmerSearch) {
        farmerSearch.addEventListener('input', function() {
            filterFarmers(this.value);
        });
    }
    
    // State filter
    const stateFilter = document.getElementById('stateFilter');
    if(stateFilter) {
        stateFilter.addEventListener('change', function() {
            filterFarmersByState(this.value);
        });
    }
    
    // Field status filter
    const fieldStatusFilter = document.getElementById('fieldStatusFilter');
    if(fieldStatusFilter) {
        fieldStatusFilter.addEventListener('change', function() {
            filterFieldsByStatus(this.value);
        });
    }
}

function filterFarmers(searchTerm) {
    const rows = document.querySelectorAll('#farmersTableBody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm.toLowerCase()) ? '' : 'none';
    });
}

function filterFarmersByState(state) {
    const rows = document.querySelectorAll('#farmersTableBody tr');
    rows.forEach(row => {
        if(!state) {
            row.style.display = '';
        } else {
            const locationCell = row.cells[2].textContent.toLowerCase();
            row.style.display = locationCell.includes(state.replace('_', ' ')) ? '' : 'none';
        }
    });
}

function filterFieldsByStatus(status) {
    const cards = document.querySelectorAll('.field-card');
    cards.forEach(card => {
        if(!status) {
            card.style.display = '';
        } else {
            const statusElement = card.querySelector('.field-status');
            card.style.display = statusElement.classList.contains(status) ? '' : 'none';
        }
    });
}

function initializeCharts() {
    // Registration Chart
    const regCtx = document.getElementById('registrationChart');
    if(regCtx) {
        new Chart(regCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Registrations',
                    data: [120, 190, 300, 500, 200, 300],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
    
    // Crop Chart
    const cropCtx = document.getElementById('cropChart');
    if(cropCtx) {
        new Chart(cropCtx, {
            type: 'doughnut',
            data: {
                labels: ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Others'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
    
    // Weather Chart
    const weatherCtx = document.getElementById('weatherChart');
    if(weatherCtx) {
        new Chart(weatherCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Temperature (°C)',
                    data: [28, 32, 35, 33, 30, 29, 31],
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: false }
                }
            }
        });
    }
    
    // Rainfall Chart
    const rainfallCtx = document.getElementById('rainfallChart');
    if(rainfallCtx) {
        new Chart(rainfallCtx, {
            type: 'bar',
            data: {
                labels: ['Tamil Nadu', 'Karnataka', 'Maharashtra', 'Punjab'],
                datasets: [{
                    label: 'Rainfall (mm)',
                    data: [45, 78, 23, 56],
                    backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}

function updateDateTime() {
    const now = new Date();
    const adminInfo = document.getElementById('adminInfo');
    if(adminInfo) {
        adminInfo.textContent = `Welcome, Admin | ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    }
}

// Action functions
function editFarmer(id) {
    showModal('Edit Farmer', `
        <form onsubmit="saveFarmer(event, '${id}')">
            <div class="form-group">
                <label>Name:</label>
                <input type="text" name="name" required>
            </div>
            <div class="form-group">
                <label>Location:</label>
                <select name="location" required>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Punjab">Punjab</option>
                </select>
            </div>
            <div class="form-group">
                <label>Phone:</label>
                <input type="tel" name="phone" required>
            </div>
            <button type="submit" class="add-btn">Save Changes</button>
        </form>
    `);
}

function viewFarmer(id) {
    const farmer = sampleData.farmers.find(f => f.id === id);
    showModal('Farmer Details', `
        <div class="farmer-details">
            <h3>${farmer.name}</h3>
            <p><strong>ID:</strong> ${farmer.id}</p>
            <p><strong>Location:</strong> ${farmer.location}</p>
            <p><strong>Fields:</strong> ${farmer.fields}</p>
            <p><strong>Total Area:</strong> ${farmer.area}</p>
            <p><strong>Status:</strong> ${farmer.status}</p>
        </div>
    `);
}

function deleteFarmer(id) {
    if(confirm('Are you sure you want to delete this farmer?')) {
        alert('Farmer deleted successfully!');
        populateFarmersTable();
    }
}

function processSubsidy(id) {
    showModal('Process Subsidy', `
        <form onsubmit="saveSubsidyProcess(event, '${id}')">
            <div class="form-group">
                <label>Status:</label>
                <select name="status" required>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                    <option value="pending">Keep Pending</option>
                </select>
            </div>
            <div class="form-group">
                <label>Comments:</label>
                <textarea name="comments" rows="3"></textarea>
            </div>
            <button type="submit" class="add-btn">Process</button>
        </form>
    `);
}

function broadcastAlert(id) {
    if(confirm('Broadcast this alert to all affected farmers?')) {
        alert('Alert broadcasted successfully!');
    }
}

function resolveAlert(id) {
    if(confirm('Mark this alert as resolved?')) {
        alert('Alert resolved successfully!');
        populateAlertsList();
    }
}

function irrigateField(id) {
    if(confirm('Send irrigation command to this field?')) {
        alert('Irrigation command sent successfully!');
        populateFieldsGrid();
    }
}

// Settings functions
function openUserManagement() {
    showModal('User Management', `
        <div class="user-management">
            <h3>System Users</h3>
            <button class="add-btn mb-2">+ Add New User</button>
            <div class="users-list">
                <div class="user-item">
                    <span>Admin User</span>
                    <span>admin@agristack.com</span>
                    <button class="btn-small">Edit</button>
                </div>
            </div>
        </div>
    `);
}

function openNotificationSettings() {
    showModal('Notification Settings', `
        <form onsubmit="saveNotificationSettings(event)">
            <div class="form-group">
                <label>
                    <input type="checkbox" checked> Email Notifications
                </label>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" checked> SMS Alerts
                </label>
            </div>
            <div class="form-group">
                <label>Alert Threshold (Critical):</label>
                <input type="number" value="85" min="0" max="100">
            </div>
            <button type="submit" class="add-btn">Save Settings</button>
        </form>
    `);
}

function openApiSettings() {
    showModal('API Configuration', `
        <form onsubmit="saveApiSettings(event)">
            <div class="form-group">
                <label>Weather API Key:</label>
                <input type="password" placeholder="Enter API key">
            </div>
            <div class="form-group">
                <label>Satellite Data URL:</label>
                <input type="url" placeholder="Enter API endpoint">
            </div>
            <button type="submit" class="add-btn">Save Configuration</button>
        </form>
    `);
}

function openBackupSettings() {
    showModal('Backup Settings', `
        <div class="backup-settings">
            <h3>Automated Backups</h3>
            <div class="form-group">
                <label>Backup Frequency:</label>
                <select>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                </select>
            </div>
            <div class="form-group">
                <label>Retention Period:</label>
                <select>
                    <option>30 days</option>
                    <option>90 days</option>
                    <option>1 year</option>
                </select>
            </div>
            <button class="add-btn">Create Backup Now</button>
        </div>
    `);
}

function openSecuritySettings() {
    showModal('Security Settings', `
        <form onsubmit="saveSecuritySettings(event)">
            <div class="form-group">
                <label>
                    <input type="checkbox" checked> Two-Factor Authentication
                </label>
            </div>
            <div class="form-group">
                <label>Session Timeout (minutes):</label>
                <input type="number" value="30" min="5" max="480">
            </div>
            <div class="form-group">
                <label>Password Policy:</label>
                <select>
                    <option>Standard</option>
                    <option>Strong</option>
                    <option>Very Strong</option>
                </select>
            </div>
            <button type="submit" class="add-btn">Save Security Settings</button>
        </form>
    `);
}

function openAppearanceSettings() {
    showModal('Appearance Settings', `
        <div class="appearance-settings">
            <h3>Dashboard Theme</h3>
            <div class="theme-options">
                <div class="theme-option active" onclick="selectTheme('default')">
                    <div class="theme-preview default"></div>
                    <span>Default</span>
                </div>
                <div class="theme-option" onclick="selectTheme('dark')">
                    <div class="theme-preview dark"></div>
                    <span>Dark Mode</span>
                </div>
                <div class="theme-option" onclick="selectTheme('green')">
                    <div class="theme-preview green"></div>
                    <span>Green Theme</span>
                </div>
            </div>
            <button class="add-btn">Apply Theme</button>
        </div>
    `);
}

// Modal functions
function showModal(title, content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2>${title}</h2>
        ${content}
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Form submission handlers
function saveFarmer(event, id) {
    event.preventDefault();
    alert('Farmer updated successfully!');
    closeModal();
    populateFarmersTable();
}

function saveSubsidyProcess(event, id) {
    event.preventDefault();
    alert('Subsidy processed successfully!');
    closeModal();
    populateSubsidiesTable();
}

function saveNotificationSettings(event) {
    event.preventDefault();
    alert('Notification settings saved!');
    closeModal();
}

function saveApiSettings(event) {
    event.preventDefault();
    alert('API configuration saved!');
    closeModal();
}

function saveSecuritySettings(event) {
    event.preventDefault();
    alert('Security settings updated!');
    closeModal();
}

function selectTheme(theme) {
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
    });
    event.target.closest('.theme-option').classList.add('active');
}

function updateWeatherData() {
    // Simulate real-time weather updates
    const weatherCards = document.querySelectorAll('.weather-card');
    weatherCards.forEach(card => {
        const temp = card.querySelector('.weather-temp');
        if(temp) {
            const currentTemp = parseInt(temp.textContent);
            const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            temp.textContent = `${currentTemp + variation}°C`;
        }
    });
}

// Auto-refresh data every 5 minutes
setInterval(() => {
    updateWeatherData();
    console.log('Data refreshed at:', new Date().toLocaleTimeString());
}, 300000);

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}