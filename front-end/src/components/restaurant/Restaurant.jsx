import React, {useContext} from 'react'
import Rmodal from './Rmodal/Rmodal'
import { DataContext } from '../context/DataProvider'


const Restaurant = () => {

    const value = useContext(DataContext);

    const [showRmodal, setShowRmodal] = value.showRmodal
    const [numero, setNumero] = value.numero

    const openRestaurant = () => {
        setShowRmodal(true)
        setNumero('Seleccione una mesa')
    }
    return (
        <div className="flex">
             
            <div onClick={openRestaurant} className='restaurant'>
                <h1 className="restaurant__texto">RESTAURANT</h1>
            </div>
            <Rmodal/>
        </div>
    )
}

export default Restaurant
