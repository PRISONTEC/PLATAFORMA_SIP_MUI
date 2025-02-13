import React, { useState } from "react";
import Header from './Components/header';
import Investigacion from './Components/Investigacion'
import ErrorPage from './Components/ErrorPage'
import MainView from './Components/mainView';
import ConsultarTransacciones from './Components/modules/ConsultarTransacciones';
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import MyProvider from "./Components/context/MyProvider";

function App() {
  const [investigarInterno, setInvestigarInterno] = useState(null);
  const [investigarDestino, setInvestigarDestino] = useState(null);

  return (
    <MyProvider>
      <React.StrictMode>
        <BrowserRouter>
          <nav>
            <Link to="/investigacion">  </Link>
            <Link to="/extorsion">  </Link>
            <Link to="/">  </Link>
            <Link to="/Errorpage">  </Link>
          </nav>

          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<MainView />} />
              <Route path="investigacion/" element={<Investigacion
                setInvestigarInterno={setInvestigarInterno}
                setInvestigarDestino={setInvestigarDestino} />
              } />
              <Route path="extorsion/" element={<ConsultarTransacciones
                investigarInterno={investigarInterno}
                investigarDestino={investigarDestino}
                setInvestigarInterno={setInvestigarInterno}
                setInvestigarDestino={setInvestigarDestino} />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </MyProvider>
  );
}

export default App;
