import React from 'react';
import { BrowserRouter, MemoryRouter, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';

/** Global components */
import Toast from '../components/Toast';

const renderForTests = (children, initialEntries) => {
  /** This case is used specifically for routes that needs route params */
  if (initialEntries) {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>{children}</Routes>
        </MemoryRouter>
        <Toast />
      </Provider>
    );
  }

  render(
    <Provider store={store}>
      <BrowserRouter>
        {children}
        <Toast />
      </BrowserRouter>
    </Provider>
  );
};

export default renderForTests;
