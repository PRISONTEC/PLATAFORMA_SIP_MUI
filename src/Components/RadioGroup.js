import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


// pasar como parametro la lista de items => lista={["item1","item2"]}
// pasar la función callback para modificar el item seleccionado en el father
export default class RadioGroupNew extends React.Component{
  constructor(props){
    super(props);
    if(this.props.iniciarConItem){
      this.state = {
        select: this.props.iniciarConItem
      };
    } else {
      this.state = {
        select: this.props.lista[0]
      };
      this.props.itemSeleccionado(this.props.lista[0]);
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange (event) {    
    const value = event.target.value;
    this.props.itemSeleccionado(value);
    this.setState({select:value});
  };
  render(){
    return (
      <>
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{/*this.props.name*/}</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={this.state.select}
            name="radio-buttons-group"
          > 
            { this.props.lista.map((elemento,i) => {
              return(
                <FormControlLabel key={i}
                  value={elemento} 
                  control={<Radio />} 
                  label={elemento}
                  onChange={event => this.handleSelectChange(event)} 
                />
              );}            
            )
            }          
          </RadioGroup>
        </FormControl>      
      </>
    );
  }
};

