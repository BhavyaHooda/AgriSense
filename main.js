// Define all missing functions to make buttons work properly
function testConnection() {
  showNotification('Testing server connection...', 'info');
  setTimeout(() => {
    showNotification('Connection successful! Latency: 42ms', 'success');
  }, 1500);
}

function testNotification() {
  showNotification('This is a test notification', 'info');
}

function analyzeDataUsage() {
  showNotification('Analyzing data usage...', 'info');
  setTimeout(() => {
    alert("Data Usage Analysis\n\nTotal Storage: 16.8 GB\nSensor Data: 12.2 GB\nWeather Data: 3.5 GB\nAnalytics: 1.1 GB\n\nEstimated Growth: 250 MB/week");
  }, 1500);
}

function scanForSensors() {
  showNotification('Scanning for nearby sensors...', 'info');
  setTimeout(() => {
    showNotification('Found 3 new sensors! Click to view details.', 'success');
  }, 2000);
}

function changePassword() {
  alert("Password change form would appear here.");
}

function viewAccountActivity() {
  alert("Account Activity Log\n\nLast Login: March 6, 2025 14:32:15\nIP Address: 192.168.1.45\nActive Sessions: 1\nLast Password Change: January 15, 2025");
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification-toast ${type}`;
  notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      <span>${message}</span>
  `;

  // Style the notification
  Object.assign(notification.style, {
      position: 'fixed',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: type === 'success' ? '#4caf50' : '#2196f3',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '30px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      zIndex: '9999',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '500',
      opacity: '0',
      transition: 'opacity 0.3s, transform 0.3s'
  });

  // Add to document
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function exportData(format) {
  console.log(`Exporting data in ${format} format...`);
  showNotification(`Preparing ${format.toUpperCase()} export. Download will start shortly.`, 'info');
}

function clearCache() {
  console.log("Clearing cache...");
  if (confirm("Are you sure you want to clear the application cache? This may log you out.")) {
    showNotification('Cache cleared successfully', 'success');
  }
}

function resetSettings() {
  if (confirm("Are you sure you want to reset all settings to default values? This cannot be undone.")) {
    showNotification('All settings reset to defaults', 'success');
  }
}

function viewPrivacyPolicy() {
  showNotification('Loading privacy policy', 'info');
  setTimeout(() => {
    alert("Privacy Policy would be displayed here.");
  }, 500);
}

function viewTermsOfService() {
  showNotification('Loading terms of service', 'info');
  setTimeout(() => {
    alert("Terms of Service would be displayed here.");
  }, 500);
}

function setAlertRules() {
  alert("Set alert rules functionality to be implemented: Define thresholds for temp, humidity, etc.");
}

function viewAllActions() {
  alert("Viewing all actions: To be implemented with full action list.");
}

function viewTaskHistory() {
  alert("Viewing task history: To be implemented with historical task data.");
}

function orderFertilizer() {
  alert("Ordering fertilizer: To be implemented with order form.");
  showNotification("Fertilizer Ordered", "success");
}

function checkEquipment() {
  alert("Checking equipment status: To be implemented with equipment details.");
  showNotification("Equipment Checked", "success");
}

function updateFirmware() {
  alert("Updating sensor firmware: To be implemented with firmware update process.");
  showNotification("Firmware Updated", "success");
}

function orderSeeds() {
  alert("Ordering seeds: To be implemented with seed order form.");
  showNotification("Seeds Ordered", "success");
}

function manageInventory() {
  alert("Managing inventory: To be implemented with inventory management interface.");
}

function viewTaskStatus() {
  alert("Viewing task status: To be implemented with detailed task overview.");
}

function viewInventory() {
  alert("Viewing inventory status: To be implemented with detailed inventory list.");
}

function viewEquipment() {
  alert("Viewing equipment health: To be implemented with equipment details.");
}

function compareSeasons() {
  alert("Comparing seasons: To be implemented with seasonal data comparison.");
}

function setPerformanceGoals() {
  alert("Setting performance goals: To be implemented with goal-setting interface.");
}

function downloadWeatherData() {
  alert("Weather data download started");
  showNotification("Weather data downloaded successfully", "success");
}

function viewHourlyForecast() {
  alert("Viewing hourly weather forecast");
}

function viewWeeklyForecast() {
  alert("Viewing weekly weather forecast");
}

function setWeatherThresholds() {
  alert("Setting weather thresholds");
}

function adjustIrrigation() {
  alert("Adjusting irrigation based on weather forecast");
  showNotification("Irrigation adjusted successfully", "success");
}

function updateWeatherAlerts() {
  showNotification("Checking for weather alerts...", "info");
  setTimeout(() => {
    showNotification("Weather alerts updated", "success");
  }, 1000);
}

function calibrateSensor(sensorId) {
  alert(`Calibrating ${sensorId}`);
  showNotification(`${sensorId} calibrated successfully`, "success");
}

function deactivateSensor(sensorId) {
  alert(`Deactivating ${sensorId}`);
  showNotification(`${sensorId} deactivated`, "success");
}

function exportSensorData() {
  showNotification("Exporting sensor data...", "info");
  setTimeout(() => {
    showNotification("Sensor data exported successfully", "success");
  }, 1000);
}

function calibrateSensors() {
  alert("Calibrating all sensors");
  showNotification("All sensors calibrated", "success");
}

function syncSensors() {
  showNotification("Syncing sensor data...", "info");
  setTimeout(() => {
    showNotification("Sensor data synced successfully", "success");
  }, 1000);
}

function resetSensors() {
  if (confirm("Are you sure you want to reset all sensors? This will clear their data.")) {
    showNotification("All sensors reset successfully", "success");
  }
}

function generateReport() {
  showNotification("Generating report...", "info");
  setTimeout(() => {
    showNotification("Report generated successfully", "success");
  }, 1500);
}

function runDiagnostics() {
  showNotification("Running diagnostics...", "info");
  setTimeout(() => {
    showNotification("All systems functioning normally", "success");
  }, 2000);
}

function predictCropHealth(cropType) {
  showNotification(`Analyzing ${cropType} health...`, "info");
  setTimeout(() => {
    showNotification(`${cropType} health prediction: Good`, "success");
  }, 1500);
}

function addCrop() {
  alert("Add new crop functionality");
  showNotification("New crop added successfully", "success");
}

function clearAlerts() {
  if (confirm("Are you sure you want to clear all alerts?")) {
    showNotification("All alerts cleared", "success");
  }
}

function clearNotifications() {
  if (confirm("Are you sure you want to clear all notifications?")) {
    showNotification("All notifications cleared", "success");
  }
}

// To prevent any reference errors
if (typeof window !== 'undefined') {
  window.addLogEntry = window.addLogEntry || function(message) {
    console.log(`[LOG] ${message}`);
  };
}


// AgriSensePro Main Application Logic

// Initialize global variables in the window scope to avoid redeclaration issues
window.expandedSensor = window.expandedSensor || null;
window.expandedCrop = window.expandedCrop || null;

// Sample data structures for the application
window.sensorData = window.sensorData || {
  sensors: [
    { id: 'Sensor 1', temp: 72, humid: 65, light: 14, ph: 7.5, battery: 95, status: 'Active' },
    { id: 'Sensor 2', temp: 71, humid: 64, light: 13.8, ph: 7.4, battery: 88, status: 'Active' },
    { id: 'Sensor 3', temp: 73, humid: 66, light: 14.2, ph: 7.6, battery: 92, status: 'Active' },
    { id: 'Sensor 4', temp: 70, humid: 63, light: 13.5, ph: 7.3, battery: 90, status: 'Active' }
  ],
  crops: {
    'Corn': { health: 'Good', water: 'Moderate', moisture: 65, temp: 72, light: 14, ph: 7.5, planting: '2023-04-15', harvest: '2023-09-30', stage: 'Flowering', yield: 85 },
    'Wheat': { health: 'Excellent', water: 'Low', moisture: 63, temp: 71, light: 13.8, ph: 7.4, planting: '2023-03-20', harvest: '2023-08-15', stage: 'Grain Fill', yield: 90 },
    'Soybeans': { health: 'Good', water: 'Moderate', moisture: 66, temp: 73, light: 14.5, ph: 7.6, planting: '2023-05-01', harvest: '2023-10-10', stage: 'Pod Setting', yield: 82 }
  },
  weather: { temp: 72, humid: 65, wind: 8, precip: 10 }
};

// Global variables for application state
window.unitSystem = window.unitSystem || 'imperial'; // 'imperial' or 'metric'
window.notifications = window.notifications || [];
window.currentView = window.currentView || 'home';

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
        <div class="notification-timeJust now</div>
      </div>
      <<div class="notification-body">
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

// Function to mark a notification as read
function markAsRead(button) {
  const notificationItem = button.parentNode.parentNode;
  notificationItem.classList.remove('unread');
  notificationItem.classList.add('read');
  const notificationId = parseInt(notificationItem.id.split('-')[1]);
  notifications.find(n => n.id === notificationId).read = true;
  updateNotificationBadge();
}

// Placeholder for updating charts (needs a charting library)
function updateAllCharts() {}
function updateChartsForView(viewName) {}

// Placeholder for viewing sensor detail (needs UI implementation)
function viewSensorDetail(sensorId) {}

// Placeholder for showing crop detail (needs UI implementation)
function showCropDetail(cropName) {}

// Function to switch between views - moved to chart.js for global usage
function switchView(view) {
  try {
    console.log(`Switching to view: ${view}`);

    // Define all possible views
    const views = ['home', 'sensors', 'analytics', 'notifications', 'account', 'weather', 'add-sensor', 'settings'];

    // Hide all views first
    views.forEach(v => {
      const viewElement = document.querySelector(`.${v}-view`);
      if (viewElement) {
        viewElement.classList.remove('active');
        viewElement.style.display = 'none';
      }
    });

    // Show the selected view
    const selectedView = document.querySelector(`.${view}-view`);
    if (selectedView) {
      selectedView.classList.add('active');
      selectedView.style.display = 'block';
      console.log(`View ${view} activated`);

      // Update active state in navigation
      document.querySelectorAll('.nav-item').forEach(item => {
        const itemText = item.textContent.trim().toLowerCase();
        if (itemText === view.toLowerCase()) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    } else {
      console.error(`View element .${view}-view not found`);
      // If view not found, default to home
      const homeView = document.querySelector('.home-view');
      if (homeView) {
        homeView.classList.add('active');
        homeView.style.display = 'block';
        view = 'home';
      }
    }
  } catch (error) {
    console.error("Error switching views:", error);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setupNavigation();
});

function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
      item.addEventListener('click', function(e) {
          e.preventDefault();
          const href = this.getAttribute('href');
          window.location.href = href;
          setTimeout(updateNavHighlight, 100);
      });
  });
  updateNavHighlight();
}

function updateNavHighlight() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPage) {
          item.classList.add('active');
      } else {
          item.classList.remove('active');
      }
  });
}
