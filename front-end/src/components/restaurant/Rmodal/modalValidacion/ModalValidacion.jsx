import React, {useState, useContext} from 'react'
import { Modal, Button } from 'react-bootstrap'
import { DataContext } from '../../../context/DataProvider';

const ModalValidacion = () => {

    const value = useContext(DataContext);

    const [modalValidacion, setModalValidacion] = value.modalValidacion
    const [textoValidacion, setTextoValidacion] = value.textoValidacion

    const handleClose = () => setModalValidacion(false);
    const handleShow = () => setModalValidacion(true);
    return (
        <div>
            <Modal show={modalValidacion} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>AVISO</Modal.Title>
                </Modal.Header>
                <Modal.Body>{textoValidacion}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalValidacion
