//npm install --save mysql2
//node helpers/dbHelper.js

const mysql = require ('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123qwezxc@KOV123",
    database: 'course_aqa_hillel'
})

connection.connect(function(err){
    if(err) {
        console.error('error during connection to DB' + err.message)
        }else {
            console.log('Success connection!!!!')

        }

})

//create DB
// connection.query('CREATE DATABASE course_aqa_hillel',
// function(err) {
//     if(err) console.error(err.message)
//     else console.log('DB created!!')
// })

//create table
// connection.query(`CREATE TABLE Persons (
//     id int primary key auto_increment,
//     name varchar(255) not null,
//     last_name varchar(255) not null,
//     age int(5) not null
// )`, function(err) {
//     if(err) console.error(err.message)
//     else console.log('Table created')
// })

//create table2
// connection.query(`CREATE TABLE Persons2 (
//     PersonID int primary key auto_increment,
//     LastName varchar(255),
//     FirstName varchar(255),
//     Address varchar(255),
//     City varchar(255)
// )`, function(err) {
//     if(err) console.error(err.message)
//     else console.log('Table created')
// })


connection.query(`INSERT INTO Persons2(LastName, FirstName) VALUES('KKKKK', 'DDD')`, function(err) {
    if(err) console.error(err.message)
    else console.log('data added')
})

connection.query('SELECT * FROM Persons2',
function(err, results) {
    if(err) console.error(err.message)
    else console.log(results)
})


//in the end need to close connection
connection.end()