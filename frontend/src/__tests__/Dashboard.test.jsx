import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Dashboard from '../pages/Dashboard';
import { NotificationProvider } from '../contexts/NotificationContext';

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
  useSelector: (selector) =>
    selector({
      students: { students: [] },
      tasks: { tasks: [] },
      auth: { user: { firstName: 'Akhil' } },
    }),
}));

vi.mock('../store/studentSlice', () => ({
  getStudents: () => ({ type: 'students/getStudents' }),
}));

vi.mock('../store/taskSlice', () => ({
  getTasks: () => ({ type: 'tasks/getTasks' }),
}));

describe('Dashboard', () => {
  test('renders dashboard shell and quick actions', () => {
    render(
      <MemoryRouter>
        <NotificationProvider>
          <Dashboard />
        </NotificationProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Command Center')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Add Student' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Plan Task' })).toBeInTheDocument();
  });
});
