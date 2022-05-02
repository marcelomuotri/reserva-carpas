import React ,{useState, useEffect, useContext} from 'react'
import { Dropdown } from 'react-bootstrap';
import { DataContext } from '../../../context/DataProvider';

const NumNom = (props) => {

    const value = useContext(DataContext);

    const [base, setBase] = value.base
    const [showRmodal, setShowRmodal] = value.base
    const [numero, setNumero] = value.numero
    const [nombreR, setNombreR] = value.nombreR



    const [soloNom, setSoloNom] = useState([])

    useEffect(() => { //terminar!!!!!!!!!!!!

        const nombres = []
        base.forEach(function agregar(element, index) {

            if (element.nombre == "No disponible") {
                console.log("no")
            }
            else {
                let meter = { "nombre": element.nombre, "numero":  index }
                nombres.push(meter)

            }
        });
        setSoloNom(nombres)

    }, [showRmodal])

    const cambiar = (numero, nombre) => {
        setNumero(numero )
        setNombreR(nombre)
    }

    return (
        <Dropdown >{/* NUMERO DE MESA Y NOMBRE */}
            <Dropdown.Toggle className="rmodal__dropdown" id="dropdown-basic"  >
                {props.numero + 1 + " - " + props.nombreR}
            </Dropdown.Toggle>

            {props.nombreR &&
                <h2 className="rmodal__pedido">Pedido para {props.nombreR} :</h2>
            }

            <Dropdown.Menu className="rmodal__opciones">
                {soloNom.map((item, i) => (
                    <Dropdown.Item key={i} onClick={() => cambiar(item.numero, item.nombre)} >{item.numero + 1} - {item.nombre} </Dropdown.Item>
                )/////ponerle un numero indice
                )
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default NumNom