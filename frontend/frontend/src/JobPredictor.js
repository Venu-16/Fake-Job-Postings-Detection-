import React, { useState } from "react";
import "./JobPredictor.css";

function JobPredictor() {
  const [jobDescription, setJobDescription] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_description: jobDescription }),
      });

      const data = await res.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Fake Job Detection</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="6"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
        />
        <br />
        <button type="submit">Check Job</button>
      </form>

      {prediction && (
        <div
          className={`result ${
            String(prediction) === "1" ? "fake" : "legit"
          }`}
        >
          Prediction: {String(prediction) === "1" ? "Fake Job 🚨" : "Legit Job ✅"}
        </div>
      )}
    </div>
  );
}

export default JobPredictor;
