import { createNotification, checkTaskDeadlines, clearAllNotifications, getUnreadCount } from '../notificationUtils';

describe('Notification Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('createNotification', () => {
    test('creates notification with correct structure', () => {
      const notification = createNotification('info', 'Test Title', 'Test Message');
      
      expect(notification).toHaveProperty('id');
      expect(notification.type).toBe('info');
      expect(notification.title).toBe('Test Title');
      expect(notification.message).toBe('Test Message');
      expect(notification.read).toBe(false);
      expect(notification.timestamp).toBeDefined();
    });

    test('saves notification to localStorage', () => {
      createNotification('success', 'Success', 'Operation completed');
      
      const stored = JSON.parse(localStorage.getItem('notifications'));
      expect(stored).toHaveLength(1);
      expect(stored[0].title).toBe('Success');
    });

    test('limits notifications to 50', () => {
      for (let i = 0; i < 55; i++) {
        createNotification('info', `Notification ${i}`, `Message ${i}`);
      }
      
      const stored = JSON.parse(localStorage.getItem('notifications'));
      expect(stored).toHaveLength(50);
    });

    test('adds new notification to beginning of array', () => {
      createNotification('info', 'First', 'First message');
      createNotification('info', 'Second', 'Second message');
      
      const stored = JSON.parse(localStorage.getItem('notifications'));
      expect(stored[0].title).toBe('Second');
      expect(stored[1].title).toBe('First');
    });
  });

  describe('checkTaskDeadlines', () => {
    test('generates 24-hour warning for upcoming tasks', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const tasks = [{
        _id: '1',
        title: 'Upcoming Task',
        dueDate: tomorrow.toISOString(),
        status: 'pending'
      }];
      
      const notifications = checkTaskDeadlines(tasks);
      expect(notifications.some(n => n.title === 'Task Due Soon')).toBe(true);
    });

    test('generates 7-day warning for distant tasks', () => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const tasks = [{
        _id: '1',
        title: 'Future Task',
        dueDate: nextWeek.toISOString(),
        status: 'pending'
      }];
      
      const notifications = checkTaskDeadlines(tasks);
      expect(notifications.some(n => n.title === 'Upcoming Deadline')).toBe(true);
    });

    test('generates overdue notification for past due tasks', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const tasks = [{
        _id: '1',
        title: 'Overdue Task',
        dueDate: yesterday.toISOString(),
        status: 'pending'
      }];
      
      const notifications = checkTaskDeadlines(tasks);
      expect(notifications.some(n => n.title === 'Task Overdue')).toBe(true);
    });

    test('does not generate notification for completed overdue tasks', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const tasks = [{
        _id: '1',
        title: 'Completed Overdue Task',
        dueDate: yesterday.toISOString(),
        status: 'completed'
      }];
      
      const notifications = checkTaskDeadlines(tasks);
      expect(notifications.some(n => n.title === 'Task Overdue')).toBe(false);
    });
  });

  describe('getUnreadCount', () => {
    test('returns 0 when no notifications exist', () => {
      expect(getUnreadCount()).toBe(0);
    });

    test('counts unread notifications correctly', () => {
      createNotification('info', 'Unread 1', 'Message 1');
      createNotification('info', 'Unread 2', 'Message 2');
      
      expect(getUnreadCount()).toBe(2);
    });

    test('excludes read notifications from count', () => {
      createNotification('info', 'Read', 'Message');
      createNotification('info', 'Unread', 'Message');
      
      const stored = JSON.parse(localStorage.getItem('notifications'));
      stored[0].read = true;
      localStorage.setItem('notifications', JSON.stringify(stored));
      
      expect(getUnreadCount()).toBe(1);
    });
  });

  describe('clearAllNotifications', () => {
    test('removes all notifications from localStorage', () => {
      createNotification('info', 'Test', 'Message');
      clearAllNotifications();
      
      expect(localStorage.getItem('notifications')).toBeNull();
    });
  });
});
