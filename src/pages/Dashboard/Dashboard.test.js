import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/** Helpers */
import render from '../../helpers/renderForTests';

/** Components */
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  test('Should be visible', () => {
    render(<Dashboard />);

    expect(screen.getByTestId('Dashboard')).toBeVisible();
  });

  test('Should have 10 items inside the list', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getAllByTestId('UserRow')).toHaveLength(10);
    });
  });

  test('Should click in add user button and be redirect to new user page', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getAllByTestId('AddUserButton')[0]).toBeVisible();
    });

    userEvent.click(screen.getAllByTestId('AddUserButton')[0]);

    expect(global.window.location.pathname).toEqual('/user');
  });

  test('Should click in edit user button and be redirect to edit user page', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getAllByTestId('EditButton')[0]).toBeVisible();
    });

    userEvent.click(screen.getAllByTestId('EditButton')[0]);

    expect(global.window.location.pathname).toEqual('/user/1');
  });

  test('Should click in delete user button and open a dialog', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getAllByTestId('DeleteButton')[0]).toBeVisible();
    });

    userEvent.click(screen.getAllByTestId('DeleteButton')[0]);

    expect(screen.getByTestId('DeleteUserDialog')).toBeVisible();
  });

  test('Should delete an user', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getAllByTestId('DeleteButton')[0]).toBeVisible();
    });

    userEvent.click(screen.getAllByTestId('DeleteButton')[0]);

    expect(screen.getByTestId('DeleteUserDialog')).toBeVisible();

    userEvent.click(screen.getByText('Agree'));

    expect(screen.getByText('User deleted successfully!')).toBeVisible();
  });
});
