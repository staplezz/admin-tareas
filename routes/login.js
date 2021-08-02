const express = require('express');
const router = express.Router();
const passport = require('passport');

// Petición GET para el login de la aplicación.
router.get('/', function (req, res, next) {
    // Obtenemos el error si es que hay.
    error = req.flash('error');

    if (error.length === 0) {
        message = {
            show: false
        }
        res.render('login/login', {title: "Noteras",
                                message: message});
    } else {
        message = {
            show: true,
            isError: true,
            error: error
        }
        res.render('login/login', {title: "Noteras",
                                message: message});
    }
});

// Petición POST para el login de la aplicación.
router.post('/', passport.authenticate("local", {
    successRedirect: "/tareas",
    failureRedirect: "/login",
    failureFlash: true,
}), function(req, res){
    
});

module.exports = router;
