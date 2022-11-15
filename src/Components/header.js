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
import { createTheme, ThemeProvider, Typography } from "@material-ui/core";


const modules = ['INICIO','EXTORSIONES'];

const theme = createTheme({
  typography: {
    fontFamily: ['PT Serif', 'serif'].join(","),
    fontSize: 13,
  },
});

const ResponsiveHeader = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleOpenMenu = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleCloseMenu = (page) => {
    const navegador=page
    setAnchorEl(null);
    if(navegador==='INICIO'){
      navigate("/");
    }
    else if(navegador==='EXTORSIONES'){ 
    navigate("/extorsion");
    }else{
    navigate("/Errorpage");
    }
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
                  onClose={handleCloseMenu}
                  sx={{
                    display: { xs: 'block', md: 'flex' },
                  }}
                >
                  {modules.map((page) => (
                    <MenuItem key={page} onClick={()=>{handleCloseMenu(page); console.log(page)}}>
                      <ThemeProvider theme={theme}>
                        <Typography fontSize="13">{page}</Typography>
                      </ThemeProvider>
                    </MenuItem>
                  ))}
                </Menu>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'center', pt: '11px' }}>
                  <Typography 
                     style={{color: 'blue'}}> INTELIGENCIA PENITENCIARIA
                  </Typography>
                </Box>
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