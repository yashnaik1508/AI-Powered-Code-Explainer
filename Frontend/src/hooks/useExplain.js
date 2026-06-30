import { useState } from 'react';
import { explainCode } from '../services/api';

const useExplain = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleExplain = async (language, code) => {
    if (!code.trim()) {
      setError("Please enter some code.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await explainCode(language, code);
      if (data.error) {
          setError(data.error);
      } else if (data.explanation && data.explanation.startsWith("Error")) {
          setError(data.explanation);
      } else {
          setResult(data);
      }
    } catch (err) {
      setError('Unable to connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, result, handleExplain };
};

export default useExplain;
