import './scss/estilos.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import DataProvider from './components/context/DataProvider'
import Inicio from './routes/Inicio';
import Historial from './routes/Historial';

function App() {
  return (
    <div>
      <DataProvider>
        <BrowserRouter>
          <Routes>

          <Route path="/historial" element={<Historial />} />
          <Route path="/" element={<Inicio />} />
            
          </Routes>
        </BrowserRouter>
      </DataProvider>

    </div>
  );
}

export default App;
