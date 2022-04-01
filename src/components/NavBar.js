import {React, useEffect }from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function NavBar({spendableMoney, onPathChange, currentPath, currentAccountId, loadBids}) {
  const path = spendableMoney ? "/account" : "/login";
  let location = useLocation();

  useEffect(() => {
    setInterval(() => {
      fetch('http://localhost:9292/random_bid', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        current_account_id: currentAccountId
        })
    })
    .then(response => response.json())
    .then(() => loadBids());
    },1000000000);
  },[]);

  useEffect(() => {
    onPathChange(location.pathname);
  }, [location]);

  return (
    <div>
      <div className='main-logo'>
        <header> Maximillian's</header>
          <nav>
          <NavLink className="nav-element"exact to="/"> Home </NavLink>
          <NavLink className="nav-element"exact to={path}> Account </NavLink>
          {
            // isLoggedIn && currentPath !=="/account" && spendableMoney ? <p className='spendable'> Funds available: ${spendableMoney}</p> : null
          }
          </nav>
      </div>
    </div>
  )
}

export default NavBar