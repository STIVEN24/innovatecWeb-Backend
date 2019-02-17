const express = require('express'); // import the express framework | importación del framework express
const morgan = require('morgan'); // import morgan | importación de morgan
const cors = require('cors'); // import cors | importación cors

// --- routes --- //
const indexRoutes = require('./routes/indexRoutes.'),
    usuariosRoutes = require('./routes/usuariosRoutes'),
    rolesRoutes = require('./routes/rolesRoutes'),
    chartRoutes = require('./routes/chartRoutes'),
    tiposDocumentoRoutes = require('./routes/tiposDocumentoRoutes');

class Server { // server class to initialize the server | clase Server para inicializar el servidor

    constructor() { // constructor
        this.app = express(); // initialize express | inicializar express
        this.config(); // initialize method | inicializar método
        this.routes(); // initialize method | inicializar método
    }

    config() { // method config
        this.app.set('port', process.env.PORT || 3000); // setting port | ajustando puerto
        this.app.use(morgan('dev')); // use to show changes in the command line | utilizar morgan para la muestra de cambios en la linea de comando
        this.app.use(cors()); // use cors to the exchanges of source resources crossed | utilizar cors para intercambios de recursos de origen cruzados
        this.app.use(express.json()); // use json for accept format json y save
        this.app.use(express.urlencoded({extended : false}));
    }

    routes() { // method routes
        this.app.use('/', indexRoutes);
        this.app.use('/api/tiposDocumento', tiposDocumentoRoutes);
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/roles', rolesRoutes);
        this.app.use('/api/chart', chartRoutes);
    }

    start() { // method start to execute the listen | método start para ejecutar el listen
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port')); // show port
        });
    }

}

const server = new Server(); // instantiate server class | instanciar la clase server
server.start(); // initialize start from server | inicializar el método start desde la clase server