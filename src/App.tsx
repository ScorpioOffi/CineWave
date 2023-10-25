import './css/App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
