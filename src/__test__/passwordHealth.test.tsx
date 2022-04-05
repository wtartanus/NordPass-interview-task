/**
* @jest-environment jsdom
*/
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import userEvent from '@testing-library/user-event'

import { fetchFail } from '~/__mocks__/fetchFail';
import { fetchUnauthorized } from '~/__mocks__/fetchUnauthorized';

import PasswordHealth from '../components/PasswordHealth/PasswordHealth';

 describe('PasswordHealth component', () => {
    test('should show loading screen', async () => {
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

        expect(await screen.findByText('not found')).toBeInTheDocument();
    });

    // test('should show unauthorized error when login failed', async () => {
    //     global.fetch = jest.fn().mockImplementation(fetchUnauthorized);
        
    //     const history = createMemoryHistory();
        
    //     render(
    //         <Router history={history}>
    //             <Login />
    //         </Router>
    //     );

    //     userEvent.type(screen.getByPlaceholderText('Username'), 'test');
    //     userEvent.type(screen.getByPlaceholderText('Password'), 'test');
    //     userEvent.click(screen.getByRole('button'));

    //     expect(await screen.findByText('You have entered an invalid username or password'))
    //         .toBeInTheDocument();
    // });
 });