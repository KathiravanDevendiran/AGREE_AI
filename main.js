// AgriStack Dashboard Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for elements that should animate on page load
    animateOnScroll();
    
    // Add data attributes to sidebar items for better tooltips
    const sidebarItems = document.querySelectorAll('.sidebar li');
    const labels = ['Overview', 'Weather', 'Tasks', 'Soil', 'Irrigation', 'Yield', 'Map'];
    
    sidebarItems.forEach((item, index) => {
        item.setAttribute('data-label', labels[index]);
    });
    
    // Enhanced navigation transitions
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the current active section
            const currentSection = document.querySelector('.dashboard-section:not([style*="display: none"])');
            const currentId = currentSection.id;
            
            // Get the target section
            const targetId = 'section-' + this.id.replace('nav-', '');
            const targetSection = document.getElementById(targetId);
            
            // Only animate if we're changing sections
            if (currentId !== targetId) {
                // Fade out current section
                currentSection.style.opacity = '0';
                currentSection.style.transform = 'translateY(-20px)';
                
                // After animation completes, hide current and show target
                setTimeout(() => {
                    currentSection.style.display = 'none';
                    currentSection.style.opacity = '';
                    currentSection.style.transform = '';
                    
                    // Show and animate in the target section
                    targetSection.style.display = '';
                    targetSection.style.opacity = '0';
                    targetSection.style.transform = 'translateY(20px)';
                    
                    // Trigger reflow
                    void targetSection.offsetWidth;
                    
                    // Animate in
                    targetSection.style.opacity = '1';
                    targetSection.style.transform = 'translateY(0)';
                    
                    // Reset after animation
                    setTimeout(() => {
                        targetSection.style.opacity = '';
                        targetSection.style.transform = '';
                    }, 500);
                    
                }, 300);
            }
        });
    });
    
    // Add pulse animation to important elements
    const importantElements = document.querySelectorAll('.field-status strong');
    importantElements.forEach(el => {
        // Check if the element contains critical values
        const text = el.textContent.toLowerCase();
        if (text.includes('high') || text.includes('low') || parseFloat(text) > 0.7) {
            el.style.animation = 'pulse 2s infinite';
        }
    });
    
    // Add floating animation to cards on hover
    const cards = document.querySelectorAll('.section-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'float 3s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
    
    // Enhance task list interactions
    const taskItems = document.querySelectorAll('.task-list li');
    taskItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('done');
            
            // Add a subtle animation when marking as done
            if (this.classList.contains('done')) {
                this.style.animation = 'none';
                void this.offsetWidth; // Trigger reflow
                this.style.animation = 'slideInRight 0.3s ease-out';
            }
        });
    });
    
    // Add task button effect
    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            const taskInput = document.getElementById('taskInput');
            if (taskInput.value.trim() !== "") {
                const li = document.createElement('li');
                li.textContent = taskInput.value;
                li.style.opacity = '0';
                li.style.transform = 'translateX(-20px)';
                
                li.addEventListener('click', () => li.classList.toggle('done'));
                
                const tasksUl = document.getElementById('tasks');
                tasksUl.appendChild(li);
                
                // Animate the new task
                setTimeout(() => {
                    li.style.opacity = '1';
                    li.style.transform = 'translateX(0)';
                }, 10);
                
                // Reset after animation
                setTimeout(() => {
                    li.style.opacity = '';
                    li.style.transform = '';
                }, 500);
                
                taskInput.value = "";
            }
        });
    }
});

// Function to animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-card, .field-status p, .weather-widget li, .soil-quality p');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Chart enhancements
if (typeof Chart !== 'undefined') {
    // Set default chart animations
    Chart.defaults.animation = {
        duration: 1500,
        easing: 'easeOutQuart'
    };
    
    // Add custom chart interactions if a chart exists
    const chartCanvas = document.getElementById('ndviChart');
    if (chartCanvas && chartCanvas.chart) {
        chartCanvas.addEventListener('mousemove', function(e) {
            const chart = chartCanvas.chart;
            const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
            
            if (points.length) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
        });
    }
}