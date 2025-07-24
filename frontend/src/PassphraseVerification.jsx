import React, { useState } from 'react';

const PassphraseVerification = ({ onValidPassphrase }) => {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-passphrase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passphrase }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        onValidPassphrase();
      } else {
        setError(data.error || 'Invalid passphrase');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="passphrase-verification">
      <h2>Enter Your Passphrase</h2>
      <p>You need a special passphrase to access Wizz.</p>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="passphrase">Passphrase:</label>
          <input
            type="password"
            id="passphrase"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            required
          />
        </div>
        
        {error && <p className="error">{error}</p>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default PassphraseVerification;