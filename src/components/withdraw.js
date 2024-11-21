import React, { useEffect } from 'react'
import Card from "./context";
import axios from 'axios'

const re = /^[0-9\b]+$/;

function Withdraw(){
  const [status, setStatus] = React.useState('');
  const [withdrawalAmount, setWithdrawalAmount] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [error, setError] = React.useState('');

  useEffect(() => {
    refreshBalance()
  })

  const getAuthenticatedUser = () => {
    return localStorage.getItem('authenticatedUser')
  }

  const handleOnChangeWithdrawAmount = (e) => {
    if (e.nativeEvent.data == '-') {
      alert('You can only enter in positive numbers');
      return ;
    }

    if (e.target.value === '' || re.test(e.target.value)) {
      setWithdrawalAmount(e.target.value);
    } else {
      alert('You can only enter in numbers');
    }
  }

  const handleOnPressWithdraw = async () => {
    if (Number(withdrawalAmount) > Number(balance)) {
      setError('Transaction Failed');
      setSuccess(false);
      return;
    }

    try {
      const email = await getAuthenticatedUser()
      await axios.post(`https://nathan-farleybankingbackend.herokuapp.com/bank/withdraw?email=${email}&withdrawAmount=${withdrawalAmount}`, {}, {
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
      header="Withdraw"
      status={status}
      body={
        <div> 
          Amount<br/>
          <input type='input' className='form-control' id='amount' value={withdrawalAmount} onChange={event => handleOnChangeWithdrawAmount(event)} placeholder='Withdraw Amount' />
      <br />

      <button onClick={handleOnPressWithdraw} disabled={withdrawalAmount.toString().length == 0} type="submit" className="btn btn-light">Withdraw</button>
      <br />
      {success  == true ? <p>Success! Balance Updated</p> : <p>{error}</p>}
        <div>Balance: {balance}</div>
      </div>
      }
    />
        </div>
  )
}

export default Withdraw;
