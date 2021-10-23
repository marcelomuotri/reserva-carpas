import React, {createContext, useState, useEffect} from 'react'
import carpas from '../../sample/carpas.json'
import axios from 'axios'

export const DataContext = createContext();

export const Dataprovider = (props) => {

    const [base,setBase] = useState (carpas)
    const [temperatura, setTemperatura] = useState('')
    const [sky, setSky] = useState('')
    const [cielo, setCielo] = useState('')


    //cargo la temperatura de pinamar en la api
    useEffect( () => {
        const getPost = async () =>{
        
        const data = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Pinamar&appid=ded74bcb977be8da0faa51c4400447e2&units=metric')
        setTemperatura(data.data.main.temp)
        setSky(data.data.weather[0].main)
        //clear, clouds, rain
        
        if( sky == "Clear"){
            setCielo("foto1")
        } else if (sky == "Clouds") {
            setCielo("foto2")
        } else if (sky == "Rain") {
            setCielo("foto3")
        }
        
        }
        getPost()

    }, [sky])


    const value ={
        base: [ base,setBase ],
        temperatura: [temperatura, setTemperatura],
        sky: [sky, setSky],
        cielo: [cielo, setCielo]

    }

    return(
        <DataContext.Provider value={value}>
			{props.children}
		</DataContext.Provider>
    )

}

export default Dataprovider