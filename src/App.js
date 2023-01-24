import React,{useState} from "react";
import Header from './Components/header';
import Investigacion from './Components/Investigacion'
import ErrorPage from './Components/ErrorPage'
import MainView from './Components/mainView';
import ConsultarTransacciones from './Components/modules/ConsultarTransacciones';
import { Routes,Route,BrowserRouter, Link} from "react-router-dom";

function App() {
  const [seleccion,seleccionar] = useState("interno");
  const [investigarInterno,setInvestigarInterno] = useState(null);
  const [investigarDestino,setInvestigarDestino] = useState(null);
  const [infoPenal,setInfoPenal] = useState("")
  const [infoInterno, setInfoInterno] = useState(null);
  const modificarValores = (buscarPor,nombreInterno,penal) => {
    seleccionar(buscarPor);
    setInfoInterno(nombreInterno);
    setInfoPenal(penal)
  }
  return (
    
      <React.StrictMode>
        <BrowserRouter>
          <nav>
            <Link to="/investigacion">  </Link>
            <Link to="/extorsion">  </Link>
            <Link to="/">  </Link>
            <Link to="/Errorpage">  </Link>
          </nav>

        <Routes>
            <Route path="/" element={<Header elijeBusquedaYactulizaNombre={modificarValores}/>}>
              <Route index element={<MainView/>} />
              <Route path="investigacion/" element={<Investigacion 
                                                      buscarPor={seleccionar}
                                                      setInvestigarInterno={setInvestigarInterno}
                                                      setInvestigarDestino={setInvestigarDestino}/>
                                                      } />
              <Route path="extorsion/" element={<ConsultarTransacciones 
                                                  investigarInterno={investigarInterno}
                                                  investigarDestino={investigarDestino}
                                                  setInvestigarInterno={setInvestigarInterno}
                                                  setInvestigarDestino={setInvestigarDestino}
                                                  buscarPor={seleccion}
                                                  infoInternoSeleccionado={infoInterno} 
                                                  infoPenalSeleccionado={infoPenal}
                                                  actualizarInfoPenal={(callback)=>setInfoPenal(callback)} 
                                                  actualizarInfoInterno={(callback)=>setInfoInterno(callback)}/>} />
              <Route path="*" element={<ErrorPage />} />             
            </Route>             
        </Routes>      
      </BrowserRouter>
      </React.StrictMode>
  );
}

export default App;
