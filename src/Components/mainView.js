import * as React from 'react';
import {useState} from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PhoneIcon from '@mui/icons-material/Phone';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import Box from '@mui/material/Box';
import { blue, purple } from '@mui/material/colors';
import '../../src/assets/css/diseNuevo.css';
import MyCard from "./cardsMainViews/cards";
import fondopiepagina from '../../src/assets/images/fondopiepagina.png';
import tiemporeal from '../../src/assets/images/tiemporeal.png';
import Foto1 from '../../src/assets/images/FOTO1.png';
import Foto2 from '../../src/assets/images/FOTO2.png';
import Foto4 from '../../src/assets/images/FOTO4.png';
import Foto5 from '../../src/assets/images/FOTO5.png';
import Foto6 from '../../src/assets/images/FOTO6.png';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {animateScroll as scroll } from "react-scroll";


const colorBlueCard1 = blue[100];
const colorPurpleCard1 = purple[400];

const colorBlueCard2 = blue[200];
const colorPurpleCard2 = purple[500];

const colorBlueCard3 = blue[300];
const colorPurpleCard3 = purple[600];

const colorBlueCard4 = blue[400];
const colorPurpleCard4 = purple[700];

export default function RowCard() {
  const [count, setCount] = useState(false);
  const scrollTo = () => {
    scroll.scrollTo(1500);
    setCount(true);
  }

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
                    src={Foto4}
                    alt="bloques"
                  />
                </ImageListItem>                      
              </ImageList>
              <ImageList sx={{ m:0, display: { xs: 'flex', sm: 'flex', md: 'flex' }}}>
                <ImageListItem sx={{width:'266px'}}>
                  <img
                    src={Foto5}
                    alt="telefono"
                  />
                </ImageListItem>
                <ImageListItem sx={{width:'134px',ml:-0.5}}>
                  <img
                    src={Foto6}
                    alt="llamada"
                    onClick={scrollTo}
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
                    <MyCard startCount={count} firstText={"25756236"} secondText={"Llamadas Analizadas"} statusImage={RingVolumeIcon}/>                  
                  </div>         
            </div>

            <div class="texto1">
                  <div id='penitenciariatexto'>
                    <MyCard startCount={count} firstText={"50252"} secondText={"Internos"} statusImage={AssignmentIndIcon}/>                  
                  </div>         
            </div>

            <div class="texto2">
                  <div id='penitenciariatexto'>
                    <MyCard startCount={count} firstText={"1627"} secondText={"Teléfonos Públicos"} statusImage={PhoneIcon}/>                  
                  </div>         
            </div>           

            <div class="texto3">
                  <div id='penitenciariatexto'>
                    <MyCard startCount={count} firstText={"28"} secondText={"Penitenciarías"} statusImage={AccountBalanceIcon}/>                  
                  </div>         
            </div>
          </div>

            
        </Box> 

  );
  
}