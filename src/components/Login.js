import {React, useEffect, useState} from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';

function Login({onPathChange, onLogin}) {
  let location = useLocation();
  let history = useHistory();
  const [users, setUsers] = useState([]);
  const [accountInfo, setAccountInfo] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    fetch('http://localhost:9292/users')
    .then(response => response.json())
    .then(users => setUsers(users));
  },[])
  
  useEffect(() => {
    onPathChange(location.pathname);
  },[location.pathname, onPathChange]);

  function handleAccountChange(e) {
    const accountInfoCopy = {...accountInfo};
    accountInfoCopy[e.target.name] = e.target.value;
    setAccountInfo(accountInfoCopy);
  }

  function onLoginSubmit(e) {
    e.preventDefault();
    users.forEach(user => {
      if (user.username === accountInfo.username && user.password === accountInfo.password) {
        setAccountInfo({
        username: '',
        password: ''
        });
        onLogin(user);
        history.push('/');
    }})
    
  }

  return(
    <div>
      <form onSubmit={onLoginSubmit}>
        <label htmlFor="username"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="username" 
        required onChange={handleAccountChange} value={accountInfo.username}></input><br></br>
        <label htmlFor="password"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" 
        required onChange={handleAccountChange} value={accountInfo.password}></input><br></br>
        <button type="submit">Log in</button>
      </form>
      <p><a href='http://localhost:9292/users'>Forgot password?</a></p>
      <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
    </div>
  )
}

export default Login;