import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import { routes } from 'shared/config';

function App() {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
    </Routes>
  );
}

export default App;
