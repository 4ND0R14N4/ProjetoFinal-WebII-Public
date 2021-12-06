const Usuario = require("../models/usuario.js");


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Conteudo nao pode ser vazio!"
        });
    }
    const data = req.body
    const nome = data["nome"]
    const cpf = data["cpf"]
    const email  = data["email"]
    const telefone = data["telefone"]
    const senha = data["senha"]
    const data_nasc = data["data_nasc"]
    // Create a Tutorial
    const usuario = new Usuario({
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        senha: senha,
        data_nasc: data_nasc
    });

    // Save Tutorial in the database
    Usuario.create(usuario, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
        else res.send(data);
    });
};


exports.findOne = (req, res) => {
    Usuario.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Usuario nao encontrado com o CPF ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Erro buscando usuario com o CPF " + req.params.id
            });
          }
        } else res.send(data);
      });
};


exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Conteudo nao pode ser vazio"
        });
    }

    console.log(req.body);

    Usuario.updateById(
    req.params.id,
    new Usuario(req.body),
    (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Usuario nao encontrado com o CPF ${req.params.id}.`
            });
        } else {
            res.status(500).send({
            message: "Erro ao atualizar usuario com o CPF " + req.params.id
            });
        }
        } else res.send(data);
    }
    );
};

exports.delete = (req, res) => {
    Usuario.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Usuario nao encontrado com o CPF ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erro ao deletar um usuario com o CPF" + req.params.id
          });
        }
      } else res.send({ message: `Usuario deletado com sucesso` });
    });
  };

exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Conteudo nao pode ser vazio!"
        });
    }
    const data = req.body
    const cpf = data["cpf"]
    const senha = data["senha"]
    
    // Save Tutorial in the database
    Usuario.login(cpf, senha, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
        else res.send(data);
    });
};




