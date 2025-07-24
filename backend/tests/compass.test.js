const createServer = require('../src/server');

describe('Compass Routes', () => {
  let app;

  beforeAll(async () => {
    app = createServer({ logger: false });
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('should create a compass', async () => {
    const compassData = {
      superpower: {
        exploration: {
          heroStory: 'Test hero story',
          energyLens: 'Test energy lens',
          keywordCloud: ['Simplify', 'Organize']
        },
        statement: 'Test superpower statement'
      },
      hues: ['Collaborative', 'Detail-oriented'],
      values: ['Integrity', 'Growth'],
      skills: ['JavaScript', 'React'],
      travelStyle: 'Methodical explorer'
    };

    const response = await app.inject({
      method: 'POST',
      url: '/compass',
      payload: compassData
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({
      user_id: 'test-user-id',
      ...compassData
    });
  });

  test('should get a compass', async () => {
    // First create a compass
    const compassData = {
      superpower: {
        exploration: {
          heroStory: 'Test hero story',
          energyLens: 'Test energy lens',
          keywordCloud: ['Simplify', 'Organize']
        },
        statement: 'Test superpower statement'
      },
      hues: ['Collaborative', 'Detail-oriented'],
      values: ['Integrity', 'Growth'],
      skills: ['JavaScript', 'React'],
      travelStyle: 'Methodical explorer'
    };

    await app.inject({
      method: 'POST',
      url: '/compass',
      payload: compassData
    });

    // Then get it
    const response = await app.inject({
      method: 'GET',
      url: '/compass'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      user_id: 'test-user-id',
      ...compassData
    });
  });

  test('should update a compass', async () => {
    // First create a compass
    const compassData = {
      superpower: {
        exploration: {
          heroStory: 'Test hero story',
          energyLens: 'Test energy lens',
          keywordCloud: ['Simplify', 'Organize']
        },
        statement: 'Test superpower statement'
      },
      hues: ['Collaborative', 'Detail-oriented'],
      values: ['Integrity', 'Growth'],
      skills: ['JavaScript', 'React'],
      travelStyle: 'Methodical explorer'
    };

    await app.inject({
      method: 'POST',
      url: '/compass',
      payload: compassData
    });

    // Then update it
    const updatedData = {
      ...compassData,
      values: ['Integrity', 'Growth', 'Innovation']
    };

    const response = await app.inject({
      method: 'PUT',
      url: '/compass',
      payload: updatedData
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      user_id: 'test-user-id',
      ...updatedData
    });
  });
});