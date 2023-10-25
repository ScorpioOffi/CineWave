import './css/App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SeriesDetails from './components/SeriesDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/accueil" element={<Home />} />
        <Route path="/accueil/series/:id" Component={SeriesDetails} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
