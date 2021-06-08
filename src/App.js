import './App.css';
import getUsers from './utils/API';
import React, { useState, useEffect } from 'react';

function App() {

  const [employees, setEmployees] = useState([]);
  
  useEffect(() => {
    getUsers()
      .then(res => {
        console.log('getUser res: ', res.data.results);
        // will need res.data.results.
        // (name.(first, last), phone, picture.(large,medium, or thumbnail), dob.date, email)
        setEmployees(
          res.data.results,
        );
      })
      .then(console.log('employees: ', employees))
      .catch(err => err ? console.log(err) : console.log('no error thrown to catch!'));
    
  }, [])


  return (
    <div className="App">
      <table>
        <thead>
          <tr className="">
            <th>Profile</th>
            <th>Name</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
            {employees.map(({
              id: { value },
              name: { first, last },
              phone,
              picture: { thumbnail },
              dob: { date },
              email,
            }) => { return <>
              <tr key= {value}>
                <td><img src={thumbnail} alt="Employee Thumbnail"></img></td>
                <td>{first} {last}</td>
                <td>{phone}</td>
                <td>{date}</td>
                <td>{email}</td>
              </tr>
            </>
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
