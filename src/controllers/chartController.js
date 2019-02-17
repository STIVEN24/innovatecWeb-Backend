const mongoose = require('mongoose');

const database = require('../db/database_mongoDB');

const Chart = require('../models/chart/Solares');

class ChartController {

    async getOne(req, res) {

        const { id } = req.params;
        const query = `SELECT * FROM ${id.toLowerCase()} `;
        try {
            const result = await client.query(query);
            if (result.rows.length > 0) {
                return res.json(result.rows)
            }
        } catch (err) {
            res.status(404).json({ text: `Fecha elegida no tiene datos almacenados - ` + err });
        }
    }


    async read(req, res) {

        await Chart.findOne({ nombre: 'd14m9a2018' }, (error, chart) => {
            if (error) {
                console.log(error);
            } else {
                return res.status(200).json(chart);
            }
        })

    }

}
exports.chartController = new ChartController();