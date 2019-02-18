class IndexController {

    index(req, res) {
        res.json(
            { text: 'Index' },
            { "API's": [
                "/api/tiposDocumento",
                "/api/usuarios",
                "/api/roles",
                "/api/chart",
                ]
            }
        );
    }

}
exports.indexController = new IndexController();