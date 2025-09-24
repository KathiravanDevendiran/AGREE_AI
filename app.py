from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from PIL import Image
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)
CORS(app)

# Crop defect detection model
class CropDefectDetector:
    def __init__(self):
        # Load your trained AI model here
        self.model = load_model('path_to_your_model.h5')  # Replace with your model path

    def detect_defects(self, image_data):
        # Preprocess the image (example preprocessing, adjust as needed)
        processed_image = self.preprocess_image(image_data)
        predictions = self.model.predict(processed_image)
        return predictions.tolist()  # Convert to a serializable format

    def preprocess_image(self, image):
        # Resize, normalize, or apply other preprocessing steps
        image = image.resize((224, 224))  # Example resizing
        image_array = np.array(image) / 255.0  # Normalize pixel values
        return np.expand_dims(image_array, axis=0)  # Add batch dimension


# Initialize the detector
detector = CropDefectDetector()

@app.route('/')
def home():
    return render_template('index.html')  # Render the login page

@app.route('/api/analyze-crop', methods=['POST'])
def analyze_crop():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image = request.files['image']
    try:
        image_data = Image.open(image)
        result = detector.detect_defects(image_data)
        return jsonify({'defects': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/weather', methods=['GET'])
def get_weather():
    # Example weather data (replace with real API integration)
    weather_data = {
        'temperature': 28,
        'humidity': 65,
        'rainfall': 120
    }
    return jsonify(weather_data)

@app.route('/api/field-data/<field_name>', methods=['GET'])
def get_field_data(field_name):
    # Example field data (replace with database integration)
    field_data = {
        'field_name': field_name,
        'soil_type': 'Loamy',
        'crop': 'Wheat',
        'area': '2 hectares'
    }
    return jsonify(field_data)

if __name__ == '__main__':
    app.run(debug=True)