const NotificationService = require('../src/services/notificationService');

describe('NotificationService', () => {
  let notificationService;

  beforeEach(() => {
    notificationService = new NotificationService();
  });

  afterEach(() => {
    // Stop any running intervals
    notificationService.stop();
  });

  test('should start and stop the notification service', () => {
    // Mock console.log to verify calls
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    // Start the service
    notificationService.start();
    
    // Verify it started
    expect(consoleLogSpy).toHaveBeenCalledWith('Notification service started');
    
    // Stop the service
    notificationService.stop();
    
    // Verify it stopped
    expect(consoleLogSpy).toHaveBeenCalledWith('Notification service stopped');
    
    // Restore console.log
    consoleLogSpy.mockRestore();
  });

  test('should set check-in interval', () => {
    // Set interval to 1 hour (3600000 milliseconds)
    notificationService.setCheckInInterval(1);
    
    // Verify the interval was set correctly
    expect(notificationService.checkInInterval).toBe(3600000);
  });

  test('should check for notifications', async () => {
    // Mock console.log to verify calls
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    // Call the check function
    await notificationService.checkAndSendNotifications();
    
    // Verify the function was called
    expect(consoleLogSpy).toHaveBeenCalledWith('Checking for quests that need check-in prompts...');
    expect(consoleLogSpy).toHaveBeenCalledWith('Notification check completed');
    
    // Restore console.log
    consoleLogSpy.mockRestore();
  });
});