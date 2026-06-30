const ExplainButton = ({ onClick, loading, disabled }) => {
  return (
    <button 
      className="explain-btn" 
      onClick={onClick} 
      disabled={disabled || loading}
    >
      {loading ? 'Analyzing...' : 'Analyze Code'}
    </button>
  );
};

export default ExplainButton;
