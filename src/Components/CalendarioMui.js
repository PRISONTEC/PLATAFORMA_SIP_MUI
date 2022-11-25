import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function MaterialUIPickers(props) {
  const [value, setValue] = React.useState(dayjs(props.fechaCalendarioSecundario || new Date()));
  const handleChange = (newValue) => {
    try {
        console.log("value",newValue['$d'])
        props.recuperarFechaCalendario((newValue['$d']));
    } catch{
        console.log("fecha invalida, la estan borrando...")
        props.recuperarFechaCalendario(null)
    }  
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>      
        <DesktopDatePicker
          label={props.tituloCalendario}
          inputFormat="YYYY/MM/DD"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}
