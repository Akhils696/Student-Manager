import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Calendar from '../components/Calendar/Calendar';

describe('Calendar', () => {
  test('renders current month header and day labels', () => {
    render(<Calendar tasks={[]} />);

    const now = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    expect(screen.getByText(`${monthNames[now.getMonth()]} ${now.getFullYear()}`)).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
  });

  test('renders task chips and supports task click callback', () => {
    const onTaskClick = vi.fn();
    const today = new Date();

    render(
      <Calendar
        onTaskClick={onTaskClick}
        tasks={[
          {
            _id: 'task-1',
            title: 'Math Assignment',
            dueDate: today.toISOString(),
            priority: 'high',
            status: 'pending',
          },
        ]}
      />
    );

    expect(screen.getByText('Math Assignment')).toBeInTheDocument();
    screen.getByText(String(today.getDate())).click();
    expect(onTaskClick).toHaveBeenCalled();
  });
});
