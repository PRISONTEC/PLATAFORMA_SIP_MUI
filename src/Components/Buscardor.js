import { Grid } from '@material-ui/core';
import React from 'react';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import SearchIcon from '@mui/icons-material/Search';

export default class Buscador extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',   
    };
      this.handleChange = this.handleChange.bind(this);
      this.clickBoton = this.clickBoton.bind(this);
      console.log("skin: ",this.props.skin)
    }
    //actualiza el dato ingresado 
    handleChange(event) {
      this.setState({value: event.target.value});
      //actualiza el dato ingresado en el padre
      this.props.recuperarIdInterno(event.target.value);
    } 
    clickBoton(){
      this.props.buscar();
      this.setState({value:""});
    }
  
    render() {
      return (
        <>
          <Grid container direction='row' justifyContent="center">
            <InputComponent
              nameLabel={this.props.nameLabel}
              getInput={this.props.recuperarIdInterno}
            />
            <ButtonComponent 
              nameButton={this.props.nombreBoton}
              clickBoton={this.props.buscar}
              icon={<SearchIcon/>}
            />
          </Grid>
        </>
      );
    }
  }
