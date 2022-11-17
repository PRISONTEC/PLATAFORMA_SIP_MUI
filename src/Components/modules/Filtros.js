import React from 'react';
//import Input from '../InputComponent';
import Button from '../ButtonComponent';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import {Grid} from '@material-ui/core';
import Calendario from '../CalendarioMui';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export default class FiltrarDatos extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        openFilter: false, 
      };
    }
    render() {
      return (
        <Box>
          <Box>
            <Grid container justifyContent="flex-end" alignItems="center">                           
              <Grid item xs={12} sm={12} md={12}>
                <IconButton aria-label="expand row" 
                    size="small" 
                    onClick={ ()=>this.setState({openFilter:!this.state.openFilter}) } >
                    {this.state.openFilter ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    Click para aplicar filtros
                </IconButton>                             
              </Grid>
            </Grid>
          </Box>
          {this.state.openFilter && 
            <Box sx={{ml:2}}>
              <Grid container justifyContent="center" alignItems="center">                
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{mt:2}}>              
                    <Calendario 
                        recuperarFechaCalendario= {this.props.recuperarFechaCalendarioInicio}
                        fechaCalendarioSecundario = {this.props.fechaCalendarioSecundarioInicio}
                        tituloCalendario={this.props.tituloCalendarioInicio}
                      />
                  </Box>                     
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{mt:2}}> 
                    <Calendario 
                        recuperarFechaCalendario= {this.props.recuperarFechaCalendarioFinal}
                        fechaCalendarioSecundario = {this.props.fechaCalendarioSecundarioFinal}
                        tituloCalendario={this.props.tituloCalendarioFinal}
                      />
                  </Box> 
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Box sx={{mt:2}}> 
                    <Button  
                      nameButton={"Filtrar"}
                      clickBoton={this.props.buscar}
                      icon={<FilterAltIcon/>}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          }
        </Box>
      );
    }
  }