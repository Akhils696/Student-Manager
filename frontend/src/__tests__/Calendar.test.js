import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Calendar from '../Calendar';

const mockTasks = [
  {
    _id: '1',
    title: 'Math Assignment',
    dueDate: new Date().toISOString(),
    priority: 'high',
    status: 'pending'
  },
  {
    _id: '2',
    title: 'Science Project',
    dueDate: new Date().toISOString(),
    priority: 'medium',
    status: 'in-progress'
  }
];

describe('Calendar Component', () => {
  test('renders calendar with current month and year', () => {
    render(
      <BrowserRouter>
        <Calendar tasks={[]} />
      </BrowserRouter>
    );
    
    const now = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    
    expect(screen.getByText(`${monthNames[now.getMonth()]} ${now.getFullYear()}`)).toBeInTheDocument();
  });

  test('renders calendar grid with 7 columns', () => {
    render(
      <BrowserRouter>
        <Calendar tasks={[]} />
      </BrowserRouter>
    );
    
    const grid = document.querySelector('.grid.grid-cols-7');
    expect(grid).toBeInTheDocument();
  });

  test('displays tasks on current day', () => {
    render(
      <BrowserRouter>
        <Calendar tasks={mockTasks} />
      </BrowserRouter>
    );
    
    // Check if task titles are rendered
    expect(screen.getByText('Math Assignment')).toBeInTheDocument();
    expect(screen.getByText('Science Project')).toBeInTheDocument();
  });

  test('applies correct priority colors to tasks', () => {
    render(
      <BrowserRouter>
        <Calendar tasks={mockTasks} />
      </BrowserRouter>
    );
    
    const highPriorityTask = screen.getByText('Math Assignment').closest('div');
    expect(highPriorityTask).toHaveClass('bg-red-500');
    
    const mediumPriorityTask = screen.getByText('Science Project').closest('div');
    expect(mediumPriorityTask).toHaveClass('bg-yellow-500');
  });

  test('handles task click callback', () => {
    const onTaskClick = jest.fn();
    
    render(
      <BrowserRouter>
        <Calendar tasks={mockTasks} onTaskClick={onTaskClick} />
      </BrowserRouter>
    );
    
    const todayCell = screen.getByText(new Date().getDate()).closest('div');
    fireEvent.click(todayCell);
    
    expect(onTaskClick).toHaveBeenCalled();
  });

  test('renders day labels correctly', () => {
    render(
      <BrowserRouter>
        <Calendar tasks={[]} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Thu')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
  });
});
