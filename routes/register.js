const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

router.get("/", function (req, res) {
    error = {
        show: false
    }
    res.render('register/register', {error: error});
})

router.post("/", function (req, res){
    let { nombre, username, password} = req.body;

    Usuario.register(new Usuario({username: username, nombre: nombre}), password, function(err, user){
        if(err){
            // Regresamos al registro y mostramos el error al usuario.
            err.show = true;
            res.render('register/register', {error: err})
        } else {
            // Enviamos al login con mensaje de éxito.
            message = {
                show: true,
                isError: false,
                message: '¡Usuario registrado con éxito!'
            }

            res.render('login/login', { message });
        }
    })
})

module.exports = router;