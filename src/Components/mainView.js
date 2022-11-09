import * as React from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PhoneIcon from '@mui/icons-material/Phone';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import Box from '@mui/material/Box';

import { blue, purple } from '@mui/material/colors';

import MyCard from "./cardsMainViews/cards"


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
    <Box sx={{display: { xs: 'flex', md: 'flex' }, flexDirection:'column', justifyContent:'center', pt:'20px' }}>
      <MyCard colorCard={colorBlueCard1} colorIcon={colorPurpleCard1} firstText={"28"} secondText={"PENALES"} statusImage={AccountBalanceIcon}/>
      <MyCard colorCard={colorBlueCard2} colorIcon={colorPurpleCard2} firstText={"50K"} secondText={"INTERNOS"} statusImage={AssignmentIndIcon}/>
      <MyCard colorCard={colorBlueCard3} colorIcon={colorPurpleCard3} firstText={"25M"} secondText={"LLAMADAS"} statusImage={RingVolumeIcon}/>
      <MyCard colorCard={colorBlueCard4} colorIcon={colorPurpleCard4} firstText={"1500"} secondText={"TELEFONOS ANALIZADOS"} statusImage={PhoneIcon}/>
    </Box>
  );
}