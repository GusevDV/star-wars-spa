import { configureStore } from '@reduxjs/toolkit';
import { render, render as rtlRender } from '@testing-library/react';
import { JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { swapi } from '../api';

export const renderWithRouter = (component: ReactNode) => {
  return render(<Router>{component}</Router>);
};

export function renderWithRedux(
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        [swapi.reducerPath]: swapi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false,
        }).concat(swapi.middleware),
      preloadedState,
    }),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
}
