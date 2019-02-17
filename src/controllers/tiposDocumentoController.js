const client = require('../db/database');

class TiposDocumentoController {

    async getOne(req, res) {

        const { id } = req.params;
        const query = "SELECT * FROM tipo_documento WHERE id_tipo_documento = " + [id];
        const user = await client.query(query);
        if (user.rows.length > 0) {
            return res.json(user.rows[0])
        }
        res.status(404).json({ text: 'Tipo de documento no existe' });

    }

    async create(req, res) {

        // --- Authentication --- //
        const { nombre_tipo_documento } = req.body;

        if (nombre_tipo_documento) {

            const queryDocumento = `SELECT * FROM tipo_documento WHERE nombre_tipo_documento = '${nombre_tipo_documento.toLowerCase()}' `; // --- Query documento --- //

            const resultDocumento = await client.query(queryDocumento); // --- Result documento --- //

            const ObjectsExist = []; // --- List for errors --- //

            if (resultDocumento.rows.length > 0) { ObjectsExist.push({ text: 'Tipo de documento ya existe' }); } // --- Pushing to list of errors --- //
            if (ObjectsExist.length > 0) { return res.status(403).json(ObjectsExist); } // --- If list have max of 0 --- //
            else { // --- Already --- //
                const queryDocumento = `INSERT INTO tipo_documento( nombre_tipo_documento )
                    VALUES( '${nombre_tipo_documento.toLowerCase()}' )`;
                await client.query(queryDocumento);
                res.status(200).json({ text: 'Tipo de documento registrado' });
            }

        } else { return res.status(403).json({ text: 'Solicitud incompleta' }); } // --- Some Fields empty --- //

    }

    async read(req, res) {

        const query = 'SELECT * FROM tipo_documento';
        const resultTiposDocumento = await client.query(query);
        if (resultTiposDocumento.rows.length > 0) {
            return res.json(resultTiposDocumento.rows);
        }
        res.status(404).json({ text: 'No hay tipos de documento almacenados' });

    }

    async update(req, res) {

        const { id } = req.params;
        const query = {
            text: `
                UPDATE role
                SET name_role = $1
                WHERE id_role = `+ [id],
            values: [
                req.body.name_role
            ]
        }
        try {
            await client.query(query);
            res.json({ text: 'Rol actualizado' })
        } catch (err) {
            res.status(401).json(err.stack)
        }

    }

    async delete(req, res) {

        const { id } = req.params;
        const query = "DELETE FROM role WHERE id_role = " + [id];
        await client.query(query);
        res.json({ text: 'Rol eliminado' });

    }

}
exports.tiposDocumentoController = new TiposDocumentoController();