import { Alert as MUIAlert, Slide, Snackbar } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import useAlert from '../../hooks/useAlert';

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

export default function Alert() {
  const { message, handleClose } = useAlert();

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      TransitionComponent={SlideTransition}
      onClose={handleClose}
    >
      <MUIAlert
        onClose={handleClose}
        severity={message?.type || 'error'}
        sx={{ width: '100%' }}
      >
        {message?.text}
      </MUIAlert>
    </Snackbar>
  );
}
