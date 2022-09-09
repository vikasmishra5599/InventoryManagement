import * as React from 'react';
import { Typography } from '@mui/material';

const Footer = () => {

  return (
    <footer style={{
      bottom: 0,
      textAlign: 'center',
      position: 'fixed',
      left: 'auto',
      right: 0,
      width: '100%',
      boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
    }}>
    {/*  <Typography variant="h6" className={classes.title}>
          @2022
      </Typography>*/}
    </footer>
  );
};

export default Footer;
