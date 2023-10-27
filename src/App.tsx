import './css/App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './components/login/Login'
import Home from './components/home/Home'
import SeriesDetails from './components/home/SeriesDetails'
import SignUp from './components/register/Register'
import Profile from './components/Profile/Profile'
import Follow from './components/follow-show/Follow'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/accueil' element={<Home />} />
          <Route path='/accueil/series/:id' Component={SeriesDetails} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/follow" element={<Follow />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
