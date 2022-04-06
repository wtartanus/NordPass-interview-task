/**
* @jest-environment jsdom
*/
import '@testing-library/jest-dom'
import { Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'

import { fetchSuccess } from '~/__mocks__/fetchSuccess';

import Header from '../components/PasswordHealth/components/Header/Header';

 describe('Header component', () => {
  test('should redirect to login page on logout', async () => {
    global.fetch = jest.fn().mockImplementation(fetchSuccess);
    
    const history = createMemoryHistory();
    
    render(
      <Router history={history}>
        <Header vulnerableItemsCount={0} username='test' />
      </Router>
    );

    userEvent.click(await screen.findByText('Logout test'));

    await waitFor(() => expect(history.location.pathname).toBe('/login'));
  });
});