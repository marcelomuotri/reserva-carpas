import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import data from '../../sample/menu.json'

export const DataContext = createContext();

export const Dataprovider = (props) => {

    const [menu, setMenu] = useState(data)
    const [base, setBase] = useState([])
    const [temperatura, setTemperatura] = useState('')
    const [sky, setSky] = useState('')
    const [cielo, setCielo] = useState('')

    //boton para abrir la tabla

    const [showTabla, setShowTabla] = useState(false)
    const [seleccion, setSeleccion] = useState('')

    //boton para abrir la tabla del restaurtante

    const [showRmodal, setShowRmodal] = useState(false)
    const [numero, setNumero] = useState('Seleccione una carpa')

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
    const [precio, setPrecio] = useState('')
    const [nombre, setNombre] = useState('')
    const [disponible, setDisponible] = useState('')
    const [estado, setEstado] = useState(true)
    const [pago, setPago] = useState('')
    const [carpa, setCarpa] = useState([])
    const [arrResto, setArrResto] = useState([])




    //cargo la temperatura de pinamar en la api
    useEffect(() => {
        const getPost = async () => {

            const data = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Pinamar&appid=ded74bcb977be8da0faa51c4400447e2&units=metric')
            setTemperatura(data.data.main.temp)
            setSky(data.data.weather[0].main)
            //clear, clouds, rain

            if (sky == "Clear") {
                setCielo("foto1")
            } else if (sky == "Clouds") {
                setCielo("foto2")
            } else if (sky == "Rain") {
                setCielo("foto3")
            }

        }
        getPost()

    }, [sky])

    const actualizar = async () => { //hace un get para actualizar la base de datos
        const carpas = await axios.get('http://localhost:8080/api/usuarios')
        setBase(carpas.data.carpas)
    }

    useEffect(() => { // acutalizaciones
        actualizar()
    }
        , [showTabla,showRmodal])

    const finalizar = async () => {
        axios.put(`http://localhost:8080/api/usuarios/${id}`, { estado: false, nombre: "No disponible", restaurant: [] });

        setShowTabla(false)
        setShowTicket(false)

        actualizar()

    }

    const alquilar = async () => {
        axios.put(`http://localhost:8080/api/usuarios/${id}`, { estado: true, nombre: nombre })
        setShowTabla(false)
        actualizar()

    }

    const comprar = () => {
        axios.put(`http://localhost:8080/api/usuarios/${base[numero - 1]._id}`, { restaurant: pedido })
        actualizar()
        setPedido('')
        setShowRmodal(false)
        setNombreR('')

    }

    

    const calcularPrecioTotal = (array) => {
        var sum=0
        for (let i = 0; i < array.length; i++) {
            sum += array[i].precioTotal
        }
        return sum
    }


    const value = {

        menu: [menu, setMenu],
        base: [base, setBase],
        temperatura: [temperatura, setTemperatura],
        sky: [sky, setSky],
        cielo: [cielo, setCielo],
        id: [id, setId],
        capacidad: [capacidad, setCapacidad],
        precio: [precio, setPrecio],
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
        nombreR: [nombreR,setNombreR],
        modalValidacion: [modalValidacion, setModalValidacion],
        textoValidacion: [textoValidacion, setTextoValidacion],
        finalizar: finalizar,
        alquilar: alquilar,
        comprar: comprar,
        calcularPrecioTotal: calcularPrecioTotal
        

        //baseNombre: baseNombre

    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )

}

export default Dataprovider