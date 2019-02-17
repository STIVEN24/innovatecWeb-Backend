const express = require('express');

const { usuariosController } = require('../controllers/usuariosController');

class UsuariosRoutes {

    constructor() {
        this.router = express.Router();
        this.config();
    }

    config() {
        this.router.post('/logIn', usuariosController.logIn);
        this.router.post('/', usuariosController.signUp);
        this.router.get('/', usuariosController.read);
        this.router.get('/:id', usuariosController.getOne);
        this.router.put('/:id', usuariosController.update);
        this.router.delete('/:id', usuariosController.delete);
    }

}

const usuariosRoutes = new UsuariosRoutes();
module.exports = usuariosRoutes.router;