import React, { useContext, useState, useEffect } from 'react'
import { Table, Dropdown } from 'react-bootstrap';
import { DataContext } from '../../context/DataProvider'

const Estadisticas = () => {

  const value = useContext(DataContext);

  const [estad, setEstad] = value.estad
  const [filtrados, setFiltrados] = useState(estad)
  const [resultadoTotal, setResultadoTotal] = useState(0)
  const [selecFecha, setSelecFecha] = useState("Seleccionar Fecha")
  const [hamburguesa, setHamburguesa] = useState(0) 
  const [pancho, setPancho] = useState(0)
  const [pizza,setPizza] = useState(0)
  const [papasfritas, setPapafritas] = useState(0)
  const [botella, setBotella] = useState(0)
  

  useEffect(() => {
    //va sumando los precios de los productos
    var sum = 0
    for (let i = 0; i < filtrados.length; i++) {
      sum += filtrados[i].historial.total
      setResultadoTotal(sum)
    }
  }, [filtrados])

  useEffect(() => {
    setHamburguesa (sumarComplementos("Hamburguesa"))
    setPancho (sumarComplementos("Pancho"))
    setPizza (sumarComplementos("Pizza"))
    setPapafritas (sumarComplementos("Papasfritas"))
    setBotella (sumarComplementos("Botella"))

  }, [filtrados])
  
  const sumarComplementos = (productos) => {
    
    var sum = 0
    for (let i = 0; i < filtrados.length; i++) {
        for(let z = 0 ; z < filtrados[i].historial.pedido.length; z++){
          if(filtrados[i].historial.pedido[z].producto === productos)
          sum ++;
        }
    }
    return sum
  }


  const filtrarFecha = (Pfecha) => {
    var result = estad
      .filter(function (exterior) {
        return exterior.historial.fecha === Pfecha
      })

    if (Pfecha === "Todas") { //si no agarro nada arriba y mando la palabra todo , que vuelva el array original
      result = estad
    }

    setFiltrados(result)
    setSelecFecha(Pfecha)
  }




  return (
    <div className="estadisticas__contenedor">

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selecFecha}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => filtrarFecha("Todas")}>Todas</Dropdown.Item>
          <Dropdown.Item onClick={() => filtrarFecha("31-4-2022")}>31-04-2022</Dropdown.Item>
          <Dropdown.Item onClick={() => filtrarFecha("1-5-2022")}>01-05-2022</Dropdown.Item>
          <Dropdown.Item onClick={() => filtrarFecha("2-5-2022")}>02-05-2022</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="estadisticas__tabla">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Salida</th>
              <th>Mesa</th>
              <th>Nombre</th>
              <th>Gasto total</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((item, i) => (
              <tr key={i}>
                <td>{item.historial.fecha} </td>
                <td>{item.historial.horaR} </td>
                <td>{item.historial.mesa} </td>
                <td>{item.historial.nombre} </td>
                <td>${item.historial.total}</td>
              </tr>
            )
            )
            }
          </tbody>
          <label>Total del Perdiodo: ${resultadoTotal} </label>
        </Table>
        <h3>Cantidades consumidas </h3>
        <Table>
          <thead>
            <tr>
              <th>Hamburguesa</th>
              <th>Pancho</th>
              <th>Pizza</th>
              <th>Papas fritas</th>
              <th>Bebidas</th>
            </tr>
          </thead>

          <tbody>
          <tr >
                <td>{hamburguesa} </td>
                <td>{pancho} </td>
                <td>{pizza} </td>
                <td>{papasfritas} </td>
                <td>{botella}</td>
              </tr>
          </tbody>

        </Table>

      </div>
    </div>
  )
}

export default Estadisticas