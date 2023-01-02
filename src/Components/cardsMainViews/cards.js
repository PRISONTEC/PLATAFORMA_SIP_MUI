import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/material/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/material/IconButton';
import CountUp from 'react-countup';
import { createTheme, ThemeProvider, Typography } from "@material-ui/core";

export default function myCard(props) {

    const StatusImage = props.statusImage;
    const theme = createTheme({
        typography: {
          fontFamily: ['PT Serif', 'serif'].join(","),
          fontSize: 13,
          textAlign:"center"
        },
      });

    const numeroToString = (numb) => {
      var str = numb.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return str.join(".");
    }
  
    return (
      <Box sx={{display: { xs: 'flex', md: 'flex' }, direction:'column', justifyContent:'right', pt:'15px' }}>
        <Box row sx={{ width: 260, bgcolor: props.colorCard}}>
          <CardContent sx={{ px: 2 }}>
            <ThemeProvider theme={theme}>
            <Typography sx={{justifyContent:'center'}} variant="h4"> <CountUp end={props.firstText}  separator="," /> </Typography>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Typography variant="h6"> {props.secondText} </Typography>
            </ThemeProvider>
          </CardContent>
          <Divider />
          <CardOverflow
            variant="soft"
            color="primary"
            sx={{
              px: 0.2,
              writingMode: 'vertical-rl',
              textAlign: 'center',
              fontSize: 'xs2',
              fontWeight: 'xl2',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >

          </CardOverflow>
        </Box>
      </Box>
    );
  }