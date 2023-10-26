import './css/App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import SeriesDetails from './components/SeriesDetails'
import SignUp from './components/Register'
import Header from './components/Navbar'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/accueil' element={<Home />} />
          <Route path='/accueil/series/:id' Component={SeriesDetails} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
