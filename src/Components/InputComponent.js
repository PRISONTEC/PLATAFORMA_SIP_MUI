import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default class FiltrarDatos extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: "",
    };
      this.handleChange = this.handleChange.bind(this);
    }
    //actualiza el dato ingresado 
    handleChange(event) {
      this.setState({value: event.target.value});
      //actualiza el dato ingresado en el padre
      this.props.getInput(event.target.value);
      console.log("default: ", this.props.valorDefault);
    }
  
    render() {
      return (
        <Box sx={{width: 150}}>        
            <TextField 
                fullWidth={true}             
                type="text" 
                value={this.state.value} 
                onChange={this.handleChange}
                placeholder={this.props.valorDefault}
                label={this.props.nameLabel}
                required
                color="success" 
                focused >
            </TextField> 
        </Box>
      );
    }
  }
