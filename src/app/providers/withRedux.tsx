import { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

const withRedux = (Component: FC) => () =>
  (
    <Provider store={store}>
      <Component />
    </Provider>
  );

export default withRedux;
