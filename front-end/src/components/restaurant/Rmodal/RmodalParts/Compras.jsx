import React from 'react'
import { Button } from 'react-bootstrap';

const Compras = (props) => {
    return (
        <>
            {props.pedido &&
                <div className="rmodal__pedido animar">
                    {props.pedido.map((item, index) => (
                        <div key={index} className="rmodal__contItemPedido">
                            <h4 className="rmodal__itemPedido">{item.producto} con {item.complemento}  </h4>
                            <h4 className="rmodal__subtotal">$ {item.precioTotal}</h4>
                            <Button variant="danger" onClick={() => props.eliminarItem(index)}>Eliminar</Button>
                        </div>
                    )
                    )
                    }
                </div>
            }
            {props.showTotal &&
                <div>
                    <h3 className="rmodal__totalPedido ">Total:    $ {props.totalPedido}</h3>
                </div>
            }

        </>
    )
}

export default Compras