import '@testing-library/jest-dom'
import { Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import {createMemoryHistory} from 'history'

import { fetchFail } from '~/__mocks__/fetchFail';
import { fetchUnauthorized } from '~/__mocks__/fetchUnauthorized';
import { fetchSuccess } from '~/__mocks__/fetchSuccess';

import PasswordHealth from '../components/PasswordHealth/PasswordHealth';

describe('PasswordHealth component', () => {
  test('should show loading screen', async () => {
    global.fetch = jest.fn().mockImplementation(fetchSuccess);
    const history = createMemoryHistory();
    
    render(
      <Router history={history}>
        <PasswordHealth />
      </Router>
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  test('should redirect to login page if user is unauthorized', async () => {
    global.fetch = jest.fn().mockImplementation(fetchUnauthorized);
    
    const history = createMemoryHistory();
    
    render(
      <Router history={history}>
        <PasswordHealth />
      </Router>
    );

    await waitFor(() => expect(history.location.pathname).toBe('/login'));
  });

  test('should show error if request fails', async () => {
    global.fetch = jest.fn().mockImplementation(fetchFail);
    
    const history = createMemoryHistory();
    
    render(
      <Router history={history}>
        <PasswordHealth />
      </Router>
    );

    expect(await screen.findByText('Something went wrong.')).toBeInTheDocument();
  });
});
