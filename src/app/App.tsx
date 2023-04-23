import { Route, Routes } from 'react-router-dom';
import Error404 from 'pages/Error404';
import Hero from 'pages/Hero';
import Home from 'pages/Home';
import MainLayout from 'widgets/MainLayout';
import { routes } from 'shared/config';

function App() {
  return (
    <Routes>
      <Route path={routes.home} element={<MainLayout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.hero} element={<Hero />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default App;
