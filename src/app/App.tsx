import { Route, Routes } from 'react-router-dom';
import Error404 from 'pages/Error404';
import Home from 'pages/Home';
import Person from 'pages/Person';
import MainLayout from 'widgets/MainLayout';
import { routes } from 'shared/config';

function App() {
  return (
    <Routes>
      <Route path={routes.home} element={<MainLayout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.person} element={<Person />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default App;
