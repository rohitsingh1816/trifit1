import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Routes } from 'react-router-dom'

import NavBar from './components/navbar';
import { UserContext } from './components/context';
import Home from './components/home';
import CreateAccount from './components/createaccount';
import Login from './components/login';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import AllData from './components/alldata';
import Transfer from './components/transfer';

function Spa() {
  return (
    <div className='w-100 h-100'>
      <NavBar/>
      <div className="w-100 h-100">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path='/login/' element={<Login />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/deposit/" element={<Deposit />} />
          <Route path='/transfer/' element={<Transfer />} />
          <Route path="/withdraw/" element={<Withdraw />} />
          <Route exact path="/alldata" element={<AllData />} /> 
          </Routes>
        </div>
      </div> 
  );
}

ReactDOM.render(
  <HashRouter basename='/'>
  <Spa/>
  </HashRouter>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();