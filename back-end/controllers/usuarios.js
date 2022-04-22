const { response } = require('express');

const bcryptjs = require('bcryptjs') //este es para las contraseñas

const Carpa = require ('../models/usuario'); // aca traigo el modelo de la coleccion

// aca pongo las rutas que van a ir a user.js
const usuariosGet = async(req = request, res = response) => {

    const query = {} // solo va a mostrar las que tengan estado: true

    const { limite = 12 , desde = 0} = req.query //esto es lo que recibo, si no viene nada, muesto 5
   /*  const usuarios = await Usuario.find( query ) // solo va a mostrar las que tengan estado: true
        .skip(Number(desde))//esto es para saltear el numero de los que ponga aca 
        .limit(Number(limite)) // lo paaso a numero

    const total = await Usuario.countDocuments( query ) // solo va a mostrar las que tengan estado: true  */

    const [total, carpas] = await Promise.all([ //esto es lo mismo que lo de arriba
        Carpa.countDocuments( query ) ,
        Carpa.find( query ) // solo va a mostrar las que tengan estado: true
        .skip(Number(desde))//esto es para saltear el numero de los que ponga aca 
        .limit(Number(limite)) // lo paaso a numero
    ])
    //aca es para obtener todos los parametros

   /*  const query = req.query */

    res.json({
        total,
        carpas
    })
}

const usuariosPut = async(req, res) => {

    //para obtener el /10 hacemos, seria 1 solo parametro

    const id = req.params.id
    const { _id, password, ...resto} = req.body 

    //TODO VALIDAR CONTRA BASE DE DATOS
     if(password) {
        // encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); // esto es para encriptarlo 10 veces
        resto.password = bcryptjs.hashSync( password, salt) // em este lo encriptamos y pasamos 2 parametros, el password y la cantidad de veces que es 10  
    } 

    const carpas = await Carpa.findByIdAndUpdate(id, resto ) // mongoose, id es lo que busca y resto es lo que actualiza
    
    res.json({
        msg:"hola",
        carpas
    })
}

const usuariosPost = async(req, res) => {

    //primero voy a confirmar mi middleware que cree en users.js

    const {numero, capacidad, precio, estado, nombre, pago} = req.body // esta {} se hace para que solo el usuario pueda cambiar eso cuando ingresa
    //guardar un modelo

    const carpas = new Carpa( { numero, capacidad, precio, estado, nombre, pago } ) // crea el modelo con lo que se ingreso en el body

    // encriptar contraseña

/*     const salt = bcryptjs.genSaltSync(); // esto es para encriptarlo 10 veces
    usuario.password = bcryptjs.hashSync( password, salt) // em este lo encriptamos y pasamos 2 parametros, el password y la cantidad de veces que es 10
 */

    // guardat en DB
    try {
        await carpas.save(); //guarda el usuario
        console.log("el usuario fue guardado")
        console.log(req.body)
    } catch (error) {
        
        console.log("hubo un error")
        console.log(error)
        console.log(req.body)
    }
    
    res.json({ // 
        carpas
    })
}

const usuariosDelete =  async (req, res) => {

    const {id} = req.params; 

    //lo que hago aca para borrarlo es poner el usuario con estado false, de esa manera se borra de la lista pero queda en mis registros de la base de datos

    const usuario = await Usuario.findByIdAndUpdate (id , {estado : false} );

    res.json(
            usuario
    )
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}