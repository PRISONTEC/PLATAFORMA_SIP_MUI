import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/material/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/material/IconButton';
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
  
    return (
      <Box sx={{display: { xs: 'flex', md: 'flex' }, direction:'column', justifyContent:'center', pt:'15px' }}>
        <Card row sx={{ width: 260, bgcolor: props.colorCard}}>
          <CardOverflow>
            <AspectRatio ratio="1" sx={{ width: 90 }}>
              <IconButton
                size="large"
                aria-haspopup="true"
              >
                <StatusImage sx ={[{fontSize: 60, color: props.colorIcon}]} /> 
                
              </IconButton>
            </AspectRatio>
          </CardOverflow>
          <CardContent sx={{ px: 2 }}>
            <ThemeProvider theme={theme}>
              <Typography sx={{justifyContent:'center'}}> {props.firstText} </Typography>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Typography> {props.secondText} </Typography>
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
            SIP
          </CardOverflow>
        </Card>
      </Box>
    );
  }