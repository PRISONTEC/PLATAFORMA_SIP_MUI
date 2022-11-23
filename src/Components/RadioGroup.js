import React,{useState} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider, Typography } from "@mui/material";


// pasar como parametro la lista de items => lista={["item1","item2"]}
// pasar la función callback para modificar el item seleccionado en el father
export default function RadioGroupNew(props){
 /* const themeRadio = createTheme({
    typography: {
      fontFamily: ['Montserrat', 'sans-serif'].join(","),
      fontSize: 18,
      textAlign:"center",
    },
  });

  const handleSelectChange =(event) => {       
    const value = event.target.value;
    console.log("value radioGroup: ", value); 
    //props.itemSeleccionado(value);
  };*/
    return (
      <FormControl>
        
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={"llamadas"}
        >
          <FormControlLabel value="llamadas" control={<Radio />} 
          label={
            <Typography sx={{ fontSize: 16 ,fontFamily:'sans-serif'}}>
              Llamadas
            </Typography>
          }
          />
        </RadioGroup>
      </FormControl>
    );
  }


