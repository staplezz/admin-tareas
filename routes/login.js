const express = require('express');
const router = express.Router();
const passport = require('passport');

// Petición GET para el login de la aplicación.
router.get('/', function (req, res, next) {
    res.render('login/login', {title: "Noteras", error: req.flash('error') });
});

// Petición POST para el login de la aplicación.
router.post('/', passport.authenticate("local", {
    successRedirect: "/tareas",
    failureRedirect: "/login",
    failureFlash: true,
}), function(req, res){
    
});

module.exports = router;
