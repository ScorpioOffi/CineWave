import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {

  return (
    <header>
      <nav>
        <div className="links">
          <NavLink to="/calendar">Calendar</NavLink>  
          <NavLink to="/accueil">Shows</NavLink>
          <NavLink to="/accueil">Follow</NavLink>
        </div>

        <NavLink to="/profile">
        <img className="icon" src="./assets/icon.png" alt="image" />  

        </NavLink>
      </nav>
    </header>
  )

}

export default Navbar;