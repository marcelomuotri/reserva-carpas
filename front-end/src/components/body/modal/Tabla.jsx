import React, { useState, useContext } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { DataContext } from '../../context/DataProvider';
import axios from 'axios';

const Tabla = () => {

    const value = useContext(DataContext);

    const [showTabla, setShowTabla] = value.showTabla
    
    const [seleccion, setSeleccion] = value.seleccion
    const [capacidad, setCapacidad] = value.capacidad
    const [precio, setPrecio] = value.precio
    const [estado, setEstado] = value.estado
    const [disponible, setDisponible] = value.disponible
    const [nombre, setNombre] = value.nombre
    const [pago, setPago] = value.pago
    const [arrResto, setArrResto] = value.arrResto

    const finalizar = value.finalizar
    const alquilar = value.alquilar


    const handleClose = () => setShowTabla(false);
    

    return (
        <div className="tabla">

            <Modal show={showTabla} onHide={handleClose} animation={false}>

                <Modal.Header closeButton>
                    <h2 className="tabla__titulo">CARPA {seleccion}  </h2>
                </Modal.Header>

                <Modal.Body>
                    {/* <Form.Control 
                        onChange={e => setNumero(e.target.value)} 
                        className="agregar__input"
                        size='lg' 
                        type="text" 
                        placeholder="Numero" /> */}
                    <p className="tabla__datos">Capacidad:  {capacidad} personas</p>
                    <p className="tabla__datos">Precio: $ {precio}</p>
                    <p className="tabla__datos">Estado: {disponible}</p>
                    
                    {estado ?
                        <>
                        <p className="tabla__datos"> Nombre: {nombre}</p>
                        <p className="tabla__datos"> Restaurant: ${arrResto}</p>
                       
                         </>
                         :
                         <>
                         <Form.Control
                            
                            className="agregar__input"
                            size='lg'
                            type="text"
                            placeholder="Nombre"
                            onChange={e => setNombre(e.target.value)}
                            

                        />    
                        
                        </>}



                </Modal.Body>

                <Modal.Footer className="tabla__contenedorBoton">
                    {estado?
                    <Button  onClick= { ()=>finalizar()} className="tabla__boton" >
                        Finalizar
                    </Button>
                    :
                    <Button onClick= { ()=>alquilar()} className="tabla__boton" >
                        Alquilar
                    </Button>
                    }

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Tabla
