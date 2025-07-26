const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'aditya_app',
  password:"Aditya@3431"
});

let query=`
INSERT INTO user
VALUES
?;
`
let selectQ="SELECT * FROM user"
let users=[
  ["3","aditya69","adityaydaw42@gmail.com","aditya@3431"],
  ["4","prince3431","prince@gmail.com","prince@3431"],
  ["5","kishan7813","kishan@gmail.com","kishan@3431"],
  ["6","ashihskr","ashish@gmail.com","ashishkr@3431"]
]
try {
  connection.query(selectQ,[users],(err,results)=>{
    if(err) throw err;
    results.forEach((e)=>{
      console.log(e);
    }) 
    console.log(results.length);
    
  })
 
} catch (error) {
  console.log(error);
}

connection.end()













// let getRandomUser=()=> {
//     return {
//       Id: faker.string.uuid(),
//       username: faker.internet.username(),
//       email: faker.internet.email(),
//       password: faker.internet.password(),
      
//     };
// }

// console.log(getRandomUser());
