import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { store } from '../store/store';

// Mock the components that are imported in App
jest.mock('../pages/Login', () => () => <div>Login Page</div>);
jest.mock('../pages/Register', () => () => <div>Register Page</div>);
jest.mock('../pages/Dashboard', () => () => <div>Dashboard Page</div>);
jest.mock('../pages/StudentsList', () => () => <div>Students List Page</div>);
jest.mock('../pages/StudentDetails', () => () => <div>Student Details Page</div>);
jest.mock('../pages/TasksList', () => () => <div>Tasks List Page</div>);
jest.mock('../pages/CalendarView', () => () => <div>Calendar View Page</div>);
jest.mock('../components/Common/Header', () => () => <div>Header Component</div>);
jest.mock('../components/Common/PrivateRoute', () => ({ children }) => children);

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    
    // The app should render without errors
    expect(screen.getByText('Header Component')).toBeInTheDocument();
  });

  test('renders toast container', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    
    // Toast container should be present
    const toastContainer = document.querySelector('.Toastify');
    expect(toastContainer).toBeInTheDocument();
  });
});