import '@testing-library/jest-dom'
import { Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'

import { fetchSuccess } from '~/__mocks__/fetchSuccess';

import Filter from '../components/PasswordHealth/components/Filter/Filter';

const weak = [
  {
    id: "001",
    title: "Google",
    description: "My personal account",
    password: "123",
    createdAt: new Date().toISOString()
  },
  {
    id: "002",
    title: "Facebook",
    description: "Facebook account that I manage",
    password: "231",
    createdAt: new Date().toISOString()
  },
  {
    id: "003",
    title: "Github",
    description: "This is where I store my projects",
    password: "dfr",
    createdAt: new Date().toISOString()
  },
];

const reused = [
  {
    id: "001",
    title: "Google",
    description: "My personal account",
    password: "Password123",
    createdAt: new Date().toISOString()
  },
  {
    id: "003",
    title: "Github",
    description: "This is where I store my projects",
    password: "Password123",
    createdAt: new Date().toISOString()
  },
];

const old = [
  {
    id: "002",
    title: "Facebook",
    description: "Facebook account that I manage",
    password: "SuperDuper5trong!",
    createdAt: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
  }
];

describe('Filter component', () => {
  test('should show correct count for each tab', async () => {
    global.fetch = jest.fn().mockImplementation(fetchSuccess);
    
    const history = createMemoryHistory();
    
    const { queryByText } = render(
        <Router history={history}>
            <Filter
              weakCount={weak.length}
              reusedCount={reused.length}
              oldCount={old.length}
            />
        </Router>
    );

    expect(queryByText(`Weak (${weak.length})`)).toBeInTheDocument();
    expect(queryByText(`Reused (${reused.length})`)).toBeInTheDocument();
    expect(queryByText(`Old (${old.length})`)).toBeInTheDocument();
  });

  test('should redirect on tab click', async () => {
    global.fetch = jest.fn().mockImplementation(fetchSuccess);
    
    const history = createMemoryHistory();
    
    const { queryByText } = render(
      <Router history={history}>
        <Filter    
          weakCount={0}
          reusedCount={0}
          oldCount={0}
        />
      </Router>
    );

    await userEvent.click(queryByText('Old (0)'));

    await waitFor(() => expect(history.location.pathname).toBe('/items/old'));
  });
});
