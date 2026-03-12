import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Common/Header';
import { ThemeProvider } from '../contexts/ThemeContext';
import { store } from '../store/store';

describe('Header', () => {
  test('shows app branding and sign in for logged out users', () => {
    localStorage.removeItem('token');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Student Planner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign In' })).toBeInTheDocument();
  });
});
