import React, { useState, useEffect } from 'react';
import CheckInForm from './CheckInForm';

const QuestItem = ({ quest }) => {
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [checkIns, setCheckIns] = useState(quest.check_ins || []);

  // Fetch check-ins when the component mounts
  useEffect(() => {
    fetchCheckIns();
  }, [quest.id]);

  const fetchCheckIns = async () => {
    try {
      const response = await fetch(`/api/quests/${quest.id}/check-ins`);
      if (response.ok) {
        const data = await response.json();
        setCheckIns(data);
      }
    } catch (error) {
      console.error('Error fetching check-ins:', error);
    }
  };

  const handleCheckInSubmit = async (checkInData) => {
    try {
      const response = await fetch(`/api/quests/${quest.id}/check-ins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkInData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit check-in');
      }

      // Refresh check-ins after successful submission
      fetchCheckIns();
      setShowCheckIn(false);
    } catch (error) {
      console.error('Error submitting check-in:', error);
    }
  };

  return (
    <div className="quest-item">
      <h3>{quest.title}</h3>
      {quest.description && <p>{quest.description}</p>}
      <p><strong>Status:</strong> {quest.status}</p>
      
      <div className="quest-actions">
        <button onClick={() => setShowCheckIn(!showCheckIn)}>
          {showCheckIn ? 'Cancel Check-in' : 'Check-in'}
        </button>
      </div>
      
      {showCheckIn && (
        <CheckInForm onSubmit={handleCheckInSubmit} />
      )}
      
      {checkIns.length > 0 && (
        <div className="check-ins">
          <h4>Check-ins ({checkIns.length})</h4>
          {checkIns.map(checkIn => (
            <div key={checkIn.id} className="check-in">
              <p><strong>Win:</strong> {checkIn.data.win}</p>
              <p><strong>Obstacle:</strong> {checkIn.data.obstacle}</p>
              <small>{new Date(checkIn.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestItem;