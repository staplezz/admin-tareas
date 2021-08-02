const express = require('express');
const router = express.Router();

// Logout de la aplicación.
router.get('/', function (req, res, next) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;