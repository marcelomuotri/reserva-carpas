import React, { useState, useContext, useEffect } from 'react'
import { Button, Modal } from "react-bootstrap"
import { DataContext } from '../../../context/DataProvider';



const Ticket = () => {

    useEffect(() => {
        let momentoActual = new Date()
        setHora(momentoActual.getHours())
        
      
    }, [])
    

    const value = useContext(DataContext);

    const [showTicket, setShowTicket] = value.showTicket
    const [hora, setHora] = useState(Date())

    const finalizar = value.finalizar


    const handleClose = () => setShowTicket(false);

    
    /* console.log(momentoActual.getMinutes()) */


    return (
        <>
            <Modal show={showTicket} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="ticket__titulo">Ticket para : </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="ticket__lista container">
                        <p>hamburguesa con queso </p>
                        <p>50$ </p>
                    </div>
                    <div className="ticket__lista container">
                        <p>hamburguesa con queso  </p>
                        <p>50$ </p>
                    </div>
                    <p>{}</p>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={finalizar}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Ticket