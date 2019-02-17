const mongoose = require('mongoose');

const Schema = mongoose.Schema
const solaresSchema = new Schema({
    nombre : String,
    valores : [
        {fecha_hora : String, voltaje : Number, irradiancia : Number }
    ]
});

module.exports = mongoose.model('solares', solaresSchema, 'solares');