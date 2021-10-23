import './scss/estilos.scss';


import DataProvider from './components/context/DataProvider'
import Itemlist from './components/body/Itemlist';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div >
     <DataProvider>
     <Navbar/>

      <Itemlist/>

      </DataProvider>

    </div>
  );
}

export default App;
