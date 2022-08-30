import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useStyles } from './Styles';

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "white", color: "black" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Inventory Management System
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
