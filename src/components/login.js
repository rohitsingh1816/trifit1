import React, { useEffect } from 'react';
import Card from './context';
import axios from 'axios'

function Login() {
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus]     = React.useState('')

  function validate(field, label) {
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }

      if (label == 'email' && email.includes('@') != true) {
        setStatus('Error: ' + 'Invalid email')
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      
      return true;
  }

  function handleLogin() {
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;

    axios.post(`https://nathan-farleybankingbackend.herokuapp.com/user/login?email=${email}&password=${password}`, {}, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      localStorage.setItem('authenticatedUser', email)
      window.location.reload()
    })

    clearForm()
  }    

  function clearForm() {
    setEmail('');
    setPassword('');
  }

  return (
    <div className="bg-primary text-white w-100 min-vh-100 d-flex align-items-center justify-content-center">
    <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={
        localStorage.getItem('authenticatedUser') === '' ?
        <div>
          Email address<br/>
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
          Password<br/>
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
          <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
        </div>
        :
        <div>
          Please logout before logging in to another account.
        </div>
      }
    />
    </div>
  )
}

export default Login;