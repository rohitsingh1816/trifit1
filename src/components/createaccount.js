import axios from 'axios';
import React, { useEffect } from 'react';
import Card from './context';
import { UserContext } from './context';

function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole]         = React.useState('')
  const ctx = React.useContext(UserContext);  

  function validate(field, label) {
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''), 3000);
        return false;
      }

      if (label == 'password' && password.length < 8) {
        setStatus('Error: ' + 'Password is too short');
        setTimeout(() => setStatus(''), 3000);
        return false;
      }

      if (label == 'email' && email.includes('@') != true) {
        setStatus('Error: ' + 'Invalid email');
        setTimeout(() => setStatus(''), 3000);
        return false;
      }

      if (label == 'role' && (role != 'customer' && role != 'employee')) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''), 3000);
        return false;
      }
      
      return true;
  }

  function handleCreate() {
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    if (!validate(role,     'role'))     return;
    
    axios.post(`https://nathan-farleybankingbackend.herokuapp.com/user/create?email=${email}&password=${password}&name=${name}&role=${role}`, {}, { 
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        } 
    }).then(response => console.log(response)) 

    setShow(false);
  }    

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setRole('')
    setShow(true);
  }

  return (
    <div className="bg-primary text-white w-100 min-vh-100 d-flex align-items-center justify-content-center">
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        (  
          <>
            Name<br/>
            <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
            Email address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
            Password<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
            Role<br/>
            <input type="input" className="form-control" id="role" placeholder="Role" value={role} onChange={e => setRole(e.currentTarget.value)}/><br/>
            <button type="submit" className="btn btn-light" onClick={handleCreate}>Submit</button>
            </>
            )
            :
            (
            <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
            </>
          )
      }
    />
        </div>
  )
}

export default CreateAccount;