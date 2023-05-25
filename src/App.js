import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register } from './pages';
import { Header } from './components/Global';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
