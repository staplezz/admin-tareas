var express = require('express');
var router = express.Router();
const isLoggedIn = require('./helper');

// Modulos del controlador de tareas.
var tarea_controller = require('../controller/tareaController');

/* Obtiene todas las tareas del usuario. */
router.get('/', isLoggedIn, function(req, res, next) {
    // Debug for getting user id.
    console.log(req.user._id);
    res.render('notera/tasks', { title: 'Noteras: Mis tareas' });
});

/* petición POST para insertar una tarea del usuario. */
router.post('/insertaTarea', isLoggedIn, tarea_controller.inserta_tarea);

/* petición GET para obtener todas las tareas del usuario. */
router.get('/obtenerTareas', isLoggedIn, tarea_controller.get_tareas);

module.exports = router;
