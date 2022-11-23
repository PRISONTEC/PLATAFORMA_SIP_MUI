import { IconButton } from '@mui/material';
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from '@mui/icons-material/Search';

// Free Material-UI Template
// https://react.school/material-ui/templates

export default function Icon(props) {
  return (
    <div>      
      <IconButton edge="start" onClick={props.clickBoton} sx={{pl:'25px'}}>
        <SearchIcon />
      </IconButton> 
    </div>
  );
}