import {React, useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

function Account({account, onLogOut, onPathChange, spendableMoney, changeSpendableMoney}) {
  let history = useHistory();
  let location = useLocation();
  const [moneyFormIsHidden, setMoneyFormIsHidden] = useState(true);
  const [moneyFormInputs, setMoneyFormInputs] = useState({
    amount: "",
    password: ""
  })

  useEffect(() => {
    onPathChange(location.pathname);
  },[location.pathname, onPathChange]);

  function deleteAccount() {
    fetch(`http://localhost:9292/users/${account.id}`, {
      method: 'DELETE'
    })
    .then( () => onLogOut())
    history.push('/');
  }

  function logOut() {
    onLogOut();
    history.push('/');
  }

  function addMoney() {
    const newMoney = account.money + parseInt(moneyFormInputs.amount);
    fetch(`http://localhost:9292/users/${account.id}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        money: newMoney
      })
    })
    .then(response => response.json())
    .then(data => {
      setMoneyFormIsHidden(true);
      changeSpendableMoney(data.id);
    });
  }

  function handleMoreClick() {
    setMoneyFormIsHidden(false)
  }

  function handleExitForm() {
    setMoneyFormIsHidden(true);
  }

  function handleMoneyChange(e) {
    const moneyFormInputsCopy = {...moneyFormInputs};
    moneyFormInputsCopy[e.target.name] = e.target.value;
    setMoneyFormInputs(moneyFormInputsCopy);
  }

  function handleMoneyFormSubmit(e) {
    e.preventDefault();
    if (moneyFormInputs.password === account.password) {
      addMoney();
      setMoneyFormInputs({
        amount: "",
        password: ""
      });
    }
  }

  if (!account) {
    history.push('/');
  }

  return (
    <div>
      <h1>{account.name}</h1>
      <p>You have ${spendableMoney} to spend {
        moneyFormIsHidden ? <button onClick={handleMoreClick}>Add more?</button>
        : <button onClick={handleExitForm}>Exit form</button>
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
          <button type="submit">Submit</button>
        </form>
      </div>
      <button onClick={logOut}>Log out</button>
      <p>In debt? <button onClick={deleteAccount}>Delete account</button></p>
    </div>
  )
}

export default Account