const express = require('express')
const app = express()
const port = 3000
const path = require('path');

const { ppid } = require('process');

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 


const Usuario = require('./usuario')


app.get('/', (req, res) => {
  //res.render('home')
})

// Usuario Endpoints
app.post('/usuario/add', (req, res) => {
  const data = req.body
  const nome = data["nome"]
  const cpf = data["cpf"]
  const email  = data["email"]
  const telefone = data["telefone"]
  const senha = data["senha"]
  const data_nasc = data["data_nasc"]
  const u = new Usuario()
  u.create(nome, cpf, email, telefone, senha, data_nasc).then(function(result){
    res.status(200).json(result)
  })
  console.log("bateu")
})

app.get('/usuario/read', (req, res) => {
  const data = req.body
  const cpf = data["cpf"]
  const u = new Usuario()
  u.read(cpf).then(function(result){
    res.status(200).json(result)
  })
})

app.put('/usuario/update', (req, res) => {
  const data = req.body
  const nome = data["nome"]
  const cpf = data["cpf"]
  const email  = data["email"]
  const telefone = data["telefone"]
  const senha = data["senha"]
  const data_nasc = data["data_nasc"]
  const u = new Usuario()
  u.update(nome, cpf, email, telefone, senha, data_nasc).then(function(result){
    res.status(200).json(result)
  })
})

app.delete('/usuario/delete', (req, res) => {
  const data = req.body
  const cpf = data["cpf"]
  const u = new Usuario()
  u.delete(cpf).then(function(result){
    res.status(200).json(result)
  })
})

// /usuario/login --  POST
// parametros:
//    cpf
//    senha
//    -> retorno {} ou {"lista com todas as reservas com os dados fornecidos"}



// Reservation Endpoints

// /reserva/add  -- POST
//  parametros:
//    - cpf
//    - n_quarto (numero do quarto)
//  -> retorno {"success": true} (ou false)

// /reserva/read  --  GET
//  parametros:
//    cpf
//    -> retorno {} ou {"lista com todas as reservas com os dados fornecidos"}

// /reserva/update  --  PUT
//  parametros:
//    cpf
//    n_quarto
//    data_checkin
//    data_checkout
//  -> retorno {"success": true} (ou false)

// /reserva/delete  --  DELETE
//  parametros:
//    cpf
//    n_quarto
//  -> retorno {"success": true} (ou false)

//  /reserva/checkout --  POST
//  parametros:
//    cpf
//    n_quarto
//  -> retorno: {"success": true, "valor_a_pagar": (numero com o total a pagar)} ou {"success": false} em caso de erro

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



/*
+-----------------+---------+------+-----+---------+-------+
| Field           | Type    | Null | Key | Default | Extra |
+-----------------+---------+------+-----+---------+-------+
| numero          | int     | YES  |     | NULL    |       |
| valor           | double  | YES  |     | NULL    |       |
| disponibilidade | tinyint | YES  |     | 1       |       |
+-----------------+---------+------+-----+---------+-------+

+-----------+--------------+------+-----+---------+-------+
| Field     | Type         | Null | Key | Default | Extra |
+-----------+--------------+------+-----+---------+-------+
| nome      | varchar(255) | YES  |     | NULL    |       |
| cpf       | varchar(11)  | YES  |     | NULL    |       |
| telefone  | varchar(13)  | YES  |     | NULL    |       |
| senha     | varchar(20)  | YES  |     | NULL    |       |
| data_nasc | date         | YES  |     | NULL    |       |
| email     | varchar(30)  | YES  |     | NULL    |       |
+-----------+--------------+------+-----+---------+-------+

tabela reservas


Reserva
- [ ] id_usuario (F) -> Usuario.cpf  // varchar(11)
- [ ] id_quarto (F) -> Quarto.numero // int 
- [ ] data_checkin // date
- [ ] data_checkout // date

*/