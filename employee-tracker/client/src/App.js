import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [newSalary, setNewSalary] = useState(0);

  const displayInfo = () => {
    console.log(name + age + country + position + salary);
  }

  const addEmployee = () => {
    axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      salary: salary,
    }).then(() => {
      setEmployeeList([...employeeList, {
        name: name,
        age: age,
        country: country,
        position: position,
        salary: salary,
      }]);
    });
  };

  const updateEmployeeSalary = (id) => {
    axios.put('http://localhost:3001/update', {
      id: id,
      salary: newSalary,
    }).then(() => {
      setEmployeeList(employeeList.map((val) => {
        return val.id == id ? {id: val.id, name: val.name, age: val.age, country: val.country, position: val.position, salary: newSalary} : val;
      }));;
    })
  };

  const getEmployee = () => {
    axios.get('http://localhost:3001/employee').then((response) => {
      setEmployeeList(response.data);
      console.log(response);
    })
  }

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
        return val.id != id;
      }))
    })
  }

  return (
    <div className="App">
      <div className="information">
      <label>Name: </label>
      <input 
        type="text" 
        onChange={(event) => {setName(event.target.value)}}/>
      <label>Age: </label>
      <input 
        type="number" 
        onChange={(event) => {setAge(event.target.value)}}/>
      <label>Country: </label>
      <input 
        type="text" 
        onChange={(event) => {setCountry(event.target.value)}}/>
      <label>Position: </label>
      <input 
        type="text" 
        onChange={(event) => {setPosition(event.target.value)}}/>
      <label>Annual Salary: </label>
      <input 
        type="number" 
        onChange={(event) => {setSalary(event.target.value)}}/>
      <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button className="get-employee" onClick={getEmployee}>Show Employees</button>
        {employeeList.map((val, key) => {
          return <div className="employeeInfo">
            <div>
              <h3>Name: {val.name} </h3>
              <h3>Age: {val.age} </h3>
              <h3>Country: {val.country} </h3>
              <h3>Position: {val.position} </h3>
              <h3>Salary: ${val.salary} </h3>
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Enter New Wage" 
                onChange={(event) => {
                  setNewSalary(event.target.value);
                }}
                ></input>
              <button className="update-button" onClick={() => {
                updateEmployeeSalary(val.id);
              }}>Update</button>
              <button className="delete-button" onClick={() => {deleteEmployee(val.id)}}>Delete</button>
            </div>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
