# Fake Job Postings Detection

A simple web app that detects whether a job posting is likely fake using a trained XGBoost model and a TF-IDF vectorizer. This repository contains a Flask backend that serves the model and a React frontend for users to paste job descriptions and get a prediction.

**Repository structure**
- `Backend/`: Flask API, saved model artifacts (`xgb_final_model.joblib`, `tfidf_vectorizer.joblib`) and `requirements.txt`.
- `frontend/frontend/`: React app (sources under `src/` and `public/`).
- `notebooks/` and `Fake_job_Detection.ipynb`: exploratory notebooks used during model development.

## Quick start

There are two parts to run: the backend API and the frontend UI.

### 1) Backend (Flask)
Prerequisites: Python 3.8+ and `pip`.

Install dependencies and run the server:

```bash
cd Backend
python3 -m venv .venv         # optional but recommended
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

By default Flask runs on `http://127.0.0.1:5000`. The API exposes a `/predict` endpoint.

Production note: use `gunicorn app:app` or similar behind a reverse proxy for production.

### 2) Frontend (React)
Prerequisites: Node.js and npm/yarn.

Start the React development server:

```bash
cd frontend/frontend
npm install
npm start
```

The React app expects the API at `/predict`. In development, the code currently calls the deployed API URL `https://fake-job-postings-detection-1.onrender.com/predict` — change that in `src/JobPredictor.js` to point to your local backend (`http://127.0.0.1:5000/predict`) if running locally.

## API

Endpoint: `POST /predict`

Request JSON body:
```json
{ "message": "<job description text>" }
```

Response JSON:
```json
{ "prediction": "0" }
```

- `prediction` is returned as a string of the model's numeric label (`"1"` for fake, `"0"` for legit) — this matches how the Flask app currently serializes the prediction.

Example `curl` (local backend):

```bash
curl -X POST http://127.0.0.1:5000/predict \
	-H "Content-Type: application/json" \
	-d '{"message":"This is a sample job description to test."}'
```

## Model artifacts
- `Backend/xgb_final_model.joblib` — trained XGBoost model (loaded with `joblib.load`).
- `Backend/tfidf_vectorizer.joblib` — TF-IDF vectorizer used to transform job description text.

These files are required by `Backend/app.py` and must be present in the `Backend/` directory when running the API.

## Code notes and analysis
- `Backend/app.py`: small Flask app that loads the `joblib` model and vectorizer at startup and exposes a `/predict` endpoint that accepts JSON with a `message` field.
- `Backend/requirements.txt`: lists `flask`, `flask-cors`, `joblib`, `scikit-learn`, `xgboost`, and `gunicorn`.
- `frontend/frontend/src/JobPredictor.js`: React component that sends POST requests with `{ message: jobDescription }` to the prediction endpoint. By default it hits a Render deployment URL — change to local API as needed.
- `frontend/frontend/src/Results.js`: static display of evaluation images (accuracy, confusion matrix, LIME output, etc.). These images live in `frontend/frontend/src/MetricImages/`.

## Development tips
- If you run the backend locally, set the fetch URL in `JobPredictor.js` to `http://127.0.0.1:5000/predict`.
- If you change the model or vectorizer, re-save them using `joblib.dump(model, "xgb_final_model.joblib")` and `joblib.dump(vectorizer, "tfidf_vectorizer.joblib")` in the `Backend/` folder.
- Add input validation and error handling to `app.py` before deploying publicly (e.g., check JSON payload, handle empty text, return clear error codes).

## Contributing
- Open issues or PRs for fixes, model updates, or UX improvements.

