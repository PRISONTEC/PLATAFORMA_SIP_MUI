import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate} from "react-router-dom";

export default function BasicSelect(props) {
  const [interno, setInterno] = React.useState('');
  const [destino, setDestino] = React.useState('');
  const internos = ["43810950"];
  const destinos = ["980531211"];
  const navigate = useNavigate();

  const handleChangeInterno = (event) => {
    setInterno(event.target.value);
    props.setInvestigarInterno(event.target.value);
    props.buscarPor("interno");     
    navigate("/extorsion");
  };
  const handleChangeDestino = (event) => {
    setDestino(event.target.value);
    props.setInvestigarDestino(event.target.value);
    props.buscarPor("celular");
    navigate("/extorsion");
  };

  return (
    <>
        <Box sx={{ minWidth: 120,m:2 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Interno</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={interno}
                label="internos"
                onChange={handleChangeInterno}
                >
                <MenuItem value={internos[0]}>{internos[0]}</MenuItem>
                <MenuItem value={internos[1]}>{internos[1]}</MenuItem>
                <MenuItem value={internos[2]}>{internos[2]}</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box sx={{ minWidth: 120,m:2 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Destino</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={destino}
                label="destinos"
                onChange={handleChangeDestino}
                >
                <MenuItem value={destinos[0]}>{destinos[0]}</MenuItem>
                <MenuItem value={destinos[1]}>{destinos[1]}</MenuItem>
                <MenuItem value={destinos[2]}>{destinos[2]}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    </>
  );
}