import * as React from 'react';
import { Typography } from '@mui/material';
import { useStyles } from './Styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
    {/*  <Typography variant="h6" className={classes.title}>
          @2022
      </Typography>*/}
    </footer>
  );
};

export default Footer;
