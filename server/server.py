from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    data = request.get_json()
    area = float(data['area'])
    location = data['location']
    bedrooms = int(data['bedrooms'])
    baths = int(data['baths'])
    
    response = jsonify({
        'estimated_price': util.get_estimated_price(location, area, bedrooms, baths)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__": 
    print("Starting Python Flask Server For Lahore Housing Price Prediction...")
    util.load_saved_artifacts()
    app.run()