import './App.css';
import getUsers from './utils/API';
import React, { useState, useEffect } from 'react';

function App() {

  const columnNames = ["Profile","Name","Phone","DOB","Email"];
  const [employees, setEmployees] = useState([]);
  const [sortedEmployees, setSortedEmployees] = useState([]);
  
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

  const handleSort = (name) => {
    if (name === 'Name') {
      const sortedemployees = employees.sort(function (a, b) {
          var nameA = a.name.first;
          var nameB = b.name.first;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
      });
      setSortedEmployees({ sortedEmployees: sortedemployees });
    } else {
      console.log("Sorry, I can't sort by that yet!");
    }
  }

  return (
    <div className="App">
      <table>
        <thead>
          
          <tr className="">
            {columnNames.map((name) => <th key={name} onClick={() => handleSort(name)} >{name}</th>)}
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
