const Reserva = require("../models/reserva.js");


exports.checkin = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Conteudo nao pode ser vazio!"
        });
    }
    const data = req.body

    const reserva = new Reserva({
        usuarioId: data["cpf"],
        quartoId: data["quartoId"],
        data_checkin: data["data_checkin"],
        data_checkout: data["data_checkout"]
    });

    Reserva.create(reserva, (err, data) => {
        if (err){
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
        }else{
            //enviar os dados de volta
            res.send(data);
        } 
    });


};


exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Conteudo nao pode ser vazio"
        });
    }

    Reserva.updateById(
    req.params.id,
    new Reserva(req.body),
    (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Reserva nao encontrada com o ID ${req.params.id}.`
            });
        } else {
            res.status(500).send({
            message: "Erro ao atualizar reserva com o ID " + req.params.id
            });
        }
        } else res.send(data);
    }
    );
};

exports.checkout = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Conteudo nao pode ser vazio!"
        });
    }
    const data = req.body

    Reserva.checkout(data["quartoId"], data["id"], (err, data) => {
        if (err){
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
        }else{
            //enviar os dados de volta
            res.send(data);
        } 
    });
};

exports.checkTotal = (req, res) => {

    Reserva.checkTotal(req.params.id, (err, data) => {
        if (err){
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
        }else{
            //enviar os dados de volta
            res.send(data);
        } 
    });
}


