import React, { useContext, useState, useEffect } from 'react'
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { DataContext } from '../../context/DataProvider';
import hamburguesa from '../../../assets/comida/hamburguesa.png'

const Rmodal = () => {

    const value = useContext(DataContext);

    const [showRmodal, setShowRmodal] = value.showRmodal
    const [base,setBase] = value.base
    const [numero,setNumero] = value.numero
    const [menu, setMenu] = value.menu
    const comprar = value.comprar



    const handleClose = () => setShowRmodal(false);
    const cambiar = (numero) => {
        setNumero(numero)
    }

    return (

        <div className="rmodal">

            <Modal show={showRmodal} onHide={handleClose} animation={false}>

                <Modal.Header closeButton>
                    <h2 className=""> COMPRAR </h2>
                </Modal.Header>

                <Modal.Body>

                    <Dropdown >
                        <Dropdown.Toggle className="rmodal__dropdown" variant="success" id="dropdown-basic">
                            {numero}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="rmodal__dropdown">
                        {base.map((item) => (
                            <Dropdown.Item onClick={() => cambiar(item.numero)}>{item.numero} - {item.nombre}</Dropdown.Item>
                        )
                        )
                        }
                            
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className="flex">
                        {
                            menu.map((item) => (
                                <div className="rmodal__contImagenes">
                                    <img className="rmodal__imagenes" src={item.url} alt={item.nombre}></img>
                                </div>
                            ))
                        }
                    </div>

                    {/* <Form.Control

                        className="agregar__input"
                        size='lg'
                        type="text"
                        placeholder="Nombre"
                    //onChange={e => setNombre(e.target.value)}

                    /> */}
                    

                </Modal.Body>

                <Modal.Footer className="tabla__contenedorBoton">
                    <Button onClick={() => comprar()} className="tabla__boton" >
                        Alquilar
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Rmodal
