module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");
  
    var router = require("express").Router();
  
    // Create Usuario
    router.post("/", usuario.create);
  
    // Listar usuario
    /* retorno: 
      status 200
      {
        "nome": "Bruna",
        "cpf": "12345678910",
        "telefone": "11999995555",
        "senha": "senha",
        "data_nasc": "1997-05-05T03:00:00.000Z",
        "email": "bruninhastucchi@hotmail.com"
      }
      ou
      status 404
      {
        "message": "Usuario nao encontrado com o CPF 1234567891."
      }
    */
    router.get("/:id", usuario.findOne);

    // Update usuario
    router.put("/:id", usuario.update);
  
    // Deletar usuario
    router.delete("/:id", usuario.delete);
  
    // Login do usuario
    /*
      {
        "cpf": "xxxx"
        "senha": "xxxx"
      }
      Retorno:
      {
        "success": true (ou false)
      }
    */
    router.post("/login", usuario.login);

    app.use('/api/usuario', router);
  };