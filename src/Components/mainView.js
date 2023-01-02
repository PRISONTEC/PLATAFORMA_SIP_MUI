import * as React from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PhoneIcon from '@mui/icons-material/Phone';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import BoxPt from './BoxPt'
import Box from '@mui/material/Box';
import { blue, purple } from '@mui/material/colors';
import asterisco from '../../src/assets/images/asterisco.png';
import '../../src/assets/css/diseNuevo.css';
import MyCard from "./cardsMainViews/cards";
import fondopiepagina from '../../src/assets/images/fondopiepagina.png'
import tiemporeal from '../../src/assets/images/tiemporeal.png'
import {Grid} from '@material-ui/core';
import Foto1 from '../../src/assets/images/FOTO1.png';
import Foto2 from '../../src/assets/images/FOTO2.png';
import Foto3 from '../../src/assets/images/formas.png';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const colorBlueCard1 = blue[100];
const colorPurpleCard1 = purple[400];

const colorBlueCard2 = blue[200];
const colorPurpleCard2 = purple[500];

const colorBlueCard3 = blue[300];
const colorPurpleCard3 = purple[600];

const colorBlueCard4 = blue[400];
const colorPurpleCard4 = purple[700];

export default function RowCard() {

  return (
        <Box sx={{display: { xs: 'flex', sm: 'flex', md: 'flex' }, flexDirection:'column', justifyContent:'center', pt:'20px',alignItems:"center" }}>
            
            <Box sx={{width:'400px',justifyContent:'center'}}>
                <ImageList sx={{ width: '100%',m:0, display: { xs: 'block', sm: 'block', md: 'block' } }} cols={1} >
              <ImageListItem >
                <img
                  src={Foto1}
                  alt="telefono"
                />
              </ImageListItem>
              <ImageListItem >
                <img
                  src={Foto2}
                  alt="llamada"
                />
              </ImageListItem>
              <ImageListItem sx={{mt:-10}}>
                <img
                  src={Foto3}
                  alt="bloques"
                />
              </ImageListItem>                      
            </ImageList>
          </Box>

            <div id="divPadre">
              <img src={tiemporeal} ></img>
            </div> 

          <div class='caja'>
            <img src={fondopiepagina} ></img>

            <div >
                  <div id='textoanalizadas'>
                    <MyCard  firstText={"25756236"} secondText={"Llamadas Analizadas"} statusImage={RingVolumeIcon}/>                  
                  </div>         
            </div>

            <div class="texto1">
                  <div id='penitenciariatexto'>
                    <MyCard  firstText={"50252"} secondText={"Internos"} statusImage={AssignmentIndIcon}/>                  
                  </div>         
            </div>

            <div class="texto2">
                  <div id='penitenciariatexto'>
                    <MyCard  firstText={"1627"} secondText={"Teléfonos Públicos"} statusImage={PhoneIcon}/>                  
                  </div>         
            </div>           

            <div class="texto3">
                  <div id='penitenciariatexto'>
                    <MyCard  firstText={"28"} secondText={"Penitenciarías"} statusImage={AccountBalanceIcon}/>                  
                  </div>         
            </div>
          </div>

            
        </Box> 

  );
  
}