import { createNotification, checkTaskDeadlines, clearAllNotifications, getUnreadCount } from '../utils/notificationUtils';

describe('notificationUtils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('createNotification stores notifications in localStorage', () => {
    const notification = createNotification('info', 'Test title', 'Test message');
    const stored = JSON.parse(localStorage.getItem('notifications'));

    expect(notification.id).toBeDefined();
    expect(notification.read).toBe(false);
    expect(stored).toHaveLength(1);
    expect(stored[0].title).toBe('Test title');
  });

  test('checkTaskDeadlines creates upcoming and overdue notifications', () => {
    const upcoming = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const overdue = new Date(Date.now() - 2 * 60 * 60 * 1000);

    const notifications = checkTaskDeadlines([
      { _id: '1', title: 'Soon Task', dueDate: upcoming.toISOString(), status: 'pending' },
      { _id: '2', title: 'Late Task', dueDate: overdue.toISOString(), status: 'pending' },
    ]);

    expect(notifications.some((n) => n.title === 'Task Due Soon')).toBe(true);
    expect(notifications.some((n) => n.title === 'Task Overdue')).toBe(true);
  });

  test('getUnreadCount returns unread item count', () => {
    createNotification('info', 'One', 'First');
    createNotification('info', 'Two', 'Second');

    expect(getUnreadCount()).toBe(2);
  });

  test('clearAllNotifications removes stored notifications', () => {
    createNotification('info', 'To clear', 'Message');
    clearAllNotifications();

    expect(localStorage.getItem('notifications')).toBeNull();
  });
});
