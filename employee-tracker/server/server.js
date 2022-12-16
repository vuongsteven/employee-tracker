const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require ('cors');
const { response } = require('express');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employeeSystem',
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.age;
    const position = req.body.position;
    const salary = req.body.salary;

    db.query("INSERT INTO employees (name, age, country, position, salary) VALUES (?,?,?,?,?)", 
    [name, age, country, position, salary],
    (error, result) => {
        if(error) {
            console.log(error);
        }else {
            res.send("Value inserted");
        }
    }
    );
});

app.get('/employee', (req, res) => {
    db.query("SELECT * FROM employees", 
    (error, result) => {
        if(error) {
            console.log(error);
        }else {
            res.send(result);
        }
    });
});

// app.delete('/employee/:id', (req, res) => {
//     const id = req.params.id;
//     db.query('DELETE FROM employees WHERE id = ?', id, (error, result) => {
//         if(error) {
//             console.log(error);
//         }else {
//             res.send('User with ${id} has been deleted');
//         }
//     });
// });

app.put('/update', (req, res) => {
    const id = req.body.id;
    const salary = req.body.salary;
    db.query("UPDATE employees SET salary = ? WHERE id = ?", [salary, id], (error, result) => {
        if(error) {
            console.log(error);
        }else {
            res.send(result);
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id; //id in parameters
    db.query("DELETE FROM employees WHERE id = ?", id, (error, result) => {
        if(error) {
            console.log(error);
        }else {
            res.send(result);
        }
    })

})

app.listen(3001, () => {
    console.log("server is working on 3001");
});