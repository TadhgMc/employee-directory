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
      <header className="App-header">
        <div>
            {employees.map(({
              id: { value },
              name: { first, last },
              phone,
              picture: { thumbnail },
              dob: { date },
              email,
            }) => { return <>
              <ol key= {value}>
                <li>{first} {last}</li>
                <li>{phone}</li>
                <li><img src={thumbnail} alt="Employee Thumbnail"></img></li>
                <li>{date}</li>
                <li>{email}</li>
              </ol>
            </>
            })}
        </div>
      </header>
    </div>
  );
}

export default App;
