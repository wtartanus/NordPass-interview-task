/**
 * @jest-environment jsdom
 */
 import '@testing-library/jest-dom'
 import { render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event'
 
 import { fetchSuccess } from '~/__mocks__/fetchSuccess';
 import { fetchUnauthorized } from '~/__mocks__/fetchUnauthorized';
 
 import App from '../App';
 
 describe('Login component', () => {
    test('should redirect to password health after successful login', async () => {
        global.fetch = jest.fn().mockImplementation(fetchSuccess);
        
        render(<App />);

        userEvent.type(screen.getByPlaceholderText('Username'), 'test');
        userEvent.type(screen.getByPlaceholderText('Password'), 'test');
        userEvent.click(screen.getByRole('button'));

        global.Storage.prototype.getItem = jest.fn().mockImplementationOnce(() => 'token');
        expect(await screen.findByText('Create new complex passwords to protect your accounts'))
            .toBeInTheDocument();
    });

    test('should show unauthorized error when login failed', async () => {
        global.fetch = jest.fn().mockImplementation(fetchUnauthorized);
        
        render(<App />);

        userEvent.type(screen.getByPlaceholderText('Username'), 'test');
        userEvent.type(screen.getByPlaceholderText('Password'), 'test');
        userEvent.click(screen.getByRole('button'));

        expect(await screen.findByText('You have entered an invalid username or password'))
            .toBeInTheDocument();
    });
 });