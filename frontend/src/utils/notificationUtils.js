// Notification utility functions

export const createNotification = (type, title, message) => {
  const notification = {
    id: Date.now().toString(),
    type, // 'warning', 'info', 'success', 'error'
    title,
    message,
    timestamp: new Date().toISOString(),
    read: false,
  };

  // Save to localStorage
  const storedNotifications = localStorage.getItem('notifications');
  const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
  notifications.unshift(notification); // Add to beginning
  
  // Keep only last 50 notifications
  if (notifications.length > 50) {
    notifications.splice(50);
  }
  
  localStorage.setItem('notifications', JSON.stringify(notifications));
  
  return notification;
};

export const checkTaskDeadlines = (tasks) => {
  const now = new Date();
  const notifications = [];

  tasks.forEach(task => {
    const dueDate = new Date(task.dueDate);
    const diffInHours = (dueDate - now) / (1000 * 60 * 60);
    
    // 24 hours before deadline
    if (diffInHours > 23 && diffInHours < 25) {
      const notification = createNotification(
        'warning',
        'Task Due Soon',
        `"${task.title}" is due in 24 hours`
      );
      notifications.push(notification);
    }
    
    // 7 days before deadline
    if (diffInHours > 167 && diffInHours < 169) {
      const notification = createNotification(
        'info',
        'Upcoming Deadline',
        `"${task.title}" is due in 7 days`
      );
      notifications.push(notification);
    }
    
    // Overdue tasks
    if (diffInHours < 0 && task.status !== 'completed') {
      const notification = createNotification(
        'error',
        'Task Overdue',
        `"${task.title}" is overdue`
      );
      notifications.push(notification);
    }
  });

  return notifications;
};

export const clearAllNotifications = () => {
  localStorage.removeItem('notifications');
};

export const getUnreadCount = () => {
  const storedNotifications = localStorage.getItem('notifications');
  if (!storedNotifications) return 0;
  
  const notifications = JSON.parse(storedNotifications);
  return notifications.filter(n => !n.read).length;
};
