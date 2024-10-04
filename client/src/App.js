import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DashBoard from './pages/DashBoard.jsx';
import CustomerProfile from './pages/CustomerProfile.jsx';
import Header from './components/Header.jsx';

function App() {
  const location = useLocation();

  const titles = {
    '/': 'Dashboard',
    '/customer': 'Customer Profile',
  };

  useEffect(() => {
    const currentTitle = titles[location.pathname] || 'Page Not Found';
    document.title = currentTitle;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<DashBoard/>} />
        <Route path="/customer" element={<CustomerProfile/>} />
      </Routes>
    </div>
  );
}

export default App;