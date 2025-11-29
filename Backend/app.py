from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load model and vectorizer using joblib
model = joblib.load("xgb_final_model.joblib")
vectorizer = joblib.load("tfidf_vectorizer.joblib")

@app.route("/predict", methods=["GET","POST"])
def predict():
    data = request.get_json()
    text = data.get("message", "")

    # Vectorize text
    X = vectorizer.transform([text])

    # Predict
    prediction = model.predict(X)[0]

    return jsonify({"prediction": str(prediction)})

if __name__ == "__main__":
    app.run(debug=True)
