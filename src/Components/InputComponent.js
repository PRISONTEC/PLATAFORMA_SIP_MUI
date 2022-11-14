import React from 'react';
import TextField from '@mui/material/TextField'

export default class FiltrarDatos extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''  
    };
      this.handleChange = this.handleChange.bind(this);
    }
    //actualiza el dato ingresado 
    handleChange(event) {
      this.setState({value: event.target.value});
      //actualiza el dato ingresado en el padre
      this.props.getInput(event.target.value);
    }
  
    render() {
      return (
        <>
            <TextField               
                type="text" 
                value={this.state.value} 
                onChange={this.handleChange}
                label={this.props.nameLabel}
                variant="filled" 
                color="success" 
                focused >
            </TextField> 
        </>
      );
    }
  }
