import React, { useEffect } from 'react'
import Card from "./context";
import axios from 'axios'

const re = /^[0-9\b]+$/;

function Deposit(){
  const [status, setStatus] = React.useState('');
  const [depositAmount, setDepositAmount] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [show, setShow] = React.useState(true);
  const [error, setError] = React.useState('');
  const [balance, setBalance] = React.useState(0);

  useEffect(() => {
    refreshBalance()
  })

  const getAuthenticatedUser = () => {
    return localStorage.getItem('authenticatedUser')
  }

  const handleOnChangeDepositAmount = (e) => {
    if (e.nativeEvent.data == '-') {
      alert('You can only enter in positive numbers');
      return;
    }

    if (e.target.value === '' || re.test(e.target.value)) {
      setDepositAmount(e.target.value);
    } else {
      alert('You can only enter in numbers');
    }
  }

  const handleOnPressDeposit = async () => {
    const email = await getAuthenticatedUser()
    try {
      await axios.post(`https://nathan-farleybankingbackend.herokuapp.com/bank/deposit?email=${email}&depositAmount=${depositAmount}`, {}, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      await refreshBalance()
      setSuccess(true);
    } catch(error) {
      setError('Transaction error');
      setSuccess(false);
    }
  }

  const refreshBalance = async () => {
    const email = await getAuthenticatedUser()
    if (email) {
      await axios.get(`https://nathan-farleybankingbackend.herokuapp.com/bank/balance?email=${email}`, {}, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }).then(response => {
        setBalance(response.data.balance)
      }).catch(err => {
      })
    }
  }

  return (
    <div className="bg-primary text-white w-100 min-vh-100 d-flex align-items-center justify-content-center">
    <Card
      bgcolor="primary"
      header="Deposit"
      status={status}
      body={
        <div> 
       <p>Amount</p>
      <input type='input' className='form-control' id='amount' value={depositAmount} onChange={event => handleOnChangeDepositAmount(event)} placeholder='Deposit Amount' />
      <br />

      <button onClick={handleOnPressDeposit} disabled={depositAmount.toString().length == 0} type="submit" className="btn btn-light">Deposit</button>
      <br />
      {success  == true ? <p>Success! Balance Updated</p> : <p>{error}</p>}
      <div>Balance: {balance}</div>
    </div>
      }
    />
        </div>
  )
}

export default Deposit;
