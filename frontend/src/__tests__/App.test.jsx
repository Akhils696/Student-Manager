import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders brand and sign in state', () => {
    localStorage.removeItem('token');
    render(<App />);

    expect(screen.getAllByText('Student Planner').length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: 'Sign In' })).toBeInTheDocument();
  });
});
