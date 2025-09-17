import React from "react";
import "./JobPredictor.css";git

function Results() {
  return (
    <div className="results-container">
      <h2 className="results-title">📊 Model Performance Results</h2>

      <div className="results-section">
        <h3>Accuracy Comparison</h3>
        <img src="/accuracy.png" alt="Accuracy Comparison" className="results-img" />
      </div>

      <div className="results-section">
        <h3>Confusion Matrix</h3>
        <img src="/confusion.png" alt="Confusion Matrix" className="results-img" />
      </div>

      <div className="results-section">
        <h3>Precision / Recall / F1 Score</h3>
        <img src="/f1.png" alt="F1 Score Comparison" className="results-img" />
      </div>
    </div>
  );
}

export default Results;
