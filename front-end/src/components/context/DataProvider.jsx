import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import data from '../../sample/menu.json'

export const DataContext = createContext();

export const Dataprovider = (props) => {

    const [menu, setMenu] = useState(data)
    const [base, setBase] = useState([])
    const [estad, setEstad] = useState([])

    //boton para abrir la tabla

    const [showTabla, setShowTabla] = useState(false)
    const [seleccion, setSeleccion] = useState(false)

    //boton para abrir la tabla del restaurtante

    const [showRmodal, setShowRmodal] = useState(false)
    const [numero, setNumero] = useState('Seleccione una mesa')
    const [seleccionComp, setSeleccionComp] = useState(0)


    //botones para abrir el modal del ticket
    const [showTicket, setShowTicket] = useState(false);

    //botones para abrir el modal de validacion

    const [modalValidacion, setModalValidacion] = useState(false)
    const [textoValidacion, setTextoValidacion] = useState('Cargando')

    //guardar pedido del restaurante

    const [pedido, setPedido] = useState('')
    const [nombreR, setNombreR] = useState('')


    //estos son para guardar los datos del formulario
    const [id, setId] = useState('')
    const [capacidad, setCapacidad] = useState('')
    const [nombre, setNombre] = useState('')
    const [disponible, setDisponible] = useState('')
    const [estado, setEstado] = useState(true)
    const [pago, setPago] = useState('')
    const [carpa, setCarpa] = useState([])
    const [arrResto, setArrResto] = useState([])

    //datos para historial
    const [historial, setHistorial] = useState('')
    const [hora, setHora] = useState("")
    const [fecha, setFecha] = useState("")
    const [nHistorial, setNHistorial] = useState(2)

    

    const actualizar = async () => { //hace un get para actualizar la base de datos
        const carpas = await axios.get('http://localhost:8080/api/usuarios')
        setBase(carpas.data.carpas)
    }

    const actualizarHistorial = async () => { //hace un get para actualizar el historial
        const historia = await axios.get('http://localhost:8080/api/usuarios/historial')
        setEstad(historia.data.historiales)
    }
    

    useEffect(() => { // actualizaciones
        actualizar()
        actualizarHistorial()
    }
        , [showTabla, showRmodal])

    const finalizar = async () => { //hace put a la base de datos y actualiza
        axios.put(`http://localhost:8080/api/usuarios/${id}`, { estado: false, nombre: "No disponible", restaurant: [] });

        setShowTabla(false)
        setShowTicket(false)
        axios.post(`http://localhost:8080/api/usuarios/historial`, { historial: historial })

        actualizar()
        actualizarHistorial()

    }

    const alquilar = async () => { //hace un put a la base de datos y actualiza
        axios.put(`http://localhost:8080/api/usuarios/${id}`, { estado: true, nombre: nombre })
        setShowTabla(false)
        actualizar()
    }

    const comprar = () => { //envia el pedido del restaurant y hace un put en el cliente y hace un reset
        axios.put(`http://localhost:8080/api/usuarios/${base[numero]._id}`, { restaurant: pedido })
        actualizar()
        setPedido('')
        setShowRmodal(false)
        setNombreR('')

    }

    const guardarHistorial = () => {
        axios.post(`http://localhost:8080/api/usuarios/historial`, { historial: historial })
    }

    const calcularPrecioTotal = (array) => { //va sumando los precios de los productos
        var sum = 0
        for (let i = 0; i < array.length; i++) {
            sum += array[i].precioTotal
        }
        return sum
    }


    const value = {

        menu: [menu, setMenu],
        base: [base, setBase],
        id: [id, setId],
        capacidad: [capacidad, setCapacidad],
        estado: [estado, setEstado],
        disponible: [disponible, setDisponible],
        nombre: [nombre, setNombre],
        pago: [pago, setPago],
        carpa: [carpa, setCarpa],
        showTabla: [showTabla, setShowTabla],
        showRmodal: [showRmodal, setShowRmodal],
        showTicket: [showTicket, setShowTicket],
        seleccion: [seleccion, setSeleccion],
        numero: [numero, setNumero],
        pedido: [pedido, setPedido],
        arrResto: [arrResto, setArrResto],
        nombreR: [nombreR, setNombreR],
        modalValidacion: [modalValidacion, setModalValidacion],
        textoValidacion: [textoValidacion, setTextoValidacion],
        finalizar: finalizar,
        alquilar: alquilar,
        comprar: comprar,
        guardarHistorial: guardarHistorial,
        calcularPrecioTotal: calcularPrecioTotal,
        seleccionComp: [seleccionComp, setSeleccionComp],
        hora: [hora, setHora],
        fecha: [fecha, setFecha],
        nHistorial: [nHistorial, setNHistorial],
        historial: [historial, setHistorial],
        estad: [estad, setEstad]

        //baseNombre: baseNombre
    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )

}

export default Dataprovider