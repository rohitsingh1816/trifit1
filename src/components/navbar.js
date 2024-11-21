import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function NavBar(){
  const [showLogin, setShowLogin] = React.useState(false)
  const [authUser, setAuthUser] = React.useState('')
  const location = useLocation()

  const getAuthenticatedUser = () => {
    return localStorage.getItem('authenticatedUser')
  }

  const logout = () => {
    const email = getAuthenticatedUser()
    axios.post(`https://nathan-farleybankingbackend.herokuapp.com/user/logout?email=${email}`, {}, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      localStorage.setItem('authenticatedUser', '')
      window.location.reload()
    })

  }

  useEffect(() => {
    const email = getAuthenticatedUser()
    if (email) {
      setAuthUser('')
      setShowLogin(false)
    } else {
      setAuthUser(email)
      setShowLogin(true)
    }
  }, [authUser])

  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className={`nav-link ${location.pathname == '/createaccount/' ? 'text-primary' : ''}`} href="#/createaccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${location.pathname == '/deposit/' ? 'text-primary' : ''}`} href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${location.pathname == '/withdraw/' ? 'text-primary' : ''}`} href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${location.pathname == '/transfer/' ? 'text-primary' : ''}`} href="#/transfer/">Transfer</a>
          </li>     
          <li className="nav-item">
            <a className={`nav-link ${location.pathname == '/alldata/' ? 'text-primary' : ''}`} href="#/alldata/">AllData</a>
          </li>  

            <li className="nav-item">
            <a className={`nav-link ${location.pathname == '/login/' ? 'text-primary' : ''}`} href="#/login/">Login</a>
          </li>
          <button onClick={logout}>
            Logout
          </button>
        </ul>

      </div>
    </nav>
    </>
  );
}

export default NavBar