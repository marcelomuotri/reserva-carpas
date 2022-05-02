import React, { useContext, useState, useRef, useEffect } from 'react'
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { DataContext } from '../../context/DataProvider';
import ModalValidacion from './modalValidacion/ModalValidacion'
import Compras from './RmodalParts/Compras';
import Imagenes from './RmodalParts/Imagenes';
import NumNom from './RmodalParts/NumNom';


const Rmodal = () => {

    const value = useContext(DataContext);

    const [showRmodal, setShowRmodal] = value.showRmodal
    const [base, setBase] = value.base
    const [numero, setNumero] = value.numero
    const [menu, setMenu] = value.menu
    const [pedido, setPedido] = value.pedido
    const [nombreR, setNombreR] = value.nombreR


    //modales de validacion
    const [modalValidacion, setModalValidacion] = value.modalValidacion
    const [textoValidacion, setTextoValidacion] = value.textoValidacion

    const comprar = value.comprar

    const [seleccionComp, setSeleccionComp] = useState()
    const [producto, setProducto] = useState('')
    const [precio, setPrecio] = useState(0)
    const [complemento, setComplemento] = useState('')
    const [precioComp, setPrecioComp] = useState(0)

    const [mostrarComplementos, setMostrarComplementos] = useState(false)
    const [open, setOpen] = useState(false);
    const [showTotal, setShowTotal] = useState(false);
    const [totalPedido, setTotalPedido] = useState(0);

    const animacion = useRef(null)

    useEffect(() => {/* para cargar el menu ya guardado en cada mesa */
        if (numero === "Seleccione una mesa") {
        }
        else {
            setPedido(base[numero].restaurant)
        }
    }, [nombreR]);

    useEffect(() => { /* es para cargar el total cuando cambia "pedido" */
        if (pedido === '') {
        }
        else {
            var sum = 0;
            for (let i = 0; i < pedido.length; i++) {
                sum += pedido[i].precioTotal
            }
            setTotalPedido(sum)
            setShowTotal(true)
        }
    }, [pedido]);

    useEffect(() => {/* para resetear pedido cuando pongo comprar */
        if (showRmodal === false) {
            setPedido('')
            setMostrarComplementos(false)
            setShowTotal(false)
        }
    }, [showRmodal])

    const handleClose = () => {/* resetea el pedido cuando cierro el modal */
        setShowRmodal(false);
        setMostrarComplementos(false)
        setNombreR('')
    }

    const seleccionar = (selecSelec, selecProducto, selecPrecio) => {
        if (nombreR === "") {
            setModalValidacion(true)
            setTextoValidacion('Por favor, ingrese un numero de Mesa')
        }
        else {
            setSeleccionComp(selecSelec)
            setProducto(selecProducto)
            setPrecio(selecPrecio)
            setMostrarComplementos(true)
            setOpen(true)
            animacion.current.className = "animar"
        }
    }

    const borrar = () => {
        animacion.current.className = "nada"
    }

    const seleccionarCompl = (selectPrecioComplemento, selectComplemento) => {
        setComplemento(selectComplemento)
        setPrecioComp(selectPrecioComplemento)
    }

    const eliminarItem = (id) => {

        pedido.splice(id, 1)
        setPedido([...pedido])
    }

    const agregarCarrito = () => {
        if (nombreR === "" || nombreR === "No disponible") {
            setModalValidacion(true)
            setTextoValidacion('Por favor, ingrese un numero de Mesa')
        }
        else if (producto === '') {
            setModalValidacion(true)
            setTextoValidacion('Por favor, selecciona un producto')
        }
        else if (precioComp === 0) {
            setModalValidacion(true)
            setTextoValidacion('Por favor, selecciona un complemento')
        }
        else {
            setPedido(
                [
                    ...pedido,
                    {
                        producto: producto,
                        precioProducto: precio,
                        complemento: complemento,
                        precioComp: precioComp,
                        precioTotal: precio + precioComp
                    }
                ]
            )
        }
        setShowTotal(true)
    }

    const reiniciar = () => {
        setPedido('')
        setMostrarComplementos(false)
        setProducto('')
        setComplemento('')
        setPrecioComp(0)
        setShowTotal(false)
    }

    return (

        <div className="rmodal ">

            <Modal className="animar" show={showRmodal} onHide={handleClose} animation={false}>

                <Modal.Header closeButton>
                    <h2 className=""> COMPRAR </h2>
                </Modal.Header>

                <Modal.Body>

                    {/* Nombre y numero */}
                    <NumNom numero={numero} nombreR={nombreR} />

                    {/* imagenes y complementos */}
                    <Imagenes seleccionar={seleccionar}
                        borrar={borrar}
                        seleccionarCompl={seleccionarCompl}
                        animacion={animacion}
                        mostrarComplementos={mostrarComplementos}
                        seleccionComp={seleccionComp}
                    />

                    {/* mostrar lo que vas comprando y total */}
                    <Compras pedido={pedido}
                        eliminarItem={eliminarItem}
                        showTotal={showTotal}
                        totalPedido={totalPedido}
                    />

                </Modal.Body>

                <Modal.Footer className="tabla__contenedorBoton">
                    <Button onClick={() => agregarCarrito()} className="tabla__boton " >
                        Agregar al carrito
                    </Button>
                    <Button onClick={() => comprar()} className="tabla__boton " >
                        Completar compra
                    </Button>
                    <Button onClick={() => reiniciar()} className="tabla__boton " >
                        Reiniciar compra
                    </Button>

                </Modal.Footer>

                <ModalValidacion />

            </Modal>
        </div>
    )
}

export default Rmodal
