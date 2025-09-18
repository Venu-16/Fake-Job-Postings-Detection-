import React from "react";
import "./results.css";
import accuracyImg from "./MetricImages/model_comparison_accuracy.png";
import Precision from "./MetricImages/model_comparison_precision.png";
import Recall from "./MetricImages/model_comparison_recall.png";
import F1 from "./MetricImages/model_comparison_f1_score.png";
import confusionMatrix from "./MetricImages/confusion_matrix.png";
import limeImg from "./MetricImages/lime_output.png";

function Results() {
  return (
    <div className="results-container">
      <h2 className="results-title">📊 Model Performance Results</h2>

      <div className="results-grid">
        <div className="results-card">
          <h3>Accuracy Comparison</h3>
          <img src={accuracyImg} alt="Accuracy Comparison" className="results-img" />
        </div>

        <div className="results-card">
          <h3>Confusion Matrix</h3>
          <img src={confusionMatrix} alt="Confusion Matrix" className="results-img" />
        </div>

        <div className="results-card">
          <h3>Precision</h3>
          <img src={Precision} alt="Precision Comparison" className="results-img" />
        </div>

        <div className="results-card">
          <h3>Recall</h3>
          <img src={Recall} alt="Recall Comparison" className="results-img" />
        </div>

        <div className="results-card">
          <h3>F1 Score Comparison</h3>
          <img src={F1} alt="F1 Score Comparison" className="results-img" />
        </div>
        <div className="results-card">
        <h3>LIME Explanation Example</h3>
        <img src={limeImg} alt="LIME Explanation" className="results-img" />
        </div>

      </div>
    </div>
  );
}

export default Results;
