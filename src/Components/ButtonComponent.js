import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { withStyles } from '@material-ui/core/styles';
import { StyledEngineProvider } from '@mui/material/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: 'linear-gradient(45deg, #1769aa 30%, #4dabf5 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    weight:20,
    padding: '0 10px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
};

function ClassNames(props) {
  const { classes, children, className, ...other } = props;

  return (
    <StyledEngineProvider injectFirst>
      <Button          
          onClick={props.clickBoton} 
          className={clsx(classes.root, className) }{...other}>
        {props.nameButton || ''}
        {props.icon}
      </Button>
    </StyledEngineProvider>
  );
}

ClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ClassNames);