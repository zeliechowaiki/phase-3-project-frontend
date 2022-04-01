import '../App.css';
import {React, useEffect, useState } from "react";
import timedif from './timedif';
import HomePage from './HomePage';
import NavBar from './NavBar';
import Item from './Item';
import Login from './Login';
import Signup from './Signup';
import Account from './Account';
import Ticker from './Ticker';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [bids, setBids] = useState([]);
  const [currentPath, setCurrentPath] = useState('/');
  const [currentAccount, setCurrentAccount] = useState();
  const [currentTime, setCurrentTime] = useState(new Date().toUTCString().split(' ')[4]);
  let spendableMoney;

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toUTCString().split(' ')[4]);
    },1000);
  },[]);

  function loadItems() {
    fetch('http://localhost:9292/items')
    .then(response => response.json())
    .then(data => setItems(data));
  }

  function loadUsers() {
    fetch('http://localhost:9292/users')
    .then(response => response.json())
    .then(data => setUsers(data));
  }

  function loadBids() {
    fetch('http://localhost:9292/bids')
    .then(response => response.json())
    .then(data => setBids(data));
  }

  useEffect(() => {
    loadItems();
    loadUsers();
    loadBids();
  },[currentPath]);

  function onLogin(newLogin) {
    setCurrentAccount(newLogin);
  }

  function onLogOut() {
    setCurrentAccount(null);
  }

  items.filter(item => item.open === true).forEach(item => {
    if (timedif(item, false, currentTime) === "closed") {
      fetch(`http://localhost:9292/items/${item.id}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        open: false
        })
      })
      .then(response => response.json())
      .then((winner) => {
        if (winner === currentAccount) {
          alert(`You've won ${item.name}!`)
        }
        loadItems();
        loadBids();
      });
    }
  });

  const myBids = (currentAccount ? bids.filter(bid => bid.user_id === currentAccount.id).reverse() : []);

  if (currentAccount) {
    const latestBids = items.map(item => {
      const itemBids = bids.filter(bid => bid.item_id === item.id);
      return itemBids[itemBids.length - 1];
    });
    const myLatestBids = latestBids.filter(bid => bid.user_id === currentAccount.id);
    spendableMoney = currentAccount.money - myLatestBids.reduce((previousValue, currentValue) => previousValue + currentValue.bid_amount, 0);
  }
  else {
    spendableMoney = null;
  }

  if (items.length === 0 || users.length === 0 || bids.length === 0 || !currentTime) return null;

  return (
    <div className="app">
    <Router>
      <NavBar spendableMoney={spendableMoney} currentPath={currentPath} onPathChange={setCurrentPath}
      currentAccountId={currentAccount ? currentAccount.id : 0} loadBids={loadBids}/>
      <Switch>
        <Route exact path='/'>
          <HomePage items={items} currentPath={currentPath}
          currentAccount={currentAccount} bids={bids} currentTime={currentTime}/>
        </Route>
        <Route exact path={`/items/:id`}>
          <Item currentAccount={currentAccount} users={users} 
          loadBids={loadBids} spendableMoney={spendableMoney} items={items} bids={bids} 
          currentPath={currentPath} currentTime={currentTime}/>
        </Route>
        <Route exact path='/login'>
          <Login onLogin={onLogin} users={users}/>
        </Route>
        <Route exact path='/signup'>
          <Signup onLogin={onLogin} users={users}/>
        </Route>
        <Route exact path='/account'>
          <Account currentAccount={currentAccount} onLogOut={onLogOut} onLogin={onLogin}
          spendableMoney={spendableMoney} currentPath={currentPath} myBids={myBids} 
          loadUsers={loadUsers} users={users} items={items} bids={bids} currentTime={currentTime}/>
        </Route>
      </Switch>
    </Router>
    <Ticker bids={bids} currentTime={currentTime} items={items} users={users}></Ticker>
    </div>
  );
}

export default App;
