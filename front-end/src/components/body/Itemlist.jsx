import React, {useContext} from 'react'
import Card from './Card/Card'
import { DataContext } from '../context/DataProvider'

const Itemlist = () => {

    const value = useContext(DataContext);

    const [base,setBase] = value.base
    


    return (
        <div className="row ">
        {base.map((item) => (
                    <div key={item.id}  className='col-lg-3'>
                        <Card numero={item.numero} precio={item.precio} capacidad={item.capacidad} estado={item.estado} pago={item.pago} nombre={item.nombre} />
                        
                    </div>
                    )
                    )
                    } 
                   
       
        </div>
    )
}

export default Itemlist
