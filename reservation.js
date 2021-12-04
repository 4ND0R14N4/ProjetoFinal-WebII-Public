const Db = require('./db')

const Usuario = require('usuario')
const u = new Usuario()

class Reservation{
    constructor(){
        this.db = new Db()
    }

    create(cpf, n_quarto){
        // checar se id de usuario existe

        // u.read(id_usu).then(function(result){
        //     res.status(200).json(result)
        //   })
        // checar se numero do quarto existe
        // fazer a reserva
        return this.db.insert('INSERT INTO usuario(nome, cpf, email, telefone, senha, data_nasc) VALUES("'+ nome +'", "'+ cpf +'", "'+ email +'", "'+ telefone +'", "'+ senha +'", "'+ data_nasc +'")')
    }

    read(){
        return this.db.select('SELECT * FROM usuario WHERE cpf="'+cpf+'"')
    }

    update(){
        return this.db.update('UPDATE usuario SET nome="'+ nome +'", email="'+ email +'", telefone="'+ telefone +'", senha="'+ senha +'", data_nasc="'+ data_nasc +'" WHERE cpf="'+ cpf +'"')
    }

    delete(){
        return this.db.delete('DELETE FROM usuario WHERE cpf="'+ cpf +'"')
    }
}

module.exports = Reservation;