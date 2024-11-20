from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

directory = os.getcwd()

@app.route('/get_patient_data', methods=['GET'])
def get_patient_data():
    try:
        with open('data.json', 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON"}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=8080)