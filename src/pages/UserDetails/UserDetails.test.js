import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';

/** Components */
import UserDetails from './UserDetails';

/** Helpers */
import render from '../../helpers/renderForTests';

describe('UserDetails', () => {
  test('Should be visible', () => {
    render(<UserDetails />);

    expect(screen.getByTestId('UserDetails')).toBeVisible();
  });

  test('Should submit button be disabled', () => {
    render(<UserDetails />);

    expect(screen.getByTestId('SubmitUserButton')).toBeDisabled();
  });

  test('Should click in cancel button and be redirected to initial page', async () => {
    render(<UserDetails />);

    userEvent.click(screen.getByTestId('CancelUserButton'));

    expect(global.window.location.pathname).toEqual('/');
  });

  test('Should add a new user', async () => {
    render(<UserDetails />);

    const userName = 'Test User';
    const userEmail = 'test.user@someemail.com';
    const nameInput = screen.getByTestId('NameInput');
    const emailInput = screen.getByTestId('EmailInput');
    const submitButton = screen.getByTestId('SubmitUserButton');

    await userEvent.type(nameInput, userName);
    await userEvent.type(emailInput, userEmail);

    await waitFor(async () => {
      expect(nameInput).toHaveValue(userName);
      expect(emailInput).toHaveValue(userEmail);
      expect(submitButton).not.toBeDisabled();

      await fireEvent.click(submitButton);
    });

    expect(global.window.location.pathname).toEqual('/');
    expect(screen.getByText('User created successfully!')).toBeVisible();
  });

  test('Should update an existent user', async () => {
    render(<Route path="/user/:userId" element={<UserDetails />} />, ['/user/1']);

    waitFor(async () => {
      expect(screen.getByTestId('NameInput')).toBeVisible();

      const userName = 'New name';
      const userEmail = 'new.user@someemail.com';
      const nameInput = screen.getByTestId('NameInput');
      const emailInput = screen.getByTestId('EmailInput');
      const submitButton = screen.getByTestId('SubmitUserButton');

      await userEvent.clear(nameInput);
      await userEvent.clear(emailInput);
      await userEvent.type(nameInput, userName);
      await userEvent.type(emailInput, userEmail);

      expect(nameInput).toHaveValue(userName);
      expect(emailInput).toHaveValue(userEmail);
      expect(submitButton).not.toBeDisabled();

      await fireEvent.click(submitButton);

      expect(global.window.location.pathname).toEqual('/');
      expect(screen.getByText('User updated successfully!')).toBeVisible();
    });
  });
});
