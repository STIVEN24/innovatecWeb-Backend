const express = require('express');

const { indexController } = require('../controllers/indexController');

class IndexRoutes {

    constructor() {
        this.router = express.Router();
        this.config();
    }

    config() {
        this.router.get('/', indexController.index);
    }

}

const indexRoutes = new IndexRoutes();
module.exports = indexRoutes.router;