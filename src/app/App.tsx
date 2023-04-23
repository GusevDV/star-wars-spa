import { Route, Routes } from 'react-router-dom';
import Error404 from 'pages/Error404';
import Home from 'pages/Home';
import Person from 'pages/Person';
import Header from 'widgets/Header';
import MainLayout from 'widgets/MainLayout';
import { routes } from 'shared/config';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={routes.home} element={<MainLayout header={<Header />} />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.person} element={<Person />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
