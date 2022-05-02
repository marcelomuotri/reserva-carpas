import React, { useContext, useRef, useState } from 'react'
import { DataContext } from '../../../context/DataProvider'
import { Button } from 'react-bootstrap';

const Imagenes = (props) => {

    const value = useContext(DataContext);

    const [menu, setMenu] = value.menu
    
    return (
        <>
            <div className="flex">{/* FOTO DE PRODUCTO */}
                {
                    menu.map((item, i) => (
                        <>
                            <div key={i} className={item.color + " rmodal__contImagen"} >
                                <img onMouseLeave={() => props.borrar()} onClick={() => props.seleccionar(item.numero, item.nombre, item.precio)} className="rmodal__imagenes" src={item.url} alt={item.nombre}></img>
                                <h3>${item.precio}</h3>
                            </div>
                        </>
                    )
                    )
                }
            </div>

            <div ref={props.animacion}>{/* MOSTRAR COMPLEMENTOS */}
                {props.mostrarComplementos &&
                    <div className="rmodal__complementos">
                        {menu[props.seleccionComp].complementos.map((item, i) => (
                            <Button key={i} onClick={() => props.seleccionarCompl(item.precio, item.complemento)} className={item.color + " rmodal__boton"}>
                                <h2>{item.complemento} - ${item.precio} </h2>
                            </Button>
                        )
                        )
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default Imagenes