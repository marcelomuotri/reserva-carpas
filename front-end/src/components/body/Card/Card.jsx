import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react'
import { DataContext } from '../../context/DataProvider'



const Card = (props) => {

    const value = useContext(DataContext);

    const [showTabla, setShowTabla] = value.showTabla
    const [seleccion, setSeleccion] = value.seleccion
    const [capacidad, setCapacidad] = value.capacidad
    const [nHistorial, setNHistorial] = value.nHistorial
  
    const [estado, setEstado] = value.estado
    const [disponible, setDisponible] = value.disponible
    const [nombre, setNombre] = value.nombre
    const [pago, setPago] = value.pago
    const [id, setId] = value.id
    const [base, setBase] = value.base
    const [arrResto, setArrResto] = value.arrResto
    const calcularPrecioTotal = value.calcularPrecioTotal


    const prueba = useRef(null)



    const openTable = () => {
        setShowTabla(true)
        setSeleccion(props.numero)
        setNHistorial(props.numero)
        setCapacidad(props.capacidad)
        setEstado(props.estado)
        setNombre(props.nombre)
        setId(props.id)
        setArrResto(calcularPrecioTotal(props.restaurant))
        

        if (props.pago == true) {
            setPago("PAGADO")
        } else {
            setPago("NO PAGADO")
        }
        if (props.estado == true) {
            setDisponible("NO Disponible")
        } else {
            setDisponible("Disponible")
        }
    }

    useEffect(() => {

        if (props.capacidad < 5 & props.estado == false) { //SI ES EL CHIQUITO
            prueba.current.className = "card card--azul"
        } else if (props.capacidad < 5 && props.estado == true) {
            prueba.current.className = "card"
        } else if (props.capacidad > 5 & props.capacidad < 9 & props.estado == true) { //SI ES EL MEDIANO 
            prueba.current.className = "card card--mediano"
        } else if (props.capacidad > 5 & props.capacidad < 9 & props.estado == false) { // SI ES EL MEDIANO
            prueba.current.className = "card card--mediano card--azul"
        } else if (props.capacidad > 9 & props.estado === true) { //SI ES EL GRANDE
            prueba.current.className = "card card--grande"
        } else if (props.capacidad > 9 & props.estado === false) { //SI ES EL GRANDE
            prueba.current.className = "card card--grande card--azul"
        }

    }, [base])

    return (

        <div ref={prueba} className="card" onClick={openTable} >
            <div className="card__contenedor">
                <p>{props.numero}</p>
            </div>
        </div>
    )
}

export default Card
