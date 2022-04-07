/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';

import { fetchSuccess } from '../__mocks__/fetchSuccess';
import App from '../App';

describe('App component', () => {
  test('should render', () => {
    const { container } = render(<App />);

    expect(container).toBeDefined();
  });

  test('should render login page if user isn\'t logged', () => {
    const { container } = render(<App />);

    expect(container.firstChild).toHaveClass('login-page');
  });

  test('should render password health when user is logged', async () => {
    global.Storage.prototype.getItem = jest.fn().mockImplementation(() => 'token');
    global.fetch = jest.fn().mockImplementation(fetchSuccess);

    render(<App />);

    expect(await screen.findByText('Create new complex passwords to protect your accounts'))
        .toBeInTheDocument();
  });
});