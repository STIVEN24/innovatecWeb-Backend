const { Client } = require('pg');

const { database } = require('./keys');

const client = new Client(database);

client.connect(
    (err) => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected to database (PostgreSQL) : '+database.database)
        }
});

module.exports = client;