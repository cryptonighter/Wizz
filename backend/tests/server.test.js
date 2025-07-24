const createServer = require('../src/server');

describe('Server', () => {
  let app;

  beforeAll(async () => {
    app = createServer({ logger: false });
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('should return welcome message', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/'
    });
    
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ message: 'Welcome to Wizz Backend API' });
  });
});