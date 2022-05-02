import React, { useState, useContext, useEffect, useRef } from 'react'
import { Button, Modal } from "react-bootstrap"
import { DataContext } from '../../../context/DataProvider';
import Linea from './linea/Linea';



const Ticket = (props) => {

    const value = useContext(DataContext);

    const [showTicket, setShowTicket] = value.showTicket
    const [base, setBase] = value.base
    const [menu, setMenu] = value.menu
    const [seleccion, setSeleccion] = value.seleccion
    const [arrResto, setArrResto] = value.arrResto
    const [hora, setHora] = value.hora
    const [fecha, setFecha] = value.fecha
    const finalizar = value.finalizar
    

  

    useEffect(() => {
        let momentoActual = new Date()
        setHora(momentoActual.getHours() + ":" + momentoActual.getMinutes())
        setFecha(momentoActual.getDate() + "-" + (momentoActual.getMonth() + 1) + "-" + momentoActual.getFullYear())
    }, [showTicket])


    const handleClose = () => setShowTicket(false);

    return (
        <>
            <Modal show={showTicket} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="ticket__titulo">Ticket para : {props.nombre} </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {seleccion &&
                        <div className="ticket__contenedor">
                            {(base[seleccion - 1].restaurant).map((item) => (
                                <Linea nombre={item.nombre} producto= {item.producto} complemento={item.complemento} precioTotal={item.precioTotal}/>
                            )
                            )
                            }
                        </div>
                        
                    }

                    <h3 className="ticket__total">Total: ${arrResto}</h3>
                    <div>
                        <h4>Fecha y hora: {fecha} a las {hora}</h4>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={finalizar}>
                        Finalizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Ticket