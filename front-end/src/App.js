import './scss/estilos.scss';


import DataProvider from './components/context/DataProvider'
import Itemlist from './components/body/Itemlist';
import Navbar from './components/navbar/Navbar';
import Restaurant from './components/restaurant/Restaurant';

function App() {
  return (
    <div >
     <DataProvider>
     <Navbar/>
     <Restaurant/>

      <Itemlist/>

      </DataProvider>

    </div>
  );
}

export default App;
