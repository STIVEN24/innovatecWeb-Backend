class IndexController {

    index(req, res) {
        res.json(
            [
                { text: 'Index' },
                {
                    APIs: [
                        "/api/tiposDocumento",
                        "/api/usuarios",
                        "/api/roles",
                        "/api/chart",
                    ]
                }
            ]
        );
    }

}
exports.indexController = new IndexController();