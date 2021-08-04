var express = require('express');
var router = express.Router();
const isLoggedIn = require('./helper');

// Modulos del controlador de tareas.
var tarea_controller = require('../controller/tareaController');

/* Obtiene todas las tareas del usuario. */
router.get('/', isLoggedIn, async function(req, res, next) {
    tareas = await tarea_controller.get_tareas(req, res);

    // Nombre del usuario.
    nombreUser = req.user.nombre;
    
    res.render('notera/tasks', { title: 'Noteras: Mis tareas', tareas, nombreUser});
});

/* petición POST para insertar una tarea del usuario. */
router.post('/insertaTarea', isLoggedIn, tarea_controller.inserta_tarea);

/* petición GET para obtener todas las tareas del usuario. */
router.get('/obtenerTareas', isLoggedIn, tarea_controller.get_tareas);

/* petición POST para eliminar una tarea del usuario. */
router.post('/borrar/:tarea_id', isLoggedIn, tarea_controller.elimina_tarea);

module.exports = router;
