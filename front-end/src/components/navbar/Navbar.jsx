import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from '../context/DataProvider'
import sol from '../../assets/clima/sol.png'
import nube from '../../assets/clima/nube.png'
import lluvia from '../../assets/clima/lluvia.png'
import Agregar from './modales/Agregar'

const Navbar = () => {

    const value = useContext(DataContext);

    const [temperatura, setTemperatura] = value.temperatura
    const [cielo, setCielo] = value.cielo

    const [icono, setIcono] = useState('aa')

    useEffect( async() => {
        // hasta aca dejo el balneario, tengo que subir las fotos a github y afilar los states, pero ya lo tengo
        if(cielo == "foto1"){
            setIcono(sol)
        }else if(cielo == "foto2") {
            setIcono(nube)
        }else if(cielo == "foto3"){
            setIcono(lluvia)
        }
        
    }, [cielo])
    

    return (
        <div className="navbar">
            <ul>
                <li>Clima en Pinamar: {temperatura}</li>
                <img src={icono} className="navbar__icono"/>
        
            </ul>
        </div>
    )
}

export default Navbar
