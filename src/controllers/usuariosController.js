const client = require('../db/database');

const jwt = require('jsonwebtoken');
const JWT_Secret = 'eyIyNCI6ImRpYSIsIjE5OTkiOiJhw7FvIiwiMDYiOiJtZXMiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5OTU1ODgxMjMiLCJuYW1lIjoib3J0c2FjIiwiaWF0Ijo5NzY0MzF9.0TZoXWuWZzulNGPY2OJHohDgZH8gVEmVFnglPIRiT5E';

class UsuariosController {

    async getOne(req, res) {

        const { id } = req.params;
        const query = "SELECT * FROM cuenta INNER JOIN rol USING(id_rol) INNER JOIN tipo_documento using(id_tipo_documento) WHERE id_cuenta = " + [id];
        const user = await client.query(query);
        if (user.rows.length > 0) {
            return res.json(user.rows[0])
        }
        res.status(404).json({ text: 'Usuario no existe' });

    }

    async signUp(req, res) {

        // --- Authentication --- //
        const { documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, correo, id_rol, id_tipo_documento } = req.body;

        if (documento && primer_nombre && primer_apellido && correo && id_rol && id_tipo_documento) {

            const queryDocumento = `SELECT * FROM cuenta WHERE documento = '${documento}' `; // --- Query documento --- //
            const queryCorreo = `SELECT * FROM cuenta WHERE correo = '${correo.toLowerCase()}' `; // --- Query correo --- //

            const resultDocumento = await client.query(queryDocumento); // --- Result documento --- //
            const resultCorreo = await client.query(queryCorreo); // --- Result correo --- //

            const ObjectsExist = []; // --- List for errors --- //

            if (resultDocumento.rows.length > 0) { ObjectsExist.push({ text: 'Usuario del documento ya registrado' }); } // --- Pushing to list of errors --- //
            if (resultCorreo.rows.length > 0) { ObjectsExist.push({ text: 'Usuario del correo ya registrado' }); } // --- Pushing to list of errors --- //
            if (ObjectsExist.length > 0) { return res.status(403).json(ObjectsExist); } // --- If list have max of 0 --- //
            else { // --- Registered --- //
                const queryCuenta = `INSERT INTO cuenta( documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, correo, fecha_creacion, id_rol, id_tipo_documento )
                    VALUES( '${documento}', '${primer_nombre.toUpperCase()}', '${segundo_nombre.toUpperCase()}', '${primer_apellido.toUpperCase()}', '${segundo_apellido.toUpperCase()}', '${celular}', '${correo.toLowerCase()}', now(), '${id_rol}', '${id_tipo_documento}' )`;
                await client.query(queryCuenta);
                res.status(200).json({ text: 'Usuario registrado' });
            }

        } else { return res.status(403).json({ text: 'Solicitud incompleta' }); } // --- Some Fields empty --- //

    }

    async read(req, res) {

        const query = 'SELECT * FROM cuenta INNER JOIN rol USING(id_rol) inner join tipo_documento using(id_tipo_documento)';
        const users = await client.query(query);
        if (users.rows.length > 0) {
            return res.json(users.rows);
        }
        res.status(404).json({ text: 'No hay usuarios' });

    }

    async update(req, res) {

        const { documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, correo, id_rol, id_tipo_documento } = req.body,
            { id } = req.params;

        if (documento && primer_nombre && primer_apellido && celular && correo && id_rol && id_tipo_documento) {
            // --- Updated --- //
            const queryCuenta = `UPDATE cuenta SET documento = '${documento}', primer_nombre = '${primer_nombre.toUpperCase()}', segundo_nombre = '${segundo_nombre.toUpperCase()}', primer_apellido = '${primer_apellido.toUpperCase()}', segundo_apellido = '${segundo_apellido.toUpperCase()}', celular = '${celular}', correo = '${correo.toLowerCase()}', id_rol = '${id_rol}', id_tipo_documento = '${id_tipo_documento}' WHERE id_cuenta = '${id}' `;
            await client.query(queryCuenta);
            res.status(200).json({ text: 'Usuario actualizado' });

        } else { return res.status(403).json({ text: 'Solicitud incompleta' }); } // --- Some Fields empty --- //

    }

    async delete(req, res) {

        const { id } = req.params;
        const query = "DELETE FROM cuenta WHERE id_cuenta = " + [id];
        await client.query(query);
        res.status(200).json({ text: 'Usuario eliminado' });

    }

    async logIn(req, res) {

        // --- Authentication --- //
        const { correo, documento } = req.body;

        if (correo && documento) {

            const queryCorreoDocumento = `SELECT * FROM cuenta WHERE documento = '${documento}' and correo = '${correo.toLowerCase()}' `; // --- Query documento and correo --- //

            const resultCorreoDocumento = await client.query(queryCorreoDocumento); // --- Result documento and correo --- //

            if (resultCorreoDocumento.rows.length > 0) {
                const token = jwt.sign( req.body , JWT_Secret );
                return res.status(200).json({ token: token });
            } // --- If list have max of 0 --- //
            else { // --- Not found --- //
                res.status(403).json({ text: 'Usuario no encontrado: Correo o contraseña incorrecto' });
            }

        } else { return res.status(403).json({ text: 'Solicitud incompleta' }); } // --- Some Fields empty --- //

    }

}
exports.usuariosController = new UsuariosController();