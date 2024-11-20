from pymongo import MongoClient
import json
from bson import ObjectId
from datetime import datetime
from urllib.parse import quote_plus

def create_client():
    username = quote_plus("androndip@gmail.com")
    password = quote_plus("rasengan@01")
    
    # Replace with your actual MongoDB Atlas connection string
    client = MongoClient(f"mongodb+srv://{username}:{password}@hospital.7e7me.mongodb.net/?retryWrites=true&w=majority&appName=Hospital")
    return client

def load_data(file_path):
    with open(file_path) as f:
        data = json.load(f)
    return data

def process_patient(patient):
    # Create a new ObjectId instead of using patient_id
    patient["_id"] = ObjectId()
    
    # Convert dates to datetime objects
    if "date_of_birth" in patient:
        patient["date_of_birth"] = datetime.strptime(patient["date_of_birth"], "%Y-%m-%d")
    
    # Process medical history
    if "medical_history" in patient:
        for item in patient["medical_history"]:
            if "diagnosed_date" in item:
                item["diagnosed_date"] = datetime.strptime(item["diagnosed_date"], "%Y-%m-%d")
    
    # Process current medications
    # if "current_medications" in patient:
    #     for medication in patient["current_medications"]:
    #         if "dosage" in medication:
    #             medication["dosage"] = medication["dosage"]
    
    # Process visitation history
    if "visitation_history" in patient:
        for visit_date, details in patient["visitation_history"].items():
            details["visit_date"] = datetime.strptime(visit_date, "%Y-%m-%d %H:%M:%S")
    
    return patient

def insert_data(client, data):
    db = client["hospital"]
    patients_collection = db["patients"]

    for patient in data["data"]:
        processed_patient = process_patient(patient)
        result = patients_collection.insert_one(processed_patient)
        print(f"Inserted patient with _id: {result.inserted_id}")

def main():
    # Create the MongoDB client
    client = create_client()
    
    # Load the JSON data
    data = load_data('data2.json')
    
    # Insert the data
    insert_data(client, data)
    
    # Close the client connection
    client.close()

if __name__ == "__main__":
    main()
