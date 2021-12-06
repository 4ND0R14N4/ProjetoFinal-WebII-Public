const sql = require("../db.js");

const Reserva = function(reserva) {
    this.usuarioId = reserva.usuarioId,
    this.quartoId = reserva.quartoId,
    this.data_checkin = reserva.data_checkin,
    this.data_checkout = reserva.data_checkout
}



Reserva.create = (newReserva, result) => {
    sql.query("INSERT INTO reservas_id SET ?; UPDATE quarto SET disponibilidade = 0 WHERE numero = ?", [newReserva, newReserva.quartoId], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        // created reserva
        console.log("created reserva: ", { id: res[1].insertId, ...newReserva });
        result(null, { id: res[1].insertId, ...newReserva });
      });
};


Reserva.findById = (id, result) => {
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



Reserva.updateById = (id, reserva, result) => {
  sql.query(
    "UPDATE reservas_id SET usuarioId = ?, quartoId = ?, data_checkin = ?, data_checkout = ? WHERE id = ?",
    [reserva.usuarioId, reserva.quartoId, reserva.data_checkin, reserva.data_checkout, id],
    
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

      console.log("usuario atualizado: ", reserva);
      result(null, reserva);
    }
  );
};

Reserva.checkTotal = (id, result) => {
    sql.query(`SELECT x.dias * x.valor as resultado from (SELECT valor, (DATEDIFF(r.data_checkout, r.data_checkin)) as dias from quarto as q JOIN reservas_id as r ON q.numero = r.QuartoID and r.id = ${id}) as x`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("total: ", res[0]);
          result(null, {"success": true, ...res[0]});
          return;
        }
    
        result({ "success": false }, null);
      });
}

Reserva.checkout = (numero_quarto, id, result) => {
  sql.query(`DELETE FROM reservas_id WHERE id = ${id}; UPDATE quarto SET disponibilidade = 1 WHERE numero = ${numero_quarto};`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res[0].affectedRows == 0) {
        result({ "success": false }, null);
        return;
    }

    console.log("Reserva deletada com o ID: ", id);
    result(null, {"success": true});
  
  });
}

module.exports = Reserva