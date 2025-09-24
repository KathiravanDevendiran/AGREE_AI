// AgriStack AI Integration Module
// This module handles AI-powered features for the AgriStack platform

class AgriAI {
    constructor() {
        this.initialized = false;
        this.apiEndpoint = 'http://localhost:5000/api';
    }

    // Initialize AI module
    init() {
        console.log('AgriStack AI Module initialized');
        this.initialized = true;
    }

    // AI-powered crop recommendation
    async getCropRecommendation(soilData, weatherData, location) {
        const response = await fetch('/api/crop-recommendation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ soilData, weatherData, location }),
        });
        return await response.json();
    }

    // AI-powered yield prediction
    async predictYield(cropType, fieldData, historicalData) {
        try {
            const response = await fetch(`${this.apiEndpoint}/yield-prediction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    crop: cropType,
                    field: fieldData,
                    history: historicalData
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to predict yield');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Yield prediction error:', error);
            // Return mock data as fallback
            return {
                predicted_yield: Math.random() * 5 + 2, // 2-7 tons/acre
                confidence: Math.floor(Math.random() * 20 + 75), // 75-95%
                factors: ['Weather conditions', 'Soil quality', 'Crop management']
            };
        }
    }

    // Generate AI suggestions based on field conditions
    generateSuggestions(fieldData) {
        const suggestions = [];
        
        if (fieldData.ndvi < 0.5) {
            suggestions.push('Consider applying nitrogen fertilizer to improve plant health');
        }
        
        if (fieldData.water_stress === 'High') {
            suggestions.push('Increase irrigation frequency or check irrigation system');
        }
        
        if (fieldData.pest_alert !== 'None') {
            suggestions.push('Monitor crops closely and consider pest management measures');
        }
        
        if (fieldData.soil_ph < 6.0 || fieldData.soil_ph > 7.5) {
            suggestions.push('Adjust soil pH for optimal nutrient uptake');
        }
        
        return suggestions.length > 0 ? suggestions : ['Continue current farming practices'];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgriAI;
} else {
    window.AgriAI = AgriAI;
}

// Initialize AI module when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window !== 'undefined') {
        window.agriAI = new AgriAI();
        window.agriAI.init();
    }
});