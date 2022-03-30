import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({isLoggedIn, spendableMoney, currentPath}) {
  const path = isLoggedIn ? "/account" : "/login"

  return (
    <div>
      <nav>
      <NavLink className="nav-element"exact to="/"> Home </NavLink>
      <NavLink className="nav-element"exact to={path}> Account </NavLink>
      {
        isLoggedIn && currentPath !=="/account" && spendableMoney ? <p>You have ${spendableMoney} to spend</p> : null
      }
      </nav>
    </div>
  )
}

export default NavBar