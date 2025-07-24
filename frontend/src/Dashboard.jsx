import React, { useState, useEffect } from 'react';
import QuestList from './QuestList';
import QuestCreationForm from './QuestCreationForm';
import CompassDisplay from './CompassDisplay';

const Dashboard = ({ user }) => {
  const [quests, setQuests] = useState([]);
  const [compass, setCompass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user's compass and quests when the dashboard loads
    Promise.all([
      fetch('/api/compass'),
      fetch('/api/quests')
    ])
    .then(async ([compassRes, questsRes]) => {
      if (compassRes.ok && questsRes.ok) {
        const compassData = await compassRes.json();
        const questsData = await questsRes.json();
        
        setCompass(compassData);
        setQuests(questsData);
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .catch(err => {
      setError(err.message);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  const handleQuestCreated = (newQuest) => {
    setQuests(prev => [...prev, newQuest]);
  };

  if (loading) return <div className="dashboard">Loading dashboard...</div>;
  if (error) return <div className="dashboard error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard</h1>
        <p>Hello, {user?.email}!</p>
      </header>
      
      <main>
        {compass && (
          <section className="compass-section">
            <h2>Your Compass</h2>
            <CompassDisplay compass={compass} />
          </section>
        )}
        
        <section className="quest-section">
          <QuestCreationForm onQuestCreated={handleQuestCreated} />
          <QuestList quests={quests} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;