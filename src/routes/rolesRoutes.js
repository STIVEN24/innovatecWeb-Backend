const express = require('express');

const { rolesController } = require('../controllers/rolesController');

class RolesRoutes {

    constructor() {
        this.router = express.Router();
        this.config();
    }

    config() {
        this.router.post('/', rolesController.create);
        this.router.get('/', rolesController.read);
        this.router.get('/:id', rolesController.getOne);
        this.router.put('/:id', rolesController.update);
        this.router.delete('/:id', rolesController.delete);
    }

}

const rolesRoutes = new RolesRoutes();
module.exports = rolesRoutes.router;