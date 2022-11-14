import React from "react";
import Header from './Components/header';
import ErrorPage from './Components/modules/errorPage'
import MainView from './Components/mainView';
import { StyledEngineProvider } from '@mui/material/styles';
import ConsultarTransacciones from './Components/modules/ConsultarTransacciones';
import { createBrowserRouter, Routes,Route,BrowserRouter, Link,useNavigate} from "react-router-dom";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <React.StrictMode>
        <BrowserRouter>
          <nav>
            <Link to="/inicio">  </Link>
            <Link to="/extorsion">  </Link>
            <Link to="/">  </Link>
          </nav>
        <Routes>
            <Route path="/" element={<><Header /> <MainView/></>}  />
            <Route path="/extorsion" element={<><Header /><ConsultarTransacciones /></>} />
        </Routes>
       
      </BrowserRouter>
      </React.StrictMode>
    </StyledEngineProvider>
  );
}

export default App;
