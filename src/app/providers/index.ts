import compose from 'compose-function';
import withChakra from './withChakra';
import withRedux from './withRedux';
import withRouter from './withRouter';

/** Registers HOC providers in the required order */
export const withProviders = compose(withRedux, withChakra, withRouter);
