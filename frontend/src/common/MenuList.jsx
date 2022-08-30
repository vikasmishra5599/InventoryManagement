import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';

const MenuList = () => {

  const history = useHistory();

  const home = () => {
    history.push('/');
  };

  const employeeRegistration = () => {
    history.push('/employee');
  };
  
  const productRegistration = () => {
    history.push('/product');
  };

  const productAssignment = () => {
    history.push('/assignment');
  };

  const audit = () => {
    history.push('/audit');
  };

  return (
    <Box>
      <nav aria-label="main ims">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Dashboard" onClick={home} />
          </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Employee Registration" onClick={employeeRegistration} />
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Product Registration" onClick={productRegistration} />
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Product Assignment" onClick={productAssignment} />
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Audit" onClick={audit} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default MenuList;
