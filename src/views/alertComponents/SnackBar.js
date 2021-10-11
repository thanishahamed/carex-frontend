import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    
    enqueueSnackbar(props.message, { variant });
  };

  useEffect(()=> {
    handleClickVariant(props.variant)();
  },[props.fired]);

  return (
    <React.Fragment>
      {/* <Button onClick={handleClickVariant('success')}>Show success snackbar</Button> */}
    </React.Fragment>
  );
}

export default function SnackBar(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp 
        fired = {props.fired}
        variant = {props.variant} // variant could be success, error, warning, info, or default
        message = {props.message}
      />
    </SnackbarProvider>
  );
}