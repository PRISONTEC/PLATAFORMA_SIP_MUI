import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import Box from '@mui/material/Box';
import LogoPt from '../assets/images/prisontec_blanco.png';
import {Grid} from '@material-ui/core';
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

export default function GuestFooter() {
  const [mostrar,setMostrar] = useState(true)  
  const escucharOrientacion = (event) =>{
    const dim = Dimensions.get('screen');
    if(event.currentTarget.innerHeight>600){
      setMostrar(true)
    } else {
      setMostrar(false)
    }
  }
  window.addEventListener("orientationchange", escucharOrientacion);
    return (
      <>
      {mostrar &&

          <Paper sx={{marginTop: 'calc(10% + 60px)',
          width: '100%',
          position: 'fixed',
          bottom: 0,
          bgcolor: '#42A5F5'
          }} component="footer" square variant="outlined">
            <Container maxWidth="lg">
              <Grid container direction="row" justifyContent="center" alignItems="flex-end">
                <Grid> 
                  <Box         
                    component="img" 
                    alt="Logo Prisontec"
                    src={LogoPt}
                    sx={{
                        height: 50,
                        width: 50,
                        maxHeight: { xs: 50, md: 50 },
                        maxWidth: { xs: 50, md: 50 },
                    }}
                />  
                </Grid>
              </Grid>
            </Container>
          </Paper>    
      }
      </>
    );
  }