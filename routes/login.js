const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// Petición GET para el login de la aplicación.
router.get('/', function (req, res, next) {
    res.render('login/login', { title: 'Noteras - Login' });
});

// Petición POST para el login de la aplicación.
router.post('/', function (req, res) {
    let body = req.body;
    console.log("Email: ", body.email);
    console.log("Password: ", body.password);

    Usuario.findOne({ email: body.email }, async (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                err: err
            })
        }

        // Verifica que exista un usuario con el mail escrita por el usuario.
        if (!usuarioDB) {
            return res.status(400).json({
                err: {
                    message: "Usuario o contraseña incorrectos."
                }
            })
        }

        // Valida que la contraseña escrita por el usuario sea la almacenada en la BDD.
        const passwordIsEqual = await bcrypt.compare(body.password, usuarioDB.password)

        if(!passwordIsEqual) {
            return res.status(400).json({
                message: "Usuario o contraseña incorrectos"
            })
        }

        // Genera el token de autenticación
        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.JWT_KEY, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        })

        res.json({
            usuario: usuarioDB,
            token,
        })
    })
    res.render('index', { title: 'Inicio de sesión exitoso!' });

});

module.exports = router;
