import React from 'react'
import Restaurant from '../components/restaurant/Restaurant'
import Itemlist from '../components/body/Itemlist'
import BotonHistorial from '../components/historial/boton/BotonHistorial'

const Inicio = () => {
    return (
        <>
            <BotonHistorial/>
            <Restaurant />
            <Itemlist />
        </>
    )
}

export default Inicio