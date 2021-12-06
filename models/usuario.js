const sql = require("../db.js");

const Usuario = function(usuario) {
    this.nome = usuario.nome
    this.cpf = usuario.cpf
    this.email = usuario.email
    this.telefone = usuario.telefone
    this.senha = usuario.senha
    this.data_nasc = usuario.data_nasc
}

Usuario.create = (newUsuario, result) => {
    sql.query("INSERT INTO usuario SET ?", newUsuario, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("created usuario: ", { id: res.insertId, ...newUsuario });
        result(null, { id: res.insertId, ...newUsuario });
      });
}

Usuario.findById = (id, result) => {
  sql.query(`SELECT * FROM usuario WHERE cpf = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("usuario encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};


Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE usuario SET nome = ?, email = ?, telefone = ?, senha = ?, data_nasc = ? WHERE cpf = ?",
    [usuario.nome, usuario.email, usuario.telefone, usuario.senha, usuario.data_nasc, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("usuario atualizado: ", usuario);
      result(null, usuario);
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuario WHERE cpf = ?", id, (err, res) => {
    if (err) {
      console.log("erro: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Usuario deletado com o CPF: ", id);
    result(null, res);
  });
};

Usuario.login = (id, senha, result) => {
  sql.query(`SELECT * FROM usuario WHERE cpf = "${id}" and senha = "${senha}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(res)
    if (res.length) {
      console.log("usuario encontrado: ", res[0]);
      result(null, { "success": true, ...res[0] });
      return;
    }

    result(null, { "success": false });
  
  });
}

module.exports = Usuario