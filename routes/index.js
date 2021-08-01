var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Cualquier otra ruta redirigimos.
router.get('*', (req, res) => {
  res.redirect('/')
})

module.exports = router;