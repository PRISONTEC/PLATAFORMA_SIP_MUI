import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default class FiltrarDatos extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: props.valorDefault  
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
        <Box sx={{width: 150}}>        
            <TextField 
                fullWidth={true}             
                type="text" 
                value={this.state.value} 
                onChange={this.handleChange}
                label={this.props.nameLabel}
                required
                color="success" 
                focused >
            </TextField> 
        </Box>
      );
    }
  }
