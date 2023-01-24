import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Box from '@mui/material/Box';
//import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};



export default function SimpleTable(props) {
  const classes = useStyles();

  return ( 
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: 'center', pt: '11px' }}>
    <Paper className={classes.root} >
      <Table className={classes.table} aria-label="simple table">

        <TableHead>
          <TableRow>
          <TableCell component="th" scope="row">
              </TableCell>
              {props.columnas.map((columna,i)=>{
                  return(
                       <TableCell key={i} align="right">{columna.label}</TableCell>
                  )
              })}
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.datos.map((row) => (
              
            <ExpandableTableRow
              key={row.idInterno}
              expandComponent={<TableCell colSpan="5">{"hola"}</TableCell>}
            >            
             {props.columnas.map((columna,i)=>{
                        return(
                        <TableCell key={i} align="right">{row[columna.dataKey]}</TableCell>
                        );
               })} 
              
            </ExpandableTableRow>
          ))}
        </TableBody>

      </Table>
      
    </Paper>
   </Box>
  );
}