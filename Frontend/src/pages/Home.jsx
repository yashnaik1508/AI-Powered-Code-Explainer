import { useState } from 'react';
import Header from '../components/Header';
import LanguageSelector from '../components/LanguageSelector';
import CodeEditor from '../components/CodeEditor';
import ExplainButton from '../components/ExplainButton';
import ResultCard from '../components/ResultCard';
import useExplain from '../hooks/useExplain';
import '../styles/Home.css';
import '../styles/components.css';

const Home = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const { loading, error, result, handleExplain } = useExplain();

  const onExplainClick = () => {
    handleExplain(language, code);
  };

  return (
    <div className="home-container">
      <Header />
      
      <main className="main-content">
        <div className="left-panel glass-panel">
          <LanguageSelector language={language} setLanguage={setLanguage} />
          <CodeEditor code={code} setCode={setCode} language={language} />
          <ExplainButton 
            onClick={onExplainClick} 
            loading={loading} 
            disabled={!code.trim()} 
          />
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        <div className="right-panel">
          {!loading && <ResultCard result={result} />}
        </div>
      </main>
    </div>
  );
};

export default Home;
