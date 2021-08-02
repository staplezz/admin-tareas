const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require("passport-local-mongoose");
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    username: String,
    password: String,
    nombre: {
        type: String,
        required: true
    }
});

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

var options = {
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Contraseña o correo incorrectos, por favor intente de nuevo.',
        IncorrectUsernameError: 'Contraseña o correo incorrectos, por favor intente de nuevo.',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'Ya existe un usuario con el mismo correo.'
    }
};

usuarioSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('Usuario', usuarioSchema);