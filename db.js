var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'usuario',
  password : 'teste',
  port     : '3306',
  database : 'hotel'
});

class Db{
  constructor(){
    this.mysql      = require('mysql');
    this.connection = this.createconn()
  }
  
  createconn(){
    this.mysql.createConnection({
      host     : '127.0.0.1',
      user     : 'usuario',
      password : 'teste',
      port     : '3306',
      database : 'hotel'
    })
  }
  insert(s){
    connection.connect();
    return new Promise(function(resolve, reject){
      connection.query(s, function(err, result, fields) {
        if (err) throw err;
        resolve({"success": result.affectedRows == 1})
      });
      connection.end();
    })
  }

  select(s){
    connection.connect();
    return new Promise(function(resolve, reject){
      connection.query(s, function(err, result, fields) {
        if (err) throw err;
        resolve(result)
      });
      connection.end();
    })
  }

  update(s){
    connection.connect();
    return new Promise(function(resolve, reject){
      connection.query(s, function(err, result, fields) {
        if (err) throw err;
        resolve({"success": result.affectedRows >= 1})
      });
      connection.end();
    })
  }

  delete(s){
    connection.connect();
    return new Promise(function(resolve, reject){
      connection.query(s, function(err, result, fields) {
        if (err) throw err;
        resolve({"success": result.affectedRows >= 1})
      });
      connection.end();
    })
  }
}



module.exports = Db;

