const createServer = require('../src/server');

describe('Quest Routes', () => {
  let app;

  beforeAll(async () => {
    app = createServer({ logger: false });
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    // Clear the quests array before each test
    const db = require('../src/config/database');
    db._quests = [];
  });

  test('should create a quest', async () => {
    const questData = {
      title: 'Improve Public Speaking',
      description: 'Practice presenting to groups'
    };

    const response = await app.inject({
      method: 'POST',
      url: '/quests',
      payload: questData
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({
      user_id: 'test-user-id',
      title: questData.title,
      description: questData.description,
      status: 'active'
    });
  });

  test('should get all quests', async () => {
    // First create a quest
    const questData = {
      title: 'Improve Public Speaking',
      description: 'Practice presenting to groups'
    };

    await app.inject({
      method: 'POST',
      url: '/quests',
      payload: questData
    });

    // Then get all quests
    const response = await app.inject({
      method: 'GET',
      url: '/quests'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toBeInstanceOf(Array);
    expect(response.json()).toHaveLength(1);
  });

  test('should get a specific quest', async () => {
    // First create a quest
    const questData = {
      title: 'Improve Public Speaking',
      description: 'Practice presenting to groups'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: '/quests',
      payload: questData
    });

    const questId = createResponse.json().id;

    // Then get the specific quest
    const response = await app.inject({
      method: 'GET',
      url: `/quests/${questId}`
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      id: questId,
      title: questData.title,
      description: questData.description
    });
  });

  test('should update a quest', async () => {
    // First create a quest
    const questData = {
      title: 'Improve Public Speaking',
      description: 'Practice presenting to groups'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: '/quests',
      payload: questData
    });

    const questId = createResponse.json().id;

    // Then update the quest
    const updatedData = {
      title: 'Improve Public Speaking Skills',
      description: 'Practice presenting to groups and receive feedback',
      status: 'completed'
    };

    const response = await app.inject({
      method: 'PUT',
      url: `/quests/${questId}`,
      payload: updatedData
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      id: questId,
      title: updatedData.title,
      description: updatedData.description,
      status: updatedData.status
    });
  });

  test('should add a check-in to a quest', async () => {
    // First create a quest
    const questData = {
      title: 'Improve Public Speaking',
      description: 'Practice presenting to groups'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: '/quests',
      payload: questData
    });

    const questId = createResponse.json().id;

    // Then add a check-in
    const checkInData = {
      win: 'Gave a presentation to my team',
      obstacle: 'Still nervous when presenting to large groups'
    };

    const response = await app.inject({
      method: 'POST',
      url: `/quests/${questId}/check-ins`,
      payload: checkInData
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({
      quest_id: questId,
      data: checkInData
    });
  });

  test('should get all check-ins for a quest', async () => {
    // First create a quest
    const questData = {
      title: 'Improve Public Speaking',
      description: 'Practice presenting to groups'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: '/quests',
      payload: questData
    });

    const questId = createResponse.json().id;

    // Add a check-in
    const checkInData = {
      win: 'Gave a presentation to my team',
      obstacle: 'Still nervous when presenting to large groups'
    };

    await app.inject({
      method: 'POST',
      url: `/quests/${questId}/check-ins`,
      payload: checkInData
    });

    // Then get all check-ins
    const response = await app.inject({
      method: 'GET',
      url: `/quests/${questId}/check-ins`
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toBeInstanceOf(Array);
    expect(response.json()).toHaveLength(1);
    expect(response.json()[0]).toMatchObject({
      quest_id: questId,
      data: checkInData
    });
  });
});