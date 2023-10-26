import React from "react";
import './navBar.css';


function NavBar() {
  return (
    <nav> 
      <ul>
        <li className="calendar">
          <a href="/">Calendar</a>
        </li>
        <li>
          <a href="/">Shows</a>
        </li>
        <li className="profil">
          <a href="/">Profil</a>  
        
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;