import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BotonHistorial = () => {

    
    return (
        <div className="boton__contenedor">
            <button className="boton__botonn" >
                <Link className="boton__texto" to="/historial"> ESTADISTICAS</Link>
            </button>
        </div>
    )
}

export default BotonHistorial