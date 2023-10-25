import './css/App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Register';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
