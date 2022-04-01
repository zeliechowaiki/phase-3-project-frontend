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
    },20000);
  },[]);

  useEffect(() => {
    onPathChange(location.pathname);
  }, [location]);

  return (
    <div className="main-logo">
      <header> Maximillian's</header>
      <nav>
      <NavLink exact to="/" className="nav-element"> <p>Home</p> </NavLink>
      <NavLink exact to={path} className="nav-element"> <p>Account</p> </NavLink>
      {
        spendableMoney && currentPath !=="/account" && spendableMoney ? <p className="spendable" >Funds available: ${spendableMoney}</p> : null
      }
      </nav>
    </div>
  )
}

export default NavBar