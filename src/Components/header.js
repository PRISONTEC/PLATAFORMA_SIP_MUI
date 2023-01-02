import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Outlet, useNavigate} from "react-router-dom";
import { createTheme, ThemeProvider, Typography } from  "@mui/material";
import LetraS from '../assets/images/logoSip.png';


const modules = ['INICIO','BUSQUEDA POR INTERNO','BUSQUEDA POR DESTINO'];

const theme = createTheme({
  typography: {
    fontFamily: ['Monserrat', 'sans-serif'].join(","),
    fontSize: 13,
    textAlign:"center"
  },
});

const ResponsiveHeader = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleOpenMenu = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleCloseMenu = (page) => {
    const navegador=page    
    console.log("vavegador.........",navegador)
    setAnchorEl(null);
    if(navegador==='INICIO'){
      navigate("/");
    } else if(navegador==='BUSQUEDA POR INTERNO'){
      props.elijeBusquedaYactulizaNombre("interno",null,null); 
      navigate("/extorsion");
    } else if(navegador==='BUSQUEDA POR DESTINO'){
      props.elijeBusquedaYactulizaNombre("celular",null,null); 
      navigate("/extorsion");
    } else{
      navigate("/Errorpage");
    }
}

const handleClose = () => {
  setAnchorEl(null);
  
}

  return (
    <>
      <Box>
        <AppBar
          position="static" 
          sx = {{background: 'white', boxShadow: 3}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'left' }}>
              <Box sx={{ m:1,mr:2, display: { xs: 'flex', md: 'flex' }, justifyContent: 'left' }}>
                  <img src={LetraS}></img>
              </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'center', pt: '11px' }}>
                    <Typography 
                      textAlign="left" style={{color: '#04264f'}}> Sistema de Inteligencia Penitenciaria
                    </Typography>
                </Box>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenMenu}
                  color="inherit"
                >
                  <MenuIcon sx={{ color: 'gray' }}/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{
                    display: { xs: 'block', md: 'flex' },
                  }}
                >
                  {modules.map((page) => (
                    <MenuItem key={page} onClick={()=>{handleCloseMenu(page)}}>
                      <ThemeProvider theme={theme}>
                        <Typography textAlign="center" fontSize="13">{page}</Typography>
                      </ThemeProvider>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Outlet/>
    </>
  )
}

export default ResponsiveHeader;