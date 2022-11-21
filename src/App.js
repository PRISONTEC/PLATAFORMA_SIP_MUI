import React,{useState} from "react";
import Header from './Components/header';
import ErrorPage from './Components/ErrorPage'
import MainView from './Components/mainView';
import { StyledEngineProvider } from '@mui/material/styles';
import ConsultarTransacciones from './Components/modules/ConsultarTransacciones';
import { Routes,Route,BrowserRouter, Link} from "react-router-dom";

function App() {
  const [seleccion,seleccionar] = useState("interno");
  const [infoInterno, setInfoInterno] = useState(null);
  const modificarValores = (buscarPor,nombreInterno) => {
    seleccionar(buscarPor);
    setInfoInterno(nombreInterno);
  }
  console.log("seleccion: ", seleccion);
  return (
    <StyledEngineProvider injectFirst>
      <React.StrictMode>
        <BrowserRouter>
          <nav>
            <Link to="/extorsion">  </Link>
            <Link to="/">  </Link>
            <Link to="/Errorpage">  </Link>
          </nav>

        <Routes>
            <Route path="/" element={<Header elijeBusquedaYactulizaNombre={modificarValores}/>}>
              <Route index element={<MainView/>} />
              <Route path="extorsion/" element={<ConsultarTransacciones 
                                                  buscarPor={seleccion}
                                                  infoInternoSeleccionado={infoInterno}  
                                                  actualizarInfoInterno={(callback)=>setInfoInterno(callback)}/>} /> 
              <Route path="*" element={<ErrorPage />} />             
            </Route>             
        </Routes>      
      </BrowserRouter>
      </React.StrictMode>
    </StyledEngineProvider>
  );
}

export default App;
