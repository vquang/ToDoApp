
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './util/ProtectedRoute';
import Layout from './components/layouts/Layout';
import { LoginPage, HomePage, RegisterPage } from './pages';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Layout><HomePage /></Layout>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
