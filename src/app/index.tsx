import App from './App';
import { withProviders } from './providers';

const appWithProviders = withProviders(App);
export { appWithProviders as default };
