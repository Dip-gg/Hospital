from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import random
import string

app = Flask(__name__)
CORS(app)

# Define the path to the JSON file
DATA_FILE = 'data2.json'


def generate_unique_patient_id(existing_ids):
    """Generate a unique patient ID."""
    while True:
        # Generate a random 6-digit ID
        new_id = ''.join(random.choices(string.digits, k=6))
        # Ensure the ID is unique
        if new_id not in existing_ids:
            return new_id

# Load user data from JSON file


def load_user_data():
    with open("profiles.json", "r") as file:
        return json.load(file)


@app.route('/login', methods=['POST'])
def login():
    # Get input from frontend
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Load user data
    user_data = load_user_data()["users"]

    # Find the user in the data
    user = next((u for u in user_data if u["username"]
                == username and u["password"] == password), None)

    # Check if user exists and return response
    if user:
        return jsonify({"success": True, "is_admin": user["is_admin"]}), 200
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401


@app.route('/get_patient_data', methods=['GET'])
def get_patient_data():
    try:
        # Read data from the JSON file
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON"}), 500


@app.route('/register_new_patient', methods=['POST'])
def register_new_patient():
    try:
        # Read the current patient data from the file
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)

        # Extract the existing patient IDs
        existing_ids = {patient["patient_id"] for patient in data["data"]}

        # Get data from the POST request
        new_patient = request.json

        # Validate required fields (except patient_id, which is auto-generated)
        required_fields = ["first_name", "last_name",
                           "date_of_birth", "gender", "contact_info"]
        if not all(field in new_patient for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Generate a unique patient_id
        new_patient["patient_id"] = generate_unique_patient_id(existing_ids)

        # Add the new patient to the data
        data["data"].append(new_patient)

        # Write the updated data back to the JSON file
        with open(DATA_FILE, 'w') as f:
            json.dump(data, f, indent=4)

        return jsonify({"message": "New patient registered successfully", "patient": new_patient}), 201

    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON"}), 500


if __name__ == '__main__':
    # Ensure the JSON file exists
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as f:
            json.dump({"data": []}, f, indent=4)

    app.run(debug=True, port=8080)
