import React from 'react'
import carpa from '../../../assets/carpa1.png'
import carpaAlquilada from '../../../assets/carpa2.png'
import { useState } from 'react'
import Button from 'react-bootstrap'

const Card = (props) => {

    const [reserva, setReserva] = useState(false)

    const alquilar = () => {
        setReserva(false)
    }

    const liberar = () => {
        setReserva(true)
    }



    return (

        <div >
            {reserva
                ?
                <div className="card">
                    <div className="card__imageContain">
                        <img className="card__image" src={carpaAlquilada}></img>
                    </div>
                    <div>
                        <h1 className="card__titulo">
                            Carpa
                        </h1>
                        <ul className="card__lista">
                            <li>
                                Numero: {props.numero}
                            </li>
                            <li>
                                Capacidad: {props.capacidad}
                            </li>
                            <li>
                                Precio: $ {props.precio}
                            </li>
                            <li>
                                Nombre del cliente:{props.cliente}
                            </li>
                            <li>
                                Pago?:{props.pago}
                            </li>
                        </ul>
                    </div>
                    <div className="card__buttonContainer">
                        <button className="card__button btn" onClick={() => alquilar()}>
                            Liberar
                        </button>
                    </div>
                </div>

                :

                <div className="card card--borde">
                    <div className="card__imageContain ">
                        <img className="card__image" src={carpa}></img>
                    </div>
                    <div>
                        <h1 className="card__titulo">
                            Carpa
                        </h1>
                        <ul className="card__lista">
                            <li>
                                Numero: {props.numero}
                            </li>
                            <li>
                                Capacidad: {props.capacidad}
                            </li>
                            <li>
                                Precio: ${props.precio}
                            </li>
                        </ul>
                    </div>
                    <button className="card__button btn" onClick={() => liberar()}>
                        Alquilar
                    </button>
                </div>

            }
         

        </div>

    )
}

export default Card
