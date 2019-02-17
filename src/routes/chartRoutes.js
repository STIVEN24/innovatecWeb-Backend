const express = require('express');

const { chartController } = require('../controllers/chartController');

class ChartRoutes {

    constructor() {
        this.router = express.Router();
        this.config();
    }

    config() {
        this.router.get('/:id', chartController.getOne);
        this.router.get('/', chartController.read);
    }

}

const chartRoutes = new ChartRoutes();
module.exports = chartRoutes.router;