var express = require('express');
var router = express.Router();
const isLoggedIn = require('./helper');

/* GET single task. */
router.get('/', isLoggedIn, function(req, res, next) {
    console.log(req.user);
    res.render('notera/tasks', { title: 'Noteras - Login' });
});

module.exports = router;
