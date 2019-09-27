import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default function DirectionSnackbar(props) {

    return (
    <div>
      <Snackbar
        open={props.open}
        TransitionComponent={TransitionRight}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={props.message}
      />
    </div>
  );
}