

// aca es para crear la coleccion, contiene el modelo de los datos

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    numero: {
        type: Number,
        required: [true, 'El numero es obligatorio']

    },

    capacidad:{
        type:Number,
        required: [true, 'la capacidad es obligatoria'],
        //unique: true //tiene que ser un correo unico , no se puede repetir
    },

    precio:{
        type:Number,
        required: [true, 'El precio es obligatorio'],
        //tiene que ser un correo unico , no se puede repetir
    },

    estado:{
        type: Boolean,
        default: true
    },

    nombre:{
        type:String,
        required: [true, 'El nombre del cliente es obligatorio']
    },

    restaurant:{
        type:Array
    },



})

//aca yo puedo crearme metodos personales, como tambien sobrescribir los tojson y esos metodos existentes

// tiene que ser una funcion normal
UsuarioSchema.methods.toJSON = function() {
    const { __v, password , ...carpas } = this.toObject() // de esta manera yo estoy separando el password y laversion de la respuesta y todos los demas van a ser almacenados en usuario
    return carpas;
}


module.exports = model( 'Carpas', UsuarioSchema )