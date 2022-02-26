import React, { useContext, useState, useRef, useEffect } from 'react'
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { DataContext } from '../../context/DataProvider';
import ModalValidacion from './modalValidacion/ModalValidacion'




const Rmodal = () => {

    const value = useContext(DataContext);

    const [showRmodal, setShowRmodal] = value.showRmodal
    const [base, setBase] = value.base
    const [numero, setNumero] = value.numero
    const [menu, setMenu] = value.menu
    const [pedido, setPedido] = value.pedido
    const [arrResto, setArrResto] = value.arrResto
    const [nombreR, setNombreR] = value.nombreR

    //modales de validacion
    const [modalValidacion, setModalValidacion] = value.modalValidacion
    const [textoValidacion, setTextoValidacion] = value.textoValidacion


    const comprar = value.comprar

    const [seleccion, setSeleccion] = useState(0)
    const [producto, setProducto] = useState('')
    const [precio, setPrecio] = useState(0)
    const [complemento, setComplemento] = useState('')
    const [precioComp, setPrecioComp] = useState(0)

    const [mostrarComplementos, setMostrarComplementos] = useState(false)
    const [open, setOpen] = useState(false);
    const [showTotal, setShowTotal] = useState(false);
    const [totalPedido, setTotalPedido] = useState(5);


    const animacion = useRef(null)

    useEffect(() => {/* para cargar el menu ya guardado en cada carpa */
        if (numero === "Seleccione una carpa") {
        }
        else {
            setPedido(base[numero - 1].restaurant)
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
    const cambiar = (numero, nombre) => {
        setNumero(numero)
        setNombreR(nombre)
    }

    const seleccionar = (selecSelec, selecProducto, selecPrecio) => {
        if (nombreR === "-") {
            setModalValidacion(true)
            setTextoValidacion('Por favor, ingrese un numero de Carpa')
        }
        else {
            setSeleccion(selecSelec)
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
        
        pedido.splice( id , 1 )
        
        setPedido([...pedido])
    }

    const agregarCarrito = () => {
        if (nombreR === "-" || nombreR === "No disponible") {
            setModalValidacion(true)
            setTextoValidacion('Por favor, ingrese un numero de Carpa')
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

                    <Dropdown >{/* NUMERO DE CARPA Y NOMBRE */}
                        <Dropdown.Toggle className="rmodal__dropdown" variant="success" id="dropdown-basic">
                            {numero + " - " + nombreR}
                        </Dropdown.Toggle>

                        {nombreR &&
                            <h2 className="rmodal__pedido">Pedido para {nombreR} :</h2>
                        }

                        <Dropdown.Menu className="rmodal__dropdown">
                            {base.map((item) => (
                                <Dropdown.Item onClick={() => cambiar(item.numero, item.nombre)}>{item.numero} - {item.nombre}</Dropdown.Item>

                            )
                            )
                            }

                        </Dropdown.Menu>
                    </Dropdown>

                    <div className="flex">{/* FOTO DE PRODUCTO */}
                        {
                            menu.map((item) => (
                                <>
                                    <div className={item.color + " rmodal__contImagen"} >
                                        <img onMouseLeave={() => borrar()} onClick={() => seleccionar(item.numero, item.nombre, item.precio)} className="rmodal__imagenes" src={item.url} alt={item.nombre}></img>
                                        <h3>${item.precio}</h3>
                                    </div>
                                </>
                            )
                            )
                        }
                    </div>

                    {producto &&
                        <div className="rmodal__adherezos">Quieres agregarle algo a tu {producto}</div>
                    }

                    <div ref={animacion}>{/* MOSTRAR COMPLEMENTOS */}
                        {mostrarComplementos &&
                            <div className="rmodal__complementos">
                                {menu[seleccion].complementos.map((item) => (
                                    <Button onClick={() => seleccionarCompl(item.precio, item.complemento)} className={item.color + " rmodal__boton"}>
                                        <h2>{item.complemento} - ${item.precio} </h2>
                                    </Button>
                                )
                                )
                                }
                            </div>
                        }
                    </div>
                    {/* mostrar lo que vas comprando */}

                    {pedido &&
                        <div className="rmodal__pedido animar">
                            {pedido.map((item, index) => (
                                <div className="rmodal__contItemPedido">
                                    <h4 className="rmodal__itemPedido">{item.producto} con {item.complemento} = {item.precioTotal} </h4>
                                    <Button variant="danger" onClick={()=>eliminarItem(index)}>Eliminar</Button>
                                </div>

                            )
                            )
                            }

                        </div>
                    }
                </Modal.Body>

                {showTotal &&
                    <div>
                        <h4 className="rmodal__contItemPedido rmodal--total">Total = {totalPedido}</h4>
                    </div>
                }


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
