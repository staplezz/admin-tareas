const Tarea = require('../models/tarea');

// Obtiene todas las tareas del usuario.
exports.get_tareas = async function(req, res) {
    try {
        tareas = await Tarea.find({usuario: req.user._id}).lean();
        res.json(tareas);
    } catch (error) {
        res.send(error);
    }
    
}

// Inserta una tarea del usuario.
exports.inserta_tarea = async function(req, res) {
    try {
        await Tarea.create({
            usuario: req.user._id,
            tarea:req.body.tarea,
        });
    } catch(err) {
        res.send(error);
        console.log(err);
    }
    console.log('Tarea insertada en BDD');
}

// Elimina una tarea del usuario.
exports.elimina_tarea = function(req, res) {
    try {
        Tarea.findByIdAndDelete(req.body.tarea_id);
        res.send({
            removed: true
        })
    } catch(err) {
        res.send(err);
    }
}

// Edita una tarea del usuario.
exports.edita_tarea = function(req, res) {
    try {
        Tarea.findByIdAndUpdate(req.body.tarea_id, {tarea: req.body.tarea, estado: req.body.estado});
        res.send({
            updated: true
        })
    } catch(err) {
        res.send(err);
    }
}

// Actualiza el estado de una tarea del usuario.
exports.actualiza_estado_tarea = function(req, res) {
    try {
        Tarea.findByIdAndUpdate(req.body.tarea_id, {estado: req.body.estado});
        res.send({
            updated: true
        })
    } catch(err) {
        res.send(err)
    }
}
