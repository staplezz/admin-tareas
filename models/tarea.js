const mongoose = require('mongoose');
const usuario = require('./usuario')

let Schema = mongoose.Schema;

let tareaSchema = new Schema({
    // Usuario que creó la tarea.
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario que crea la tarea es necesario']
    },
    // La tarea en sí.
    tarea: {
        type: String,
        required: [true, 'Una tarea no puede estar vacía.']
    },
    // Nos dice si está completada o no.
    completada: {
        type: Boolean,
        default: False
    }
},
// Timestamps.
{ timestamps: true }
);

module.exports = mongoose.model('Tarea', tareaSchema);