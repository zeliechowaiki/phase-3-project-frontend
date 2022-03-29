import '../App.css';
import React, { useEffect, useState } from "react";
import HomePage from './HomePage';
import NavBar from './NavBar';
import Item from './Item';
import Login from './Login';
import Signup from './Signup';
import Account from './Account';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPath, setCurrentPath] = useState('/');
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myBids, setMyBids] = useState([]);
  let spendableMoney;

  function loadData() {
    fetch('http://localhost:9292/items')
    .then(response => response.json())
    .then(data => setItems(data));

    fetch('http://localhost:9292/users')
    .then(response => response.json())
    .then(data => setUsers(data));
  }

  function reloadCurrentAccount(id) {
    fetch(`http://localhost:9292/users/${id}`)
    .then(response => response.json())
    .then(data => setCurrentAccount(data));
  }

  function onPathChange(newPath) {
    setCurrentPath(newPath);
  }

  function onLogin(newLogin) {
    setIsLoggedIn(true);
    setCurrentAccount(newLogin);
    changeMyBids(newLogin.id);
  }

  function onLogOut() {
    setIsLoggedIn(false);
    setCurrentAccount(null);
  }

  function changeMyBids(id) {
    fetch(`http://localhost:9292/user_bids/${id}`)
    .then(response => response.json())
    .then(bids => setMyBids(bids));
  }

  useEffect(() => {
    // console.log(currentPath);
    loadData();
  },[currentPath]);

  useEffect(() => {
    loadData();
  },[]);

  if (isLoggedIn) {
    spendableMoney = currentAccount.money - myBids;
  }
  else spendableMoney = null;

  if (items.length === 0) return null;

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} spendableMoney={spendableMoney} currentPath={currentPath}/>
      <Switch>
        <Route exact path='/'>
          <HomePage items={items} onPathChange={onPathChange} 
          isLoggedIn={isLoggedIn} />
        </Route>
        <Route exact path={`/items/:id`}>
          <Item onPathChange={onPathChange} account={currentAccount} 
          changeMyBids={changeMyBids} spendableMoney={spendableMoney}/>
        </Route>
        <Route exact path='/login'>
          <Login onPathChange={onPathChange} onLogin={onLogin}/>
        </Route>
        <Route exact path='/signup'>
          <Signup onPathChange={onPathChange} onLogin={onLogin} users={users}/>
        </Route>
        <Route exact path='/account'>
          <Account onPathChange={onPathChange} account={currentAccount} onLogOut={onLogOut} 
          spendableMoney={spendableMoney} changeSpendableMoney={reloadCurrentAccount}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
