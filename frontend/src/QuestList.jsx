import React from 'react';
import QuestItem from './QuestItem';

const QuestList = ({ quests }) => {
  if (!quests) return <div>Loading quests...</div>;

  return (
    <div className="quest-list">
      <h2>Your Quests</h2>
      {quests.length === 0 ? (
        <p>You don't have any active quests yet.</p>
      ) : (
        quests.map(quest => (
          <QuestItem key={quest.id} quest={quest} />
        ))
      )}
    </div>
  );
};

export default QuestList;