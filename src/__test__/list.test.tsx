/**
* @jest-environment jsdom
*/
import '@testing-library/jest-dom'
import {render} from '@testing-library/react';

import { fetchSuccess } from '~/__mocks__/fetchSuccess';

import List from '../components/PasswordHealth/components/List/List';

const items = [
  {
    id: "001",
    title: "Google",
    description: "My personal account",
    password: "123",
    createdAt: new Date().toISOString()
  },
];

describe('List component', () => {
  test('should render', async () => {
    global.fetch = jest.fn().mockImplementation(fetchSuccess);
    const refreshUserItems = jest.fn();
    const { container } = render(<List items={items} refreshUserItems={refreshUserItems}/>);

    expect(container).toBeInTheDocument();
  });
});