import React from 'react';
import Input from '../InputComponent';
import Button from '../ButtonComponent';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import {Grid} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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
                    onClick={() => {this.setState({openFilter:!this.state.openFilter}); console.log("hola")}} >
                    {this.state.openFilter ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    Click para aplicar filtros
                </IconButton>                             
              </Grid>
            </Grid>
          </Box>
          {this.state.openFilter && 
            <Box>
              <Grid container justifyContent="flex-end" alignItems="center"> 
                <Grid item xs={12} sm={6} md={3}>         
                  <Input skin={0} 
                    nameLabel={"Filtrar por ID"}
                    getInput={this.props.recuperarIdInternoFiltro}
                    />
                </Grid> 
                <Grid item xs={12} sm={6} md={3}>
                      <Input skin={1} 
                        nameLabel={"Filtrar por Destino"}
                        getInput={this.props.recuperarDestinoFiltro}
                        />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                      {this.props.children}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                      <Button skin={1} 
                        nameButton={"Filtrar"}
                        clickBoton={this.props.buscar}
                        icon={<FilterAltIcon/>}
                        >
                          <FilterAltIcon/>
                        </Button>
                </Grid>
              </Grid>
            </Box>
          }
        </Box>
      );
    }
  }