const client = require('../db/database');

class RolesController {

    async getOne(req, res) {

        const { id } = req.params;
        const query = "SELECT * FROM rol WHERE id_rol = " + [id];
        const user = await client.query(query);
        if (user.rows.length > 0) {
            return res.json(user.rows[0])
        }
        res.status(404).json({ text: 'Rol no existe' });

    }

    async create(req, res) {

        // --- Authentication --- //
        const { nombre_rol } = req.body;

        if (nombre_rol) {

            const queryNombre = `SELECT * FROM rol WHERE nombre_rol = '${nombre_rol.toLowerCase()}' `; // --- Query nombre --- //

            const resultNombre = await client.query(queryNombre); // --- Result nombre --- //

            const ObjectsExist = []; // --- List for errors --- //

            if (resultNombre.rows.length > 0) { res.status(403).json({ text: 'Rol ya existe' }) } // --- Pushing to list of errors --- //
            else { // --- Already --- //
                const queryNombre = `INSERT INTO rol( nombre_rol ) VALUES( '${nombre_rol.toLowerCase()}' )`;
                await client.query(queryNombre);
                res.status(200).json({ text: 'Rol registrado' });
            }

        } else { return res.status(403).json({ text: 'Solicitud incompleta' }); } // --- Some Fields empty --- //

    }

    async read(req, res) {

        const query = 'SELECT * FROM rol';
        const users = await client.query(query);
        if (users.rows.length > 0) {
            return res.json(users.rows);
        }
        res.status(404).json({ text: 'No hay roles' });

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
exports.rolesController = new RolesController();