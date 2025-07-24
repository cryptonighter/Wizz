import React, { useState } from 'react';
import SuperpowerWizard from './SuperpowerWizard';

const CompassCreationWizard = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1: Intro, 2: Superpower, 3: Hues, 4: Values, 5: Skills, 6: Travel Style, 7: Complete
  const [compassData, setCompassData] = useState({
    superpower: null,
    hues: [],
    values: [],
    skills: [],
    travelStyle: null
  });

  // Handle completing the superpower wizard
  const handleSuperpowerComplete = (data) => {
    setCompassData(prev => ({
      ...prev,
      superpower: data
    }));
    setStep(3); // Move to Hues step
  };

  // Handle completing the entire wizard
  const handleComplete = () => {
    onComplete(compassData);
  };

  // Render the appropriate step based on the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="intro-step">
            <h2>Create Your Compass</h2>
            <p>Your Compass is your professional DNA - a living snapshot of your core strengths, working styles, and values.</p>
            <p>We'll guide you through a few steps to help you define your unique profile.</p>
            <button onClick={() => setStep(2)}>Get Started</button>
          </div>
        );
      
      case 2:
        return (
          <div className="superpower-step">
            <SuperpowerWizard onComplete={handleSuperpowerComplete} />
            <button onClick={() => setStep(1)}>Back</button>
          </div>
        );
      
      case 3:
        return (
          <div className="hues-step">
            <h2>Define Your Hues</h2>
            <p>What are the key characteristics that define how you work?</p>
            <textarea
              value={compassData.hues.join('\n')}
              onChange={(e) => setCompassData(prev => ({
                ...prev,
                hues: e.target.value.split('\n').filter(h => h.trim() !== '')
              }))}
              placeholder="Enter one characteristic per line..."
              rows={6}
            />
            <div className="actions">
              <button onClick={() => setStep(2)}>Back</button>
              <button onClick={() => setStep(4)}>Next</button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="values-step">
            <h2>Identify Your Core Values</h2>
            <p>What principles guide your decisions and actions?</p>
            <textarea
              value={compassData.values.join('\n')}
              onChange={(e) => setCompassData(prev => ({
                ...prev,
                values: e.target.value.split('\n').filter(v => v.trim() !== '')
              }))}
              placeholder="Enter one value per line..."
              rows={6}
            />
            <div className="actions">
              <button onClick={() => setStep(3)}>Back</button>
              <button onClick={() => setStep(5)}>Next</button>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="skills-step">
            <h2>List Your Key Skills</h2>
            <p>What are your strongest professional skills?</p>
            <textarea
              value={compassData.skills.join('\n')}
              onChange={(e) => setCompassData(prev => ({
                ...prev,
                skills: e.target.value.split('\n').filter(s => s.trim() !== '')
              }))}
              placeholder="Enter one skill per line..."
              rows={6}
            />
            <div className="actions">
              <button onClick={() => setStep(4)}>Back</button>
              <button onClick={() => setStep(6)}>Next</button>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="travel-style-step">
            <h2>Describe Your Travel Style</h2>
            <p>How do you prefer to approach new challenges and opportunities?</p>
            <textarea
              value={compassData.travelStyle || ''}
              onChange={(e) => setCompassData(prev => ({
                ...prev,
                travelStyle: e.target.value
              }))}
              placeholder="Describe your approach to new challenges..."
              rows={6}
            />
            <div className="actions">
              <button onClick={() => setStep(5)}>Back</button>
              <button onClick={() => setStep(7)}>Complete</button>
            </div>
          </div>
        );
      
      case 7:
        return (
          <div className="complete-step">
            <h2>Your Compass is Complete!</h2>
            <p>Congratulations! You've created your professional compass.</p>
            <p>This will serve as your foundation for setting meaningful quests and tracking your growth.</p>
            <button onClick={handleComplete}>Go to Dashboard</button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="compass-creation-wizard">
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${(step / 7) * 100}%` }}
        ></div>
      </div>
      
      <div className="step-content">
        {renderStep()}
      </div>
    </div>
  );
};

export default CompassCreationWizard;