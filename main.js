const fieldData = {
    "Field 1": {
        ndvi: 0.72, water: "Low", temp: "28°C", rain: "12mm", pest: "None", ai: "நீர் அளவை சீராக பராமரிக்கவும்.",
        chart: [0.65, 0.68, 0.7, 0.72, 0.71, 0.73, 0.72]
    },
    "Field 2": {
        ndvi: 0.55, water: "Medium", temp: "31°C", rain: "5mm", pest: "Mild", ai: "பூச்சி மேலாண்மை செய்யவும்.",
        chart: [0.5, 0.52, 0.54, 0.55, 0.56, 0.57, 0.55]
    },
    "Field 3": {
        ndvi: 0.40, water: "High", temp: "26°C", rain: "20mm", pest: "High", ai: "நீர் அளவை குறைக்கவும்.",
        chart: [0.45, 0.43, 0.42, 0.40, 0.41, 0.39, 0.40]
    }
};

let chartInstance;

window.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('fieldSelect');
    const ndvi = document.querySelector('.field-status strong:nth-child(1)');
    const water = document.querySelector('.field-status p:nth-child(3) strong');
    const temp = document.querySelector('.field-status p:nth-child(4) strong');
    const rain = document.querySelector('.field-status p:nth-child(5) strong');
    const pest = document.querySelector('.field-status p:nth-child(6) strong');
    const ai = document.querySelector('.field-status p:nth-child(7)');
    const ctx = document.getElementById('ndviChart').getContext('2d');

    // Initial chart
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'NDVI',
                data: fieldData["Field 1"].chart,
                borderColor: 'green',
                fill: false
            }]
        }
    });

    select.addEventListener('change', () => {
        const data = fieldData[select.value];
        ndvi.textContent = data.ndvi;
        water.textContent = data.water;
        temp.textContent = data.temp;
        rain.textContent = data.rain;
        pest.textContent = data.pest;
        ai.innerHTML = `AI Suggestion: “${data.ai}”`;
        chartInstance.data.datasets[0].data = data.chart;
        chartInstance.update();
    });

    // Task list logic
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const tasksUl = document.getElementById('tasks');

    addTaskBtn.addEventListener('click', () => {
        if (taskInput.value.trim() !== "") {
            const li = document.createElement('li');
            li.textContent = taskInput.value;
            li.addEventListener('click', () => li.classList.toggle('done'));
            tasksUl.appendChild(li);
            taskInput.value = "";
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.sidebar li');
    const sections = document.querySelectorAll('.dashboard-section');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all
            navItems.forEach(i => i.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            // Hide all sections
            sections.forEach(sec => sec.style.display = 'none');
            // Show the selected section
            const sectionId = 'section-' + this.id.replace('nav-', '');
            const section = document.getElementById(sectionId);
            if (section) section.style.display = '';
        });
    });
});