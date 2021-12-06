module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", usuario.create);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", usuario.findOne);

    // Update a Tutorial with id
    router.put("/:id", usuario.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", usuario.delete);
  
    // Login do usuario
    router.post("/login", usuario.login);

    app.use('/api/usuario', router);
  };