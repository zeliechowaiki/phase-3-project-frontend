import {React, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import BidCard from './BidCard';
import ItemCard from './ItemCard';

function Account({currentAccount, onLogOut, spendableMoney, myBids, 
  loadUsers, currentPath, users, items, currentTime, bids, onLogin}) {
  let history = useHistory();
  const [moneyFormIsHidden, setMoneyFormIsHidden] = useState(true);
  const [moneyFormInputs, setMoneyFormInputs] = useState({
    amount: "",
    password: ""
  });
  const [myWonItems, setMyWonItems] = useState([]);

  useEffect(() => {
    setMyWonItems(myBids.map(bid => items.find(item => item.id === bid.item_id)).filter(item => item.open === false));
  },[items, myBids])

  function deleteAccount() {
    fetch(`http://localhost:9292/users/${currentAccount.id}`, {
      method: 'DELETE'
    })
      .then(() => onLogOut())
      history.push('/');
  }

  function logOut() {
    onLogOut();
    history.push('/');
  }

  function addMoney() {
    const newMoney = currentAccount.money + parseInt(moneyFormInputs.amount);
    fetch(`http://localhost:9292/users/${currentAccount.id}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        money: newMoney
      })
    })
    .then(response => response.json())
    .then((account) => {
      setMoneyFormIsHidden(true);
      onLogin(account);
      loadUsers();
    });
  }

  function handleMoneyChange(e) {
    const moneyFormInputsCopy = {...moneyFormInputs};
    moneyFormInputsCopy[e.target.name] = e.target.value;
    setMoneyFormInputs(moneyFormInputsCopy);
  }

  function handleMoneyFormSubmit(e) {
    e.preventDefault();
    if (moneyFormInputs.password === currentAccount.password) {
      addMoney();
      setMoneyFormInputs({
        amount: "",
        password: ""
      });
    }
  }

  if (!currentAccount) {
    history.push('/');
  }

  if (!currentAccount || !spendableMoney) return null;

  return (
    <div>
<<<<<<< HEAD
      <h1>{account.name}</h1>
      <p className='spendable'>Funds available: ${spendableMoney} {
        moneyFormIsHidden ? <button className='button' onClick={handleMoreClick}>Add more?</button>
        : <button className='button' onClick={handleExitForm}>Exit form</button>
=======
      <h1>{currentAccount.name}</h1>
      <p>You have ${spendableMoney} to spend {
        moneyFormIsHidden ? <button onClick={() => setMoneyFormIsHidden(false)}>Add more?</button>
        : <button onClick={() => setMoneyFormIsHidden(true)}>Exit form</button>
>>>>>>> Zelie
        }
        </p>
      <div className={moneyFormIsHidden ? "hidden" : ""}>
        <form className="account-form"onSubmit={handleMoneyFormSubmit}>
          <label htmlFor="amount">Choose amount</label>
          <input type="number" id="amount-dropdown" name="amount" min="25" max="10000" 
          required step="5" value={moneyFormInputs.amount} onChange={handleMoneyChange}></input><br></br>
          <label htmlFor="password"><b>Confirm</b></label>
          <input type="password" placeholder="Enter Password" name="password"
          required value={moneyFormInputs.password} onChange={handleMoneyChange}></input><br></br>
          <button className='button' type="submit">Submit</button>
        </form>
      </div>
<<<<<<< HEAD
      <button className='button' onClick={logOut}>Log out</button>
      <p>In debt? <button className='button' onClick={deleteAccount}>Delete account</button></p>
=======
      <div className={myBids.length === 0 ? "hidden" : ""}>
        <p>Bids:</p>
        {
          myBids.map(bid => {
            return <BidCard currentPath={currentPath} key={bid.id} bid={bid} bids={bids}
            currentAccount={currentAccount} users={users} items={items} currentTime={currentTime}></BidCard>
          })
        }
      </div>
      <div className={myWonItems.length === 0 ? "hidden" : ""}>
        <p>Items won:</p>
        {
          myWonItems.map(item => {
            return <ItemCard key={item.id} item={item} currentTime={currentTime}
            currentAccount={currentAccount} bids={bids} currentPath={currentPath}/>
          })
        }
      </div>
      <button onClick={logOut}>Log out</button>
      <p>In debt? <button onClick={deleteAccount}>Delete account</button></p>
>>>>>>> Zelie
    </div>
  )
}

export default Account