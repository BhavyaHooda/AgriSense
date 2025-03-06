// Simple chart initialization functions
document.addEventListener('DOMContentLoaded', function() {
  console.log('Chart.js loaded');

  // Initialize charts if they exist
  try {
      if (document.getElementById('overviewChart')) {
          initializeOverviewChart();
      }
  } catch (e) {
      console.error('Error initializing overview chart:', e);
  }
});

// Basic chart initialization function
function initializeOverviewChart() {
  const ctx = document.getElementById('overviewChart');
  if (!ctx) return;

  if (typeof Chart !== 'undefined') {
      new Chart(ctx, {
          type: 'line',
          data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                  label: 'Temperature',
                  data: [72, 71, 73, 74, 72, 73],
                  borderColor: '#4caf50',
                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  fill: true
              }, {
                  label: 'Humidity',
                  data: [65, 64, 66, 67, 65, 66],
                  borderColor: '#2196f3',
                  backgroundColor: 'rgba(33, 150, 243, 0.2)',
                  fill: true
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                  y: {
                      beginAtZero: false
                  }
              }
          }
      });
  } else {
      console.warn('Chart.js library not loaded');
  }
}

// Helper function for navigation
function updateNavHighlight() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-bar .nav-item').forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPage) {
          item.classList.add('active');
      } else {
          item.classList.remove('active');
      }
  });
}

/**
* Sets up the navigation bar functionality
*/
function setupNavigation() {
  // Get all nav items
  const navItems = document.querySelectorAll('.nav-bar .nav-item');
  
  // If no nav bar exists on the page, create one
  if (navItems.length === 0) {
      createNavigationBar();
      return; // Exit function as we've created a new nav bar that already has listeners
  }
  
  console.log(`Found ${navItems.length} navigation items`);
  
  // Set active class based on current page
  updateNavHighlight();
  
  // Add click listeners to each navigation item
  navItems.forEach(item => {
      item.addEventListener('click', function(e) {
          e.preventDefault(); // Prevent default link behavior
          window.location.href = this.href; // Update location after a delay to allow for proper highlight update
          setTimeout(updateNavHighlight, 100); // Update navigation highlight
          });
  });
}

/**
* Creates a navigation bar and adds it to the page
*/
function createNavigationBar() {
  console.log("Creating navigation bar");
  
  // Create navigation bar element
  const navBar = document.createElement('div');
  navBar.className = 'nav-bar';
  
  // Array of navigation items
  const navItems = [
      { href: 'index.html', icon: 'fa-home', text: 'Home' },
      { href: 'sensors.html', icon: 'fa-microchip', text: 'Sensors' },
      { href: 'weather.html', icon: 'fa-cloud-sun', text: 'Weather' },
      { href: 'analytics.html', icon: 'fa-chart-line', text: 'Analytics' },
      { href: 'alerts.html', icon: 'fa-bell', text: 'Alerts' },
      { href: 'settings.html', icon: 'fa-cog', text: 'Settings' }
  ];
  
  // Generate HTML for each nav item
  navItems.forEach(item => {
      const navItem = document.createElement('a');
      navItem.href = item.href;
      navItem.className = 'nav-item';
      navItem.title = item.text;
      
      // Create icon
      const icon = document.createElement('i');
      icon.className = `fas ${item.icon}`;
      
      // Create label
      const span = document.createElement('span');
      span.textContent = item.text;
      
      // Add elements to nav item
      navItem.appendChild(icon);
      navItem.appendChild(span);
      
      // Add click event listener
      navItem.addEventListener('click', function(e) {
          e.preventDefault(); // Prevent default link behavior
          window.location.href = this.href; // Update location after a delay to allow for proper highlight update
          setTimeout(updateNavHighlight, 100); // Update navigation highlight
      });
      
      // Add nav item to nav bar
      navBar.appendChild(navItem);
  });
  
  // Add the navigation bar to the page
  document.body.appendChild(navBar);
  
  // Set active nav item
  updateNavHighlight();
}


// Global function to switch views
window.switchView = function(viewName) {
  console.log(`Switching to view: ${viewName}`);

  // Handle view switching for single-page app sections
  const views = document.querySelectorAll('.view');
  
  // Hide all views first
  views.forEach(viewElement => {
      viewElement.classList.remove('active');
      viewElement.style.display = 'none';
  });
  
  // Show the selected view
  const selectedView = document.querySelector(`.${viewName}-view`);
  if (selectedView) {
      selectedView.classList.add('active');
      selectedView.style.display = 'block';
      console.log(`View ${viewName} activated`);
      updateNavHighlight(); //Added this line
      updateChartsForView(viewName); //Added this line
  } else {
      console.error(`View element .${viewName}-view not found`);
  }

}

// Function to toggle sensor expansion
window.toggleSensor = function(card, sensorId) {
  if (typeof expandedSensor === 'undefined') {
      window.expandedSensor = null;
  }

  if (window.expandedSensor && window.expandedSensor !== card) {
      window.expandedSensor.classList.remove('expanded');
  }

  card.classList.toggle('expanded');
  window.expandedSensor = card.classList.contains('expanded') ? card : null;

  if (window.expandedSensor && typeof updateSensorChart === 'function') {
      setTimeout(() => updateSensorChart(sensorId), 100);
  }
}

// Function to toggle crop details
window.toggleCrop = function(card, cropType) {
  if (typeof expandedCrop === 'undefined') {
      window.expandedCrop = null;
  }

  if (window.expandedCrop && window.expandedCrop !== card) {
      window.expandedCrop.classList.remove('expanded');
  }

  card.classList.toggle('expanded');
  window.expandedCrop = card.classList.contains('expanded') ? card : null;

  if (window.expandedCrop && typeof updateCropChart === 'function') {
      setTimeout(() => updateCropChart(cropType), 100);
  }
}

// Placeholder for chart update functions if they don't exist elsewhere
if (typeof updateAllCharts !== 'function') {
  window.updateAllCharts = function() {
      console.log("Chart update functions not implemented");
  }
}

if (typeof updateSensorChart !== 'function') {
  window.updateSensorChart = function(sensorId) {
      console.log(`Update chart for sensor ${sensorId} not implemented`);
  }
}

if (typeof updateCropChart !== 'function') {
  window.updateCropChart = function(cropType) {
      console.log(`Update chart for crop ${cropType} not implemented`);
  }
}

// Store chart instances to prevent duplication
const chartInstances = {};

// Clear all charts and reset instances
function clearAllCharts() {
if (typeof Chart !== 'undefined' && Chart.helpers && Chart.helpers.each && Chart.instances) {
  Chart.helpers.each(Chart.instances, function(instance) {
    instance.destroy();
  });
}
Object.keys(chartInstances).forEach(key => {
  delete chartInstances[key];
});
}

// Main function to update all charts with responsive options
function updateAllCharts() {
try {
  console.log("Updating all charts");
  clearAllCharts();

  // Get the current sensor data or use defaults
  const sensorData = window.sensorData || defaultSensorData;

  // Detect mobile devices for responsive charts
  const isMobile = window.innerWidth < 768;
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: isMobile ? 8 : 12,
          font: {
            size: isMobile ? 9 : 12
          },
          padding: isMobile ? 5 : 10
        }
      },
      tooltip: {
        bodyFont: {
          size: isMobile ? 10 : 14
        },
        titleFont: {
          size: isMobile ? 11 : 16
        },
        padding: isMobile ? 5 : 10
      }
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: isMobile ? 9 : 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 9 : 12
          },
          maxRotation: isMobile ? 45 : 0
        }
      }
    }
  };

  // Only update charts if they exist in the DOM
  updateChartIfExists('overviewChart', () => updateOverviewChart(sensorData, commonOptions));
  updateChartIfExists('sensorNetworkChart', () => updateSensorNetworkChart('sensorNetworkChart', sensorData, commonOptions));
  updateChartIfExists('sensorNetworkChartFull', () => updateSensorNetworkChart('sensorNetworkChartFull', sensorData, commonOptions));
  updateChartIfExists('weatherChart', () => updateWeatherChart(sensorData, commonOptions));
  updateChartIfExists('analyticsChart', () => updateAnalyticsChart('temperature', sensorData, commonOptions));
  updateChartIfExists('alertTrendChart', () => updateAlertTrendChart(commonOptions));
  updateChartIfExists('accountUsageChart', () => updateAccountUsageChart(sensorData, commonOptions));
  updateChartIfExists('alertsOverviewChart', () => updateAlertsOverviewChart(commonOptions));
  updateChartIfExists('alertTrendsChart', () => updateAlertTrendsChart(commonOptions));

  // Update individual sensor charts
  if (sensorData && sensorData.sensors) {
    sensorData.sensors.forEach((_, index) => {
      updateChartIfExists(`sensorChart${index + 1}`, () => updateSensorChart(`Sensor ${index + 1}`, sensorData, commonOptions));
      updateChartIfExists(`sensorChart${index + 1}Full`, () => updateSensorDetailChart(`Sensor ${index + 1}`, sensorData, commonOptions));
    });
  }

  // Update crop charts if they exist
  ['Corn', 'Wheat', 'Soybeans'].forEach(crop => {
    updateChartIfExists(`${crop.toLowerCase()}Chart`, () => updateCropChart(crop, sensorData, commonOptions));
  });

  // Set up responsive resizing
  window.addEventListener('resize', debounce(() => {
    if ((window.innerWidth < 768 && !isMobile) || (window.innerWidth >= 768 && isMobile)) {
      // Update charts when switching between mobile and desktop
      updateAllCharts();
    }
  }, 250));

  console.log("All charts updated successfully");
} catch (e) {
  console.error("Error updating charts:", e);
}
}

// Simple debounce function to prevent too many resize events
function debounce(func, wait) {
let timeout;
return function executedFunction(...args) {
  const later = () => {
    clearTimeout(timeout);
    func(...args);
  };
  clearTimeout(timeout);
  timeout = setTimeout(later, wait);
};
}

// Helper function to update a chart only if the element exists
function updateChartIfExists(elementId, updateFunction) {
const element = document.getElementById(elementId);
if (element) {
  try {
    updateFunction();
  } catch (e) {
    console.error(`Error updating chart ${elementId}:`, e);
  }
}
}

// Overview chart for dashboard
function updateOverviewChart(sensorData, commonOptions = {}) {
const ctx = document.getElementById('overviewChart');
if (!ctx) return;

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{
      label: 'Temperature (°F)',
      data: [72, 74, 69, 75, 72, 73, 71],
      borderColor: 'rgba(76, 175, 80, 1)',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      fill: true,
      tension: 0.4,
      borderWidth: window.innerWidth < 768 ? 2 : 3
    },
    {
      label: 'Humidity (%)',
      data: [65, 63, 68, 62, 65, 64, 67],
      borderColor: 'rgba(33, 150, 243, 1)',
      backgroundColor: 'rgba(33, 150, 243, 0.2)',
      fill: true,
      tension: 0.4,
      borderWidth: window.innerWidth < 768 ? 2 : 3
    }]
  },
  options: {
    ...commonOptions,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        position: 'top',
        labels: {
          boxWidth: window.innerWidth < 768 ? 8 : 12,
          font: { 
            size: window.innerWidth < 768 ? 9 : 12,
            weight: 'bold'
          }
        }
      }
    },
    scales: {
      y: { 
        beginAtZero: false,
        grid: { display: true, color: 'rgba(0,0,0,0.05)' },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 9 : 12
          }
        }
      },
      x: {
        grid: { display: false },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 9 : 12
          }
        }
      }
    },
    elements: {
      point: {
        radius: window.innerWidth < 768 ? 2 : 3,
        hoverRadius: window.innerWidth < 768 ? 4 : 6
      },
      line: {
        borderWidth: window.innerWidth < 768 ? 2 : 3
      }
    }
  }
});

chartInstances['overviewChart'] = chart;
}

// Sensor network chart
function updateSensorNetworkChart(chartId, sensorData) {
const ctx = document.getElementById(chartId);
if (!ctx) return;

// Get sensor data or use defaults
let sensors = sensorData.sensors || [
  { id: 'Sensor 1', battery: 95, temp: 72 },
  { id: 'Sensor 2', battery: 88, temp: 71 },
  { id: 'Sensor 3', battery: 92, temp: 73 },
  { id: 'Sensor 4', battery: 90, temp: 70 }
];

const chart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: sensors.map(s => s.id),
    datasets: [
      {
        label: 'Battery (%)',
        data: sensors.map(s => parseFloat(s.battery || 90)),
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 2
      },
      {
        label: 'Signal Strength (%)',
        data: sensors.map(() => Math.floor(85 + Math.random() * 10)),
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        borderColor: 'rgba(255, 193, 7, 1)',
        borderWidth: 2
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: { 
        beginAtZero: true, 
        max: 100,
        ticks: { display: true, stepSize: 20 },
        pointLabels: { font: { size: 12 } }
      }
    }
  }
});

chartInstances[chartId] = chart;
}

// Weather chart
function updateWeatherChart(sensorData) {
const ctx = document.getElementById('weatherChart');
if (!ctx) return;

// Get weather data or use defaults
let weatherData = sensorData.weather || { temp: 72, humid: 65 };

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '0:00'],
    datasets: [{
      label: 'Temperature (°F)',
      data: [68, 70, 74, 76, 73, 71, 69],
      borderColor: 'rgba(76, 175, 80, 1)',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      fill: true,
      tension: 0.4
    },
    {
      label: 'Humidity (%)',
      data: [70, 65, 60, 58, 62, 67, 72],
      borderColor: 'rgba(33, 150, 243, 1)',
      backgroundColor: 'rgba(33, 150, 243, 0.2)',
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 10,
          font: { size: 10 }
        }
      }
    },
    scales: {
      y: { beginAtZero: false },
      x: { grid: { display: false } }
    }
  }
});

chartInstances['weatherChart'] = chart;
}

// Sensor detail charts
function updateSensorChart(sensorId, sensorData) {
const index = parseInt(sensorId.split(' ')[1]) - 1;
const ctx = document.getElementById(`sensorChart${index + 1}`);
if (!ctx) return;

// Get sensor data or use defaults
let sensor = {};
if (sensorData && sensorData.sensors && sensorData.sensors[index]) {
  sensor = sensorData.sensors[index];
} else {
  sensor = { temp: 72, humid: 65 };
}

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: Array(6).fill().map((_, i) => `T-${5-i}h`),
    datasets: [
      {
        label: 'Temp (°F)',
        data: Array(6).fill().map(() => parseFloat(sensor.temp) + (Math.random() - 0.5) * 3),
        borderColor: 'rgba(76, 175, 80, 1)',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Humid (%)',
        data: Array(6).fill().map(() => parseFloat(sensor.humid) + (Math.random() - 0.5) * 6),
        borderColor: 'rgba(33, 150, 243, 1)',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 8,
          font: { size: 9 }
        }
      }
    },
    scales: {
      y: { beginAtZero: false },
      x: { grid: { display: false } }
    }
  }
});

chartInstances[`sensorChart${index + 1}`] = chart;
}

// Detailed sensor charts for full view
function updateSensorDetailChart(sensorId, sensorData) {
const index = parseInt(sensorId.split(' ')[1]) - 1;
const ctx = document.getElementById(`sensorChart${index + 1}Full`);
if (!ctx) return;

// Get sensor data or use defaults
let sensor = {};
if (sensorData && sensorData.sensors && sensorData.sensors[index]) {
  sensor = sensorData.sensors[index];
} else {
  sensor = { temp: 72, humid: 65, light: 14, ph: 7.5 };
}

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: Array(24).fill().map((_, i) => `T-${23-i}h`),
    datasets: [
      {
        label: 'Temp (°F)',
        data: Array(24).fill().map(() => parseFloat(sensor.temp) + (Math.random() - 0.5) * 4),
        borderColor: 'rgba(76, 175, 80, 1)',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Humidity (%)',
        data: Array(24).fill().map(() => parseFloat(sensor.humid) + (Math.random() - 0.5) * 8),
        borderColor: 'rgba(33, 150, 243, 1)',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Light (Dli)',
        data: Array(24).fill().map(() => parseFloat(sensor.light || 14) + (Math.random() - 0.5) * 2),
        borderColor: 'rgba(255, 193, 7, 1)',
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'pH',
        data: Array(24).fill().map(() => parseFloat(sensor.ph || 7.5) + (Math.random() - 0.5) * 0.4),
        borderColor: 'rgba(156, 39, 176, 1)',
        backgroundColor: 'rgba(156, 39, 176, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 8,
          font: { size: 9 }
        }
      }
    },
    scales: {
      y: { beginAtZero: false },
      x: { 
        ticks: { maxTicksLimit: 12 },
        grid: { display: false }
      }
    }
  }
});

chartInstances[`sensorChart${index + 1}Full`] = chart;
}

// Crop charts
function updateCropChart(cropType, sensorData) {
const ctx = document.getElementById(`${cropType.toLowerCase()}Chart`);
if (!ctx) return;

// Get crop data or use defaults
let crop = {};
if (sensorData && sensorData.crops && sensorData.crops[cropType]) {
  crop = sensorData.crops[cropType];
} else {
  crop = { temp: 72, moisture: 65 };
}

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: Array(12).fill().map((_, i) => `T-${11-i}d`),
    datasets: [
      {
        label: 'Temp (°F)',
        data: Array(12).fill().map(() => parseFloat(crop.temp || 72) + (Math.random() - 0.5) * 5),
        borderColor: 'rgba(76, 175, 80, 1)',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Moisture (%)',
        data: Array(12).fill().map(() => parseFloat(crop.moisture || 65) + (Math.random() - 0.5) * 10),
        borderColor: 'rgba(33, 150, 243, 1)',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 8,
          font: { size: 9 }
        }
      }
    },
    scales: {
      y: { beginAtZero: false },
      x: { grid: { display: false } }
    }
  }
});

chartInstances[`${cropType.toLowerCase()}Chart`] = chart;
}

// Analytics chart
function updateAnalyticsChart(type, sensorData) {
const ctx = document.getElementById('analyticsChart');
if (!ctx) return;

let chartData = {
  labels: Array(7).fill().map((_, i) => `Day ${i+1}`),
  datasets: []
};

// Get sensor data or use defaults
let sensors = [];
if (sensorData && sensorData.sensors) {
  sensors = sensorData.sensors;
} else {
  sensors = [
    { temp: 72, humid: 65, light: 14, ph: 7.5, battery: 95 },
    { temp: 71, humid: 64, light: 13.8, ph: 7.4, battery: 88 },
    { temp: 73, humid: 66, light: 14.2, ph: 7.6, battery: 92 },
    { temp: 70, humid: 63, light: 13.5, ph: 7.3, battery: 90 }
  ];
}

// Calculate averages
const avgTemp = sensors.reduce((sum, s) => sum + parseFloat(s.temp || 72), 0) / sensors.length;
const avgHumid = sensors.reduce((sum, s) => sum + parseFloat(s.humid || 65), 0) / sensors.length;
const avgLight = sensors.reduce((sum, s) => sum + parseFloat(s.light || 14), 0) / sensors.length;
const avgPh = sensors.reduce((sum, s) => sum + parseFloat(s.ph || 7.5), 0) / sensors.length;
const avgBattery = sensors.reduce((sum, s) => sum + parseFloat(s.battery || 90), 0) / sensors.length;

let color, data, label;

switch(type) {
  case 'temperature':
    label = 'Temperature (°F)';
    color = 'rgba(255, 99, 132, 1)';
    data = Array(7).fill().map(() => avgTemp + (Math.random() - 0.5) * 5);
    break;
  case 'humidity':
    label = 'Humidity (%)';
    color = 'rgba(54, 162, 235, 1)';
    data = Array(7).fill().map(() => avgHumid + (Math.random() - 0.5) * 10);
    break;
  case 'light':
    label = 'Light (Dli)';
    color = 'rgba(255, 206, 86, 1)';
    data = Array(7).fill().map(() => avgLight + (Math.random() - 0.5) * 2);
    break;
  case 'ph':
    label = 'pH Level';
    color = 'rgba(75, 192, 192, 1)';
    data = Array(7).fill().map(() => avgPh + (Math.random() - 0.5) * 0.5);
    break;
  case 'yield':
    label = 'Yield Forecast (%)';
    color = 'rgba(153, 102, 255, 1)';
    let avgYield = 87;
    if (sensorData && sensorData.crops) {
      avgYield = Object.values(sensorData.crops).reduce((sum, crop) => sum + parseFloat(crop.yield || 85), 0) / Object.keys(sensorData.crops).length;
    }
    data = Array(7).fill().map(() => avgYield + (Math.random() - 0.5) * 5);
    break;
  case 'battery':
    label = 'Battery Level (%)';
    color = 'rgba(255, 159, 64, 1)';
    data = Array(7).fill().map(() => avgBattery - Math.random() * 3);
    break;
  default:
    label = 'Temperature (°F)';
    color = 'rgba(255, 99, 132, 1)';
    data = Array(7).fill().map(() => avgTemp + (Math.random() - 0.5) * 5);
}

chartData.datasets = [{
  label: label,
  data: data,
  backgroundColor: color.replace('1)', '0.2)'),
  borderColor: color,
  fill: true,
  tension: 0.4
}];

const chart = new Chart(ctx, {
  type: type === 'yield' ? 'bar' : 'line',
  data: chartData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 10,
          font: { size: 10 }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: type === 'yield' || type === 'battery' || type === 'humidity'
      },
      x: { grid: { display: false } }
    }
  }
});

chartInstances['analyticsChart'] = chart;

// Highlight the selected analytics type
document.querySelectorAll('.analytics-view .sensor-card').forEach(card => {
  card.style.border = '1px solid var(--border-color)';
  card.style.boxShadow = 'var(--shadow-light)';
});

const selectedCard = document.querySelector(`.analytics-view .sensor-card[onclick*="${type}"]`);
if (selectedCard) {
  selectedCard.style.border = '2px solid var(--primary-color)';
  selectedCard.style.boxShadow = '--shadow-dark)';
}
}

// Alert trend chart
function updateAlertTrendChart() {
const ctx = document.getElementById('alertTrendChart');
if (!ctx) return;

// Get notification count or use default
let notificationCount = 1;
if (typeof notifications !== 'undefined') {
  notificationCount = notifications.length;
}

const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Temperature', 'Humidity', 'Battery', 'System', 'Connectivity', 'Crop Health'],
    datasets: [{
      label: 'Alerts This Week',
      data: [
        Math.floor(Math.random() * 3), 
        Math.floor(Math.random() * 2), 
        Math.floor(notificationCount),
        Math.floor(Math.random() * 1),
        Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 2)
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235,0.5)',
        'rgba(255, 206, 86, 0.5)','rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 10,
          font: { size: 10 }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      },
      x: { grid: { display: false } }
    }
  }
});

chartInstances['alertTrendChart'] = chart;
}

// Account usage chart
function updateAccountUsageChart(sensorData) {
const ctx = document.getElementById('accountUsageChart');
if (!ctx) return;

// Get sensor count or use default
let sensorCount = 4;
if (sensorData && sensorData.sensors) {
  sensorCount = sensorData.sensors.length;
}

const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Sensors Used', 'Sensors Available', 'Storage Used', 'Storage Available'],
    datasets: [{
      data: [sensorCount, 20 - sensorCount, 1.2, 3.8],
      backgroundColor: [
        'rgba(76, 175, 80, 0.8)',
        'rgba(76, 175, 80, 0.2)',
        'rgba(33, 150, 243, 0.8)',
        'rgba(33, 150, 243, 0.2)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 12 }
        }
      }
    }
  }
});

chartInstances['accountUsageChart'] = chart;
}

// Alerts overview chart
function updateAlertsOverviewChart(commonOptions) {
const ctx = document.getElementById('alertsOverviewChart');
if (!ctx) return;

// Sample alert data
const alertData = {
  temperature: 2,
  humidity: 1,
  battery: 3,
  system: 0,
  connectivity: 1,
  crop: 2
};

const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Temperature', 'Humidity', 'Battery', 'System', 'Connectivity', 'Crop Health'],
    datasets: [{
      label: 'Active Alerts',
      data: [
        alertData.temperature,
        alertData.humidity,
        alertData.battery,
        alertData.system,
        alertData.connectivity,
        alertData.crop
      ],
      backgroundColor: [
        'rgba(244, 67, 54, 0.7)',
        'rgba(33, 150, 243, 0.7)',
        'rgba(255, 193, 7, 0.7)',
        'rgba(156, 39, 176, 0.7)',
        'rgba(255, 87, 34, 0.7)',
        'rgba(76, 175, 80, 0.7)'
      ],
      borderColor: [
        'rgba(244, 67, 54, 1)',
        'rgba(33, 150, 243, 1)',
        'rgba(255, 193, 7, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(255, 87, 34, 1)',
        'rgba(76, 175, 80, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    ...commonOptions,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    }
  }
});

chartInstances['alertsOverviewChart'] = chart;
}

// Alert trends chart
function updateAlertTrendsChart(commonOptions) {
const ctx = document.getElementById('alertTrendsChart');
if (!ctx) return;

const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Today'];

// Sample alert history data
const alertHistory = {
  temperature: [3, 2, 4, 1, 2, 3, 2],
  humidity: [1, 2, 0, 1, 1, 0, 1],
  battery: [2, 1, 3, 4, 2, 3, 3],
  crop: [1, 3, 2, 1, 0, 1, 2]
};

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Temperature',
        data: alertHistory.temperature,
        borderColor: 'rgba(244, 67, 54, 1)',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Humidity',
        data: alertHistory.humidity,
        borderColor: 'rgba(33, 150, 243, 1)',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Battery',
        data: alertHistory.battery,
        borderColor: 'rgba(255, 193, 7, 1)',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Crop Health',
        data: alertHistory.crop,
        borderColor: 'rgba(76, 175, 80, 1)',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  },
  options: {
    ...commonOptions,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          usePointStyle: true
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  }
});

chartInstances['alertTrendsChart'] = chart;
}

// Initialize all charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
// Fix the navigation bar immediately
fixNavBarStyling();

// Check if Chart.js is loaded
if (typeof Chart === 'undefined') {
  console.warn("Chart.js is not loaded yet, attempting to load it");
  // Try to load Chart.js dynamically if not already loaded
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
  script.onload = function() {
    console.log("Chart.js loaded successfully");
    initializeCharts();
  };
  script.onerror = function() {
    console.error("Failed to load Chart.js");
  };
  document.head.appendChild(script);
} else {
  // Chart.js is already loaded
  initializeCharts();
}

function initializeCharts() {
  // Set up initial chart for home view
  setTimeout(function() {
    try {
      updateAllCharts();
      console.log("Charts initialized successfully");
    } catch (e) {
      console.error("Error initializing charts:", e);
      // Display error information for debugging
      console.debug("Chart error details:", {
        error: e.message,
        stack: e.stack,
        chartInstances: Object.keys(chartInstances),
        availableElements: {
          overviewChart: !!document.getElementById('overviewChart'),
          sensorNetworkChart: !!document.getElementById('sensorNetworkChart'),
          sensorNetworkChartFull: !!document.getElementById('sensorNetworkChartFull')
        }
      });
    }
  }, 500);
}

// Periodically ensure the nav bar stays properly styled
setInterval(fixNavBarStyling, 2000);

// Debug output for navigation
console.debug("Navigation elements:", document.querySelectorAll('.nav-bar .nav-item').length);
});

// Add a debug function that can be called from console
window.debugAgriSense = function() {
console.log("=== AgriSense Debug Information ===");
console.log("Navigation bar:", document.querySelector('.nav-bar'));
console.log("Current view:", document.querySelector('.view.active'));
console.log("Chart instances:", Object.keys(chartInstances));
console.log("DOM Chart elements:", {
  overviewChart: document.getElementById('overviewChart'),
  sensorNetworkChart: document.getElementById('sensorNetworkChart'),
  weatherChart: document.getElementById('weatherChart'),
  analyticsChart: document.getElementById('analyticsChart')
});
console.log("=== End Debug Information ===");
return "Debug information logged to console";
};

// Function to update charts when switching views
function updateChartsForView(viewName) {
setTimeout(() => {
  try {
    updateAllCharts();
  } catch (e) {
    console.error("Error updating charts for view " + viewName + ":", e);
  }
}, 100);
}

// Various utility functions
function optimizeResources() {
alert("Optimizing resources across all fields. Recommendations will be updated shortly.");
}

function viewCropDetail(cropType) {
alert(`Viewing detailed analysis for ${cropType}`);
}

function scheduleMaintenance() {
alert("Scheduling maintenance for all equipment and sensors");
}

function viewSensorLogs(sensorId) {
alert(`Viewing logs for ${sensorId}`);
}

function replaceBattery(sensorId) {
alert(`Battery replacement for ${sensorId} has been scheduled`);
}

function checkForUpdates() {
alert("Checking for updates...");
}

function toggleLiveUpdate() {
const liveStatus = document.getElementById('liveStatus');
if (liveStatus) {
  liveStatus.textContent = liveStatus.textContent === 'On' ? 'Off' : 'On';
}
}

function syncAll() {
alert("Syncing all systems...");
}

function contactSupport() {
alert("Support contact: support@agrisensepro.com\nPhone: 1-800-123-4567\nAvailable 24/7");
}

function analyzeEconomics() {
alert("Economic analysis in progress... Report will be generated shortly.");
}

function scheduleIrrigation(cropType = 'All') {
alert(`Irrigation scheduled for ${cropType} fields`);
}

function viewWeatherHistory() {
window.location.href = 'weather.html';
}

function monitorPests(cropType = 'All') {
alert(`Pest monitoring initiated for ${cropType} fields`);
}

function applyFertilizer(cropType = 'All') {
alert(`Fertilizer application scheduled for ${cropType} fields`);
}

// Sample sensor data structure for testing and development
const defaultSensorData = {
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

// AgriSensePro Chart Management System
// This file manages all charts in the application

// Navigation bar setup and styling
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded - initializing navigation");
  
  // Setup navigation functionality
  setupNavigation();
  
  // Initialize charts if they exist
  if (typeof updateAllCharts === 'function') {
      setTimeout(updateAllCharts, 500);
  }
});

/**
* Initialize navigation bar on all pages consistently
*/
function initializeNavigation() {
const currentPath = window.location.pathname;
const pageName = currentPath.split('/').pop() || 'index.html';

// Get all navigation items
const navItems = document.querySelectorAll('.nav-bar .nav-item');

// Remove active class from all
navItems.forEach(item => {
  item.classList.remove('active');
});

// Set active class based on current page
navItems.forEach(item => {
  const href = item.getAttribute('href');
  if (href === pageName || 
      (pageName === '' && href === 'index.html') ||
      (pageName === '/' && href === 'index.html')) {
    item.classList.add('active');
  }
});

console.log(`Navigation initialized for page: ${pageName}`);
}

// Initialize navigation when page loads
document.addEventListener('DOMContentLoaded', initializeNavigation);

// Initialize navigation when hash changes
window.addEventListener('hashchange', initializeNavigation);

function fixNavBarStyling() {
  // Add your navigation bar styling fixes here
  // Example: Ensure the navbar is always visible at the top
  const navBar = document.querySelector('.nav-bar');
  if (navBar) {
      navBar.style.position = 'fixed';
      navBar.style.top = '0';
      navBar.style.width = '100%';
      navBar.style.zIndex = '1000'; // Ensure it's above other elements
  }
}
