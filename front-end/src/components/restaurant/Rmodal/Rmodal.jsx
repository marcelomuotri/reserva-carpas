import React, { useContext, useState, useRef } from 'react'
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { DataContext } from '../../context/DataProvider';


const Rmodal = () => {

    const value = useContext(DataContext);

    const [showRmodal, setShowRmodal] = value.showRmodal
    const [base, setBase] = value.base
    const [numero, setNumero] = value.numero
    const [menu, setMenu] = value.menu
    const comprar = value.comprar

    const [seleccion, setSeleccion] = useState(0)
    const [nombre, setNombre] = useState('')
    const [mostrarComplementos, setMostrarComplementos] = useState(false)
    const [open, setOpen] = useState(false);

    const animacion = useRef(null)

    const handleClose = () =>{
     setShowRmodal(false);
     setMostrarComplementos(false)
     setNombre('')
    }
    const cambiar = (numero) => {
        setNumero(numero)
    }

    const seleccionar = (a, b) => {
        setSeleccion(a)
        setNombre(b)
        setMostrarComplementos(true)
        setOpen(true)
        animacion.current.className = "animar"
       
    }

    const borrar = () => {
        animacion.current.className= "nada"
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
                                <>
                                    <div className={item.color + " rmodal__contImagen"} >
                                        <img onMouseLeave={()=>borrar()} onClick={() => seleccionar(item.numero, item.nombre)} className="rmodal__imagenes" src={item.url} alt={item.nombre}></img>
                                        <h3>${item.precio}</h3>
                                    </div>
                                </>
                            )
                            )
                        }

                    </div>
                    <div>Seleccionaste {nombre}</div>
                    <div ref={animacion}>
                        {mostrarComplementos ?
                            <div className="rmodal__complementos">
                                {menu[seleccion].complementos.map((item) => (
                                    <Button className={item.color}>
                                        <h2>{item.complemento} - ${item.precio} </h2>
                                    </Button>
                                )
                                )
                                }
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                </Modal.Body>

                <div>
                    <p>Total</p>
                </div>

                <Modal.Footer className="tabla__contenedorBoton">
                    <Button onClick={() => comprar()} className="tabla__boton" >
                        Completar compra
                    </Button>

                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default Rmodal
