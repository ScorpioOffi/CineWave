import { NavLink, useNavigate } from 'react-router-dom'
import './../css/Header.css';

const Header = () => {

  return (
    <header>

      <nav>
        <div className="links">

          <NavLink to="/home">Calendar</NavLink>  
          <NavLink to="/login">Shows</NavLink>

        </div>
        <div className='profil'>
        <NavLink to="/profile">Profil</NavLink>
        </div>

        <NavLink to="/profile">
        <img className="icon" src="./assets/icon.png" alt="image" />  


        </NavLink>

      </nav>

    </header>
  )

}

export default Header;