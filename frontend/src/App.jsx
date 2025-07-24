import React, { useState, useEffect } from 'react';
import PassphraseVerification from './PassphraseVerification';
import Registration from './Registration';
import CompassCreationWizard from './CompassCreationWizard';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [authState, setAuthState] = useState('passphrase'); // passphrase, registration, compass, dashboard
  const [user, setUser] = useState(null);

  const handleValidPassphrase = () => {
    setAuthState('registration');
  };

  const handleRegistrationComplete = (userData) => {
    setUser(userData);
    setAuthState('compass');
  };

  const handleCompassComplete = (compassData) => {
    console.log('Compass created:', compassData);
    setAuthState('dashboard');
  };

  // In a real app, you would check for an existing session here
  useEffect(() => {
    // For now, we'll just show the passphrase verification
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Wizz</h1>
        <p>Your Personal Alignment Engine</p>
      </header>
      
      <main>
        {authState === 'passphrase' && (
          <PassphraseVerification onValidPassphrase={handleValidPassphrase} />
        )}
        
        {authState === 'registration' && (
          <Registration onRegistrationComplete={handleRegistrationComplete} />
        )}
        
        {authState === 'compass' && (
          <CompassCreationWizard onComplete={handleCompassComplete} />
        )}
        
        {authState === 'dashboard' && (
          <Dashboard user={user} />
        )}
      </main>
    </div>
  );
}

export default App;