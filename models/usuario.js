const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria'],
    },
});

// elimina la key password del objeto que retorna al momento de crear un usuario
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('Usuario', usuarioSchema);