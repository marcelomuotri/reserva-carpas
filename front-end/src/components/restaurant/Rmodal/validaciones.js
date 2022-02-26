const hola = (nombre, setModalValidacion, setTextoValidacion) => {
    if (nombre === "-") {
        setModalValidacion(true)
        setTextoValidacion('Por favor, ingrese un numero de Carpa')
    }
 };


export default {hola};