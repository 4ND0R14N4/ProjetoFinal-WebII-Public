const mysql = require('mysql2');


const credentials = {
  host     : '127.0.0.1',
  user     : 'usuario',
  password : 'teste',
  port     : '3306',
  database : 'hotel',
  multipleStatements: true
}


const connection = mysql.createConnection(credentials);

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;

