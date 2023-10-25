import './css/App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SeriesDetails from './components/SeriesDetails';
import SignUp from './components/Register';
import Header from './components/Header'

function App() {
  return (
<div>

    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/series/:id" Component={SeriesDetails} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
