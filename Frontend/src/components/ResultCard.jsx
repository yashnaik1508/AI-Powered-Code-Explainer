const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <div className="glass-panel result-card">
      <h2>Analysis Result</h2>
      
      <div className="result-section">
        <h3>Explanation</h3>
        <p>{result.explanation}</p>
      </div>

      <div className="result-section">
        <h3>Purpose</h3>
        <p>{result.purpose}</p>
      </div>

      {result.expectedOutput && result.expectedOutput !== "N/A" && (
        <div className="result-section">
          <h3>Expected Output</h3>
          <div className="expected-output">
            {result.expectedOutput}
          </div>
        </div>
      )}

      <div className="complexity-badges">
        <div className="badge">
          <span className="badge-label">Time Complexity</span>
          <span className="badge-value">{result.timeComplexity}</span>
        </div>
        <div className="badge">
          <span className="badge-label">Space Complexity</span>
          <span className="badge-value">{result.spaceComplexity}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
