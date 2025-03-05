
// AgriSensePro Main Application Logic

// Sample data structures for the application
let sensorData = {
  sensors: [
    { id: 'Sensor 1', temp: 72, humid: 65, light: 14, ph: 7.5, battery: 95, status: 'Active' },
    { id: 'Sensor 2', temp: 71, humid: 64, light: 13.8, ph: 7.4, battery: 88, status: 'Active' },
    { id: 'Sensor 3', temp: 73, humid: 66, light: 14.2, ph: 7.6, battery: 92, status: 'Active' },
    { id: 'Sensor 4', temp: 70, humid: 63, light: 13.5, ph: 7.3, battery: 90, status: 'Active' }
  ],
  crops: {
    'Corn': { temp: 72, humid: 65, moisture: 68, yield: 85, status: 'Good' },
    'Wheat': { temp: 71, humid: 62, moisture: 64, yield: 90, status: 'Excellent' },
    'Soybeans': { temp: 73, humid: 67, moisture: 70, yield: 82, status: 'Good' }
  },
  weather: { temp: 72, humid: 65, wind: 5, pressure: 30.1, forecast: 'Partly Cloudy' }
};

// Global variables for application state
let unitSystem = 'imperial'; // 'imperial' or 'metric'
let expandedSensor = null;
let expandedCrop = null;
let notifications = [];
let currentView = 'home';

// Application initialization
function initializeApp() {
  console.log("Initializing AgriSense Pro application...");
  
  // Set up initial views - hide all except home
  setupViews();
  
  // Add click handlers to navigation items
  setupNavigation();
  
  // Add event listeners for other UI elements
  setupEventListeners();
  
  // Generate initial notifications
  generateSampleNotifications();
  
  // Update the notification badge
  updateNotificationBadge();
  
  // Simulate sensor data updates
  setupDataUpdates();
  
  // Add initial log entry
  addLogEntry("Application initialized");
  
  console.log("AgriSense Pro initialized successfully");
}

// Set up view visibility
function setupViews() {
  const views = ['home', 'sensors', 'analytics', 'notifications', 'account', 'weather', 'add-sensor', 'settings'];
  views.forEach(view => {
    const viewElement = document.querySelector(`.${view}-view`);
    if (viewElement) {
      viewElement.style.display = 'none';
      viewElement.classList.remove('active');
      if (view === 'home') {
        viewElement.style.display = 'block';
        viewElement.classList.add('active');
      }
    } else {
      console.warn(`View element .${view}-view not found`);
    }
  });
}

// Set up navigation
function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(navItem => {
    navItem.addEventListener('click', function(e) {
      e.preventDefault();
      const viewName = this.getAttribute('data-view');
      if (viewName) {
        switchView(viewName);
      }
    });
  });
}

// Set up other event listeners
function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keyup', performSearch);
  }
  
  // Unit toggle
  const unitToggle = document.getElementById('unitToggle');
  if (unitToggle) {
    unitToggle.addEventListener('change', function() {
      unitSystem = this.checked ? 'metric' : 'imperial';
      updateAllCharts();
      updateDisplayedValues();
    });
  }
}

// Generate sample notifications
function generateSampleNotifications() {
  notifications = [
    { 
      id: 1, 
      title: 'Low Battery Alert', 
      message: 'Sensor 2 battery level is below 20%', 
      type: 'warning', 
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false
    },
    { 
      id: 2, 
      title: 'Temperature Alert', 
      message: 'Sensor 1 detected high temperature', 
      type: 'danger', 
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true
    },
    { 
      id: 3, 
      title: 'System Update', 
      message: 'AgriSense Pro updated to version 3.2', 
      type: 'info', 
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true
    }
  ];
  
  // Update notifications view
  updateNotificationsView();
}

// Update notification badge
function updateNotificationBadge() {
  const badge = document.querySelector('.notification-badge');
  const unreadCount = notifications.filter(n => !n.read).length;
  
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'block' : 'none';
  }
}

// Update notifications view
function updateNotificationsView() {
  const container = document.querySelector('.notifications-list');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (notifications.length === 0) {
    container.innerHTML = '<div class="empty-state">No notifications</div>';
    return;
  }
  
  notifications.forEach(notification => {
    const notifElement = document.createElement('div');
    notifElement.className = `notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`;
    
    // Format date for display
    const date = new Date(notification.timestamp);
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = date.toLocaleDateString();
    
    notifElement.innerHTML = `
      <div class="notification-header">
        <span class="notification-title">${notification.title}</span>
        <span class="notification-time">${timeStr}, ${dateStr}</span>
      </div>
      <div class="notification-body">
        ${notification.message}
      </div>
      <div class="notification-actions">
        <button onclick="markNotificationRead(${notification.id})" class="btn sm">
          ${notification.read ? 'Mark Unread' : 'Mark Read'}
        </button>
        <button onclick="deleteNotification(${notification.id})" class="btn sm danger">Delete</button>
      </div>
    `;
    
    container.appendChild(notifElement);
  });
}

// Mark notification as read/unread
function markNotificationRead(id) {
  const notification = notifications.find(n => n.id === id);
  if (notification) {
    notification.read = !notification.read;
    updateNotificationsView();
    updateNotificationBadge();
  }
}

// Delete notification
function deleteNotification(id) {
  notifications = notifications.filter(n => n.id !== id);
  updateNotificationsView();
  updateNotificationBadge();
}

// Add notification
function addNotification(title, message, type = 'info') {
  const id = notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1;
  
  notifications.push({
    id,
    title,
    message,
    type,
    timestamp: new Date().toISOString(),
    read: false
  });
  
  updateNotificationsView();
  updateNotificationBadge();
  
  // Show toast notification
  showToast(title, message, type);
}

// Show toast notification
function showToast(title, message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-header">
      <span class="toast-title">${title}</span>
      <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
    <div class="toast-body">
      ${message}
    </div>
  `;
  
  const toastContainer = document.querySelector('.toast-container');
  if (toastContainer) {
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 500);
    }, 5000);
  }
}

// Add log entry
function addLogEntry(message) {
  console.log(`[AgriSense Log] ${message}`);
  
  const logContainer = document.getElementById('systemLog');
  if (logContainer) {
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `<span class="log-time">${timestamp}</span> <span class="log-message">${message}</span>`;
    
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Limit to 100 entries
    if (logContainer.children.length > 100) {
      logContainer.removeChild(logContainer.lastChild);
    }
  }
}

// Set up periodic data updates
function setupDataUpdates() {
  // Update sensor data every 30 seconds
  setInterval(() => {
    // Update sensor readings with small random changes
    sensorData.sensors.forEach(sensor => {
      sensor.temp = parseFloat(sensor.temp) + (Math.random() - 0.5) * 2;
      sensor.humid = parseFloat(sensor.humid) + (Math.random() - 0.5) * 3;
      sensor.light = parseFloat(sensor.light) + (Math.random() - 0.5) * 0.5;
      sensor.ph = parseFloat(sensor.ph) + (Math.random() - 0.5) * 0.2;
      
      // Decrease battery level slightly
      sensor.battery = Math.max(0, parseFloat(sensor.battery) - Math.random() * 0.1);
      
      // Generate low battery notification if needed
      if (sensor.battery < 20 && Math.random() < 0.1) {
        addNotification('Low Battery Alert', `${sensor.id} battery level is below 20%`, 'warning');
      }
    });
    
    // Update chart data
    updateAllCharts();
    
  }, 30000);
  
  // Perform more complex updates every 5 minutes
  setInterval(() => {
    // Update weather data
    sensorData.weather.temp = parseFloat(sensorData.weather.temp) + (Math.random() - 0.5) * 3;
    sensorData.weather.humid = parseFloat(sensorData.weather.humid) + (Math.random() - 0.5) * 5;
    sensorData.weather.wind = parseFloat(sensorData.weather.wind) + (Math.random() - 0.5) * 2;
    sensorData.weather.pressure = parseFloat(sensorData.weather.pressure) + (Math.random() - 0.5) * 0.1;
    
    // Update crop data
    Object.keys(sensorData.crops).forEach(crop => {
      sensorData.crops[crop].temp = parseFloat(sensorData.crops[crop].temp) + (Math.random() - 0.5) * 2;
      sensorData.crops[crop].humid = parseFloat(sensorData.crops[crop].humid) + (Math.random() - 0.5) * 3;
      sensorData.crops[crop].moisture = parseFloat(sensorData.crops[crop].moisture) + (Math.random() - 0.5) * 4;
      
      // Small changes to yield forecast
      sensorData.crops[crop].yield = Math.min(100, Math.max(0, parseFloat(sensorData.crops[crop].yield) + (Math.random() - 0.5) * 1));
    });
    
    // Update all charts
    updateAllCharts();
    
    // Add log entry
    addLogEntry("Sensor and crop data updated");
  }, 300000);
}

// Switch between views
function switchView(viewName) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.style.display = 'none';
    view.classList.remove('active');
  });
  
  // Show the selected view
  const selectedView = document.querySelector(`.${viewName}-view`);
  if (selectedView) {
    selectedView.style.display = 'block';
    selectedView.classList.add('active');
    
    // Update active state in navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      }
    });
    
    // Update current view
    currentView = viewName;
    
    // Update charts for the view
    updateChartsForView(viewName);
    
    // Special handling for specific views
    if (viewName === 'notifications') {
      // Mark all as read when viewing notifications
      notifications.forEach(n => n.read = true);
      updateNotificationBadge();
      updateNotificationsView();
    }
    
    // Add log entry
    addLogEntry(`Switched to ${viewName} view`);
  } else {
    console.warn(`View .${viewName}-view not found`);
  }
}

// Expand/collapse sensor details
function toggleSensorExpand(sensorId) {
  if (expandedSensor === sensorId) {
    // Collapse
    expandedSensor = null;
    document.querySelectorAll('.sensor-card.expanded').forEach(card => {
      card.classList.remove('expanded');
    });
  } else {
    // Collapse any expanded card
    document.querySelectorAll('.sensor-card.expanded').forEach(card => {
      card.classList.remove('expanded');
    });
    
    // Expand the selected
    expandedSensor = sensorId;
    const card = document.querySelector(`.sensor-card[data-sensor="${sensorId}"]`);
    if (card) {
      card.classList.add('expanded');
    }
  }
}

// Expand/collapse crop details
function toggleCropExpand(cropName) {
  if (expandedCrop === cropName) {
    // Collapse
    expandedCrop = null;
    document.querySelectorAll('.crop-card.expanded').forEach(card => {
      card.classList.remove('expanded');
    });
  } else {
    // Collapse any expanded card
    document.querySelectorAll('.crop-card.expanded').forEach(card => {
      card.classList.remove('expanded');
    });
    
    // Expand the selected
    expandedCrop = cropName;
    const card = document.querySelector(`.crop-card[data-crop="${cropName}"]`);
    if (card) {
      card.classList.add('expanded');
    }
  }
}

// Search functionality
function performSearch() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  if (!searchTerm) {
    // Clear search
    document.querySelectorAll('.searchable').forEach(item => {
      item.style.display = 'block';
    });
    return;
  }
  
  // Search sensors
  document.querySelectorAll('.sensor-card.searchable').forEach(card => {
    const sensorName = card.querySelector('.card-title').textContent.toLowerCase();
    const sensorDetails = card.querySelector('.card-details').textContent.toLowerCase();
    
    if (sensorName.includes(searchTerm) || sensorDetails.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  
  // Search crops
  document.querySelectorAll('.crop-card.searchable').forEach(card => {
    const cropName = card.querySelector('.card-title').textContent.toLowerCase();
    const cropDetails = card.querySelector('.card-details').textContent.toLowerCase();
    
    if (cropName.includes(searchTerm) || cropDetails.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  
  // Search notifications
  document.querySelectorAll('.notification-item.searchable').forEach(item => {
    const title = item.querySelector('.notification-title').textContent.toLowerCase();
    const message = item.querySelector('.notification-body').textContent.toLowerCase();
    
    if (title.includes(searchTerm) || message.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Update displayed temperature values based on unit system
function updateDisplayedValues() {
  document.querySelectorAll('.temp-value').forEach(element => {
    const tempF = parseFloat(element.getAttribute('data-temp-f'));
    if (!isNaN(tempF)) {
      if (unitSystem === 'imperial') {
        element.textContent = `${tempF.toFixed(1)}°F`;
      } else {
        const tempC = (tempF - 32) * 5/9;
        element.textContent = `${tempC.toFixed(1)}°C`;
      }
    }
  });
}

// Action Functions

// Schedule irrigation
function scheduleIrrigation() {
  addNotification('Irrigation Scheduled', 'Farm-wide irrigation scheduled for tomorrow at 6:00 AM', 'info');
  addLogEntry('Irrigation scheduled');
}

// Apply fertilizer
function applyFertilizer() {
  addNotification('Fertilization Scheduled', 'Farm-wide fertilization scheduled for tomorrow at 7:00 AM', 'info');
  addLogEntry('Fertilization scheduled');
}

// Monitor pests
function monitorPests() {
  addNotification('Pest Monitoring', 'Pest monitoring scan initiated', 'info');
  addLogEntry('Pest monitoring initiated');
}

// Add crop
function addCrop() {
  addNotification('Crop Added', 'New crop added to monitoring system', 'success');
  addLogEntry('New crop added');
}

// Add sensor
function addSensor() {
  addNotification('New Sensor', 'New sensor being configured', 'info');
  addLogEntry('New sensor configuration initiated');
}

// Export data
function exportData() {
  const data = JSON.stringify(sensorData, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'agrisense_data.json';
  a.click();
  URL.revokeObjectURL(url);
  addNotification('Data Exported', 'Farm data saved as JSON', 'success');
  addLogEntry('Data exported');
}

// Generate report
function generateReport() {
  alert('Generating comprehensive farm report: Includes sensor data, crop status, and weather trends.');
  addNotification('Report Generated', 'Farm report created', 'success');
  addLogEntry('Report generated');
}

// Run diagnostics
function runDiagnostics() {
  alert('Running system diagnostics. This will check all sensors, connectivity, and system health.');
  addNotification('Diagnostics', 'System diagnostics initiated', 'info');
  addLogEntry('System diagnostics started');
}

// Set alert rules
function setAlertRules() {
  alert('Configure alert thresholds for temp, humidity, etc.');
  addNotification('Alert Rules', 'Alert rules configuration initiated', 'info');
  addLogEntry('Alert rules setting initiated');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
// AgriSensePro Main Application Logic

// Sample data structures for the application
let sensorData = {
  sensors: [
    { id: 'Sensor 1', temp: 72, humid: 65, light: 14, ph: 7.5, battery: 95, status: 'Active' },
    { id: 'Sensor 2', temp: 71, humid: 64, light: 13.8, ph: 7.4, battery: 88, status: 'Active' },
    { id: 'Sensor 3', temp: 73, humid: 66, light: 14.2, ph: 7.6, battery: 92, status: 'Active' },
    { id: 'Sensor 4', temp: 70, humid: 63, light: 13.5, ph: 7.3, battery: 90, status: 'Active' }
  ],
  crops: {
    'Corn': { temp: 72, humid: 65, moisture: 68, yield: 85, status: 'Good' },
    'Wheat': { temp: 71, humid: 62, moisture: 64, yield: 90, status: 'Excellent' },
    'Soybeans': { temp: 73, humid: 67, moisture: 70, yield: 82, status: 'Good' }
  },
  weather: { temp: 72, humid: 65, wind: 5, pressure: 30.1, forecast: 'Partly Cloudy' }
};

// Global variables for application state
let unitSystem = 'imperial'; // 'imperial' or 'metric'
let expandedSensor = null;
let expandedCrop = null;
let notifications = [
  { id: 1, title: 'Low Battery Warning', message: 'Sensor 2 battery level is at 25%. Consider replacing batteries soon.', type: 'warning', time: 'Just now', read: false },
  { id: 2, title: 'Weather Alert', message: 'Possible light rain forecasted for tomorrow. Consider adjusting irrigation schedule.', type: 'info', time: '2 hours ago', read: true },
  { id: 3, title: 'System Update', message: 'All sensors successfully updated to firmware version 2.1.3.', type: 'success', time: 'Yesterday', read: true }
];
let currentView = 'home';

// Application initialization
function initializeApp() {
  console.log("Initializing AgriSense Pro application...");
  
  // Add initial log entry
  addLogEntry("Application initialized");
  
  // Initialize the notification badge
  updateNotificationBadge();
  
  // Simulate sensor data updates
  setupDataUpdates();
  
  console.log("AgriSense Pro initialized successfully");
}

// Update notification badge with unread count
function updateNotificationBadge() {
  const unreadCount = notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notificationBadge');
  
  if (badge) {
    if (unreadCount > 0) {
      badge.style.display = 'flex';
      badge.textContent = unreadCount;
    } else {
      badge.style.display = 'none';
    }
  }
}

// Set up periodic data updates
function setupDataUpdates() {
  // Simulate data changing over time
  setInterval(() => {
    // Update sensor readings with small random variations
    sensorData.sensors.forEach(sensor => {
      sensor.temp = parseFloat((parseFloat(sensor.temp) + (Math.random() - 0.5)).toFixed(1));
      sensor.humid = parseFloat((parseFloat(sensor.humid) + (Math.random() - 0.5)).toFixed(1));
      sensor.light = parseFloat((parseFloat(sensor.light) + (Math.random() - 0.5) * 0.2).toFixed(1));
      sensor.ph = parseFloat((parseFloat(sensor.ph) + (Math.random() - 0.5) * 0.1).toFixed(1));
      
      // Slowly drain battery
      sensor.battery = Math.max(0, parseFloat((parseFloat(sensor.battery) - Math.random() * 0.1).toFixed(1)));
      
      // Generate random notifications
      if (sensor.battery < 20 && Math.random() < 0.01) {
        addNotification(`Low Battery - ${sensor.id}`, `${sensor.id} battery level is at ${sensor.battery}%. Please replace soon.`, 'warning');
      }
    });
    
    // Update weather data
    sensorData.weather.temp = parseFloat((parseFloat(sensorData.weather.temp) + (Math.random() - 0.5)).toFixed(1));
    sensorData.weather.humid = parseFloat((parseFloat(sensorData.weather.humid) + (Math.random() - 0.5)).toFixed(1));
    sensorData.weather.wind = parseFloat((parseFloat(sensorData.weather.wind) + (Math.random() - 0.5) * 0.5).toFixed(1));
    sensorData.weather.pressure = parseFloat((parseFloat(sensorData.weather.pressure) + (Math.random() - 0.5) * 0.1).toFixed(2));
    
    // Update UI elements that show live data
    updateLiveDataElements();
    
    // If current view has charts, update them
    if (['home', 'sensors', 'weather', 'analytics'].includes(currentView)) {
      updateChartsForView(currentView);
    }
  }, 10000); // Update every 10 seconds
}

// Update UI elements that display live data
function updateLiveDataElements() {
  // Example: update the weather temp on the dashboard
  const weatherTempElements = document.querySelectorAll('.weather-temp');
  weatherTempElements.forEach(el => {
    el.textContent = `${sensorData.weather.temp}°F`;
  });
  
  // Update sensor cards
  sensorData.sensors.forEach((sensor, index) => {
    const sensorCard = document.querySelector(`.sensor-card:nth-child(${index + 1})`);
    if (sensorCard) {
      const tempValue = sensorCard.querySelector('.card-value');
      const humidValue = sensorCard.querySelector('.card-details');
      if (tempValue) tempValue.textContent = `${sensor.temp}°F`;
      if (humidValue) humidValue.textContent = `Humidity: ${sensor.humid}%`;
    }
  });
}

// Add a new notification
function addNotification(title, message, type = 'info') {
  const id = notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1;
  const notification = {
    id,
    title,
    message,
    type,
    time: 'Just now',
    read: false
  };
  
  notifications.unshift(notification);
  updateNotificationBadge();
  
  // Add to notifications list if it's visible
  const notificationsList = document.getElementById('notificationsList');
  if (notificationsList) {
    const notificationItem = document.createElement('div');
    notificationItem.className = `notification-item ${type} unread`;
    notificationItem.innerHTML = `
      <div class="notification-header">
        <div class="notification-title">${title}</div>
        <div class="notification-time">Just now</div>
      </div>
      <div class="notification-body">
        ${message}
      </div>
      <div class="notification-actions">
        <button class="btn sm" onclick="markAsRead(this)">Mark as Read</button>
      </div>
    `;
    notificationsList.prepend(notificationItem);
  }
  
  // Show toast
  if (typeof showToast === 'function') {
    showToast(message, type);
  }
}

// Add log entry to system logs
function addLogEntry(message) {
  console.log(`[LOG] ${message}`);
  // Would normally add to a log container in the UI
}

// Run initialization when the page loads
window.addEventListener('DOMContentLoaded', initializeApp);

// Show or hide dropdown menus
document.addEventListener('click', function(event) {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    if (toggle.contains(event.target)) {
      const menu = toggle.nextElementSibling;
      menu.classList.toggle('show');
    } else {
      const menus = document.querySelectorAll('.dropdown-menu');
      menus.forEach(menu => {
        if (!menu.contains(event.target)) {
          menu.classList.remove('show');
        }
      });
    }
  });
});

// Performance search across all data
function performSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.toLowerCase();
  
  if (searchTerm.length < 2) return;
  
  let results = [];
  
  // Search in sensors
  sensorData.sensors.forEach(sensor => {
    if (sensor.id.toLowerCase().includes(searchTerm)) {
      results.push({
        type: 'sensor',
        id: sensor.id,
        title: sensor.id,
        details: `Temp: ${sensor.temp}°F, Humidity: ${sensor.humid}%`
      });
    }
  });
  
  // Search in crops
  Object.entries(sensorData.crops).forEach(([cropName, cropData]) => {
    if (cropName.toLowerCase().includes(searchTerm)) {
      results.push({
        type: 'crop',
        id: cropName,
        title: cropName,
        details: `Health: ${cropData.status}, Yield: ${cropData.yield}%`
      });
    }
  });
  
  // Search in notifications
  notifications.forEach(notification => {
    if (notification.title.toLowerCase().includes(searchTerm) || 
        notification.message.toLowerCase().includes(searchTerm)) {
      results.push({
        type: 'notification',
        id: notification.id,
        title: notification.title,
        details: notification.message
      });
    }
  });
  
  // Display search results (in a real app, this would show a dropdown)
  console.log('Search results:', results);
  
  // If we found a specific item, navigate to it
  if (results.length === 1) {
    const result = results[0];
    if (result.type === 'sensor') {
      viewSensorDetail(result.id.split(' ')[1]);
    } else if (result.type === 'crop') {
      switchView('analytics');
      setTimeout(() => showCropDetail(result.id), 100);
    } else if (result.type === 'notification') {
      switchView('notifications');
    }
  } else if (results.length > 1) {
    showToast(`Found ${results.length} results for "${searchTerm}"`, 'info');
  }
}
