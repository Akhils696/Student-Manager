import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import { store } from '../store/store';

// Mock react-redux hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: () => ({
    students: [],
    tasks: [],
    user: { username: 'testuser' }
  })
}));

describe('Dashboard Component', () => {
  test('renders dashboard title', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('renders statistics cards', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    
    // Should display all statistics cards
    expect(screen.getByText('Total Students')).toBeInTheDocument();
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('Pending Tasks')).toBeInTheDocument();
    expect(screen.getByText('Completed Tasks')).toBeInTheDocument();
  });

  test('renders recent sections', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    
    // Should display recent sections
    expect(screen.getByText('Recent Students')).toBeInTheDocument();
    expect(screen.getByText('Recent Tasks')).toBeInTheDocument();
  });

  test('shows message when no students exist', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText(/No students found/)).toBeInTheDocument();
    const addStudentLink = screen.getByText('Add your first student');
    expect(addStudentLink).toBeInTheDocument();
    expect(addStudentLink).toHaveAttribute('href', '/students');
  });

  test('shows message when no tasks exist', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText(/No tasks found/)).toBeInTheDocument();
    const addTaskLink = screen.getByText('Add your first task');
    expect(addTaskLink).toBeInTheDocument();
    expect(addTaskLink).toHaveAttribute('href', '/tasks');
  });
});