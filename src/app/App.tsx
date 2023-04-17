import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import MainLayout from 'widgets/MainLayout';
import { routes } from 'shared/config';

function App() {
  return (
    <Routes>
      <Route path={routes.home} element={<MainLayout />}>
        <Route path={routes.home} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
