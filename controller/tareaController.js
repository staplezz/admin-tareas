const Tarea = require('../models/tarea');

// Obtiene todas las tareas del usuario.
exports.get_tareas = async function(req, res) {
    try {
        tareas = await Tarea.find({usuario: req.user._id}).lean();
        return tareas;
    } catch (error) {
        return error;
    }
    
}

// Inserta una tarea del usuario.
exports.inserta_tarea = async function(req, res) {
    try {
        await Tarea.create({
            usuario: req.user._id,
            tarea:req.body.tarea,
        });
        res.redirect('/tareas');
    } catch(err) {
        res.send(error);
        console.log(err);
    }
}

// Elimina una tarea del usuario.
exports.elimina_tarea = function(req, res) {
    Tarea.findByIdAndDelete(req.params.tarea_id, (error, data) => {
        if(error){
            throw error;
        } else {
            res.redirect('/tareas');
        }
    });
}

// Edita una tarea del usuario.
exports.edita_tarea = function(req, res) {
    Tarea.findByIdAndUpdate(req.params.tarea_id, {tarea: req.body.tarea}, {useFindAndModify: false}, (error, data) => {
        if(error) {
            throw error;
        } else {
            res.redirect('/tareas');
        }
    });
}

// Actualiza el estado de una tarea del usuario.
exports.actualiza_estado_tarea = function(req, res) {
    Tarea.findByIdAndUpdate(req.params.tarea_id, {completada: req.body.checked}, {useFindAndModify: false}, (error, data) => {
        if(error) {
            throw error;
        } else {
            res.redirect('/tareas');
        }
    });
}
