module.exports = app => {
    const reserva = require("../controllers/reserva.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", reserva.checkin);

    router.put("/:id", reserva.update);

    router.delete("/", reserva.checkout);

    router.get("/:id", reserva.checkTotal);

    app.use('/api/reserva', router);
  };