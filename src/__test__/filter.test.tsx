/**
* @jest-environment jsdom
*/
import '@testing-library/jest-dom'
import { Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import userEvent from '@testing-library/user-event'

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
        createdAt: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString()
    }
];

 describe('Filter component', () => {
    test('should show correct count for each tab', async () => {
        global.fetch = jest.fn().mockImplementation(fetchSuccess);
        
        const history = createMemoryHistory();
        
        render(
            <Router history={history}>
                <Filter items={[...weak, ...reused, ...old]} />
            </Router>
        );

        expect(await screen.findByText(`Weak (${weak.length})`)).toBeInTheDocument();
        expect(await screen.findByText(`Reused (${reused.length})`)).toBeInTheDocument();
        expect(await screen.findByText(`Old (${old.length})`)).toBeInTheDocument();
    });

    test('should redirect on tab click', async () => {
        global.fetch = jest.fn().mockImplementation(fetchSuccess);
        
        const history = createMemoryHistory();
        
        render(
            <Router history={history}>
                <Filter items={[]} />
            </Router>
        );

        userEvent.click(await screen.findByText('Old (0)'));
        await waitFor(() => expect(history.location.pathname).toBe('/items/old'));
    });
 });