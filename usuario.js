const Db = require('./db')

class Usuario{
    constructor(){
        this.db = new Db()
    }

    create(nome, cpf, email, telefone, senha, data_nasc){
        return this.db.insert('INSERT INTO usuario(nome, cpf, email, telefone, senha, data_nasc) VALUES("'+ nome +'", "'+ cpf +'", "'+ email +'", "'+ telefone +'", "'+ senha +'", "'+ data_nasc +'")')
    }

    read(cpf){
        return this.db.select('SELECT * FROM usuario WHERE cpf="'+cpf+'"')
    }

    update(nome, cpf, email, telefone, senha, data_nasc){
        return this.db.update('UPDATE usuario SET nome="'+ nome +'", email="'+ email +'", telefone="'+ telefone +'", senha="'+ senha +'", data_nasc="'+ data_nasc +'" WHERE cpf="'+ cpf +'"')
    }

    delete(cpf){
        return this.db.delete('DELETE FROM usuario WHERE cpf="'+ cpf +'"')
    }
}

module.exports = Usuario;