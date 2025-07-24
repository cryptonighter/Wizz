import React, { useState } from 'react';

const SuperpowerWizard = ({ onComplete }) => {
  const [step, setStep] = useState('explore'); // explore or commit
  const [explorationData, setExplorationData] = useState({
    heroStory: '',
    energyLens: '',
    keywordCloud: []
  });
  const [superpower, setSuperpower] = useState('');

  // Keywords for the keyword cloud
  const keywords = ['Simplify', 'Connect', 'Build', 'Organize', 'Challenge', 'Finish', 'Create', 'Analyze', 'Lead', 'Support'];

  // Handle changes in exploration inputs
  const handleExplorationChange = (field, value) => {
    setExplorationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle keyword selection
  const handleKeywordToggle = (keyword) => {
    setExplorationData(prev => {
      const newKeywords = prev.keywordCloud.includes(keyword)
        ? prev.keywordCloud.filter(k => k !== keyword)
        : [...prev.keywordCloud, keyword];
      
      return {
        ...prev,
        keywordCloud: newKeywords
      };
    });
  };

  // Generate suggested superpower based on exploration data
  const generateSuggestedSuperpower = () => {
    // This is a simple implementation - in a real app, this might use AI
    const { heroStory, energyLens, keywordCloud } = explorationData;
    
    if (!heroStory && !energyLens && keywordCloud.length === 0) {
      return 'Based on your inputs, it seems your strength is in [your superpower]. Does that feel right?';
    }
    
    // Simple logic to generate a suggestion
    let suggestion = 'Based on your inputs, it seems your strength is in ';
    
    if (keywordCloud.length > 0) {
      suggestion += `"${keywordCloud.join(' and ')}"`;
    } else if (energyLens) {
      suggestion += 'turning challenges into opportunities';
    } else if (heroStory) {
      suggestion += 'bringing clarity to complex situations';
    } else {
      suggestion += 'making a meaningful impact';
    }
    
    suggestion += '. Does that feel right?';
    
    return suggestion;
  };

  // Handle moving to commit step
  const handleMoveToCommit = () => {
    setSuperpower(generateSuggestedSuperpower());
    setStep('commit');
  };

  // Handle completing the wizard
  const handleComplete = () => {
    onComplete({
      ...explorationData,
      superpower
    });
  };

  return (
    <div className="superpower-wizard">
      <h2>Discover Your Superpower</h2>
      
      {step === 'explore' && (
        <div className="explore-step">
          <h3>Exploration Phase</h3>
          <p>Let's explore what makes you unique!</p>
          
          <div className="exploration-section">
            <h4>The Hero Story</h4>
            <p>Describe a time at work where you felt like a hero. What was the challenge, and what specific action did you take?</p>
            <textarea
              value={explorationData.heroStory}
              onChange={(e) => handleExplorationChange('heroStory', e.target.value)}
              placeholder="Share your story..."
              rows={4}
            />
          </div>
          
          <div className="exploration-section">
            <h4>The Energy Lens</h4>
            <p>What specific task or activity leaves you feeling energized and in a state of flow?</p>
            <textarea
              value={explorationData.energyLens}
              onChange={(e) => handleExplorationChange('energyLens', e.target.value)}
              placeholder="Describe what energizes you..."
              rows={4}
            />
          </div>
          
          <div className="exploration-section">
            <h4>Keyword Cloud</h4>
            <p>Select words that resonate with you:</p>
            <div className="keyword-cloud">
              {keywords.map(keyword => (
                <button
                  key={keyword}
                  className={`keyword ${explorationData.keywordCloud.includes(keyword) ? 'selected' : ''}`}
                  onClick={() => handleKeywordToggle(keyword)}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleMoveToCommit}
            disabled={!explorationData.heroStory && !explorationData.energyLens && explorationData.keywordCloud.length === 0}
          >
            Generate My Superpower
          </button>
        </div>
      )}
      
      {step === 'commit' && (
        <div className="commit-step">
          <h3>Commit Phase</h3>
          <p>{superpower}</p>
          
          <textarea
            value={superpower}
            onChange={(e) => setSuperpower(e.target.value)}
            placeholder="Edit your superpower statement..."
            rows={4}
          />
          
          <div className="actions">
            <button onClick={() => setStep('explore')}>Back to Exploration</button>
            <button onClick={handleComplete}>Commit My Superpower</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperpowerWizard;