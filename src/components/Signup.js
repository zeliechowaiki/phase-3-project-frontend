import {React, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

function Signup({ onLogin, users}) {
  let history = useHistory();

  const [accountInfo, setAccountInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });

  function createAccount() {
    const fullName = [accountInfo.firstName, accountInfo.lastName].join(' ')
    fetch('http://localhost:9292/users', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: fullName,
        username: accountInfo.username,
        password: accountInfo.password
      })
    })
    .then(response => response.json())
    .then((account) => {
      onLogin(account);
      history.push('/');
    });
  }

  function handleAccountChange(e) {
    const accountInfoCopy = {...accountInfo};
    accountInfoCopy[e.target.name] = e.target.value;
    setAccountInfo(accountInfoCopy);
  }

  function handleAccountSubmit(e) {
    e.preventDefault();
    if (users.some(user => user.username === accountInfo.username)) {
      alert('username taken');
    }
    else {
      createAccount();
      setAccountInfo({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
      });
    }
  }

  return (
    <div className="login-form">
      <div className="div-in-div-sorry">
      <form onSubmit={handleAccountSubmit}>
        <label htmlFor="firstName"><b>First Name</b></label>
        <input type="text" placeholder="Enter First Name" name="firstName"
        required onChange={handleAccountChange} value={accountInfo.firstName}></input><br></br>
        <label htmlFor="lastName"><b>Last Name</b></label>
        <input type="text" placeholder="Enter Last Name" name="lastName" 
        required onChange={handleAccountChange} value={accountInfo.lastName}></input><br></br>
        <label htmlFor="username"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="username" 
        required onChange={handleAccountChange} value={accountInfo.username}></input><br></br>
        <label htmlFor="password"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" 
        required onChange={handleAccountChange} value={accountInfo.password}></input><br></br>
        <button type="submit" className="login-button">Sign up</button>
      </form>
      <p>Already have an account? <Link to='/login'>Log in</Link></p>
      </div>
    </div>
  )
}

export default Signup