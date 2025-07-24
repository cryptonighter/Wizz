import React, { useState } from 'react';

const CheckInForm = ({ onSubmit }) => {
  const [win, setWin] = useState('');
  const [obstacle, setObstacle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit({ win, obstacle });
      // Reset form on successful submission
      setWin('');
      setObstacle('');
    } catch (error) {
      console.error('Error submitting check-in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="check-in-form">
      <h4>Quest Check-in</h4>
      <p>Take a moment to reflect on your progress.</p>
      
      <div className="form-group">
        <label htmlFor="win">What was one small win or opportunity you had to practice?</label>
        <textarea
          id="win"
          value={win}
          onChange={(e) => setWin(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="obstacle">What is one obstacle that still feels tricky?</label>
        <textarea
          id="obstacle"
          value={obstacle}
          onChange={(e) => setObstacle(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Check-in'}
      </button>
    </form>
  );
};

export default CheckInForm;