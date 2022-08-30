import React from 'react';
import Header from './Header';
import MenuList from './MenuList';
import Footer from './Footer';

import { Grid } from '@mui/material'

const Layout = (props) => {
  return (
    <>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={3}>
            <MenuList />
        </Grid>
        <Grid item xs={5}>
            {props.children}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Layout;
