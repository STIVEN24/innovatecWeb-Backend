const mongoose = require('mongoose');

const db = "mongodb://solarCTPI:solarCTPI2424@ds337985.mlab.com:37985/innovatec";

mongoose.connect(db, function (err) {
    if (err) {
        console.log("Error! : " + err.stack)
    } else {
        console.log("Connected to database (MongoDB) : innovatec");
    }
});

exports.module = mongoose;