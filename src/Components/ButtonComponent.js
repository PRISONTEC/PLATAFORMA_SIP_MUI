import React from 'react';
import Button from '@mui/material/Button';

export default class ButtonComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',   
    };
    }
  
    render() {
      return (
        <>
            <Button
              variant="contained"
              onClick={this.props.clickBoton} >
              {this.props.nameButton}
            </Button> 
        </>
      );
    }
  }