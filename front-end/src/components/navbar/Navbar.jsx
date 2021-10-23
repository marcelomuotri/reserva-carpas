import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from '../context/DataProvider'
import sol from '../../assets/clima/sol.png'
import nube from '../../assets/clima/nube.png'
import lluvia from '../../assets/clima/lluvia.png'

const Navbar = () => {

    const value = useContext(DataContext);

    const [temperatura, setTemperatura] = value.temperatura
    const [cielo, setCielo] = value.cielo

    const [icono, setIcono] = useState('aa')

    useEffect( async() => {
        // hasta aca dejo el balneario, tengo que subir las fotos a github y afilar los states, pero ya lo tengo
        if(cielo == "foto2"){
            setIcono({sol})
            console.log("entre")
        }else {
            console.log("no entre")
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
