import React,{useState} from "react";
import Header from './Components/header';
import ErrorPage from './Components/ErrorPage'
import MainView from './Components/mainView';
import { StyledEngineProvider } from '@mui/material/styles';
import ConsultarTransacciones from './Components/modules/ConsultarTransacciones';
import { Routes,Route,BrowserRouter, Link} from "react-router-dom";

function App() {
  const [seleccion,seleccionar] = useState("interno");
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
            <Route path="/" element={<Header elijeBusqueda={(callback)=>seleccionar(callback)}/>}>
              <Route index element={<MainView/>} />
              <Route path="extorsion/" element={<ConsultarTransacciones buscarPor={seleccion}/>} /> 
              <Route path="*" element={<ErrorPage />} />             
            </Route>             
        </Routes>      
      </BrowserRouter>
      </React.StrictMode>
    </StyledEngineProvider>
  );
}

export default App;
