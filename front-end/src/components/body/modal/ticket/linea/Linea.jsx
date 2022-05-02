import React, { useState, useContext, useEffect, useRef } from 'react'
import { DataContext } from '../../../../context/DataProvider';

const Linea = (props) => {

    const value = useContext(DataContext);

    const [menu, setMenu] = value.menu
    
   


    const cambioImagen = useRef(null)

    useEffect(() => {
        if(props.producto == "Hamburguesa"){
            cambioImagen.current.src = menu[0].url
        }
        if(props.producto == "Pancho"){
            cambioImagen.current.src = menu[1].url
        }
        if (props.producto == "Pizza"){
            cambioImagen.current.src = menu[2].url
        }
        if (props.producto == "Papasfritas"){
            cambioImagen.current.src = menu[3].url
        }
        if (props.producto == "Botella"){
            cambioImagen.current.src = menu[4].url
        }

    }, [])
    
     

    return (
        <div className="ticket__lineas">
            <div className="flexx">
                <img
                    className="ticket__imagenes"
                    src={menu[0].url}
                    alt={props.nombre}
                    ref={cambioImagen}
                >
                </img>
                <p>{props.producto} con {props.complemento}  </p>
            </div>
            <p>${props.precioTotal}</p>
           
        </div>
    )
}

export default Linea