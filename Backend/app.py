from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
import joblib

app = Flask(__name__)
CORS(app)


with open("xgb_final_model.pkl", "rb") as f:
    model = pickle.load(f)
#
with open("tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

# final_modal = joblib.load("../models/xgb_final_model.joblib")
# vectorizer = joblib.load("tfidf_vectorizer.joblib")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("message", "")

    # Transform text and predict
    features = vectorizer.transform([text])
    prediction = model.predict(features)[0]

    return jsonify({"prediction": str(prediction)})

if __name__ == "__main__":
    app.run(debug=True)
