const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const passport = require('passport');

router.get("/", function (req, res) {
    res.render('register/register');
})

router.post("/", function (req, res){
    let { nombre, username, password} = req.body;
    
    // Sanity check
    console.log(nombre);
    console.log(username);
    console.log(password);

    Usuario.register(new Usuario({username: username, nombre: nombre}), password, function(err, user){
        if(err){
            // Regresamos al registro y mostramos el error al usuario.
            //res.render('register/register', {error: err.message})
        } else {
            // Enviamos al login con mensaje de éxito.
            res.render('login/login', {message: '¡Usuario registrado con éxito!'});
        }
    })
})

module.exports = router;