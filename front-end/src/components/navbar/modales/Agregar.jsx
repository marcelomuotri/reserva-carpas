import React, { useState, useContext } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { DataContext } from '../../context/DataProvider';
import axios from 'axios';


const Agregar = () => {

    const value = useContext(DataContext);

    const [numero,setNumero] = value.numero
    const [capacidad, setCapacidad] = value.capacidad
    const [precio, setPrecio] = value.precio
    const [estado, setEstado] = value.carpa
    const [nombre, setNombre] = value.nombre
    const [pago, setPago] = value.pago
    const [carpa, setCarpa] = value.carpa

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const guardarCliente = () =>{
        
        setShow(false)
        try {
            axios.post('http://localhost:8080/api/usuarios', {
                numero, capacidad, precio, estado, nombre, pago
              })
        } catch (error) {
            console.log(error)
        }

        setCarpa({
            numero, capacidad, precio, estado, nombre, pago
        })
    }

    return (
        <div className="agregar">
            <Button variant="primary" onClick={handleShow}>
                Agregar nueva carpa
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
               
                    <h2 className="agregar__titulo">Agregar Carpa</h2>

                </Modal.Header>

                <Modal.Body>
                    <Form.Control 
                        onChange={e => setNumero(e.target.value)} 
                        className="agregar__input"
                        size='lg' 
                        type="text" 
                        placeholder="Numero" />
                    <Form.Control 
                        onChange={e => setCapacidad(e.target.value)} 
                        className="agregar__input" 
                        size='lg' 
                        type="text" 
                        placeholder= "Capacidad" />
                    <Form.Control 
                        onChange={e => setPrecio(e.target.value)} 
                        className="agregar__input" 
                        size='lg' 
                        type="text" 
                        placeholder= "Precio" />
                    <Form.Control 
                        onChange={e => setEstado(e.target.value)} 
                        className="agregar__input" 
                        size='lg' 
                        type="text" 
                        placeholder= "Estado" />
                    <Form.Control 
                        onChange={e => setNombre(e.target.value)} 
                        className="agregar__input" 
                        size='lg' 
                        type="text" 
                        placeholder= "Nombre del cliente" />
                    <Form.Control 
                        onChange={e => setPago(e.target.value)} 
                        className="agregar__input" 
                        size='lg' 
                        type="text" 
                        placeholder= "Pago?" />
                </Modal.Body>

                <Modal.Footer>
                    <Button  variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={guardarCliente}>
                        Guardar Carpa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}




export default Agregar
