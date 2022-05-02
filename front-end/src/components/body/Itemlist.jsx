import React, { useContext} from 'react'
import Card from './Card/Card'
import { DataContext } from '../context/DataProvider'
import Tabla from './modal/Tabla';


const Itemlist = () => {

    const value = useContext(DataContext);

    const [base,] = value.base

    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
      };

    return (
        <div className="row">
        {base.map((item, i) => (
                    <div key={i} style={divStyle} className='col-lg-3'>
                        <Card numero={item.numero} precio={item.precio} capacidad={item.capacidad} estado={item.estado} pago={item.pago} nombre={item.nombre} id={item._id} restaurant={item.restaurant} />
                    </div>
                    )
                    )
                    }
                    <Tabla/>
        </div>
    )
}

export default Itemlist
