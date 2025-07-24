import React, { useState } from 'react';

const QuestCreationForm = ({ onQuestCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/quests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create quest');
      }

      const newQuest = await response.json();
      onQuestCreated(newQuest);
      
      // Reset form
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quest-creation-form">
      <h3>Create a New Quest</h3>
      <p>Define a focused, time-bound sprint to develop a specific skill or attribute.</p>
      
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Quest Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description (Optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Quest'}
      </button>
    </form>
  );
};

export default QuestCreationForm;