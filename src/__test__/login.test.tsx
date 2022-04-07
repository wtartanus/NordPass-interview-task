/**
* @jest-environment jsdom
*/
import '@testing-library/jest-dom'
import { Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import userEvent from '@testing-library/user-event'

import { fetchSuccess } from '~/__mocks__/fetchSuccess';
import { fetchUnauthorized } from '~/__mocks__/fetchUnauthorized';

import Login from '../components/Login/Login';

describe('Login component', () => {
  test('should redirect to password health after successful login', async () => {
    global.fetch = jest.fn().mockImplementation(fetchSuccess);
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    await userEvent.type(screen.getByPlaceholderText('Username'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'test');
    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(history.location.pathname).toBe('/items'))
  });

  test('should show unauthorized error when login failed', async () => {
    global.fetch = jest.fn().mockImplementation(fetchUnauthorized);
    
    const history = createMemoryHistory();
    
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    await userEvent.type(screen.getByPlaceholderText('Username'), 'test');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'test');
    await userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('You have entered an invalid username or password'))
        .toBeInTheDocument();
  });
});