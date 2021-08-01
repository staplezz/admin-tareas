const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

router.post('/', function (req, res) {
    let body = req.body;

    let { nombre, email, password} = body;

    let usuario = new Usuario({
        nombre,
        email,
        password: bcrypt.hashSync(password, 10)
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                err
            });
        } 
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});

module.exports = router;