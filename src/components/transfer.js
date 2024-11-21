import React, { useEffect } from 'react'
import Card from "./context";
import axios from 'axios'

const re = /^[0-9\b]+$/;

function Transfer(){
  const [status, setStatus] = React.useState('');
  const [transferAmount, setTransferAmount] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [show, setShow] = React.useState(true);
  const [error, setError] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const [receiver, setReceiver] = React.useState('')

  useEffect(() => {
    refreshBalance()
  })

  const getAuthenticatedUser = () => {
    return localStorage.getItem('authenticatedUser')
  }

  const handleOnChangeTransferAmount = (e) => {
    if (e.nativeEvent.data == '-') {
      alert('You can only enter in positive numbers');
      return;
    }

    if (e.target.value === '' || re.test(e.target.value)) {
      setTransferAmount(e.target.value);
    } else {
      alert('You can only enter in numbers');
    }
  }

  const handleOnPressTransfer = async () => {
    const email = await getAuthenticatedUser()
    try {
      if (!email) {
          throw new Error('Failed')
      }

      await axios.post(`https://nathan-farleybankingbackend.herokuapp.com/bank/transfer?ownerEmail=${email}&recipientEmail=${receiver}&amount=${transferAmount}`, {}, {
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
    if (!email) {
        throw new Error('Failed')
    }

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

  return (
    <div className="bg-primary text-white w-100 min-vh-100 d-flex align-items-center justify-content-center">
    <Card
      bgcolor="primary"
      header="Transfer"
      status={status}
      body={
        <div> 
       <p>Recipient</p>
      <input type='input' className='form-control' id='recipient' value={receiver} onChange={event => setReceiver(event.target.value)} placeholder='Recipient' />
      <br />

      <p>Amount</p>
      <input type='input' className='form-control' id='amount' value={transferAmount} onChange={event => handleOnChangeTransferAmount(event)} placeholder='Transfer Amount' />
      <br />

      <button onClick={handleOnPressTransfer} disabled={transferAmount.toString().length == 0} type="submit" className="btn btn-light">Transfer</button>
      <br />
      {success  == true ? <p>Success! Money transfered and balance updated</p> : <p>{error}</p>}
      <div>Updated Balance: {balance}</div>
    </div>
      }
    />
        </div>
  )
}

export default Transfer;
