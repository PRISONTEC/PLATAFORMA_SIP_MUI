import React from 'react';
import Input from '../InputComponent';
import Button from '../ButtonComponent';
import {Grid} from '@material-ui/core';

export default class FiltrarDatos extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '', 
    };
    }

    render() {
      return (
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
                />
          </Grid>
          </Grid>
      );
    }
  }