// Define global variables
let sensorData = {
    sensors: [],
    weather: { temp: 72, humid: 65, wind: 8, precip: 10 },
    crops: {
        'Corn': { health: 'Good', water: 'Moderate', yield: 85 },
        'Wheat': { health: 'Excellent', water: 'Low', yield: 90 },
        'Soybeans': { health: 'Good', water: 'Moderate', yield: 82 }
    },
    tasks: [],
    logs: []
};
let liveUpdate = false;
let updateInterval = null;
let notifications = [];
let unitSystem = 'imperial';
let language = 'en';

// Core functions
function switchView(view) {
    const views = document.querySelectorAll('.view');
    views.forEach(v => {
        v.classList.remove('active');
        v.style.display = 'none';
    });
    
    const selectedView = document.querySelector(`.${view}-view`);
    if (selectedView) {
        selectedView.classList.add('active');
        selectedView.style.display = 'block';
        updateNavHighlight(view);
    }
}

function updateNavHighlight(view) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.onclick.toString().includes(view)) {
            item.classList.add('active');
        }
    });
}

function toggleSensor(element, sensorId) {
    element.classList.toggle('expanded');
}

function toggleCrop(element, cropName) {
    element.classList.toggle('expanded');
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sensors = document.querySelectorAll('.sensor-card');
    sensors.forEach(sensor => {
        const title = sensor.querySelector('.sensor-title').textContent.toLowerCase();
        sensor.style.display = title.includes(searchTerm) ? 'block' : 'none';
    });
}

function toggleLiveUpdate() {
    liveUpdate = !liveUpdate;
    document.getElementById('liveStatus').textContent = liveUpdate ? 'On' : 'Off';
    if (liveUpdate && !updateInterval) {
        updateInterval = setInterval(updateSensorData, 5000);
    } else if (!liveUpdate && updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

function updateSensorData() {
    sensorData.sensors.forEach((sensor, index) => {
        const temp = document.getElementById(`temp${index + 1}`);
        if (temp) temp.textContent = `${(sensor.temp + (Math.random() - 0.5) * 2).toFixed(1)}°F`;
    });
}

// Initialize charts
function initCharts() {
    const chartElements = document.querySelectorAll('canvas');
    chartElements.forEach(canvas => {
        if (!canvas.chart) {
            new Chart(canvas, {
                type: 'line',
                data: {
                    labels: ['1', '2', '3', '4', '5'],
                    datasets: [{
                        label: canvas.id.includes('sensor') ? 'Temperature' : 'Value',
                        data: [65, 70, 72, 71, 73],
                        borderColor: 'rgba(76, 175, 80, 1)',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    
    const addSensorForm = document.getElementById('addSensorForm');
    if (addSensorForm) {
        addSensorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newSensor = {
                id: document.getElementById('sensorId').value,
                temp: 72,
                humid: 65,
                light: 14,
                ph: 7.5,
                battery: 100
            };
            sensorData.sensors.push(newSensor);
            switchView('sensors');
        });
    }
});

// Stub functions for remaining functionality
function exportData() { console.log('Exporting data...'); }
function generateReport() { console.log('Generating report...'); }
function runDiagnostics() { console.log('Running diagnostics...'); }
function syncAll() { console.log('Syncing all systems...'); }
function scheduleIrrigation() { console.log('Scheduling irrigation...'); }
function applyFertilizer() { console.log('Applying fertilizer...'); }
function monitorPests() { console.log('Monitoring pests...'); }
function addCrop() { console.log('Adding crop...'); }
function calibrateSensors() { console.log('Calibrating sensors...'); }
function syncSensors() { console.log('Syncing sensors...'); }
function resetSensors() { console.log('Resetting sensors...'); }
function updateWeatherAlerts() { console.log('Updating weather alerts...'); }
function adjustIrrigation() { console.log('Adjusting irrigation...'); }
function downloadWeatherData() { console.log('Downloading weather data...'); }
function setWeatherThresholds() { console.log('Setting weather thresholds...'); }
function viewHourlyForecast() { console.log('Viewing hourly forecast...'); }
function viewWeeklyForecast() { console.log('Viewing weekly forecast...'); }
function scheduleTask() { console.log('Scheduling task...'); }
function viewTaskHistory() { console.log('Viewing task history...'); }
