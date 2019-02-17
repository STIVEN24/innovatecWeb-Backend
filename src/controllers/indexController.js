class IndexController {

    index(req, res) {
        res.json({ text: 'Index' });
    }
    
}
exports.indexController = new IndexController();