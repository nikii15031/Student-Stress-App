from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Mapping from numeric label to readable label
stress_level_mapping = {
    0: "Low",
    1: "Medium",
    2: "High"
}

# Define factor groups
factor_groups = {
    "Psychological": ['anxiety_level', 'self_esteem', 'mental_health_history', 'depression'],
    "Physiological": ['headache', 'blood_pressure', 'sleep_quality', 'breathing_problem'],
    "Environmental": ['noise_level', 'living_conditions', 'safety', 'basic_needs'],
    "Academic": ['academic_performance', 'study_load', 'teacher_student_relationship', 'future_career_concerns'],
    "Social": ['social_support', 'peer_pressure', 'extracurricular_activities', 'bullying']
}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    group = data.get("group")
    inputs = data.get("inputs")  # Dictionary

    print(f"Incoming group: {group}")
    print(f"Received inputs: {inputs}")

    if group not in factor_groups:
        return jsonify({"error": "Invalid group name"}), 400

    try:
        model = joblib.load(f"models/{group.lower()}_model.pkl")
        scaler = joblib.load(f"models/{group.lower()}_scaler.pkl")
    except Exception as e:
        print("Model loading failed:", e)
        return jsonify({"error": f"Model loading error: {str(e)}"}), 500

    try:
        features = factor_groups[group]
        input_values = [float(inputs[f]) for f in features]
        print(f"Input values: {input_values}")
        input_df = pd.DataFrame([input_values], columns=features)
        scaled_input = scaler.transform(input_df)
        prediction = model.predict(scaled_input)[0]

        predicted_value = int(prediction)
        predicted_label = stress_level_mapping.get(predicted_value, "Unknown")

        return jsonify({
            "prediction": predicted_value,
            "stress_level": predicted_label
        })
    except Exception as e:
        print("Prediction error:", e)  # This is the key line
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')
