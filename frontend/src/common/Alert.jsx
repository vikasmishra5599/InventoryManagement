import React from 'react';
import { useStyles } from './Styles';

const Alert = ({ children, alertClass }) => {
  const classes = useStyles();

  return (
    <div className={`${alertClass ? alertClass : classes.messageError}`} data-testid="alert">
      {children || 'Something went wrong.'}
    </div>
  );
};
export default Alert;
