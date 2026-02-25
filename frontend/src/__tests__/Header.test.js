import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Common/Header';
import { store } from '../store/store';

describe('Header Component', () => {
  test('renders navigation links when user is not logged in', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    
    // Should show navigation links
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Students')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    
    // Should show login button
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('displays app title', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Student Planner')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    
    // Component should render without errors
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});