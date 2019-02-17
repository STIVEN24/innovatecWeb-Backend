const express = require('express');

const { tiposDocumentoController } = require('../controllers/tiposDocumentoController');

class TiposDocumentoRoutes {

    constructor() {
        this.router = express.Router();
        this.config();
    }

    config() {
        this.router.post('/', tiposDocumentoController.create);
        this.router.get('/', tiposDocumentoController.read);
        this.router.get('/:id', tiposDocumentoController.getOne);
        this.router.put('/:id', tiposDocumentoController.update);
        this.router.delete('/:id', tiposDocumentoController.delete);
    }

}

const tiposDocumentoRoutes = new TiposDocumentoRoutes();
module.exports = tiposDocumentoRoutes.router;