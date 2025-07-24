import React from 'react';

const CompassDisplay = ({ compass }) => {
  if (!compass) return null;

  return (
    <div className="compass-display">
      <div className="compass-section">
        <h3>Superpower</h3>
        <p className="superpower-statement">{compass.superpower?.statement}</p>
        
        {compass.superpower?.exploration && (
          <div className="exploration-preview">
            <h4>Exploration Insights</h4>
            <p><strong>Hero Story:</strong> {compass.superpower.exploration.heroStory}</p>
            <p><strong>Energy Lens:</strong> {compass.superpower.exploration.energyLens}</p>
            <p><strong>Keywords:</strong> {compass.superpower.exploration.keywordCloud?.join(', ')}</p>
          </div>
        )}
      </div>
      
      <div className="compass-section">
        <h3>Hues</h3>
        <ul>
          {compass.hues?.map((hue, index) => (
            <li key={index}>{hue}</li>
          ))}
        </ul>
      </div>
      
      <div className="compass-section">
        <h3>Values</h3>
        <ul>
          {compass.values?.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
      
      <div className="compass-section">
        <h3>Skills</h3>
        <ul>
          {compass.skills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      
      <div className="compass-section">
        <h3>Travel Style</h3>
        <p>{compass.travelStyle}</p>
      </div>
    </div>
  );
};

export default CompassDisplay;