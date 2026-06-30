const LanguageSelector = ({ language, setLanguage }) => {
  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' }
  ];

  return (
    <div className="language-selector">
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
