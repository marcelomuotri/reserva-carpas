import { Button } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import Estadisticas from '../components/historial/historial/Estadisticas'
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers'


const Historial = () => {

    const enlace = {
        color: 'black',
        textDecoration: 'none'

    }

    return (
        <>
            <div>
                <Button variant="success">
                    <Link style={enlace} to="/"> Volver Al Restaurant</Link>
                </Button>
            </div>
            <Estadisticas />
        </>


    )
}

export default Historial