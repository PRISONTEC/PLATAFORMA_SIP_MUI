import Header from './Components/header';
import MainView from './Components/mainView';
import { StyledEngineProvider } from '@mui/material/styles';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Header />
      <MainView />
    </StyledEngineProvider>
  );
}

export default App;
