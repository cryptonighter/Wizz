// Notification Service (V1)
// A simple backend scheduler that triggers in-app prompts for Quest check-ins

class NotificationService {
  constructor() {
    this.intervalId = null;
    this.checkInInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds (can be configured)
  }

  // Start the notification service
  start() {
    console.log('Notification service started');
    
    // Run immediately on start
    this.checkAndSendNotifications();
    
    // Set up interval to check for notifications
    this.intervalId = setInterval(() => {
      this.checkAndSendNotifications();
    }, this.checkInInterval);
  }

  // Stop the notification service
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Notification service stopped');
    }
  }

  // Check for quests that need check-in prompts and send notifications
  async checkAndSendNotifications() {
    console.log('Checking for quests that need check-in prompts...');
    
    // In a real implementation, this would:
    // 1. Query the database for active quests
    // 2. Check the last check-in date for each quest
    // 3. Send notifications for quests that haven't had a check-in in the specified interval
    
    // For now, we'll just log a message
    console.log('Notification check completed');
  }

  // Set the check-in interval (in hours)
  setCheckInInterval(hours) {
    this.checkInInterval = hours * 60 * 60 * 1000;
    
    // Restart the interval with the new timing if the service is running
    if (this.intervalId) {
      this.stop();
      this.start();
    }
  }
}

module.exports = NotificationService;