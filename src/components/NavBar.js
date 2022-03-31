import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({isLoggedIn, spendableMoney, currentPath}) {
  const path = isLoggedIn ? "/account" : "/login"

  return (
    <div>
      <div className='main-logo'>
        <header> Maximillian's</header>
          <nav>
          <NavLink className="nav-element"exact to="/"> Home </NavLink>
          <NavLink className="nav-element"exact to={path}> Account </NavLink>
          {
            isLoggedIn && currentPath !=="/account" && spendableMoney ? <p className='spendable'> Funds available: ${spendableMoney}</p> : null
          }
          </nav>
      </div>
    </div>
  )
}

export default NavBar