import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "white", color: "black" }}>
        <Toolbar>
          <Typography variant="h6" style={{
            flexGrow: 1,
            fontWeight: 'bold',
            marginRight:"20px",
          }}>
            Inventory Management System
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
