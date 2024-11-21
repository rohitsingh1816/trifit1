import React, { useEffect } from 'react';
import { UserContext } from './context';
import axios from 'axios'

function AllData(){
  const [users, setUsers] = React.useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    await axios.get(`https://nathan-farleybankingbackend.herokuapp.com/bank/users`, {}, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setUsers(response.data.users)
    })
  }

  return (
    <div className="bg-primary text-white w-100 min-vh-100 d-flex flex-column align-items-center justify-content-start">
      <h5>All Data in Store</h5>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((obj, index) => {
              return (
                <tr key={obj.email}>
                  <th scope="row">{index+1}</th>
                  <td>{obj.email}</td>
                  <td>{obj.name}</td>
                  <td>{obj.password}</td>
                  <td>{obj.role}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}


export default AllData;