from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import os

app= Flask(__name__)
CORS(app)

model = joblib.load("Fake-Job-Postings-Detection-/models/xgb_final_model.joblib")
vectorizer = joblib.load("Fake-Job-Postings-Detection-/models/tfidf_vectorizer.joblib")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("message","");

    features = vectorizer.transform([text])
    prediction = model.predict(features)[0]

    return jsonify({"prediction :", str(prediction)})

if __name__ == "__main__":
    app.run(debug=True)


